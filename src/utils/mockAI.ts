export type AIResult = {
  nickname: string;
  mood: string;
};

export const loadingMessages = [
  "Reading aura...",
  "Analyzing floof density...",
  "Consulting ancient dog spirits...",
  "Measuring zoomie potential...",
  "Scanning snack energy...",
];

const nicknames = [
  "Captain Floof",
  "Sir Wiggles",
  "Snack Inspector",
  "Zoomie Master",
  "Puddle King",
];

const moods = [
  "Chaotic Good",
  "Sleepy",
  "Judging You",
  "Hungry",
  "Zooming",
];

export async function mockAnalyze(): Promise<AIResult> {
  const delay = 1500 + Math.floor(Math.random() * 1000);

  await new Promise((res) => setTimeout(res, delay));

  return {
    nickname: nicknames[Math.floor(Math.random() * nicknames.length)],
    mood: moods[Math.floor(Math.random() * moods.length)],
  };
}