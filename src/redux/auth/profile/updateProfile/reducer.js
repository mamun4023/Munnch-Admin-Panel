import * as Types from './Types';

const InitialState = {
    data : [],
    errors : '',
    loading : false
}

const Reducer = (state = InitialState, action)=>{
    switch(action.type){
        case Types.UPDATE_PROFILE_REQUEST:
            return{
                ...state,
                loading : true
            }
        case Types.UPDATE_PROFILE_SUCCESS:
            return{
                ...state,
                data : action.paylaod,
                loading : false
            }
        
        case Types.UPDATE_PROFILE_FAILED:
            return{
                ...state,
                errors : action.paylaod,
                loading : false
            }
    }
}

export default Reducer;