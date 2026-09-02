import React, { useEffect, useMemo, useState } from "react";
import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/Signup";
import ForgotPasswordScreen from "../screens/ForgotPassword";
import VerificationScreen from "../screens/Verification";
import HomeScreen from "../screens/Home";
export const routes = {
  splash: "/splash",
  onboarding: "/onboarding",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  verification: "/verification",
  home: "/home",
};

const AppRoutes = () => {
  const [currentRoute, setCurrentRoute] = useState(routes.splash);
  const [routeParams, setRouteParams] = useState({});

  const navigation = useMemo(
    () => ({
      navigate: (routeName, params = {}) => {
        const nextRoute = routeName.startsWith("/")
          ? routeName
          : `/${routeName.replace("Screen", "").toLowerCase()}`;

        setCurrentRoute(nextRoute);
        setRouteParams(params);
      },
    }),
    [],
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
    case routes.signup:
      return <SignUpScreen navigation={navigation} />;
    case routes.forgotPassword:
      return <ForgotPasswordScreen navigation={navigation} />;
    case routes.verification:
      return (
        <VerificationScreen
          navigation={navigation}
          route={{ params: routeParams }}
        />
      );
    case routes.home:
      return <HomeScreen navigation={navigation} />;
    default:
      return <SignUpScreen navigation={navigation} />;
  }
};

export default AppRoutes;
