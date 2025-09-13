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
    const url = new URL(req.url);
    const documentId = url.searchParams.get('document_id');

    if (!documentId) {
      throw new Error('Document ID is required');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get document and analysis
    const { data: document, error: docError } = await supabase
      .from('documents')
      .select(`
        *,
        document_analyses (*)
      `)
      .eq('id', documentId)
      .single();

    if (docError || !document) {
      throw new Error('Document not found');
    }

    const analysis = document.document_analyses?.[0];

    return new Response(JSON.stringify({
      success: true,
      document: {
        id: document.id,
        title: document.title,
        content: document.content,
        file_type: document.file_type,
        analysis_status: document.analysis_status,
        upload_date: document.upload_date
      },
      analysis: analysis ? {
        simplified_content: analysis.simplified_content,
        summary: analysis.summary,
        key_points: analysis.key_points,
        critical_clauses: analysis.critical_clauses,
        beneficial_clauses: analysis.beneficial_clauses,
        complexity_score: analysis.complexity_score,
        risk_score: analysis.risk_score
      } : null
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in get-document-analysis function:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});