import { elementosHomePage } from "../../elements/elementsHomePage";
import { elementosLogin } from "../../elements/elementsLogin";
import { a2wWebLogin } from "../visit/visit_helpers";

export const loginHelper = (email, password) => {
    
    // O cy.session vai salvar o estado do login baseado no nome do usuário
    cy.session(email, () => {
        // Visitando a pagina de login inicial
        a2wWebLogin();

        // Interceptador para validar a rota de login
        cy.intercept('POST', '/api/v1/user/login').as('loginRequest');

        // Digitando o email e password
        cy.get(elementosLogin.barraDeEmail).type(email);
        cy.get(elementosLogin.barraDeSenha).type(password);

        // Clicando em entrar
        cy.contains('button', 'ENTRAR').click();

        // Validando a rota de login
        cy.wait('@loginRequest', {timeout: 10000}).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });

        // validando a pagina
        cy.get(elementosHomePage.formularioPgInicial).should('be.visible');
    });
}

export const logoutHelper = (username) => {

    // Regex para garantir que o texto do username seja igual ao da fixture
    const regex = new RegExp(`^${username}`);

    // Etapas para realizar o logout
    cy.contains('span', regex).should('be.visible').click();
    cy.contains('span', 'Meu Perfil').should('have.text', 'Meu Perfil');
    cy.contains('span', 'Sair').click();

    // Validando que retornou para a pagina inicial
    cy.url().should('include', '/auth/login-2');
}