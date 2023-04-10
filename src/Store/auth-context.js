import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: false // default state
});

export default AuthContext;