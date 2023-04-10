import { createContext, useContext } from "react";
import { useEffect, useState } from "react"
export const Mycontext = createContext()


export default function Context ({children}){
    const [state,setState] = useState()

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("user"))
        setState(data)
    }, []);

    return (
        <Mycontext.Provider value={[state,setState]} >
            {children}
        </Mycontext.Provider>
    )
}

const useProduct = () => useContext(Mycontext)
export {useProduct}