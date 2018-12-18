let initialState = {
  userId: '6',
  email: 'joff@email.com',
  username: 'KingJoff',
  projects: [],
  newTeam: []
}

// ACTION CONSTANTS
const USER_SIGNUP = 'USER_SIGNUP';
const USER_LOGIN = 'USER_LOGIN';
const USER_PROJECTS = 'USER_PROJECTS'; 
const RESET_STATE = 'RESET_STATE';
const ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER';

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
export function userLogin({ userId, username, email }) {
  return {
    type: USER_LOGIN,
    payload: {
      userId, 
      username, 
      email
    }
  }
}
export function userProjects(projects) {
  return {
    type: USER_PROJECTS,
    payload: projects.data
  }
}
export function resetState() {
  return {
    type: RESET_STATE
  }
}
export function addTeamMember(member) {
  return {
    type: ADD_TEAM_MEMBER,
    payload: member
  }
}

// REDUCER
export default function reducer(state=initialState, action) {
  switch(action.type) {
    case USER_SIGNUP:
      return { ...state, userId: action.payload.userId, email: action.payload.email, username: action.payload.username };
    case USER_LOGIN:
      return { ...state, userId: action.payload.userId, email: action.payload.email, username: action.payload.username };
    case USER_PROJECTS:
      return { ...state, projects: action.payload };
    case RESET_STATE:
      return { ...state,  userId: '', email: '', username: '', projects: [], newTeam: [] };
    case ADD_TEAM_MEMBER:
      return { ...state, newTeam: state.newTeam.push(action.payload)};
    default: 
      return state;
  }
}