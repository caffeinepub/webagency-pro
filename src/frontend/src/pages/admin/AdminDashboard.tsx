import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
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
  BarChart3,
  Calendar,
  Edit2,
  Loader2,
  Plus,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { BookingStatus } from "../../backend.d";
import type { Event } from "../../backend.d";
import {
  useCreateEvent,
  useDeleteEvent,
  useGetAllBookings,
  useGetAllEvents,
  useUpdateBookingStatus,
  useUpdateEvent,
} from "../../hooks/useQueries";

interface EventFormData {
  title: string;
  date: string;
  description: string;
  location: string;
  capacity: string;
  price: string;
  imageUrl: string;
  category: string;
}

const EMPTY_FORM: EventFormData = {
  title: "",
  date: "",
  description: "",
  location: "",
  capacity: "",
  price: "",
  imageUrl: "",
  category: "",
};

export default function AdminDashboard() {
  const { data: events = [], isLoading: eventsLoading } = useGetAllEvents();
  const { data: bookings = [], isLoading: bookingsLoading } =
    useGetAllBookings();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const updateBookingStatus = useUpdateBookingStatus();

  const [showEventDialog, setShowEventDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [form, setForm] = useState<EventFormData>(EMPTY_FORM);

  const openCreate = () => {
    setEditingEvent(null);
    setForm(EMPTY_FORM);
    setShowEventDialog(true);
  };

  const openEdit = (event: Event) => {
    setEditingEvent(event);
    const dateMs = Number(event.date / 1000000n);
    const dateStr = new Date(dateMs).toISOString().slice(0, 16);
    setForm({
      title: event.title,
      date: dateStr,
      description: event.description,
      location: event.location,
      capacity: event.capacity.toString(),
      price: event.price.toString(),
      imageUrl: event.imageUrl,
      category: event.category,
    });
    setShowEventDialog(true);
  };

  const handleSaveEvent = async () => {
    if (!form.title || !form.date || !form.location) {
      toast.error("Please fill in required fields.");
      return;
    }
    const dateMs = new Date(form.date).getTime();
    const dateBigInt = BigInt(dateMs) * 1000000n;
    try {
      if (editingEvent) {
        await updateEvent.mutateAsync({
          id: editingEvent.id,
          title: form.title,
          date: dateBigInt,
          description: form.description,
          location: form.location,
          capacity: BigInt(form.capacity || 0),
          price: BigInt(form.price || 0),
          imageUrl: form.imageUrl,
          category: form.category,
        });
        toast.success("Event updated successfully!");
      } else {
        await createEvent.mutateAsync({
          title: form.title,
          date: dateBigInt,
          description: form.description,
          location: form.location,
          capacity: BigInt(form.capacity || 0),
          price: BigInt(form.price || 0),
          imageUrl: form.imageUrl,
          category: form.category,
        });
        toast.success("Event created successfully!");
      }
      setShowEventDialog(false);
    } catch {
      toast.error("Failed to save event.");
    }
  };

  const handleDeleteEvent = async (id: bigint) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent.mutateAsync(id);
      toast.success("Event deleted.");
    } catch {
      toast.error("Failed to delete event.");
    }
  };

  const handleStatusChange = async (
    bookingId: bigint,
    newStatus: BookingStatus,
  ) => {
    try {
      await updateBookingStatus.mutateAsync({ bookingId, newStatus });
      toast.success("Status updated.");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const statusColor = (status: BookingStatus) => {
    if (status === BookingStatus.confirmed)
      return "bg-green-500/20 text-green-400 border-green-500/30";
    if (status === BookingStatus.cancelled)
      return "bg-red-500/20 text-red-400 border-red-500/30";
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  };

  const pendingCount = bookings.filter(
    (b) => b.status === BookingStatus.pending,
  ).length;
  const confirmedCount = bookings.filter(
    (b) => b.status === BookingStatus.confirmed,
  ).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        data-ocid="admin.section"
      >
        {[
          {
            icon: Calendar,
            label: "Total Events",
            value: events.length,
            color: "text-gold",
          },
          {
            icon: Users,
            label: "Total Bookings",
            value: bookings.length,
            color: "text-blue-400",
          },
          {
            icon: TrendingUp,
            label: "Confirmed",
            value: confirmedCount,
            color: "text-green-400",
          },
          {
            icon: BarChart3,
            label: "Pending",
            value: pendingCount,
            color: "text-yellow-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-lg p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-muted-foreground text-xs uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
            <div className={`text-3xl font-black ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="events">
        <TabsList
          className="bg-card border border-border mb-6"
          data-ocid="admin.tab"
        >
          <TabsTrigger
            value="events"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground uppercase tracking-wider text-xs font-bold"
            data-ocid="admin.tab"
          >
            Events
          </TabsTrigger>
          <TabsTrigger
            value="bookings"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground uppercase tracking-wider text-xs font-bold"
            data-ocid="admin.tab"
          >
            Bookings
          </TabsTrigger>
        </TabsList>

        {/* Events Tab */}
        <TabsContent value="events">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-foreground font-bold text-lg uppercase tracking-wider">
              Manage Events
            </h2>
            <Button
              onClick={openCreate}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs"
              data-ocid="admin.primary_button"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Event
            </Button>
          </div>

          {eventsLoading ? (
            <div className="space-y-3" data-ocid="admin.loading_state">
              {["s1", "s2", "s3", "s4"].map((sk) => (
                <Skeleton key={sk} className="h-16 w-full" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div
              className="text-center py-16 border border-dashed border-border rounded-lg"
              data-ocid="admin.empty_state"
            >
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                No events yet. Create your first event!
              </p>
            </div>
          ) : (
            <div
              className="bg-card border border-border rounded-lg overflow-hidden"
              data-ocid="admin.table"
            >
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      Title
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      Category
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      Date
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      Location
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      Price
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      Capacity
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event, i) => (
                    <TableRow
                      key={event.id.toString()}
                      className="border-border"
                      data-ocid={`admin.row.${i + 1}`}
                    >
                      <TableCell className="font-medium text-foreground">
                        {event.title}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                          {event.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(
                          Number(event.date / 1000000n),
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {event.location}
                      </TableCell>
                      <TableCell className="text-gold font-bold">
                        ${Number(event.price)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {Number(event.capacity)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEdit(event)}
                            className="border-border hover:border-gold hover:text-gold h-8 w-8 p-0"
                            data-ocid={`admin.edit_button.${i + 1}`}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteEvent(event.id)}
                            className="border-border hover:border-destructive hover:text-destructive h-8 w-8 p-0"
                            data-ocid={`admin.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-foreground font-bold text-lg uppercase tracking-wider">
              All Bookings
            </h2>
          </div>

          {bookingsLoading ? (
            <div className="space-y-3" data-ocid="admin.loading_state">
              {["s1", "s2", "s3", "s4"].map((sk) => (
                <Skeleton key={sk} className="h-16 w-full" />
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <div
              className="text-center py-16 border border-dashed border-border rounded-lg"
              data-ocid="admin.empty_state"
            >
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No bookings yet.</p>
            </div>
          ) : (
            <div
              className="bg-card border border-border rounded-lg overflow-hidden"
              data-ocid="admin.table"
            >
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      ID
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      Name
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      Email
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      Phone
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      Event
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      Date
                    </TableHead>
                    <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking, i) => {
                    const event = events.find((e) => e.id === booking.eventId);
                    return (
                      <TableRow
                        key={booking.id.toString()}
                        className="border-border"
                        data-ocid={`admin.row.${i + 1}`}
                      >
                        <TableCell className="text-muted-foreground text-xs">
                          #{booking.id.toString().padStart(4, "0")}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          {booking.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {booking.email}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {booking.phone}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {event?.title ?? `Event #${booking.eventId}`}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {new Date(
                            Number(booking.timestamp / 1000000n),
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={booking.status}
                            onValueChange={(v) =>
                              handleStatusChange(booking.id, v as BookingStatus)
                            }
                          >
                            <SelectTrigger
                              className={`h-7 w-32 text-xs font-bold uppercase border ${statusColor(booking.status)} bg-transparent`}
                              data-ocid={`admin.select.${i + 1}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border">
                              <SelectItem value={BookingStatus.pending}>
                                Pending
                              </SelectItem>
                              <SelectItem value={BookingStatus.confirmed}>
                                Confirmed
                              </SelectItem>
                              <SelectItem value={BookingStatus.cancelled}>
                                Cancelled
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Event Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent
          className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground font-bold uppercase tracking-wider">
              {editingEvent ? "Edit Event" : "Add New Event"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <div className="sm:col-span-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-1.5 block">
                Title *
              </Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Event title"
                className="bg-navy-800 border-border focus:border-gold"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-1.5 block">
                Date & Time *
              </Label>
              <Input
                type="datetime-local"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="bg-navy-800 border-border focus:border-gold"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-1.5 block">
                Category
              </Label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Corporate, Music, etc."
                className="bg-navy-800 border-border focus:border-gold"
                data-ocid="admin.input"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-1.5 block">
                Location *
              </Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Venue, City"
                className="bg-navy-800 border-border focus:border-gold"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-1.5 block">
                Price ($)
              </Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="100"
                className="bg-navy-800 border-border focus:border-gold"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-1.5 block">
                Capacity
              </Label>
              <Input
                type="number"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                placeholder="200"
                className="bg-navy-800 border-border focus:border-gold"
                data-ocid="admin.input"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-1.5 block">
                Image URL
              </Label>
              <Input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://picsum.photos/seed/event/400/250"
                className="bg-navy-800 border-border focus:border-gold"
                data-ocid="admin.input"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-1.5 block">
                Description
              </Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe the event..."
                rows={3}
                className="bg-navy-800 border-border focus:border-gold resize-none"
                data-ocid="admin.textarea"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEventDialog(false)}
              className="border-border text-muted-foreground"
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEvent}
              disabled={createEvent.isPending || updateEvent.isPending}
              className="bg-primary text-primary-foreground font-bold uppercase tracking-wider text-xs"
              data-ocid="admin.save_button"
            >
              {createEvent.isPending || updateEvent.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : editingEvent ? (
                "Save Changes"
              ) : (
                "Create Event"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
