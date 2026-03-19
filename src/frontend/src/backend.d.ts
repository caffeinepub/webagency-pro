import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Event {
    id: bigint;
    title: string;
    date: Time;
    description: string;
    imageUrl: string;
    category: string;
    capacity: bigint;
    price: bigint;
    location: string;
}
export interface Booking {
    id: bigint;
    status: BookingStatus;
    eventId: bigint;
    name: string;
    email: string;
    timestamp: Time;
    phone: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBooking(name: string, email: string, phone: string, eventId: bigint): Promise<bigint>;
    createEvent(title: string, date: Time, description: string, location: string, capacity: bigint, price: bigint, imageUrl: string, category: string): Promise<void>;
    deleteBooking(bookingId: bigint): Promise<void>;
    deleteEvent(id: bigint): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllEvents(): Promise<Array<Event>>;
    getBookingsByEvent(eventId: bigint): Promise<Array<Booking>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getEvent(id: bigint): Promise<Event | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBookingStatus(bookingId: bigint, newStatus: BookingStatus): Promise<void>;
    updateEvent(id: bigint, title: string, date: Time, description: string, location: string, capacity: bigint, price: bigint, imageUrl: string, category: string): Promise<void>;
}
