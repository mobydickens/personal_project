let initialState = {
  userId: '',
  email: '',
  username: '',
  projects: []
}

// ACTION CONSTANTS
const USER_SIGNUP = 'USER_SIGNUP'; 
// ACTION CREATORS
export function userSignup({ userId, username, email }) {
  return {
    type: USER_SIGNUP,
    payload: {
      userId,
      username,
      email
    }
  }
}

// REDUCER
export default function reducer(state=initialState, action) {
  switch(action.type) {
    case USER_SIGNUP:
      return { ...state, userId: action.payload.userId, email: action.payload.email, username: action.payload.username };
    default: 
      return state;
  }
}