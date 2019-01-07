import mockAxios from 'axios';
import {requireLogin} from './login_service';


it ('calls axios and returns user data if there is a session that matches user id', async () => {
  //setup
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({
    data: {
      userId: 6, 
      username: "KingJoff", 
      email: "joff@email.com", 
      background: "Test Background" 
      }
    })
  
  )
  const history = { push: jest.fn() }
  const userLoginFn = function({ userId, username, email, background }) {
    return "it is working!"
  }
  
  //work of test
  const login = await requireLogin(userLoginFn, history);

  //assertions / expects
  expect(login).toEqual({ 
    data: {
    userId: 6, 
    username: "KingJoff", 
    email: "joff@email.com", 
    background: "Test Background" 
    }
  });
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  
})



