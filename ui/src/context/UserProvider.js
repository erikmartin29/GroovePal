import { createContext, useState } from "react";

import { useSessionStorage } from "../utils/useSessionStorage";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function UserProvider({children}) {

    const [ userDetails, setUserDetails] = useSessionStorage('userDetails', {
        user_id: undefined,
    })

    return (
        <UserContext.Provider value={userDetails}>
            <UserDispatchContext.Provider value={setUserDetails}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext, UserDispatchContext };
