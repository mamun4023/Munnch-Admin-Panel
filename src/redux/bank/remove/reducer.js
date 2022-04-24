import * as Types from './types';

const InitialState = {
    data : [],
    errors : '',
    loading : false
}

const Reducer = (state = InitialState, action)=>{
    switch(action.type){
        case Types.REMOVE_BANK_REQUEST:
            return{
                ...state,
                loading : true
            }
        case Types.REMOVE_BANK_SUCCESS:
            return{
                ...state,
                data : action.payload,
                loading : false
            }
        case Types.REMOVE_BANK_FAILED:
            return{
                ...state,
                loading : false
            }
        default:
            return state
    }
}

export default Reducer;