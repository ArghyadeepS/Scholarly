import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ScanText, Route } from "lucide-react";
import { Link } from "react-router-dom";
import { MinecraftHeading } from "@/components/MinecraftHeading";

const Dashboard = () => {
  const quickActions = [
    {
      title: "Ask a Question",
      description: "Get instant answers in your language",
      icon: MessageSquare,
      link: "/app/chat",
      color: "text-primary"
    },
    {
      title: "Scan a Document",
      description: "Extract and analyze form data",
      icon: ScanText,
      link: "/app/ocr",
      color: "text-secondary"
    },
    {
      title: "Start a Workflow",
      description: "Follow step-by-step procedures",
      icon: Route,
      link: "/app/workflows",
      color: "text-accent"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <MinecraftHeading className="text-2xl md:text-3xl mb-2">
          Dashboard
        </MinecraftHeading>
        <p className="text-muted-foreground">
          Welcome back! Here's what you can do today.
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="pixel-border hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader>
                <action.icon className={`h-10 w-10 ${action.color} mb-2 group-hover:scale-110 transition-transform`} />
                <CardTitle className="text-lg">{action.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{action.description}</CardDescription>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to={action.link}>Open</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
