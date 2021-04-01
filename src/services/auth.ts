import api from './api';

async function authService(email: string, password: string) {
  const response = await api.get('/analysts');
  const analysts = response.data;

  try {
    for (let i = 0; i < analysts.length; i++) {
      if ((analysts[i].email === email) && (analysts[i].password === password)) {
        return analysts[i];
      }
    }
    return ({ Status: "Error", Description: "Invalid login" });
  }
  catch (err) {

  }
}

export default authService;
