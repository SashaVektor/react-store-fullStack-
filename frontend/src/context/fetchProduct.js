const reducerProduct = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, product: action.payload, loading: false }
      case 'FETCH_FAILED':
        return { ...state, loading: false, error: action.payload }
      default:
        return state
    }
}

export default reducerProduct