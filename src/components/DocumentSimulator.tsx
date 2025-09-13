import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

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

  const handleDocumentSelect = (docId: string) => {
    setSelectedDocument(docId);
    setCurrentStep('analyze');
    
    // Simulate analysis progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setCurrentStep('results'), 500);
      }
      setAnalysisProgress(progress);
    }, 300);
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
                  <Button className="btn-primary">
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
                <span>{Math.round(analysisProgress)}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
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
                {analysisProgress > 50 ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <div className="h-4 w-4 border-2 border-muted rounded-full animate-spin" />
                )}
                AI analysis in progress
              </div>
              <div className="flex items-center gap-2">
                {analysisProgress > 80 ? (
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
                <p className="text-muted-foreground">Employment Contract Analysis</p>
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
                <div className="text-2xl font-bold">{mockAnalysisResults.totalClauses}</div>
                <div className="text-sm text-muted-foreground">Total Clauses</div>
              </CardContent>
            </Card>
            <Card className="card-elegant">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-destructive" />
                <div className="text-2xl font-bold">{mockAnalysisResults.criticalClauses}</div>
                <div className="text-sm text-muted-foreground">Critical Issues</div>
              </CardContent>
            </Card>
            <Card className="card-elegant">
              <CardContent className="p-6 text-center">
                <div className="relative h-8 w-8 mx-auto mb-2">
                  <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-warning border-t-transparent animate-spin"
                    style={{
                      transform: `rotate(${(mockAnalysisResults.riskScore / 100) * 360}deg)`
                    }}
                  ></div>
                </div>
                <div className="text-2xl font-bold">{mockAnalysisResults.riskScore}%</div>
                <div className="text-sm text-muted-foreground">Risk Score</div>
              </CardContent>
            </Card>
            <Card className="card-elegant">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <div className="text-lg font-bold">{mockAnalysisResults.comprehensionLevel}</div>
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
                    Key insights from your employment contract
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose max-w-none">
                    <p>
                      This employment contract contains <strong>2 critical clauses</strong> that require your attention, 
                      particularly around confidentiality and intellectual property rights. The agreement includes 
                      <strong>fair compensation terms</strong> with overtime protection and standard termination procedures.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <AlertTriangle className="h-6 w-6 mb-2 text-destructive" />
                      <h4 className="font-semibold mb-1">Critical Attention</h4>
                      <p className="text-sm text-muted-foreground">
                        Strict confidentiality and IP assignment clauses
                      </p>
                    </div>
                    <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <Info className="h-6 w-6 mb-2 text-warning" />
                      <h4 className="font-semibold mb-1">Important Details</h4>
                      <p className="text-sm text-muted-foreground">
                        30-day notice period and probation terms
                      </p>
                    </div>
                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                      <CheckCircle className="h-6 w-6 mb-2 text-success" />
                      <h4 className="font-semibold mb-1">Beneficial Terms</h4>
                      <p className="text-sm text-muted-foreground">
                        Overtime pay and health benefits included
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clauses" className="mt-6">
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle>Clause-by-Clause Analysis</CardTitle>
                  <CardDescription>
                    Detailed breakdown of each contract section
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Detailed clause analysis coming soon</p>
                    <p>This feature will provide line-by-line explanations</p>
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