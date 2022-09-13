import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const userContext = createContext();

function UserContextProvider({ children }) {
    const { userExist } = useSelector((state) => state.account);

    return <userContext.Provider>{children()}</userContext.Provider>;
}

UserContextProvider.propTypes = {
    children: PropTypes.func,
};

export default UserContextProvider;
