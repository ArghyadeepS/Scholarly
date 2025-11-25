import { Button } from "@/components/ui/button";
import { MinecraftHeading } from "@/components/MinecraftHeading";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="space-y-6">
      <div>
        <MinecraftHeading className="text-2xl md:text-3xl mb-2">
          Settings
        </MinecraftHeading>
        <p className="text-muted-foreground">
          Manage your account
        </p>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="destructive"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Settings;
