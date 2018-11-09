import { createStore } from 'redux';
import reducer from './reducer';

const initialState = {
    counter: 0
};

export default function configureStore() {
    return createStore(
        reducer,
        initialState
    );
}