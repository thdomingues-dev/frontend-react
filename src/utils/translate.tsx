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
