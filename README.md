# Documentação de Testes Automatizados - Módulo de Atividades A2W

Este repositório contém o framework de testes de aceitação (E2E) desenvolvido em Cypress para validação dos fluxos de autenticação e gestão de atividades (check-in) na plataforma A2W Homologação. O projeto implementa testes de funcionalidades críticas relacionadas ao login de usuários e criação/visualização de atividades com notificações configuráveis.

## 1. Escopo de Testes

O projeto automatiza os seguintes cenários de usuário:

* **Autenticação**: Validação de login com sucesso, incluindo redirecionamento e confirmação de autenticação.
* **Gestão de Atividades Check-in**: Criação de atividades do tipo check-in sem notificação, com informações de consultor, cliente e empresa.
* **Busca e Visualização de Atividades**: Localização de atividades por ID e visualização detalhada dos dados cadastrados.
* **Validação de Integridade**: Confirmação de que os dados criados correspondem aos dados exibidos na consulta.

## 2. Tecnologias e Dependências

* **Framework**: Cypress 15.12.0
* **Linguagem**: JavaScript (ES6+)
* **Gerenciamento de Dados de Teste**: Fixtures (JSON) para separação entre massa de teste e lógica de scripts

## 3. Estrutura do Projeto

```
cypress/
├── e2e/                             # Arquivos de testes
│   ├── auth/
│   │   └── login.specs.cy.js       # Testes de autenticação
│   └── atividades-page/
│       └── newAtividadeCI.specs.cy.js # Testes de atividades check-in
├── fixtures/                        # Arquivos de dados de teste
│   ├── authLogin.json              # Credenciais de teste
│   ├── newAtividadeCheckIn.json    # Dados para criação de atividades
│   └── exibAtivCheckIn.json        # Dados para visualização de atividades
├── support/                         # Suporte e utilidades
│   ├── e2e.js                      # Configuração geral de suporte
│   ├── authCommands.js             # Comandos de autenticação
│   ├── ativiPageCommands.js        # Comandos de atividades
│   ├── urls.js                     # URLs da aplicação
│   ├── elements/
│   │   └── elementsAtiv.js        # Seletores de elementos
│   └── helpers/                    # Funções auxiliares
│       ├── auth/
│       │   └── login_helpers.js    # Lógica de login
│       ├── atividades/            # Lógica de atividades
│       ├── filtros/               # Lógica de filtros
│       └── visit/                 # Lógica de navegação
```

## 4. Pré-requisitos

* **Node.js** (versão 16.x ou superior)
* **npm** (gerenciador de pacotes)
* Credenciais de acesso à plataforma A2W Homologação
* Navegador compatível (Chrome, Edge ou Firefox)

## 5. Instalação

### Passo 1: Clonar ou acessar o repositório

Navegue até o diretório do projeto:

```bash
cd Treino_Cypress_2
```

### Passo 2: Instalar as dependências

```bash
npm install
```

Este comando instalará o Cypress e suas dependências conforme definido em `package.json`.

## 6. Configuração

### Dados de Teste

Os arquivos de fixtures contêm os dados necessários para os testes:

* `authLogin.json`: Credenciais do usuário de teste
* `newAtividadeCheckIn.json`: Dados para criação de atividades (consultor, cliente, empresa, notificação)
* `exibAtivCheckIn.json`: Dados para busca de atividades

## 7. Execução dos Testes

### Modo Interativo (Cypress Studio)

Abre a interface gráfica do Cypress para execução e visualização em tempo real:

```bash
npx cypress open
```

Após executar o comando, selecione `E2E Testing` e o navegador desejado, então escolha o arquivo de teste que deseja executar.

### Modo Headless (CLI)

Executa todos os testes sem interface gráfica (ideal para integração contínua):

```bash
npx cypress run
```

### Executar Testes Específicos

Para executar apenas um arquivo de teste:

```bash
npx cypress run --spec "cypress/e2e/auth/login.specs.cy.js"
```

Para executar testes de um diretório específico:

```bash
npx cypress run --spec "cypress/e2e/atividades-page/*"
```

## 8. Arquitetura de Comandos Customizados

### cy.login(email, password)

Realiza o login na plataforma de forma segura e validada.

**Localização**: `cypress/support/authCommands.js`

**Exemplo de Uso**:
```javascript
cy.login(dados.email, dados.password);
```

**Funcionalidades**:
* Navega para a URL de autenticação
* Insere credenciais nos campos apropriados
* Valida autenticação bem-sucedida

### cy.newAtividadeCheckIn(consultor, cliente, empresa, notificacao)

Cria uma nova atividade do tipo check-in com os parâmetros especificados.

**Localização**: `cypress/support/ativiPageCommands.js`

**Exemplo de Uso**:
```javascript
cy.newAtividadeCheckIn(
    dadosCI.consultorNewAtivCI,
    dadosCI.clienteNewAtivCI,
    dadosCI.empresaNewAtivCI,
    dadosCI.semNotificacao
);
```

### cy.exibAtivCheckIn(id, cliente, consultor)

Busca e exibe uma atividade check-in existente.

**Localização**: `cypress/support/ativiPageCommands.js`

**Exemplo de Uso**:
```javascript
cy.exibAtivCheckIn(
    idAtividade,
    dadosCI.clienteNewAtivCI,
    dadosCI.consultorNewAtivCI
);
```

## 9. Variáveis de Ambiente

Você pode sobrescrever a URL base utilizando variáveis de ambiente:

```bash
npx cypress run --env baseUrl=https://seu_ambiente.com
```

## 10. Boas Práticas

* Mantenha as fixtures atualizadas com dados válidos
* Use o modo interativo (Cypress open) para desenvolvimento e debug
* Utilize o modo headless (Cypress run) em pipelines CI/CD
* Revise screenshots e vídeos de falhas para diagnóstico rápido
* Adicione novos testes mantendo a estrutura de pastas existente

## 11. Troubleshooting

### Testes falhando por timeout

Verifique se a URL da aplicação está acessível e se as credenciais estão corretas.

### Elemento não encontrado

Executar em modo interativo e verificar os seletores em `cypress/support/elements/elementsAtiv.js`.

### Problemas de dependências

Limpe a cache do npm e reinstale:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 12. Contato e Suporte

Para dúvidas ou relatos de problemas, entre em contato com a equipe de desenvolvimento ou documentação.
