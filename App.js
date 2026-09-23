import { StatusBar } from "expo-status-bar";
import ProductListScreen from "./src/screens/ProductListScreen";

export default function App() {
  return (
    <>
      <ProductListScreen />
      <StatusBar style="auto" />
    </>
  );
}
