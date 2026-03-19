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