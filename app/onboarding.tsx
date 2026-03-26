import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function OnboardingScreen() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dog/new");
  }, [router]);

  return null;
}