import api from './api';

async function authService(email: string, password: string) {
  const analystResponse = await api.get('/analysts');
  const usersResponse = await api.get('/users');

  const users = usersResponse.data;
  const analysts = analystResponse.data;

  let analyst = {} as any;

  for (let i = 0; i < analysts.length; i++) {
    if ((analysts[i].email === email) && (analysts[i].password === password)) {
      analyst = analysts[i];
    }
  }

  for (let index = 0; index < users.length; index++) {
    if (users[index].id === analyst.user_id) {
      analyst.name = users[index].name;

      return analyst;
    }
  }

  return null;
}

export default authService;
