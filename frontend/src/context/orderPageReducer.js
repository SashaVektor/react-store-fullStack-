export const orderPageReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' }
        case 'FETCH_FAILED':
            return { ...state, loading: false, error: action.payload }
        case 'PAY_REQUEST':
            return { ...state, loadingPay: true };
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, successPay: true };
        case 'PAY_FAIL':
            return { ...state, loadingPay: false };
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false };
        default:
            return state
    }
}