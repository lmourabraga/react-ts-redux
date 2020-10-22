import { all, takeLatest, select } from 'redux-saga/effects';
import { addProductToCartRequest } from './actions';
import { IState } from '../..';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

function* checkProductStock({ payload }: CheckProductStockRequest) {
    const { product } = payload;

    const currentQuantity: number = yield select((state: IState) => {
        return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
    });

    console.log(currentQuantity);

    console.log('Adicionou ao carrinho');
}

export default all([
    takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock)
]);

//takeLatest: If the previous action doesn't finished yet and the user is still creating new request
//to the API, takeLatest will stop all actions before and will consider only the current action.

//takeEvery: Saga will proccess all request to api and will be waiting for then to finish.

//takeLeading: If a previous action doesn't finished yet, saga will ignore all request which follow next.