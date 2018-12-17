let initialState = {
  userId: '',
  email: '',
  username: '',
  projects: []
}

// ACTION CONSTANTS
const USER_SIGNUP = 'USER_SIGNUP';
const USER_LOGIN = 'USER_LOGIN';

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
export function userLogin({ userId, username, email, projects }) {
  return {
    type: USER_LOGIN,
    payload: {
      userId, 
      username, 
      email, 
      projects
    }
  }
}

// REDUCER
export default function reducer(state=initialState, action) {
  switch(action.type) {
    case USER_SIGNUP:
      return { ...state, userId: action.payload.userId, email: action.payload.email, username: action.payload.username };
    case USER_LOGIN:
      return { ...state, userId: action.payload.userId, email: action.payload.email, username: action.payload.username, projects: action.payload.projects };
    default: 
      return state;
  }
}