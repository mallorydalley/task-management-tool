const initialState = {
    email: ''
}

const UPDATE_EMAIL = "UPDATE_EMAIL";

export function updateEmail(email){
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case UPDATE_EMAIL:
            return {...state, email: payload}
        default:
            return state;
    }
}