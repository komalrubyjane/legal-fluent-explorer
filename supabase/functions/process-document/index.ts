import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, title, fileType, fileSize } = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store document in database
    const { data: document, error: docError } = await supabase
      .from('documents')
      .insert({
        title,
        content,
        file_type: fileType,
        file_size: fileSize,
        analysis_status: 'processing'
      })
      .select()
      .single();

    if (docError) {
      throw new Error(`Failed to store document: ${docError.message}`);
    }

    console.log('Document stored:', document.id);

    // Call OpenAI to simplify the document
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          {
            role: 'system',
            content: `You are a legal document simplification expert. Your task is to:
1. Simplify complex legal language into plain English
2. Identify key points, risks, and beneficial terms
3. Provide a clear summary and analysis
4. Rate complexity and risk on a scale of 0-100

Respond with a JSON object containing:
- simplified_content: The document rewritten in simple language
- summary: A brief overview of what the document is about
- key_points: Array of the most important points
- critical_clauses: Array of clauses that need attention
- beneficial_clauses: Array of favorable terms
- complexity_score: 0-100 rating of document complexity
- risk_score: 0-100 rating of potential risks`
          },
          {
            role: 'user',
            content: `Please analyze and simplify this legal document:\n\n${content}`
          }
        ],
        max_completion_tokens: 2000,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiResult = await response.json();
    const analysis = JSON.parse(aiResult.choices[0].message.content);

    console.log('AI analysis completed');

    // Store analysis results
    const { error: analysisError } = await supabase
      .from('document_analyses')
      .insert({
        document_id: document.id,
        simplified_content: analysis.simplified_content,
        summary: analysis.summary,
        key_points: analysis.key_points,
        critical_clauses: analysis.critical_clauses,
        beneficial_clauses: analysis.beneficial_clauses,
        complexity_score: analysis.complexity_score,
        risk_score: analysis.risk_score
      });

    if (analysisError) {
      throw new Error(`Failed to store analysis: ${analysisError.message}`);
    }

    // Update document status
    await supabase
      .from('documents')
      .update({ analysis_status: 'completed' })
      .eq('id', document.id);

    console.log('Analysis stored successfully');

    return new Response(JSON.stringify({
      success: true,
      document_id: document.id,
      analysis: {
        simplified_content: analysis.simplified_content,
        summary: analysis.summary,
        key_points: analysis.key_points,
        critical_clauses: analysis.critical_clauses,
        beneficial_clauses: analysis.beneficial_clauses,
        complexity_score: analysis.complexity_score,
        risk_score: analysis.risk_score
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in process-document function:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});