import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { childrenPropTypes } from "../constants";

export const NavigationContext = createContext(undefined);
export const FabButtonContext = createContext();
export const AuthContext = createContext();
export const SearchContext = createContext();

/**
 * @typedef FlagProps
 * @property {string | null} flag
 * @property {string} title
 * @property {string} subject
 * @property {string | null} categoryId
 * @property {string} themeColor
 */

/**
 * @typedef FabContextValues
 * @property {boolean} showFab
 * @property {boolean} fabPanelOpen
 * @property {FlagProps} flag
 * @property {React.Dispatch<React.SetStateAction<{
 * flag: null,
 * title: string,
 * subject: string,
 * categoryId: null,
 * themeColor: null,
 * }>>} setFlag
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setShowFab
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setFabPanelOpen
 *
 */

/**
 * @return {FabContextValues}
 */
export function useFab() {
    return useContext(FabButtonContext);
}

export function FabContextProvider({ children }) {
    const [fabPanelOpen, setFabPanelOpen] = useState(false);
    const [showFab, setShowFab] = useState(true);
    const [flag, setFlag] = useState({
        flag: null,
        title: "",
        subject: "",
        categoryId: null,
        themeColor: null,
    });
    useEffect(() => {
        return () => {
            setFlag(null);
            setShowFab(true);
            setFabPanelOpen(false);
        };
    }, []);

    useEffect(() => {
        if (flag.flag) setShowFab(true);
    }, [flag.flag]);

    const contextValues = useMemo(
        () => ({
            flag,
            setFlag,
            showFab,
            setShowFab,
            fabPanelOpen,
            setFabPanelOpen,
        }),
        [flag.flag, fabPanelOpen, showFab]
    );
    return <FabButtonContext.Provider value={contextValues}>{children}</FabButtonContext.Provider>;
}
FabContextProvider.propTypes = childrenPropTypes;

export default FabContextProvider;
