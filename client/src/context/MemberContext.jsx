import { createContext, useEffect, useReducer } from "react";
import MemberReducer from "./MemberReducer";

const INITIAL_STATE = {
    memberUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const MemberContext = createContext(INITIAL_STATE);

export const MemberContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MemberReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("member", JSON.stringify(state.memberUser))
    }, [state.memberUser])

    return (
        <MemberContext.Provider value={{ memberUser: state.memberUser, dispatch }}>
            {children}
        </MemberContext.Provider>
    );
};