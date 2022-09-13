import { createContext, useContext } from "react";
export const NavigationContext = createContext(undefined);
export const FabButtonContext = createContext();
export const AuthContext = createContext();
export const SearchContext = createContext();

export function useSearch() {
    return useContext(SearchContext);
}
