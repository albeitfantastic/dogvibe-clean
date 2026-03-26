import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Dog = {
  id: string;
  name: string;
  breed?: string;
  ageBand?: string;
};

type CreateDogInput = {
  name: string;
  breed?: string;
  ageBand?: string;
};

type UpdateDogInput = {
  name: string;
  breed?: string;
  ageBand?: string;
};

type DogState = {
  dogs: Dog[];
  currentDogId: string | null;
  hasPremium: boolean;
  addDog: (input: CreateDogInput) => void;
  updateCurrentDog: (input: UpdateDogInput) => void;
  setCurrentDog: (dogId: string) => void;
  clearDogs: () => void;
  enablePremium: () => void;
  getCurrentDog: () => Dog | null;
};

export const useDogStore = create<DogState>()(
  persist(
    (set, get) => ({
      dogs: [],
      currentDogId: null,
      hasPremium: false,

      addDog: (input) => {
        const newDog: Dog = {
          id: uuidv4(),
          name: input.name,
          breed: input.breed,
          ageBand: input.ageBand,
        };

        set((state) => ({
          dogs: [...state.dogs, newDog],
          currentDogId: newDog.id,
        }));
      },

      updateCurrentDog: (input) =>
        set((state) => ({
          dogs: state.dogs.map((dog) =>
            dog.id === state.currentDogId
              ? {
                  ...dog,
                  name: input.name,
                  breed: input.breed,
                  ageBand: input.ageBand,
                }
              : dog
          ),
        })),

      setCurrentDog: (dogId) => set({ currentDogId: dogId }),

      clearDogs: () =>
        set({
          dogs: [],
          currentDogId: null,
        }),

      enablePremium: () => set({ hasPremium: true }),

      getCurrentDog: () => {
        const { dogs, currentDogId } = get();
        return dogs.find((dog) => dog.id === currentDogId) ?? null;
      },
    }),
    {
      name: "dogvibe-dogs",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);