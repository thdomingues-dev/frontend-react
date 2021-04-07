# GREENROCK :moneybag: 
### Descomplicando a sua vida financeira

Este projeto foi realizado durante o desafio admin-web para Desenvolvedor Frontend na [Stone Co](https://www.stone.co/br/).

**GREENROCK** é uma aplicação voltada para soluções financeiras, sobretudo para análise de cartões para clientes.

O projeto possui responsividade, atende os requisitos propostos e está disponível em [https://github.com/thdomingues-dev/desafio-admin-web](https://github.com/thdomingues-dev/desafio-admin-web-temp)

Também está disponível em **[heroku/green-rock](https://green-rock.herokuapp.com/)**

## Projeto :pushpin:

### Estrutura :open_file_folder:
```
├── /src/                     # Diretório principal
|   |── /components/          # Contém todos os componentes utilizados
│   ├── /contexts/            # Armazena o arquivo de autenticação auth.tsx 
│   ├── /pages/               # Detém todas as páginas da aplicação
│   ├── /routes/              # Gerenciamento de rotas da aplicação (/login, /landing, etc...)
│   ├── /services/            # Arquivos de configuração de acesso cliente-servidor (via Axios)
│   ├── /styles/              # Estilos globais
│   ├── /utils/               # Métodos utilizados para tratar dados do servidor
│   ├── App.tsx               # Retorna todas as rotas do projeto com contexto de autenticação
│   ├── index.tsx             # Arquivo padrão a ser renderizado pelo ReactDOM
```

### Como rodar o APP Cliente-Servidor :computer:

```sh
1- yarn build
2- yarn dev

ou

npm run build
npm run start
```

output:

```
// CRA - Acessar pelo navegador
  http://localhost:3000/

// Api
  Resources:
  http://localhost:3001/api/users
  http://localhost:3001/api/analysts
  http://localhost:3001/api/cards
  http://localhost:3001/api/features
  http://localhost:3001/api/audits
```
## Recursos utilizados :hammer:

- [TypeScript](https://www.typescriptlang.org/)
- [ReactJS](https://reactjs.org/)
- [create-react-app](https://create-react-app.dev/)
- [Axios](https://github.com/axios/axios)
- [react-router-dom](https://reactrouter.com/web/guides/quick-start)
- [contextAPI](https://pt-br.reactjs.org/docs/context.html)
- [react-icons](https://react-icons.github.io/react-icons/)

## Dúvidas
Contato: thdomingues.dev@gmail.com :email:
