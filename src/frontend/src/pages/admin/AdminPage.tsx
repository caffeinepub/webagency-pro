import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar, Loader2, LogIn, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import { useIsCallerAdmin } from "../../hooks/useQueries";
import AdminDashboard from "./AdminDashboard";

export default function AdminPage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const isLoggingIn = loginStatus === "logging-in";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-navy-900 border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-primary/20 flex items-center justify-center border border-primary/40">
            <Calendar className="w-3.5 h-3.5 text-gold" />
          </div>
          <div>
            <span className="text-gold font-black uppercase tracking-widest text-sm">
              AURA
            </span>
            <span className="text-foreground/60 text-xs ml-1 uppercase tracking-wider">
              Admin
            </span>
          </div>
        </div>
        {isAuthenticated && (
          <Button
            onClick={handleAuth}
            variant="outline"
            className="border-border text-muted-foreground hover:text-destructive hover:border-destructive text-xs uppercase tracking-wider"
            data-ocid="admin.secondary_button"
          >
            Logout
          </Button>
        )}
      </header>

      {/* Content */}
      {!isAuthenticated ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-65px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md px-4"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-gold/30 flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-gold" />
            </div>
            <h1 className="text-2xl font-black uppercase text-gold tracking-wider mb-2">
              Admin Panel
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              Log in with Internet Identity to manage events and bookings.
            </p>
            <Button
              onClick={handleAuth}
              disabled={isLoggingIn}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm px-10 py-5 hover:opacity-90"
              data-ocid="admin.primary_button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging
                  in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" /> Login with Internet
                  Identity
                </>
              )}
            </Button>
          </motion.div>
        </div>
      ) : adminLoading ? (
        <div
          className="flex items-center justify-center min-h-[calc(100vh-65px)]"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : !isAdmin ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-65px)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md px-4"
            data-ocid="admin.error_state"
          >
            <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">
              Access Denied
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              You do not have admin privileges to access this panel.
            </p>
            <Button
              onClick={handleAuth}
              variant="outline"
              className="border-border text-muted-foreground"
              data-ocid="admin.secondary_button"
            >
              Logout
            </Button>
          </motion.div>
        </div>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}
