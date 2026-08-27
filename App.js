import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import SplashScreen from "./src/screens/SplashScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      {isShowSplash ? <SplashScreen /> : <OnboardingScreen />}
    </>
  );
}
