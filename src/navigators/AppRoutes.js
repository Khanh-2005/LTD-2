import React, { useEffect, useMemo, useState } from "react";
import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/Login";

export const routes = {
  splash: "/splash",
  onboarding: "/onboarding",
  login: "/login",
};

const AppRoutes = () => {
  const [currentRoute, setCurrentRoute] = useState(routes.splash);

  const navigation = useMemo(
    () => ({
      navigate: (routeName) => {
        const nextRoute = routeName.startsWith("/")
          ? routeName
          : `/${routeName.replace("Screen", "").toLowerCase()}`;

        setCurrentRoute(nextRoute);
      },
    }),
    []
  );

  useEffect(() => {
    if (currentRoute !== routes.splash) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setCurrentRoute(routes.onboarding);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentRoute]);

  switch (currentRoute) {
    case routes.splash:
      return <SplashScreen />;
    case routes.onboarding:
      return <OnboardingScreen navigation={navigation} />;
    case routes.login:
      return <LoginScreen navigation={navigation} />;
    default:
      return <OnboardingScreen navigation={navigation} />;
  }
};

export default AppRoutes;
