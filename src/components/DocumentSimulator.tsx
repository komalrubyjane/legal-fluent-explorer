import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import { 
  ArrowLeft,
  Upload, 
  FileText, 
  Brain, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Download,
  Share2,
  BookOpen
} from 'lucide-react';

interface DocumentSimulatorProps {
  onBack: () => void;
}

export const DocumentSimulator = ({ onBack }: DocumentSimulatorProps) => {
  const [currentStep, setCurrentStep] = useState<'upload' | 'analyze' | 'results'>('upload');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const { processDocument, isProcessing, progress } = useDocumentUpload();

  const sampleDocuments = [
    {
      id: 'employment',
      title: 'Employment Contract',
      description: 'Standard employment agreement with NDA and compensation terms',
      complexity: 'Medium',
      clauses: 12
    },
    {
      id: 'rental',
      title: 'Rental Agreement',
      description: 'Residential lease agreement with pet policy and utilities',
      complexity: 'Low',
      clauses: 8
    },
    {
      id: 'service',
      title: 'Service Agreement',
      description: 'Professional services contract with liability and payment terms',
      complexity: 'High',
      clauses: 18
    }
  ];

  const mockAnalysisResults = {
    totalClauses: 12,
    criticalClauses: 2,
    importantClauses: 5,
    beneficialClauses: 3,
    riskScore: 65,
    comprehensionLevel: 'Intermediate'
  };

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;
    
    setUploadedFile(file);
    setCurrentStep('analyze');
    
    try {
      const content = await file.text();
      const result = await processDocument(
        content,
        file.name,
        file.type,
        file.size
      );
      
      if (result) {
        setAnalysisResults(result.analysis);
        setCurrentStep('results');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      setCurrentStep('upload');
    }
  }, [processDocument]);

  const handleDocumentSelect = async (docId: string) => {
    setSelectedDocument(docId);
    setCurrentStep('analyze');
    
    // Get sample document content
    const sampleDoc = sampleDocuments.find(doc => doc.id === docId);
    if (!sampleDoc) return;
    
    const sampleContent = getSampleDocumentContent(docId);
    
    try {
      const result = await processDocument(
        sampleContent,
        sampleDoc.title,
        'text/plain',
        sampleContent.length
      );
      
      if (result) {
        setAnalysisResults(result.analysis);
        setCurrentStep('results');
      }
    } catch (error) {
      console.error('Error processing sample document:', error);
      setCurrentStep('upload');
    }
  };

  const getSampleDocumentContent = (docId: string): string => {
    const sampleContents: Record<string, string> = {
      employment: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into on [DATE] between [COMPANY NAME], a corporation ("Company"), and [EMPLOYEE NAME] ("Employee").

1. POSITION AND DUTIES
Employee agrees to serve as [POSITION] and to perform such duties as may be assigned by the Company.

2. COMPENSATION
Company agrees to pay Employee a base salary of $[AMOUNT] per year, payable in accordance with Company's standard payroll practices.

3. CONFIDENTIALITY
Employee acknowledges that during employment, Employee will have access to certain confidential and proprietary information. Employee agrees to maintain such information in strict confidence.

4. INTELLECTUAL PROPERTY
All inventions, discoveries, developments, and innovations conceived by Employee during employment shall be the exclusive property of the Company.

5. TERMINATION
This Agreement may be terminated by either party with thirty (30) days written notice.

6. GOVERNING LAW
This Agreement shall be governed by the laws of [STATE].`,
      
      rental: `RESIDENTIAL LEASE AGREEMENT

This Lease Agreement is made between [LANDLORD NAME] ("Landlord") and [TENANT NAME] ("Tenant") for the property located at [ADDRESS].

1. TERM
The lease term shall commence on [START DATE] and end on [END DATE].

2. RENT
Tenant agrees to pay monthly rent of $[AMOUNT], due on the first day of each month.

3. SECURITY DEPOSIT
Tenant shall pay a security deposit of $[AMOUNT] upon signing this lease.

4. PETS
Pets are permitted with additional deposit of $[AMOUNT] and monthly pet fee of $[AMOUNT].

5. UTILITIES
Tenant is responsible for electricity, gas, and internet. Landlord pays water and trash.

6. MAINTENANCE
Tenant shall maintain the premises in good condition and notify Landlord of needed repairs.`,
      
      service: `PROFESSIONAL SERVICES AGREEMENT

This Agreement is entered into between [SERVICE PROVIDER] ("Provider") and [CLIENT NAME] ("Client").

1. SERVICES
Provider agrees to perform the following services: [DESCRIPTION OF SERVICES]

2. COMPENSATION
Client agrees to pay Provider $[AMOUNT] for the services described herein.

3. TIMELINE
Services shall be completed by [DEADLINE DATE].

4. LIABILITY
Provider's liability shall not exceed the total amount paid under this Agreement.

5. INTELLECTUAL PROPERTY
All work product created shall remain the property of the Client upon full payment.

6. TERMINATION
Either party may terminate this Agreement with seven (7) days written notice.`
    };
    
    return sampleContents[docId] || '';
  };

  if (currentStep === 'upload') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Document Simulator</h1>
                <p className="text-muted-foreground">Upload or select a document to analyze</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Upload Section */}
            <Card className="card-elegant">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Upload className="h-6 w-6" />
                  Upload Your Document
                </CardTitle>
                <CardDescription>
                  Support for PDF, DOCX, and TXT files up to 10MB
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Drag and drop your document here</p>
                  <p className="text-muted-foreground mb-4">or click to browse files</p>
                  <Input
                    type="file"
                    accept=".txt,.pdf,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button 
                    className="btn-primary"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-muted-foreground">or try a sample document</span>
              </div>
            </div>

            {/* Sample Documents */}
            <div className="grid md:grid-cols-3 gap-6">
              {sampleDocuments.map((doc) => (
                <Card 
                  key={doc.id}
                  className="card-elegant hover:card-highlight cursor-pointer group"
                  onClick={() => handleDocumentSelect(doc.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                      <Badge variant={doc.complexity === 'Low' ? 'secondary' : doc.complexity === 'Medium' ? 'default' : 'destructive'}>
                        {doc.complexity}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{doc.clauses} clauses</span>
                      <span>~5 min read</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'analyze') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md card-elegant">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10">
              <Brain className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <CardTitle>Analyzing Document</CardTitle>
            <CardDescription>
              Our AI is breaking down the legal language...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Document uploaded successfully
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Text extracted and processed
              </div>
              <div className="flex items-center gap-2">
                {progress > 50 ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <div className="h-4 w-4 border-2 border-muted rounded-full animate-spin" />
                )}
                AI analysis in progress
              </div>
              <div className="flex items-center gap-2">
                {progress > 80 ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <div className="h-4 w-4 border-2 border-muted rounded-full" />
                )}
                Generating explanations
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results view
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Analysis Results</h1>
                <p className="text-muted-foreground">
                  {uploadedFile ? uploadedFile.name : selectedDocument ? 
                    sampleDocuments.find(d => d.id === selectedDocument)?.title : 
                    'Document Analysis'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="card-elegant">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">
                  {analysisResults?.key_points?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Key Points</div>
              </CardContent>
            </Card>
            <Card className="card-elegant">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-destructive" />
                <div className="text-2xl font-bold">
                  {analysisResults?.critical_clauses?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Critical Issues</div>
              </CardContent>
            </Card>
            <Card className="card-elegant">
              <CardContent className="p-6 text-center">
                <div className="relative h-8 w-8 mx-auto mb-2">
                  <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-warning border-t-transparent"
                    style={{
                      transform: `rotate(${((analysisResults?.risk_score || 0) / 100) * 360}deg)`
                    }}
                  ></div>
                </div>
                <div className="text-2xl font-bold">{analysisResults?.risk_score || 0}%</div>
                <div className="text-sm text-muted-foreground">Risk Score</div>
              </CardContent>
            </Card>
            <Card className="card-elegant">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <div className="text-lg font-bold">{analysisResults?.complexity_score || 0}%</div>
                <div className="text-sm text-muted-foreground">Complexity</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Analysis */}
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="clauses">Clauses</TabsTrigger>
              <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-6 mt-6">
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle>AI-Generated Summary</CardTitle>
                  <CardDescription>
                    Key insights from your document
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose max-w-none">
                    <p>{analysisResults?.summary || 'No summary available'}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <AlertTriangle className="h-6 w-6 mb-2 text-destructive" />
                      <h4 className="font-semibold mb-1">Critical Attention</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        {analysisResults?.critical_clauses?.map((clause: string, index: number) => (
                          <p key={index}>{clause}</p>
                        )) || <p>No critical issues found</p>}
                      </div>
                    </div>
                    <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
                      <Info className="h-6 w-6 mb-2 text-info" />
                      <h4 className="font-semibold mb-1">Key Points</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        {analysisResults?.key_points?.slice(0, 3)?.map((point: string, index: number) => (
                          <p key={index}>{point}</p>
                        )) || <p>No key points identified</p>}
                      </div>
                    </div>
                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                      <CheckCircle className="h-6 w-6 mb-2 text-success" />
                      <h4 className="font-semibold mb-1">Beneficial Terms</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        {analysisResults?.beneficial_clauses?.map((clause: string, index: number) => (
                          <p key={index}>{clause}</p>
                        )) || <p>No beneficial terms highlighted</p>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clauses" className="mt-6">
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle>Simplified Content</CardTitle>
                  <CardDescription>
                    Your document explained in plain English
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap">
                      {analysisResults?.simplified_content || 'No simplified content available'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scenarios" className="mt-6">
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle>Scenario Simulations</CardTitle>
                  <CardDescription>
                    Explore real-world consequences of contract terms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Brain className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Interactive scenarios coming soon</p>
                    <p>Test different situations and see their outcomes</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quiz" className="mt-6">
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle>Knowledge Quiz</CardTitle>
                  <CardDescription>
                    Test your understanding of the contract
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <CheckCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Personalized quiz coming soon</p>
                    <p>Adaptive questions based on your contract analysis</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};