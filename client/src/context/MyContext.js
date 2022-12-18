import { createContext } from "react";

const DealsdrayContext = createContext({
    loginStatus: false,
    user: null,
    login: () => {},
    logout: () => {},
})

export default DealsdrayContext;