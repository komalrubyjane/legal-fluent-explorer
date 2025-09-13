import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Brain, 
  Users, 
  Zap, 
  Shield, 
  GraduationCap,
  Search,
  Target,
  BookOpen
} from 'lucide-react';

export const FeatureCards = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Document Analysis",
      description: "Upload any legal document and get instant clause-by-clause breakdowns",
      badge: "Core Feature",
      color: "primary"
    },
    {
      icon: <Brain className="h-8 w-8 text-secondary" />,
      title: "AI-Powered Summaries", 
      description: "Complex legal language transformed into plain, understandable explanations",
      badge: "AI Technology",
      color: "secondary"
    },
    {
      icon: <Target className="h-8 w-8 text-accent" />,
      title: "Scenario Simulations",
      description: "See real-world consequences of different contractual choices and decisions",
      badge: "Interactive",
      color: "accent"
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Clause Highlighting",
      description: "Important terms and conditions highlighted with detailed explanations",
      badge: "Visual Learning",
      color: "primary"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-secondary" />,
      title: "Interactive Quizzes",
      description: "Test your understanding with personalized quizzes and knowledge checks",
      badge: "Education",
      color: "secondary"
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: "Rights Protection",
      description: "Learn about your legal rights and how to protect them effectively",
      badge: "Protection",
      color: "accent"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card 
          key={index} 
          className="card-elegant hover:card-highlight group cursor-pointer"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-muted group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <Badge 
              variant="secondary" 
              className={`mb-2 bg-${feature.color}/10 text-${feature.color} border-${feature.color}/20`}
            >
              {feature.badge}
            </Badge>
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-base leading-relaxed">
              {feature.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};