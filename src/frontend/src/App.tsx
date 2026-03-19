import { Toaster } from "@/components/ui/sonner";
import RHFreelancerPage from "./pages/RHFreelancerPage";

export default function App() {
  return (
    <div className="min-h-screen bg-navy-deep text-off-white">
      <RHFreelancerPage />
      <Toaster position="top-right" />
    </div>
  );
}
