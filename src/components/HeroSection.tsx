import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ArrowRight, Zap } from 'lucide-react';
import heroImage from "@/assets/legal-hero.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/80" />
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Legal Education
          </Badge>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 fade-in">
            Transform Complex 
            <span className="block gradient-text bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Legal Documents
            </span>
            Into Simple Insights
          </h1>
          
          <p className="text-xl lg:text-2xl mb-10 text-white/90 max-w-3xl mx-auto fade-in">
            Break down legal jargon, understand your rights, and make informed decisions with our 
            interactive document simulator and AI-powered explanations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="btn-hero text-lg px-8 py-4"
            >
              Start Exploring
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-4"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="fade-in">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-white/80">Documents Analyzed</div>
            </div>
            <div className="fade-in">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-white/80">User Satisfaction</div>
            </div>
            <div className="fade-in">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-white/80">Document Types</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};