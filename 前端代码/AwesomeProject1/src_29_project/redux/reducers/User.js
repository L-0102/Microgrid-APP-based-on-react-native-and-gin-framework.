import actionTypes from '../actions/actionTypes'

const initState={
    isLogin:false
}

export default(state=initState,action)=>{
    switch(action.type){
        case actionTypes.LOGIN_SUCCESSS:
            return {
                ...state,
                ...action.payload,
                isLogin:true
            }
        case actionTypes.LOGIN_FAILED:
            return {
                isLogin:false
            }
        default:
         return state 
    }
}