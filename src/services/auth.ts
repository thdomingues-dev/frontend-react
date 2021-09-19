import api from './api';

async function authService(email: string, password: string) {
  try {
    const { data: user } = await api.post(`/authenticate`,  { email, password });
  
    if (user) {
      return user;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}

export default authService;
