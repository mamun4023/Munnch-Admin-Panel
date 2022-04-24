import * as Types from './types';

const InitialState = {
    data : [],
    errors : '',
    loading : false
}

const Reducer = (state = InitialState, action)=>{
    switch(action.type){
        case Types.CHANGE_PASSWORD_REQUEST:
            return{
                ...state,
                loading : true
            }
        case Types.CHANGE_PASSWORD_SUCCESS:
            return{
                ...state,
                data : action.paylaod,
                loading : false
            }
        
        case Types.CHANGE_PASSWORD_FAILED:
            return{
                ...state,
                errors : action.paylaod,
                loading : false
            }
        default:
            return state
    }
}

export default Reducer;