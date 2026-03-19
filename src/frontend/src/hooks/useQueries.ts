import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BookingStatus } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllEvents() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetEvent(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["event", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getEvent(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateBooking() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      eventId,
    }: {
      name: string;
      email: string;
      phone: string;
      eventId: bigint;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createBooking(name, email, phone, eventId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useGetAllBookings() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateEvent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      date: bigint;
      description: string;
      location: string;
      capacity: bigint;
      price: bigint;
      imageUrl: string;
      category: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createEvent(
        data.title,
        data.date,
        data.description,
        data.location,
        data.capacity,
        data.price,
        data.imageUrl,
        data.category,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useUpdateEvent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      date: bigint;
      description: string;
      location: string;
      capacity: bigint;
      price: bigint;
      imageUrl: string;
      category: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateEvent(
        data.id,
        data.title,
        data.date,
        data.description,
        data.location,
        data.capacity,
        data.price,
        data.imageUrl,
        data.category,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useDeleteEvent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteEvent(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useUpdateBookingStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      bookingId,
      newStatus,
    }: {
      bookingId: bigint;
      newStatus: BookingStatus;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateBookingStatus(bookingId, newStatus);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
