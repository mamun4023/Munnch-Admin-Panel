import * as Types from './types';

const InitialState = {
    data : [],
    success : false,
    loading : false
}

const Reducer = (state = InitialState, action)=>{
    switch(action.type){
        case Types.UPDATE_MENU_REQUEST:
            return{
                ...state,
                loading : true
            }
        case Types.UPDATE_MENU_SUCCESS:
            return{
                ...state,
                data : action.payload,
                success : action.payload,
                loading : false
            }
        case Types.UPDATE_MENU_FAILED:
            return{
                ...state,
                success : action.payload,
                loading : false
            }
        default:
            return state
    }
}

export default Reducer;