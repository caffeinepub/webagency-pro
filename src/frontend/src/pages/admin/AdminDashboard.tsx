import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Category } from "../../backend";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import {
  type SiteSettings,
  useContactSubmissions,
  useCreatePortfolioItem,
  useDeletePortfolioItem,
  usePortfolioItems,
  useServices,
  useSiteSettings,
  useUpdateSiteSettings,
} from "../../hooks/useQueries";

const statKeys = ["messages", "portfolio", "services", "status"] as const;

export default function AdminDashboard() {
  const { identity, clear } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString() ?? "";

  const { data: messages = [], isLoading: msgLoading } =
    useContactSubmissions();
  const { data: portfolio = [], isLoading: portLoading } = usePortfolioItems();
  const { data: services = [] } = useServices();
  const { data: settings } = useSiteSettings();

  const createPortfolio = useCreatePortfolioItem();
  const deletePortfolio = useDeletePortfolioItem();
  const updateSettings = useUpdateSiteSettings();

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: Category.web_design as Category,
    imageUrl: "",
    projectUrl: "",
    clientName: "",
    completionYear: new Date().getFullYear().toString(),
  });
  const [addOpen, setAddOpen] = useState(false);

  const [settingsForm, setSettingsForm] = useState<SiteSettings>({
    companyName: settings?.companyName ?? "RH Freelancer",
    tagline: settings?.tagline ?? "Building Premium Digital Experiences",
    phone: settings?.phone ?? "+1 (555) 123-4567",
    email: settings?.email ?? "hello@webagencypro.com",
    address: settings?.address ?? "123 Digital Ave, New York, NY",
    whatsappNumber: settings?.whatsappNumber ?? "1234567890",
    facebookUrl:
      settings?.facebookUrl ??
      "https://www.facebook.com/profile.php?id=61576658279275",
    instagramUrl: settings?.instagramUrl ?? "https://instagram.com",
    linkedinUrl: settings?.linkedinUrl ?? "https://linkedin.com",
    twitterUrl: settings?.twitterUrl ?? "https://x.com",
  });

  const handleCreatePortfolio = async () => {
    if (!newItem.title || !newItem.clientName) {
      toast.error("Title and client name are required.");
      return;
    }
    try {
      await createPortfolio.mutateAsync({
        ...newItem,
        completionYear: BigInt(
          Number.parseInt(newItem.completionYear) || new Date().getFullYear(),
        ),
      });
      toast.success("Portfolio item created!");
      setAddOpen(false);
      setNewItem({
        title: "",
        description: "",
        category: Category.web_design,
        imageUrl: "",
        projectUrl: "",
        clientName: "",
        completionYear: new Date().getFullYear().toString(),
      });
    } catch {
      toast.error("Failed to create item.");
    }
  };

  const handleDeletePortfolio = async (id: bigint) => {
    if (!confirm("Delete this portfolio item?")) return;
    try {
      await deletePortfolio.mutateAsync(id);
      toast.success("Deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  const handleSaveSettings = async () => {
    try {
      await updateSettings.mutateAsync(settingsForm);
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings.");
    }
  };

  const inputClass =
    "bg-navy-800 border-navy-600 text-white placeholder:text-muted-foreground focus:border-gold rounded-none h-10 text-sm";

  const statsData = [
    { key: statKeys[0], label: "Messages", value: messages.length, icon: Mail },
    {
      key: statKeys[1],
      label: "Portfolio Items",
      value: portfolio.length,
      icon: Briefcase,
    },
    {
      key: statKeys[2],
      label: "Services",
      value: services.length,
      icon: LayoutDashboard,
    },
    { key: statKeys[3], label: "Status", value: "Active", icon: Settings },
  ];

  const settingsFields: [string, string, keyof SiteSettings][] = [
    ["company-name", "Company Name", "companyName"],
    ["tagline", "Tagline", "tagline"],
    ["phone", "Phone", "phone"],
    ["email", "Email", "email"],
    ["whatsapp", "WhatsApp Number", "whatsappNumber"],
    ["facebook", "Facebook URL", "facebookUrl"],
    ["instagram", "Instagram URL", "instagramUrl"],
    ["linkedin", "LinkedIn URL", "linkedinUrl"],
    ["twitter", "Twitter/X URL", "twitterUrl"],
  ];

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Admin Header */}
      <header className="bg-navy-800 border-b border-navy-600 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary flex items-center justify-center font-black text-navy-900 text-base">
              W
            </div>
            <span className="text-white font-bold text-sm uppercase tracking-wider">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-xs hidden sm:block truncate max-w-[200px]">
              {principal.slice(0, 20)}...
            </span>
            <Button
              data-ocid="admin.primary_button"
              onClick={() => clear()}
              variant="outline"
              size="sm"
              className="border-navy-600 text-muted-foreground hover:border-gold hover:text-gold rounded-none"
            >
              <LogOut size={14} className="mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                data-ocid={`admin.stats.item.${stat.key}`}
                className="bg-navy-700 border border-navy-600 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-black text-white mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <Icon size={20} className="text-gold" />
                </div>
              </div>
            );
          })}
        </div>

        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList
            data-ocid="admin.tab"
            className="bg-navy-700 border border-navy-600 rounded-none p-0 h-auto"
          >
            {[
              { value: "messages", label: "Messages", icon: Mail },
              { value: "portfolio", label: "Portfolio", icon: Briefcase },
              { value: "settings", label: "Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  data-ocid="admin.tab"
                  className="rounded-none px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground text-xs uppercase tracking-wider font-bold flex items-center gap-2"
                >
                  <Icon size={14} /> {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="bg-navy-700 border border-navy-600">
              <div className="p-5 border-b border-navy-600 flex items-center justify-between">
                <h2 className="text-white font-bold uppercase tracking-wider">
                  Contact Submissions
                </h2>
                <Badge className="bg-primary text-primary-foreground rounded-none">
                  {messages.length}
                </Badge>
              </div>
              {msgLoading ? (
                <div
                  data-ocid="admin.loading_state"
                  className="p-8 text-center"
                >
                  <Loader2
                    size={24}
                    className="animate-spin text-gold mx-auto"
                  />
                </div>
              ) : messages.length === 0 ? (
                <div
                  data-ocid="admin.empty_state"
                  className="p-8 text-center text-muted-foreground"
                >
                  No messages yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-navy-600 hover:bg-transparent">
                        <TableHead className="text-gold text-xs uppercase tracking-wider">
                          Name
                        </TableHead>
                        <TableHead className="text-gold text-xs uppercase tracking-wider">
                          Email
                        </TableHead>
                        <TableHead className="text-gold text-xs uppercase tracking-wider">
                          Subject
                        </TableHead>
                        <TableHead className="text-gold text-xs uppercase tracking-wider">
                          Message
                        </TableHead>
                        <TableHead className="text-gold text-xs uppercase tracking-wider">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messages.map((msg, i) => (
                        <TableRow
                          key={String(msg.id)}
                          data-ocid={`admin.messages.item.${i + 1}`}
                          className="border-navy-600 hover:bg-navy-800"
                        >
                          <TableCell className="text-white text-sm">
                            {msg.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {msg.email}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {msg.subject}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm max-w-xs">
                            <span className="line-clamp-1">{msg.message}</span>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {new Date(
                              Number(msg.timestamp) / 1_000_000,
                            ).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio">
            <div className="bg-navy-700 border border-navy-600">
              <div className="p-5 border-b border-navy-600 flex items-center justify-between">
                <h2 className="text-white font-bold uppercase tracking-wider">
                  Portfolio Items
                </h2>
                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                  <DialogTrigger asChild>
                    <Button
                      data-ocid="portfolio.open_modal_button"
                      className="btn-gold border-0 rounded-none h-9 text-xs"
                    >
                      <Plus size={14} className="mr-1" /> Add Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-navy-800 border-navy-600 rounded-none max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-white font-bold uppercase tracking-wider">
                        Add Portfolio Item
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 mt-4">
                      <Input
                        data-ocid="portfolio.input"
                        placeholder="Title *"
                        value={newItem.title}
                        onChange={(e) =>
                          setNewItem((p) => ({ ...p, title: e.target.value }))
                        }
                        className={inputClass}
                      />
                      <Input
                        data-ocid="portfolio.input"
                        placeholder="Client Name *"
                        value={newItem.clientName}
                        onChange={(e) =>
                          setNewItem((p) => ({
                            ...p,
                            clientName: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                      <Textarea
                        data-ocid="portfolio.textarea"
                        placeholder="Description"
                        value={newItem.description}
                        onChange={(e) =>
                          setNewItem((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        }
                        className={`${inputClass} h-20 resize-none`}
                      />
                      <Input
                        data-ocid="portfolio.input"
                        placeholder="Image URL"
                        value={newItem.imageUrl}
                        onChange={(e) =>
                          setNewItem((p) => ({
                            ...p,
                            imageUrl: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                      <Input
                        data-ocid="portfolio.input"
                        placeholder="Project URL"
                        value={newItem.projectUrl}
                        onChange={(e) =>
                          setNewItem((p) => ({
                            ...p,
                            projectUrl: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                      <Input
                        data-ocid="portfolio.input"
                        placeholder="Completion Year"
                        value={newItem.completionYear}
                        onChange={(e) =>
                          setNewItem((p) => ({
                            ...p,
                            completionYear: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                      <Select
                        value={newItem.category}
                        onValueChange={(v) =>
                          setNewItem((p) => ({ ...p, category: v as Category }))
                        }
                      >
                        <SelectTrigger
                          data-ocid="portfolio.select"
                          className={`${inputClass} w-full`}
                        >
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-navy-800 border-navy-600">
                          <SelectItem
                            value={Category.web_design}
                            className="text-white"
                          >
                            Web Design
                          </SelectItem>
                          <SelectItem
                            value={Category.web_development}
                            className="text-white"
                          >
                            Web Development
                          </SelectItem>
                          <SelectItem
                            value={Category.ecommerce}
                            className="text-white"
                          >
                            E-Commerce
                          </SelectItem>
                          <SelectItem
                            value={Category.seo}
                            className="text-white"
                          >
                            SEO
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-3 pt-2">
                        <Button
                          data-ocid="portfolio.confirm_button"
                          onClick={handleCreatePortfolio}
                          disabled={createPortfolio.isPending}
                          className="flex-1 btn-gold border-0 rounded-none h-10"
                        >
                          {createPortfolio.isPending ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            "Create Item"
                          )}
                        </Button>
                        <Button
                          data-ocid="portfolio.cancel_button"
                          variant="outline"
                          onClick={() => setAddOpen(false)}
                          className="border-navy-600 text-muted-foreground rounded-none h-10"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {portLoading ? (
                <div
                  data-ocid="admin.loading_state"
                  className="p-8 text-center"
                >
                  <Loader2
                    size={24}
                    className="animate-spin text-gold mx-auto"
                  />
                </div>
              ) : portfolio.length === 0 ? (
                <div
                  data-ocid="portfolio.empty_state"
                  className="p-8 text-center text-muted-foreground"
                >
                  No portfolio items yet. Add your first project!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-navy-600 hover:bg-transparent">
                        <TableHead className="text-gold text-xs uppercase tracking-wider">
                          Title
                        </TableHead>
                        <TableHead className="text-gold text-xs uppercase tracking-wider">
                          Client
                        </TableHead>
                        <TableHead className="text-gold text-xs uppercase tracking-wider">
                          Category
                        </TableHead>
                        <TableHead className="text-gold text-xs uppercase tracking-wider">
                          Year
                        </TableHead>
                        <TableHead className="text-gold text-xs uppercase tracking-wider">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {portfolio.map((item, i) => (
                        <TableRow
                          key={String(item.id)}
                          data-ocid={`portfolio.item.${i + 1}`}
                          className="border-navy-600 hover:bg-navy-800"
                        >
                          <TableCell className="text-white text-sm font-medium">
                            {item.title}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {item.clientName}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-primary/20 text-gold border border-gold/30 rounded-none text-xs">
                              {item.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {String(item.completionYear)}
                          </TableCell>
                          <TableCell>
                            <Button
                              data-ocid={`portfolio.delete_button.${i + 1}`}
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePortfolio(item.id)}
                              className="text-destructive hover:text-destructive h-8 px-2"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="bg-navy-700 border border-navy-600 p-6">
              <h2 className="text-white font-bold uppercase tracking-wider mb-6 border-b border-navy-600 pb-4">
                Site Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {settingsFields.map(([id, label, key]) => (
                  <div key={key}>
                    <label
                      htmlFor={id}
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block"
                    >
                      {label}
                    </label>
                    <Input
                      id={id}
                      data-ocid="settings.input"
                      value={settingsForm[key]}
                      onChange={(e) =>
                        setSettingsForm((p) => ({
                          ...p,
                          [key]: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label
                    htmlFor="settings-address"
                    className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block"
                  >
                    Address
                  </label>
                  <Textarea
                    id="settings-address"
                    data-ocid="settings.textarea"
                    value={settingsForm.address}
                    onChange={(e) =>
                      setSettingsForm((p) => ({
                        ...p,
                        address: e.target.value,
                      }))
                    }
                    className={`${inputClass} h-20 resize-none`}
                  />
                </div>
              </div>
              <Button
                data-ocid="settings.save_button"
                onClick={handleSaveSettings}
                disabled={updateSettings.isPending}
                className="mt-6 btn-gold border-0 rounded-none h-11"
              >
                {updateSettings.isPending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Saving...
                  </>
                ) : (
                  "SAVE SETTINGS"
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
