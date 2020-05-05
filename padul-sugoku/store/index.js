import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import sugokuReducer from './reducers/sugoku_reducer';

const reducers = combineReducers({
  sugokuReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
