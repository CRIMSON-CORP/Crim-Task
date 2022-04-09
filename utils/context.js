import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Easing, runOnJS, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { debounce } from "./utils";
export const NavigationContext = createContext(undefined);
export const FabButtonContext = createContext();
export const AuthContext = createContext();
export const SearchContext = createContext();

export function useFab() {
    return useContext(FabButtonContext);
}
export function useSearch() {
    return useContext(SearchContext);
}

export function FabContextProvider({ children }) {
    const [canPress, setCanPress] = useState(true);
    const [open, setOpen] = useState(false);
    const [backDropOpen, setBackDropOpen] = useState(false);
    const [AnimateOpen, setAnimateOpen] = useState(false);
    const [showFab, setShowFab] = useState(true);
    const [flag, setFlag] = useState({
        flag: null,
        title: "",
        subject: "",
        categoryId: null,
        themeColor: null,
    });
    const rad = useSharedValue(0);
    const content = useSharedValue(200);
    useEffect(() => {
        return () => {
            setCanPress(false);
            setOpen(false);
            setBackDropOpen(false);
            setAnimateOpen(false);
            setShowFab(true);
            setFlag(null);
        };
    }, []);
    function ToggleOpenFab(toggle) {
        ("worklet");
        if (toggle) {
            runOnJS(setAnimateOpen)(true);
            if (canPress) {
                runOnJS(setBackDropOpen)(true);
                runOnJS(setCanPress)(false);
                rad.value = withTiming(
                    40,
                    { duration: 700, easing: Easing.out(Easing.quad) },
                    () => {
                        runOnJS(setCanPress)(true);
                    }
                );
                setTimeout(() => {
                    runOnJS(setOpen)(true);
                    content.value = withTiming(0, { duration: 700 });
                }, 200);
            }
        } else {
            if (canPress) {
                runOnJS(setCanPress)(false);
                runOnJS(setAnimateOpen)(false);

                content.value = withTiming(200, {}, () => {
                    runOnJS(setOpen)(false);
                    runOnJS(setBackDropOpen)(false);
                });
                rad.value = withDelay(
                    500,
                    withTiming(0, { duration: 500, easing: Easing.out(Easing.quad) }, () => {
                        runOnJS(setCanPress)(true);
                    })
                );
            }
            setFlag({ flag: null, title: "", subject: "", categoryId: null, themeColor: null });
        }
    }
    return (
        <FabButtonContext.Provider
            value={{
                ToggleOpenFab,
                open,
                setOpen,
                backDropOpen,
                setBackDropOpen,
                AnimateOpen,
                setAnimateOpen,
                showFab,
                setShowFab,
                rad,
                content,
                flag,
                setFlag,
            }}
        >
            {children}
        </FabButtonContext.Provider>
    );
}

export function SearchProvider({ children }) {
    const [OpenSearch, setOpenSearch] = useState(false);
    const [results, setResults] = useState([]);
    const [value, setValue] = useState("");
    const categories = useSelector((state) => state.tasks);
    const FindResults = useCallback(() => {
        let res = [];
        if (!value) return setResults([]);
        categories.forEach((cat) => {
            cat.tasks.forEach((t) => {
                t.task.toLowerCase().match(value.toLowerCase()) &&
                    res.push({
                        ...t,
                        categoryId: cat.categoryId,
                        categoryColor: cat.categoryColor,
                    });
            });
        });
        setResults(res);
    }, [value, categories]);

    useEffect(() => {
        debounce(FindResults(), 1000);
        if (!OpenSearch) {
            setResults([]);
            setValue("");
        }
    }, [value, OpenSearch]);

    return (
        <SearchContext.Provider
            value={{
                OpenSearch,
                setOpenSearch,
                results,
                setResults,
                value,
                setValue,
                FindResults,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}
