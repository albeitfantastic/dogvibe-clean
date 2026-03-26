export function getMoodEmoji(mood: string) {
    const normalized = mood.toLowerCase();
  
    if (normalized.includes("chaotic")) return "⚡";
    if (normalized.includes("sleepy")) return "😴";
    if (normalized.includes("hungry")) return "🍗";
    if (normalized.includes("judging")) return "🧐";
    if (normalized.includes("zoom")) return "💨";
  
    return "🐶";
  }