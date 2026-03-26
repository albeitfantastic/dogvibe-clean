import { create } from "zustand";

type Draft = {
  imageUri?: string;
  nickname?: string;
  mood?: string;
};

type State = {
  draft: Draft | null;
  setDraft: (draft: Draft) => void;
  clearDraft: () => void;
};

export const useEntryDraftStore = create<State>((set) => ({
  draft: null,
  setDraft: (draft) => set({ draft }),
  clearDraft: () => set({ draft: null }),
}));