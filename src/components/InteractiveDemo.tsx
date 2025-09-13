import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Brain, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Play,
  RotateCcw
} from 'lucide-react';
import documentInterface from "@/assets/document-interface.jpg";

export const InteractiveDemo = () => {
  const [selectedClause, setSelectedClause] = useState<number | null>(null);
  const [quizProgress, setQuizProgress] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const clauses = [
    {
      id: 1,
      text: "The Employee agrees to maintain confidentiality of all proprietary information...",
      type: "critical",
      explanation: "This is a Non-Disclosure Agreement (NDA) clause. It means you cannot share company secrets, trade information, or confidential data with anyone outside the company.",
      impact: "High - Violation could result in legal action and damages"
    },
    {
      id: 2,
      text: "Termination may occur with 30 days written notice from either party...",
      type: "important",
      explanation: "This clause defines how the employment can be ended. Both you and your employer need to give 30 days advance notice in writing.",
      impact: "Medium - Affects job security and transition planning"
    },
    {
      id: 3,
      text: "Overtime compensation shall be paid at 1.5x the regular hourly rate...",
      type: "beneficial",
      explanation: "This ensures you get paid extra for working more than standard hours. You'll receive 50% more than your normal hourly wage for overtime.",
      impact: "Positive - Guarantees fair compensation for extra work"
    }
  ];

  const getClauseIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'important': return <Info className="h-4 w-4 text-warning" />;
      case 'beneficial': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getClauseBadgeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'important': return 'default';
      case 'beneficial': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 fade-in">
        <h2 className="text-4xl font-bold mb-4">
          <span className="gradient-text">Interactive Demo</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Experience how our platform transforms complex legal documents into clear, actionable insights
        </p>
      </div>

      <Tabs defaultValue="analyzer" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="analyzer" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Document Analyzer
          </TabsTrigger>
          <TabsTrigger value="ai-summary" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Summary
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Knowledge Quiz
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyzer" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Document View */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Employment Contract Sample
                </CardTitle>
                <CardDescription>
                  Click on highlighted clauses to see detailed explanations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {clauses.map((clause) => (
                  <div
                    key={clause.id}
                    onClick={() => setSelectedClause(clause.id)}
                    className={`interactive-clause cursor-pointer ${
                      selectedClause === clause.id ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {getClauseIcon(clause.type)}
                      <div className="flex-1">
                        <p className="text-sm">{clause.text}</p>
                        <Badge 
                          variant={getClauseBadgeColor(clause.type) as any}
                          className="mt-2"
                        >
                          {clause.type.charAt(0).toUpperCase() + clause.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Explanation Panel */}
            <Card className="card-highlight">
              <CardHeader>
                <CardTitle>Clause Explanation</CardTitle>
                <CardDescription>
                  {selectedClause ? 'Plain language breakdown' : 'Select a clause to see explanation'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedClause ? (
                  <div className="space-y-4 fade-in">
                    {(() => {
                      const clause = clauses.find(c => c.id === selectedClause);
                      return clause ? (
                        <>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="font-medium mb-2">What this means:</p>
                            <p className="text-muted-foreground">{clause.explanation}</p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="font-medium mb-2">Impact Level:</p>
                            <p className="text-muted-foreground">{clause.impact}</p>
                          </div>
                        </>
                      ) : null;
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Click on any highlighted clause to see its explanation</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-summary" className="space-y-6">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-secondary" />
                AI-Generated Summary
              </CardTitle>
              <CardDescription>
                Key points from your employment contract in plain language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-destructive/10 rounded-lg">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-destructive" />
                  <div className="font-semibold">1 Critical</div>
                  <div className="text-sm text-muted-foreground">Requires attention</div>
                </div>
                <div className="text-center p-4 bg-warning/10 rounded-lg">
                  <Info className="h-8 w-8 mx-auto mb-2 text-warning" />
                  <div className="font-semibold">1 Important</div>
                  <div className="text-sm text-muted-foreground">Good to know</div>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                  <div className="font-semibold">1 Beneficial</div>
                  <div className="text-sm text-muted-foreground">In your favor</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Key Takeaways:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 text-success" />
                    <span className="text-sm">You're protected with overtime pay at 1.5x your regular rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-1 text-warning" />
                    <span className="text-sm">Both parties need 30 days notice for termination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-1 text-destructive" />
                    <span className="text-sm">Strict confidentiality requirements - be careful about sharing company information</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-6">
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                Knowledge Check
              </CardTitle>
              <CardDescription>
                Test your understanding of the contract
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{quizProgress}%</span>
                </div>
                <Progress value={quizProgress} className="h-2" />
              </div>

              {!showExplanation ? (
                <div className="space-y-4">
                  <h4 className="font-semibold">
                    Question: What happens if you share confidential company information?
                  </h4>
                  <div className="grid gap-3">
                    {[
                      "Nothing happens, it's just a suggestion",
                      "You could face legal action and damages",
                      "You get a warning from HR",
                      "You have to pay a small fine"
                    ].map((option, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="justify-start text-left h-auto p-4"
                        onClick={() => {
                          setQuizProgress(idx === 1 ? 100 : 25);
                          setShowExplanation(true);
                        }}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 fade-in">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="font-semibold">
                        {quizProgress === 100 ? 'Correct!' : 'Not quite right'}
                      </span>
                    </div>
                    <p className="text-sm">
                      The confidentiality clause is legally binding. Violating it could result in 
                      serious legal consequences including lawsuits and financial damages.
                    </p>
                  </div>
                  <Button 
                    onClick={() => {
                      setShowExplanation(false);
                      setQuizProgress(0);
                    }}
                    className="btn-secondary"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};