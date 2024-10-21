# Sistema de Cadastro de Clientes

Este projeto é um sistema web para cadastro de clientes, permitindo o armazenamento e a listagem dos dados dos clientes, como nome, documento (CPF/CNPJ), endereço e informações de contato. A aplicação foi desenvolvida usando **Angular** com componentes standalone, **Bootstrap** para o design responsivo e **ngx-mask** para formatação de campos de entrada.

## Funcionalidades

- **Cadastro de Clientes**: Modal para cadastrar clientes com validações de campos obrigatórios.
- **Listagem de Clientes**: Exibe uma tabela com o nome, endereço e e-mail dos clientes cadastrados.
- **Filtro por Tipo de Cliente**: O usuário pode selecionar se o cliente é pessoa física (CPF) ou jurídica (CNPJ), o que ajusta a máscara e a validação de documento.
- **Busca Automática de Endereço por CEP**: Preenchimento automático do campo de endereço ao digitar o CEP.
- **Validações de Formulário**: Validações automáticas para garantir que os campos obrigatórios sejam preenchidos corretamente.

## Tecnologias Utilizadas

- **Angular 18**: Framework front-end para a construção da aplicação.
- **Bootstrap**: Framework CSS utilizado para estilização e layout responsivo.
- **ngx-mask**: Biblioteca Angular usada para aplicar máscaras nos campos de formulário (CPF, CNPJ, CEP, Telefone).
- **LocalStorage**: Os dados dos clientes são armazenados no localStorage do navegador.

## Como Executar o Projeto

1. Clone este repositório: ```git clone https://github.com/Xua1zin/Projeto-angular.git```
2. Acesse o Diretório do projeto: ```cd projeto```
3. Instale as dependências: ```npm install```
4. Execute o servidor de desenvolvimento: ```ng serve```
5. Abra o navegador e acesse: ```http://localhost:4200```

## Estrutura do Projeto

- **app.module.ts**: Módulo principal da aplicação, configurando os componentes standalone.
- **app-cadastro-form.component.ts**: Componente responsável pelo formulário de cadastro.
- **app-client-list.component.ts**: Componente que exibe a lista de clientes cadastrados.
- **services**: Serviços para manipulação de clientes e comunicação com a API de CEP.
