import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
export const Mycontext = createContext()

export default function Context({ children }) {
    const [state, setState] = useState();

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("userinfo"));
        setState(data);
    }, [])
    return (
        <Mycontext.Provider value={[state, setState]}>
            {children}
        </Mycontext.Provider>
    )
}
const usePerson = () => useContext(Mycontext)
export { usePerson }