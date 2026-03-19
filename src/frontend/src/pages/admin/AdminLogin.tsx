import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

export default function AdminLogin() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary flex items-center justify-center font-black text-navy-900 text-2xl mx-auto mb-6 gold-glow">
            R
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider">
            Admin Panel
          </h1>
          <p className="text-muted-foreground mt-2">RH Freelancer Management</p>
        </div>

        <div className="bg-navy-700 border border-navy-600 p-8">
          <div className="w-16 h-16 bg-navy-800 border border-gold flex items-center justify-center mx-auto mb-6">
            <Lock size={28} className="text-gold" />
          </div>
          <h2 className="text-white font-bold text-center uppercase tracking-wider mb-2">
            Secure Login
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-8">
            Sign in with your Internet Identity to access the admin dashboard.
          </p>

          <Button
            data-ocid="admin.primary_button"
            onClick={() => login()}
            disabled={isLoggingIn}
            className="w-full btn-gold border-0 h-12 rounded-none justify-center"
          >
            {isLoggingIn ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Connecting...
              </>
            ) : (
              "LOGIN WITH INTERNET IDENTITY"
            )}
          </Button>

          {isLoggingIn && (
            <p
              data-ocid="admin.loading_state"
              className="text-gold text-xs text-center mt-4 animate-pulse"
            >
              Opening login window...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
