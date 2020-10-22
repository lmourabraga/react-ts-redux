import { all, takeLatest } from 'redux-saga/effects';

function checkProductStock() {
    console.log('Adicionou ao carrinho');
}

export default all([
    takeLatest('ADD_PRODUCT_TO_CART', checkProductStock)
]);

//takeLatest: If the previous action doesn't finished yet and the user is still creating new request
//to the API, takeLatest will stop all actions before and will consider only the current action.

//takeEvery: Saga will proccess all request to api and will be waiting for then to finish.

//takeLeading: If a previous action doesn't finished yet, saga will ignore all request which follow next.