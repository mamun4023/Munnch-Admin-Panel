import * as Types from './types';

const InitialState ={
    data : [],
    errors : "",
    loading : false
}

const Reducer = (state = InitialState, action)=>{
    switch(action.type){
        case Types.SIGNIN_REQUEST:
            return{
                ...state,
                loading : true,
            }
        case Types.SIGNIN_SUCCESS:
            return{
                ...state,
                data : action.payload,
                loading : false,
            }
        case Types.SIGNIN_FAILED:
            return{
                ...state,
                errors : action.payload,
                loading : false
            }
        default:
            return state
    }
}

export default Reducer;