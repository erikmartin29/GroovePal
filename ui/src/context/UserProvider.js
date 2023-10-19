import { createContext } from "react";

import { useLocalStorage } from "../utils/useSessionStorage";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function UserProvider({children}) {

    const [ userDetails, setUserDetails] = useLocalStorage('userDetails', {
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
