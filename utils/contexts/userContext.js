import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const userContext = createContext();

/**
 *
 * @returns {boolean}
 */
export function useUserExist() {
    return useContext(userContext);
}
function UserContextProvider({ children }) {
    const { userExist } = useSelector((state) => state.account);
    return <userContext.Provider value={userExist}>{children(userExist)}</userContext.Provider>;
}

UserContextProvider.propTypes = {
    children: PropTypes.func,
};

export default UserContextProvider;
