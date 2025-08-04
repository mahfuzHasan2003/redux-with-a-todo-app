"use client";

import store from "@/redux/store";
import { Provider } from "react-redux";

export default function Providers() {
  return <Provider store={store}>Providers</Provider>;
}
