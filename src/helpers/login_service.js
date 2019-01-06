import axios from 'axios';

export async function requireLogin(userLoginFn, history) {
  try {
    let res = await axios.get('/api/get-session');
    userLoginFn({ userId: res.data.id, username: res.data.username, email: res.data.email, projects: res.data.projects, background: res.data.background })
    return res;
  } catch(error) {
    console.error("Error with get-session", error);
    history.push('/')
  }
}