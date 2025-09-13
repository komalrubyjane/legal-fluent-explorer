import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, FileText, Users, Zap, Shield, Scale, GraduationCap } from 'lucide-react';
import heroImage from "@/assets/legal-hero.jpg";
import documentInterface from "@/assets/document-interface.jpg";
import { DocumentSimulator } from "@/components/DocumentSimulator";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCards } from "@/components/FeatureCards";
import { InteractiveDemo } from "@/components/InteractiveDemo";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'simulator'>('home');

  if (currentView === 'simulator') {
    return <DocumentSimulator onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">LegalSim</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#demo" className="text-muted-foreground hover:text-primary transition-colors">
                Demo
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
            </div>
            <Button 
              onClick={() => setCurrentView('simulator')}
              className="btn-hero"
            >
              Try Simulator
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection onGetStarted={() => setCurrentView('simulator')} />

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold mb-4">
              Making Legal Documents <span className="gradient-text">Accessible</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform complex legal jargon into clear, actionable insights with our AI-powered platform
            </p>
          </div>
          <FeatureCards />
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="demo" className="py-20">
        <div className="container mx-auto px-4">
          <InteractiveDemo />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="container mx-auto px-4 text-center">
          <div className="fade-in">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Master Legal Documents?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have transformed their legal literacy with our interactive platform
            </p>
            <Button 
              onClick={() => setCurrentView('simulator')}
              variant="secondary"
              size="lg"
              className="btn-secondary text-lg"
            >
              Start Learning Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">LegalSim</span>
              </div>
              <p className="text-muted-foreground">
                Making legal literacy accessible through interactive learning
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Document Simulator</li>
                <li>AI Summaries</li>
                <li>Interactive Quizzes</li>
                <li>Scenario Testing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Contracts</li>
                <li>Agreements</li>
                <li>Policies</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Community</li>
                <li>Contact</li>
                <li>Feedback</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 LegalSim. Making legal literacy accessible to everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;