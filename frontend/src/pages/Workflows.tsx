import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, FileCheck, ChevronRight } from "lucide-react";
import { MinecraftHeading } from "@/components/MinecraftHeading";
import { WorkflowStepper } from "@/components/WorkflowStepper";

const Workflows = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);

  const workflows = [
    {
      id: "exam-registration",
      title: "Exam Registration",
      description: "Complete your exam registration step by step",
      icon: GraduationCap,
      steps: 6,
      duration: "15 min"
    },
    {
      id: "scholarship-application",
      title: "Scholarship Application",
      description: "Apply for scholarships with guided assistance",
      icon: Award,
      steps: 8,
      duration: "25 min"
    },
    {
      id: "college-admission",
      title: "College Admission",
      description: "Navigate the college admission process",
      icon: FileCheck,
      steps: 10,
      duration: "30 min"
    }
  ];

  if (selectedWorkflow) {
    const workflow = workflows.find(w => w.id === selectedWorkflow);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <MinecraftHeading className="text-2xl md:text-3xl mb-2">
              {workflow?.title}
            </MinecraftHeading>
            <p className="text-muted-foreground">
              Follow these steps to complete the process
            </p>
          </div>
          <Button variant="outline" onClick={() => setSelectedWorkflow(null)}>
            Back to Workflows
          </Button>
        </div>

        <WorkflowStepper workflowId={selectedWorkflow} totalSteps={workflow?.steps || 0} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <MinecraftHeading className="text-2xl md:text-3xl mb-2">
          Workflows
        </MinecraftHeading>
        <p className="text-muted-foreground">
          Choose a workflow to get step-by-step guidance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card 
            key={workflow.id} 
            className="pixel-border hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => setSelectedWorkflow(workflow.id)}
          >
            <CardHeader>
              <workflow.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <CardTitle className="flex items-center justify-between">
                {workflow.title}
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{workflow.description}</CardDescription>
              <div className="flex gap-2">
                <Badge variant="secondary">
                  {workflow.steps} steps
                </Badge>
                <Badge variant="outline">
                  ~{workflow.duration}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Workflows;
