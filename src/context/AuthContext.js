import { createContext, useEffect, useReducer } from "react"
import AuthReducer from "./AuthReducer"


    {/*
    user:
    {
        _id:"61746d9eb0e4c404952f9880",
        username:"jhon",
        email:"jhon@gmail.com",
        ProfilePicture:"person/4.jpeg",
        coverPicture:"",
        followers:["6179a2ad8cd875da9b05d8df"],
        desc:"Hey Guys!!!",
        followings:[],
        city:"New York",
        from:"San Luis Potosi",} ,
        */}
// const INITIAL_STATE = {
//     user: null, 
//     isFetching: false,
//     error: false,
// }

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user") || null), 
    isFetching: false,
    error:  false,
}

export const AuthContext= createContext(INITIAL_STATE)

export const AuthContextProvider=({children})=>{
    // Inicializa el reducer
            // ejemplo con const [contador, setContador]=useState(valor inicial=0)
           // state: la variable de estado, ejemplo "contador"
           // dispatch: la acción que se efectuará a la 
           //   variable de estado, ejemplo setContador
                                    //  archivo reducer, objeto inicial del estado 
    
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])

    //la función:AuthReducer, valor inicial
    return (
            <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}>
              {children}
            </AuthContext.Provider>
    )
}