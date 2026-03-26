import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Entry = {
  id: string;
  dogId: string;
  imageUri: string;
  nickname: string;
  mood: string;
  createdAt: number;
};

type NewEntry = {
  dogId: string;
  imageUri: string;
  nickname: string;
  mood: string;
};

type EntryState = {
  entries: Entry[];
  addEntry: (entry: NewEntry) => void;
  deleteEntry: (entryId: string) => void;
  clearEntries: () => void;
  getCurrentStreak: (dogId?: string | null) => number;
};

const getDayKey = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getYesterdayKey = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return getDayKey(date.getTime());
};

const getTodayKey = () => getDayKey(Date.now());

export const useEntryStore = create<EntryState>()(
  persist(
    (set, get) => ({
      entries: [],

      addEntry: (entry) =>
        set((state) => ({
          entries: [
            {
              id: uuidv4(),
              dogId: entry.dogId,
              imageUri: entry.imageUri,
              nickname: entry.nickname,
              mood: entry.mood,
              createdAt: Date.now(),
            },
            ...state.entries,
          ],
        })),

      deleteEntry: (entryId) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== entryId),
        })),

      clearEntries: () => set({ entries: [] }),

      getCurrentStreak: (dogId) => {
        const filteredEntries = dogId
          ? get().entries.filter((entry) => entry.dogId === dogId)
          : get().entries;

        if (filteredEntries.length === 0) {
          return 0;
        }

        const uniqueDays = Array.from(
          new Set(filteredEntries.map((entry) => getDayKey(entry.createdAt)))
        ).sort((a, b) => (a > b ? -1 : 1));

        const todayKey = getTodayKey();
        const yesterdayKey = getYesterdayKey();

        if (uniqueDays[0] !== todayKey && uniqueDays[0] !== yesterdayKey) {
          return 0;
        }

        let streak = 1;

        for (let i = 1; i < uniqueDays.length; i++) {
          const previous = new Date(uniqueDays[i - 1]);
          const current = uniqueDays[i];

          previous.setDate(previous.getDate() - 1);

          if (getDayKey(previous.getTime()) !== current) {
            break;
          }

          streak += 1;
        }

        return streak;
      },
    }),
    {
      name: "dogvibe-entries",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);