# Exemplo-de-conex-o-do-banco-de-dados-Sequelize-com-Sqlite3

# Projeto Livraria Online

Este projeto é uma aplicação web para gerenciamento de uma biblioteca online. A aplicação permite cadastrar, editar, deletar e locar livros, além de gerenciar usuários, incluindo a criação de administradores. A seguir, são descritos os principais componentes do projeto, incluindo a configuração do banco de dados usando Sequelize e SQLite.

## Estrutura do Projeto

O projeto está organizado nas seguintes pastas principais:

- **model**: Contém os modelos de dados `Usuario.js` e `Livro.js`.
- **helpers**: Contém o arquivo de configuração do banco de dados `banco.js`.
- **views**: Contém os arquivos de templates para renderização de páginas usando Mustache.
- **Controller**: Contém os arquivos de roteamento e lógica do servidor.
- **public**: Contém os arquivos estáticos como CSS, JavaScript e imagens.

## Configuração do Banco de Dados

Este projeto utiliza Sequelize como ORM (Object-Relational Mapping) para gerenciar a conexão e interação com o banco de dados SQLite. A configuração do banco de dados está definida no arquivo `banco.js`, localizado na pasta `helpers`.

### Arquivo `banco.js`

O arquivo `banco.js` configura a conexão com o banco de dados SQLite utilizando Sequelize. Abaixo está o conteúdo do arquivo:

\`\`\`javascript
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

module.exports = sequelize;
\`\`\`

### Modelos de Dados

Na pasta `model`, temos dois modelos principais: `Usuario.js` e `Livro.js`. Esses modelos definem a estrutura das tabelas no banco de dados e utilizam o Sequelize para facilitar as operações CRUD (Create, Read, Update, Delete).

#### Modelo `Usuario.js`

O modelo `Usuario.js` define a estrutura da tabela de usuários. Cada usuário tem um `id` (chave primária auto-incrementada), `nome`, `email` (único), `senha` e um campo `admin` para identificar se o usuário é administrador.

\`\`\`javascript
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../helpers/banco');

const Usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Usuario;
\`\`\`

#### Modelo `Livro.js`

O modelo `Livro.js` define a estrutura da tabela de livros. Cada livro tem um `id` (chave primária auto-incrementada), `nomeLivro`, `autor` e um campo `disponivel` que indica se o livro está disponível para locação.

\`\`\`javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/banco');

const Livro = sequelize.define('livro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nomeLivro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});

module.exports = Livro;
\`\`\`

### Sincronização com o Banco de Dados

No arquivo `index.js`, a sincronização do banco de dados com os modelos é realizada assim que o servidor é iniciado. O código abaixo tenta sincronizar o banco de dados com as definições dos modelos `Usuario` e `Livro`, criando as tabelas caso elas ainda não existam.

\`\`\`javascript
//Conectando o banco
(async () => {
  const banco = require('./helpers/banco');
  const Usuario = require('./model/Usuario');
  const Livro = require('./model/Livro');

  try {
      const resultado = await banco.sync();
      console.log(resultado);
      console.log('Banco de dados sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
})();
\`\`\`


