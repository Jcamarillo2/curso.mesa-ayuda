
//      state=Estado Anterior
//      action= contiene un  "tipo de acción", y un 
//              "payload" es el valor que le estamos mandando
//              para que modifique el estado "state"
const AuthReducer = (state, action) =>{
    switch(action.type) {
        case "LOGIN_START":
            return {
                user:null, 
                isFetching:true,
                error: false,
            }

        case "LOGIN_SUCCESS":
            return {
                user:action.payload, 
                isFetching:false,
                error: false,
            }
        case "LOGIN_FAILURE":
            return {
                user:null, 
                isFetching:false,
                error: action.payload,
            }
        case "LOGOUT":
            return {
                user: null, 
                isFetching: false,
                error: false,
            }            
        case "FOLLOW":
            return{
                ...state,
                user:{
                    ...state.user,
                    followings:[...state.user.following, action.payload],
                },
            }
            case "UNFOLLOW":
                return{
                    ...state,
                    user:{
                        ...state.user,
                         followings:state.user.followings.filter(
                            (following) => following !== action.payload
                        ),
                    },
                }            
        default:
            return state
    }
}

export default AuthReducer 