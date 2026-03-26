export type AgeBand = 'puppy' | 'young' | 'adult' | 'senior';

export type Dog = {
  id: string;
  name: string;
  breed?: string;
  ageBand?: AgeBand;
};

export type EntryMood =
  | 'sleepy'
  | 'chaotic'
  | 'playful'
  | 'cuddly'
  | 'suspicious'
  | 'dramatic'
  | 'regal'
  | 'curious';

export type Entry = {
  id: string;
  dogId: string;
  entryDate: string;
  photoUrl: string;
  nickname: string;
  mood: EntryMood;
  aiState: string;
  createdAt: string;
};