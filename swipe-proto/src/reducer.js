import DashboardReducer from './containers/Dashboard/state/reducer';
import { combineReducers } from 'redux';
//import { firestoreReducer } from 'redux-firestore';

const reducer = combineReducers({
    dashboard: DashboardReducer
})

export default reducer;