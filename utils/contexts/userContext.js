import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const userContext = createContext();

function UserContextProvider({ children }) {
    const state = useSelector((state) => state);
    const [userExist, setUserExist] = useState(false);
    return <userContext.Provider>{children}</userContext.Provider>;
}

UserContextProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

export default UserContextProvider;
