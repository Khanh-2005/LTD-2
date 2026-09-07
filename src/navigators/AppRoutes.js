import React, { useEffect, useMemo, useState } from "react";
import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignupScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import VerificationScreen from "../screens/VerificationScreen";
import HomeScreen from "../screens/HomeScreen";
import MenuScreen from "../screens/MenuScreen";
import EventDetail from "../screens/EventDetailScreen";
import AllEvent from "../screens/AllEventScreen";
import EventPage from "../screens/EventPageScreen";
export const routes = {
  splash: "/splash",
  onboarding: "/onboarding",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  verification: "/verification",
  home: "/home",
  menu: "/menu",
  eventDetail: "/event-detail",
  allEvent: "/all-event",
  eventPage: "/event-page",
};

const AppRoutes = () => {
  const [currentRoute, setCurrentRoute] = useState(routes.splash);
  const [routeParams, setRouteParams] = useState({});
  const [savedEvents, setSavedEvents] = useState({});

  const toggleBookmark = (id, event) => {
    setSavedEvents((current) => {
      if (current[id]) {
        const next = { ...current };
        delete next[id];
        return next;
      }

      return { ...current, [id]: event || { id } };
    });
  };

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
      return (
        <HomeScreen
          navigation={navigation}
          onOpenDrawer={() => navigation.navigate(routes.menu)}
          onEventPress={(event) =>
            navigation.navigate(routes.eventDetail, { event })
          }
          onSeeAll={() => navigation.navigate(routes.allEvent)}
          onOpenEvents={() => navigation.navigate(routes.eventPage)}
          savedEvents={savedEvents}
          onToggleBookmark={(id, event) => toggleBookmark(id, event)}
        />
      );
    case routes.allEvent:
      return (
        <AllEvent
          navigation={navigation}
          savedEvents={savedEvents}
          onToggleBookmark={toggleBookmark}
        />
      );
    case routes.eventDetail:
      return (
        <EventDetail navigation={navigation} route={{ params: routeParams }} />
      );
    case routes.eventPage:
      return (
        <EventPage
          navigation={navigation}
          savedEvents={savedEvents}
          onToggleBookmark={toggleBookmark}
        />
      );
    case routes.menu:
      return (
        <MenuScreen
          onNavigateBack={() => navigation.navigate(routes.home)}
          onNavigateTo={(destination) => {
            if (destination === "logout") {
              navigation.navigate(routes.login);
            }
          }}
        />
      );
    default:
      return <SignUpScreen navigation={navigation} />;
  }
};

export default AppRoutes;
