const initialState = {
    email: '',
    first_name: '',
    last_name: '',
    profile_pic: ''
}

const UPDATE_EMAIL = "UPDATE_EMAIL";
const GET_EMPLOYEE = 'GET_EMPLOYEE'

export function updateEmail(email){
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export function getEmployee(first_name, last_name, profile_pic){
    return {
      type: GET_EMPLOYEE,
      payload: {first_name, last_name, profile_pic}
    };
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case UPDATE_EMAIL:
            return {...state, email: payload}
        case GET_EMPLOYEE:
            return {...state, ...payload}
        default:
            return state;
    }
}