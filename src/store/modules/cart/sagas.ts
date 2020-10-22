import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions';
import { IState } from '../..';
import api from '../../../services/api';
import { AxiosResponse } from 'axios';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
    id: number;
    quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
    const { product } = payload;

    const currentQuantity: number = yield select((state: IState) => {
        return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
    });

    const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

    if(availableStockResponse.data.quantity > currentQuantity){
        yield put(addProductToCartSuccess(product));
    }else{
        yield put(addProductToCartFailure(product.id));
    }
}

export default all([
    takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock)
]);

//takeLatest: If the previous action doesn't finished yet and the user is still creating new request
//to the API, takeLatest will stop all actions before and will consider only the current action.

//takeEvery: Saga will proccess all request to api and will be waiting for then to finish.

//takeLeading: If a previous action doesn't finished yet, saga will ignore all request which follow next.