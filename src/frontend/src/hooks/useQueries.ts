import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Category,
  ContactFormSubmission,
  PortfolioItem,
  Service,
  SiteSettings,
} from "../backend";
import { useActor } from "./useActor";
export type {
  Category,
  PortfolioItem,
  Service,
  SiteSettings,
  ContactFormSubmission,
};

export function usePortfolioItems() {
  const { actor, isFetching } = useActor();
  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPortfolioItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSiteSettings() {
  const { actor, isFetching } = useActor();
  return useQuery<SiteSettings | null>({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSiteSettings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContactSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactFormSubmission[]>({
    queryKey: ["contactSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContactFormSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(
        data.name,
        data.email,
        data.phone,
        data.subject,
        data.message,
      );
    },
  });
}

export function useCreatePortfolioItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      category: Category;
      imageUrl: string;
      projectUrl: string;
      clientName: string;
      completionYear: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createPortfolioItem(
        data.title,
        data.description,
        data.category,
        data.imageUrl,
        data.projectUrl,
        data.clientName,
        data.completionYear,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["portfolio"] }),
  });
}

export function useUpdatePortfolioItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      description: string;
      category: Category;
      imageUrl: string;
      projectUrl: string;
      clientName: string;
      completionYear: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updatePortfolioItem(
        data.id,
        data.title,
        data.description,
        data.category,
        data.imageUrl,
        data.projectUrl,
        data.clientName,
        data.completionYear,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["portfolio"] }),
  });
}

export function useDeletePortfolioItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deletePortfolioItem(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["portfolio"] }),
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSiteSettings() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (s: SiteSettings) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSiteSettings(
        s.companyName,
        s.tagline,
        s.phone,
        s.email,
        s.address,
        s.whatsappNumber,
        s.facebookUrl,
        s.instagramUrl,
        s.linkedinUrl,
        s.twitterUrl,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["siteSettings"] }),
  });
}
