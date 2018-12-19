let initialState = {
  userId: '6',
  email: 'joff@email.com',
  username: 'KingJoff',
  projects: [],
  team: [],
  tasks: []
}

// ACTION CONSTANTS
const USER_SIGNUP = 'USER_SIGNUP';
const USER_LOGIN = 'USER_LOGIN';
const USER_PROJECTS = 'USER_PROJECTS'; 
const RESET_STATE = 'RESET_STATE';
const ADD_NEW_TEAM = 'ADD_NEW_TEAM';
const GET_TASKS = 'GET_TASKS';

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
export function addNewTeam(members) {
  return {
    type: ADD_NEW_TEAM,
    payload: members
  }
}
export function getTasks(tasks) {
  return {
    type: GET_TASKS,
    payload: tasks
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
      return { ...state,  userId: '', email: '', username: '', projects: [], team: [], tasks: [] };
    case ADD_NEW_TEAM:
      return { ...state, team: action.payload };
    case GET_TASKS:
      return { ...state, tasks: action.payload};
    default: 
      return state;
  }
}