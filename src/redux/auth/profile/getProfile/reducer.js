import * as Types from './types';

const InitialState = {
    data : {},
    errors : '',
    loading : false
}

const Reducer = (state = InitialState, action)=>{
    switch(action.type){
        case Types.GET_PROFILE_REQUEST:
            return{
                ...state,
                loading : true
            }
        case Types.GET_PROFILE_SUCCESS:
            return{
                ...state,
                data : action.paylaod,
                errors : "",
                loading : false
            }
        case Types.GET_PROFILE_FAILED:
            return{
                ...state,
                errors : action.paylaod,
                data : [],
                loading : false
            }
        default:
            return state;
    }
}

export default Reducer;