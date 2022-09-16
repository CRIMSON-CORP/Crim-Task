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
 * flag: string | null,
 * title: string,
 * subject: string,
 * categoryId: string,
 * themeColor: string,
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
    const [animateOpen, setAnimateOpen] = useState(false);
    const [fabPanelOpen, _setFabPanelOpen] = useState(false);
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

    function setFabPanelOpen(state) {
        if (state) {
            setAnimateOpen(state);
            setTimeout(() => _setFabPanelOpen(state), 100);
        } else {
            _setFabPanelOpen(state);
            setTimeout(() => setAnimateOpen(state), 100);
        }
    }

    useEffect(() => {
        if (flag.flag) setShowFab(true);
    }, [flag.flag]);

    const contextValues = useMemo(
        () => ({
            flag,
            setFlag,
            showFab,
            setShowFab,
            animateOpen,
            fabPanelOpen,
            setFabPanelOpen,
        }),
        [flag.flag, animateOpen, fabPanelOpen, showFab]
    );
    return <FabButtonContext.Provider value={contextValues}>{children}</FabButtonContext.Provider>;
}
FabContextProvider.propTypes = childrenPropTypes;

export default FabContextProvider;
