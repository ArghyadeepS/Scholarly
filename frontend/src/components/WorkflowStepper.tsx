import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";

interface WorkflowStepperProps {
  workflowId: string;
  totalSteps: number;
}

export const WorkflowStepper = ({ workflowId, totalSteps }: WorkflowStepperProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const progress = (currentStep / totalSteps) * 100;

  const steps = Array.from({ length: totalSteps }, (_, i) => ({
    number: i + 1,
    title: `Step ${i + 1}`,
    description: `Complete this step to proceed with your ${workflowId.replace(/-/g, ' ')}`
  }));

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card className="pixel-border">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Steps List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Steps Sidebar */}
        <Card className="pixel-border">
          <CardHeader>
            <CardTitle className="text-lg">All Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                  step.number === currentStep
                    ? "bg-primary/10 text-primary"
                    : step.number < currentStep
                    ? "text-muted-foreground"
                    : "text-muted-foreground/50"
                }`}
                onClick={() => setCurrentStep(step.number)}
              >
                {step.number < currentStep ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
                <span className="text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Current Step Content */}
        <Card className="pixel-border lg:col-span-3">
          <CardHeader>
            <CardTitle>Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                This is the content for step {currentStep}. In production, this would contain
                detailed instructions, form fields, and interactive elements specific to this step.
              </p>
              <ul>
                <li>Instruction point 1 for this step</li>
                <li>Instruction point 2 for this step</li>
                <li>Instruction point 3 for this step</li>
              </ul>
            </div>

            {currentStep === 1 && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">💡 Tip</p>
                <p className="text-sm text-muted-foreground">
                  You can auto-fill information from previously scanned documents using OCR
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Auto-fill from OCR
                </Button>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === totalSteps}
              >
                {currentStep === totalSteps ? "Complete" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
