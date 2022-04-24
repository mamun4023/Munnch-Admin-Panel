import { createStore ,applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducer from  './rootReducer';

const Store = createStore(Reducer, composeWithDevTools(applyMiddleware(Thunk)))

export default Store;