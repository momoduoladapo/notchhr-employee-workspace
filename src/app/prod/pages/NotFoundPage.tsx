import { useNavigate } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 text-center">
      <div className="text-[80px] font-bold text-[#440F7C]/10 leading-none select-none mb-4">404</div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Page not found</h1>
      <p className="text-sm text-muted-foreground max-w-xs mb-8">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="flex gap-3">
        <Button variant="ghost" icon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>Go Back</Button>
        <Button variant="primary" icon={<Home size={16} />} onClick={() => navigate("/dashboard")}>Dashboard</Button>
      </div>
    </div>
  );
}
