export const retrieveCategories = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({
            type: 'GET_CATEGORIES'
        })
    }
}