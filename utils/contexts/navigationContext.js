import React, { useContext } from "react";
import PropTypes from "prop-types";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createContext } from "react";
import { navigationCardTheme } from "../theme";

const navigationContext = createContext();

export function useNavigation() {
    return useContext(navigationContext);
}

function NavigationProvider({ children }) {
    const navigationContainerRef = useNavigationContainerRef();

    return (
        <NavigationContainer theme={navigationCardTheme} ref={navigationContainerRef}>
            <navigationContext.Provider value={{NavigationRef:navigationContainerRef}}>
                {children}
            </navigationContext.Provider>
        </NavigationContainer>
    );
}

NavigationProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

export default NavigationProvider;
