"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import UserWrapper from "./UserWrapper"

export function Providers({ children }) {

    return <Provider store={store}><UserWrapper>{children}</UserWrapper></Provider>;

}