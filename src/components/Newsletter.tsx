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
    <section className="relative" style={{ paddingTop: 'clamp(3rem, 8vh, 5rem)', paddingBottom: 'clamp(3rem, 8vh, 5rem)' }}>
      <div className="container mx-auto" style={{ paddingLeft: 'clamp(1rem, 3vw, 1.5rem)', paddingRight: 'clamp(1rem, 3vw, 1.5rem)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl text-center" style={{ 
            padding: 'clamp(1.5rem, 4vw, 2rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(1rem, 3vw, 1.5rem)'
          }}>
            <h2 className="font-bold" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.875rem)' }}>Subscribe to our newsletter</h2>
            <p className="text-foreground/60" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
              Get updates and insights from Anders
            </p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1rem)' }}>
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary"
                style={{ padding: 'clamp(0.625rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
                required
              />
              
              <div className="flex items-start text-left" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                <Checkbox
                  id="privacy"
                  checked={accepted}
                  onCheckedChange={(checked) => setAccepted(checked as boolean)}
                  required
                  className="mt-0.5"
                />
                <label htmlFor="privacy" className="text-foreground/60 leading-relaxed flex-1" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>
                  I accept the Privacy Policy and Terms and Conditions, and I'd like to receive news from Anders.
                </label>
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full glow-effect"
                style={{ padding: 'clamp(0.625rem, 1.5vw, 0.875rem) clamp(1.5rem, 3vw, 2rem)', fontSize: 'clamp(0.938rem, 1.5vw, 1rem)' }}
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