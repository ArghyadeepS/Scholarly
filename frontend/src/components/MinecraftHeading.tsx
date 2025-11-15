import { cn } from "@/lib/utils";

interface MinecraftHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const MinecraftHeading = ({ children, className }: MinecraftHeadingProps) => {
  return (
    <h1 className={cn("font-minecraft", className)}>
      {children}
    </h1>
  );
};
