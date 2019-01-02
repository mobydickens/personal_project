let initialState = {
  userId: 6,
  email: 'joff@email.com',
  username: 'KingJoff',
  projects: [],
  team: [],
  myTeams: [],
  currentProjectId: '',
  currentProjectTasks: [],
  tableArray: [],
  background: './images/cityblock.jpg'
}

// ACTION CONSTANTS
const USER_SIGNUP = 'USER_SIGNUP';
const USER_LOGIN = 'USER_LOGIN';
const USER_PROJECTS = 'USER_PROJECTS'; 
const RESET_STATE = 'RESET_STATE';
const RESET_PROJECT = 'RESET_PROJECT';
const ADD_NEW_TEAM = 'ADD_NEW_TEAM';
const GET_MY_TEAMS = 'GET_MY_TEAMS';
const GET_PROJECT_ID = 'GET_PROJECT_ID'; 
const GET_TABLE_ARRAY = 'GET_TABLE_ARRAY';
const GET_PROJECT_TASKS = 'GET_PROJECT_TASKS';
const GET_BACKGROUND = 'GET_BACKGROUND'; 


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
    payload: projects
  }
}
export function resetState() {
  return {
    type: RESET_STATE
  }
}
export function resetProject() {
  return {
    type: RESET_PROJECT
  }
}
export function addNewTeam(members) {
  return {
    type: ADD_NEW_TEAM,
    payload: members
  }
}
export function getMyTeams(teams) {
  return {
    type: GET_MY_TEAMS,
    payload: teams
  }
}
export function getProjectId(id) {
  return {
    type: GET_PROJECT_ID,
    payload: id
  }
}
export function getTableArray(arr) {
  return {
    type: GET_TABLE_ARRAY,
    payload: arr
  }
}
export function getTasks(taskArray) {
  return {
    type: GET_PROJECT_TASKS,
    payload: taskArray.sort((a,b) => {
      return a.lane_order - b.lane_order })
  }
}
export function getBackground(backgroundImage) {
  return {
    type: GET_BACKGROUND,
    payload: backgroundImage
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
      return { ...state, userId: '', email: '', username: '', projects: [], team: [],  myTeams: [], currentProjectId: '', currentProjectTasks: [], tableArray: [] };
    case RESET_PROJECT:
      return { ...state, currentProjectId: '', currentProjectTasks: []}
    case ADD_NEW_TEAM:
      return { ...state, team: action.payload };
    case GET_MY_TEAMS:
      return { ...state, myTeams: action.payload};
    case GET_PROJECT_ID:
      return { ...state, currentProjectId: action.payload };
    case GET_TABLE_ARRAY:
      return { ...state, tableArray: action.payload };
    case GET_PROJECT_TASKS:
      return { ...state, currentProjectTasks: action.payload };
    case GET_BACKGROUND: 
      return { ...state, background: action.payload }
    default: 
      return state;
  }
}