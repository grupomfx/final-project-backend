### Projeto Back-end :v: :metal: :computer:

***OBJETIVO***: Projeto integrador para as turmas de back-end do treinamento da MFX Academy, visando entregar todos os exemplos aplicados e ensinados nas aulas


### Funcionalidades Principais

  
- **Gestão de Usuários**: CRUD completo para gerenciar usuários do sistema.

- **Gestão de Dados**: Operações CRUD para manipulação de dados específicos do domínio do projeto.

- **API RESTful**: Implementação de endpoints REST para integração com o frontend.

- **Swagger API ** : Implementação do Swagger para documentação dos endpoints

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução de código JavaScript server-side.
  
- **FastiFy**: Framework Node.js para construção de APIs web.
  
- **SQlite**: Banco de dados utilizado para armazenamento persistente de dados.
 

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

- **`/app`**: Contém o código-fonte da aplicação.
  - **`/repositories`**: Contém as funções que manipulam o banco de dados.
  - **`/infra`**: Contém o arquivo do banco de dados do SQlit `local.database.db` e uma arquivo js para conexão com o banco de dados.
  - **`/routes`**: Definição dos endpoints da API utilizando FastiFy.
  - **`/utils`**: Modulos de funções compartilhadas no projeto.  
- **`server.js`**: Arquivo que defini as configurações da API usando FastiFy, realiza o registro das rotas e a configurações do Swagger.
  
## Instalação e Uso

Para configurar e executar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

       git clone https://github.com/grupomfx/final-project-backend.git

2. Instale as dependências:

        cd final-project-backend //caminho para acessar a pasta via terminal
        npm install

4. Inicie o servidor:

        npm start

5. Acessa o link do Swagger para visualizar e testar os endpoints 

        http://localhost:3000/docs





