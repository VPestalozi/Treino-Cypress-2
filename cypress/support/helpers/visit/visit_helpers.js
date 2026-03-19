import { urls } from "../../urls";

export const a2wWebLogin = () => {
    cy.visit(urls.login);
    cy.contains('div','FAÇA LOGIN PARA ACESSAR').should('have.text','FAÇA LOGIN PARA ACESSAR');
}

export const a2wWebNewAtividade = () => {
    cy.visit(urls.novaAtividade);
    cy.contains('div','Novo').should('have.text','Novo');
}