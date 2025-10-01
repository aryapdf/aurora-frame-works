import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && accepted) {
      // Handle newsletter signup
      console.log("Newsletter signup:", email);
    }
  };

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-6 sm:p-8 rounded-2xl text-center space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Subscribe to our newsletter</h2>
            <p className="text-foreground/60 text-sm sm:text-base">
              Get updates and insights from Anders
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary"
                required
              />
              
              <div className="flex items-start space-x-2 text-xs sm:text-sm text-left">
                <Checkbox
                  id="privacy"
                  checked={accepted}
                  onCheckedChange={(checked) => setAccepted(checked as boolean)}
                  required
                  className="mt-0.5"
                />
                <label htmlFor="privacy" className="text-foreground/60 leading-relaxed flex-1">
                  I accept the Privacy Policy and Terms and Conditions, and I'd like to receive news from Anders.
                </label>
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full glow-effect"
                disabled={!email || !accepted}
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;