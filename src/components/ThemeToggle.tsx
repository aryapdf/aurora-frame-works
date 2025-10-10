import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative text-foreground/80 hover:text-foreground transition-colors"
      style={{ height: 'clamp(2rem, 3vw, 2.25rem)', width: 'clamp(2rem, 3vw, 2.25rem)' }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <Sun style={{ height: 'clamp(0.875rem, 1.5vw, 1rem)', width: 'clamp(0.875rem, 1.5vw, 1rem)' }} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon style={{ height: 'clamp(0.875rem, 1.5vw, 1rem)', width: 'clamp(0.875rem, 1.5vw, 1rem)' }} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

export default ThemeToggle;