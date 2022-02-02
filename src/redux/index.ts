import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import employeeListReducer, { EmployeeListState } from './reducers/employeeListReducer';
export interface RootReducers {
    employeeListReducer: EmployeeListState
}
const reducers = {
	employeeListReducer
};
export const rootReducer = combineReducers(reducers);
export const reduxMiddlewares = [thunk];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...reduxMiddlewares)));
export default store;
