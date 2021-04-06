const translateToPortuguese = (status: string) => {
  switch (status.toLocaleLowerCase()) {
    case 'rejected':
      return 'Negado';

    case 'approved':
      return 'Aprovado';

    case 'requested':
      return 'Solicitado';

    case 'new':
      return 'Novo';

    case 'deleted':
      return 'Removido';

    case 'card-status-change':
      return 'Alteração status';

    case 'card-name-change':
      return 'Alteração nome';

    case 'card-request':
      return 'Solicitação cartão';

    case 'card-remove':
      return 'Exclusão cartão';

    default:
      return status;
  }
}

export default translateToPortuguese;

export const formatToBRL = (value: number) => {
  return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export const formatToCPF = (value: string) => {
  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export const formatToBirthdate = (value: string) => {
  const date = new Date(value);
  let day = String(date.getDate());
  let month = String(date.getMonth() + 1);
  let year = date.getFullYear();

  if (Number(day) < 10) day = '0' + day;
  if (Number(month) < 10) month = '0' + month;

  return day + "/" + month + "/" + year;
}

export const formatToLog = (value: string) => {
  const date = new Date(value);
  let day = String(date.getDate());
  let month = String(date.getMonth() + 1);
  let year = String(date.getFullYear()).substring(2, 4);

  let hours = String(date.getHours());
  let minutes = String(date.getMinutes());

  if (Number(day) < 10) day = '0' + day;
  if (Number(month) < 10) month = '0' + month;
  if (Number(hours) < 10) hours = '0' + hours;
  if (Number(minutes) < 10) minutes = '0' + minutes;

  return hours + ":" + minutes + " " + day + "/" + month + "/" + year;
}
