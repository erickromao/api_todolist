# API To-Do List

Este projeto é uma API para gerenciar uma lista de tarefas (To-Do List), permitindo criar, ler, checkar se já foi feita, atualizar e deletar tarefas. A aplicação utiliza Node.js, Express.js e Knex.js para a conexão com o banco de dados.

## Funcionalidades

### Tarefas
* **Criar Tarefa**: Permite a criação de novas tarefas. (título, descrição, status de conclusão, data de criação, data da última atualização)
* **Listar Todas as Tarefas**: Recupera uma lista de todas as tarefas.
* **Listar Uma Tarefa**: Retorna uma tarefa específica por ID.
* **Atualizar Tarefa**: Atualiza os dados de uma tarefa existente.
* **Deletar Tarefa**: Remove uma tarefa do sistema.

### Usuários
* **Criar Usuário**: Permite a criação de um novo usuário.
* **Login de Usuário**: Permite o login de um usuário, retornando suas informações de cadastro.
* **Ler Informações de Cadastro de um Usuário**: Recupera as informações de cadastro de um usuário autenticado.
* **Deletar Usuário**: Remove um usuário existente da aplicação.
* **Atualizar Usuário**: Permite que um usuário autenticado atualize suas informações de cadastro.

**Nota:** A criação de novos usuários (registro) pode ser feita sem autenticação. Todas as outras operações,leitura, atualização e exclusão de informações de cadastro de usuário, bem como todas as operações de tarefas, exigem autenticação gerada quando o usuário realiza o login, via JWT (JSON Web Token).

## Tecnologias Utilizadas

* **JavaScript**: Linguagem de programação utilizada para desenvolver a aplicação.
* **Node.js**: Ambiente de execução JavaScript server-side.
* **Express**: Framework web para Node.js.
* **SQLite**: Banco de dados SQL leve para armazenamento de dados.
* **Knex.js**: Query builder para SQL usado para interagir com o banco de dados.

## Estrutura do Banco de Dados

* A tabela "tasks" foi criada utilizando Knex.js.
* A tabela "users" foi criada para gerenciar os dados dos usuários.

## Instalação

Para instalar e rodar o projeto, siga os passos abaixo:

```sh
# Clone o repositório
git clone https://github.com/erickromao/api_todolist.git

# Navegue até o diretório do projeto
cd api_todolist

# Instale as dependências
npm install

# Rode as migrações do banco de dados
npx knex migrate:latest

# Rode a aplicação
npm start
