export const orderReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return {...state, loading: true}
        case 'CREATE_SUCCESS':
            return {...state, loading: false}
        case 'CREATE_FAILED':
                return {...state, loading: false}        
        default :
        return state
    }
}