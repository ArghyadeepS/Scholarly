import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ScanText, Route, BookOpen, Github, LogOut, User, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { MinecraftHeading } from "@/components/MinecraftHeading";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const styles = `
  .font-minecraft {
    font-family: 'Press Start 2P', monospace;
    letter-spacing: 0.05em;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
if (document.head) {
  document.head.appendChild(styleSheet);
}

const Landing = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const features = [
    {
      icon: MessageSquare,
      title: "Multilingual Chat",
      description: "Get answers in your language — Hindi, Bengali, Marathi, and more."
    },
    {
      icon: ScanText,
      title: "OCR Document Intelligence",
      description: "Upload forms and get instant text extraction with field detection."
    },
    {
      icon: Route,
      title: "Guided Workflows",
      description: "Step-by-step procedures for exams, scholarships, and admissions."
    },
    {
      icon: BookOpen,
      title: "Knowledge Base",
      description: "Searchable articles on policies, deadlines, and requirements."
    }
  ];

  const stats = [
    { value: "4+", label: "Languages" },
    { value: "OCR", label: "In Seconds" },
    { value: "Step-by-step", label: "Guidance" }
  ];

  return (
    <div className="min-h-screen bg-cover bg-fixed" style={{backgroundImage: "url('/bg.jpg')"}}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled 
          ? "bg-card/80 backdrop-blur-md border-b/50" 
          : "bg-card/50 backdrop-blur-sm"
      }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Scholarly</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/app")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                      <AvatarFallback className="bg-primary text-primary-foreground font-minecraft text-xs">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/app/settings")}>
                      <User className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate("/login")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="relative container mx-auto px-4 text-center">
          <MinecraftHeading className="text-3xl md:text-5xl mb-6 text-black">
            Scholarly
          </MinecraftHeading>
          <h2 className="text-xl md:text-2xl mb-4 text-black">
            Multilingual Academic Assistant
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-black">
            Understand forms, ace procedures, and apply confidently — in your language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-base"
              onClick={() => {
                if (isAuthenticated) {
                  navigate("/app");
                } else {
                  navigate("/login");
                }
              }}
            >
              Try the App
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <a href="#features">See Features</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 bg-background/80 backdrop-blur-sm light:bg-background/75">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="font-minecraft text-2xl md:text-3xl text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <MinecraftHeading className="text-2xl md:text-3xl mb-4 text-black">
              Features
            </MinecraftHeading>
            <p className="text-black max-w-2xl mx-auto">
              Everything you need to navigate academic procedures with confidence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="pixel-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who It Helps Section */}
      <section className="py-20 bg-background/80 backdrop-blur-sm light:bg-background/75">
        <div className="container mx-auto px-4 text-center">
          <MinecraftHeading className="text-2xl md:text-3xl mb-8">
            Who It Helps
          </MinecraftHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="pixel-border">
              <CardHeader>
                <CardTitle>Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Navigate complex applications and deadlines with multilingual support
                </p>
              </CardContent>
            </Card>
            <Card className="pixel-border">
              <CardHeader>
                <CardTitle>Institutes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Help students understand requirements and complete forms accurately
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div>
              © {new Date().getFullYear()} Scholarly • Built by Fork Experts
            </div>
            <div className="flex gap-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
