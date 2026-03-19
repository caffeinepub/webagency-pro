import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";

export default function AdminPage() {
  const { identity } = useInternetIdentity();

  if (!identity) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
