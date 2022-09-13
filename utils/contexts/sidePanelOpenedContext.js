import React, { useContext, createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const sidePanelOpenedContext = createContext(false);

/**
 * @typedef SidePanelOpenedContextValues
 * @property {boolean} sidePanelOpened
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setSidePanelOpened
 */

/**
 *
 * @returns {SidePanelOpenedContextValues}
 */
export function useSidePanel() {
    return useContext(sidePanelOpenedContext);
}

function SidePanelOpenedProvider({ children }) {
    const [sidePanelOpened, setSidePanelOpened] = useState(false);

    const contextvalues = useMemo(
        () => ({
            sidePanelOpened,
            setSidePanelOpened,
        }),
        [sidePanelOpened]
    );

    return (
        <sidePanelOpenedContext.Provider value={contextvalues}>
            {children}
        </sidePanelOpenedContext.Provider>
    );
}

SidePanelOpenedProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

export default SidePanelOpenedProvider;
