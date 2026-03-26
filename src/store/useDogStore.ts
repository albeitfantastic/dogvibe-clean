import type { AgeBand, Dog } from '@/src/types/domain';
import { create } from 'zustand';

type DogState = {
  currentDog: Dog | null;
  createDog: (input: { name: string; breed?: string; ageBand?: AgeBand }) => void;
  clearDog: () => void;
};

export const useDogStore = create<DogState>((set) => ({
  currentDog: null,
  createDog: ({ name, breed, ageBand }) =>
    set({
      currentDog: {
        id: crypto.randomUUID(),
        name,
        breed,
        ageBand,
      },
    }),
  clearDog: () => set({ currentDog: null }),
}));