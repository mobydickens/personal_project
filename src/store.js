import { createStore } from 'redux'
import reducer from './ducks/reducer';
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reducer, composeWithDevTools());