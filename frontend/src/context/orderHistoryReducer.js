export const orderHistoryReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true,  }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload,  }
        case 'FETCH_FAILED':
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}