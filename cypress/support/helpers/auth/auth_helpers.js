import { a2wWebLogin } from "../visit/visit_helpers";

export const loginHelper = (email, password) => {
    a2wWebLogin();
    cy.intercept('POST', '/api/v1/user/login').as('loginRequest');
    cy.contains('mat-label','E-mail').closest('div').find('input').type(email);
    cy.contains('mat-label','Senha').closest('div').find('input').type(password);
    cy.contains('button', 'ENTRAR').click();
    cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
    cy.contains('span','PLATAFORMA').should('have.text','PLATAFORMA');
}

export const logoutHelper = (username) => {
    const regex = new RegExp(`^${username}`)
    cy.contains('span', regex).should('be.visible').click();
    cy.contains('span', 'Meu Perfil').should('have.text', 'Meu Perfil');
    cy.contains('span','Sair').click();
    cy.contains('div','FAÇA LOGIN PARA ACESSAR').should('have.text','FAÇA LOGIN PARA ACESSAR');
}