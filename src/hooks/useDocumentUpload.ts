import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface DocumentAnalysis {
  simplified_content: string;
  summary: string;
  key_points: string[];
  critical_clauses: string[];
  beneficial_clauses: string[];
  complexity_score: number;
  risk_score: number;
}

interface ProcessedDocument {
  document_id: string;
  analysis: DocumentAnalysis;
}

export const useDocumentUpload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const processDocument = async (
    content: string,
    title: string,
    fileType: string,
    fileSize: number
  ): Promise<ProcessedDocument | null> => {
    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 500);

      const { data, error } = await supabase.functions.invoke('process-document', {
        body: {
          content,
          title,
          fileType,
          fileSize
        }
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.error || 'Processing failed');
      }

      toast({
        title: "Document processed successfully",
        description: "Your document has been simplified and analyzed.",
      });

      return data;
    } catch (error) {
      console.error('Error processing document:', error);
      toast({
        title: "Processing failed",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: "destructive",
      });
      return null;
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const getDocumentAnalysis = async (documentId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('get-document-analysis', {
        body: { document_id: documentId }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to get analysis');
      }

      return data;
    } catch (error) {
      console.error('Error getting document analysis:', error);
      toast({
        title: "Failed to load analysis",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    processDocument,
    getDocumentAnalysis,
    isProcessing,
    progress
  };
};