import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactFormSubmission {
    id: bigint;
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface SiteSettings {
    tagline: string;
    twitterUrl: string;
    instagramUrl: string;
    email: string;
    whatsappNumber: string;
    address: string;
    companyName: string;
    phone: string;
    facebookUrl: string;
    linkedinUrl: string;
}
export type Time = bigint;
export interface PortfolioItem {
    id: bigint;
    title: string;
    completionYear: bigint;
    clientName: string;
    description: string;
    imageUrl: string;
    category: Category;
    projectUrl: string;
}
export interface Service {
    id: bigint;
    title: string;
    features: Array<string>;
    displayOrder: bigint;
    description: string;
    iconName: string;
}
export enum Category {
    seo = "seo",
    web_design = "web_design",
    web_development = "web_development",
    ecommerce = "ecommerce"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPortfolioItem(title: string, description: string, category: Category, imageUrl: string, projectUrl: string, clientName: string, completionYear: bigint): Promise<void>;
    createService(title: string, description: string, features: Array<string>, iconName: string, displayOrder: bigint): Promise<void>;
    deletePortfolioItem(id: bigint): Promise<void>;
    deleteService(id: bigint): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getContactFormSubmissions(): Promise<Array<ContactFormSubmission>>;
    getPortfolioItems(): Promise<Array<PortfolioItem>>;
    getServices(): Promise<Array<Service>>;
    getSiteSettings(): Promise<SiteSettings | null>;
    isCallerAdmin(): Promise<boolean>;
    submitContactForm(name: string, email: string, phone: string, subject: string, message: string): Promise<void>;
    updatePortfolioItem(id: bigint, title: string, description: string, category: Category, imageUrl: string, projectUrl: string, clientName: string, completionYear: bigint): Promise<void>;
    updateService(id: bigint, title: string, description: string, features: Array<string>, iconName: string, displayOrder: bigint): Promise<void>;
    updateSiteSettings(companyName: string, tagline: string, phone: string, email: string, address: string, whatsappNumber: string, facebookUrl: string, instagramUrl: string, linkedinUrl: string, twitterUrl: string): Promise<void>;
}
