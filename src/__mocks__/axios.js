export default {
  get: jest.fn(() => Promise.resolve({data: { userId: 6, username: "KingJoff", email: "joff@email.com", background: "Test Background" }}))
};