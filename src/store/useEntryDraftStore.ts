import { create } from 'zustand';

type EntryDraftState = {
  draftImageUri: string | null;
  setDraftImageUri: (uri: string | null) => void;
  resetDraft: () => void;
};

export const useEntryDraftStore = create<EntryDraftState>((set) => ({
  draftImageUri: null,
  setDraftImageUri: (uri) => set({ draftImageUri: uri }),
  resetDraft: () => set({ draftImageUri: null }),
}));