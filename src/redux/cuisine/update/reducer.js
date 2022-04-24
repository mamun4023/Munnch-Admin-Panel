import * as Types from './types';

const InitialState = {
    data : [],
    errors : '',
    loading : false
}

const Reducer = (state = InitialState, action)=>{
    switch(action.type){
        case Types.UPDATE_CUISINE_REQUEST:
            return{
                ...state,
                loading : true
            }
        case Types.UPDATE_CUISINE_SUCCESS:
            return{
                ...state,
                data : action.payload,
                loading : false
            }
        case Types.UPDATE_CUISINE_FAILED:
            return{
                ...state,
                loading : false
            }
        default:
            return state
    }
}

export default Reducer;