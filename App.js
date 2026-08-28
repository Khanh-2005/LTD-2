import { StatusBar } from "expo-status-bar";
import AppRoutes from "./src/navigators/AppRoutes";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AppRoutes />
    </>
  );
}
