import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/GlobalContext.tsx";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative text-foreground/80 hover:text-foreground transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <Sun style={{ height: 'clamp(1rem, 2vw, 1.25rem)', width: 'clamp(1rem, 2vw, 1.25rem)' }} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon style={{ height: 'clamp(1rem, 2vw, 1.25rem)', width: 'clamp(1rem, 2vw, 1.25rem)' }} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

export default ThemeToggle;