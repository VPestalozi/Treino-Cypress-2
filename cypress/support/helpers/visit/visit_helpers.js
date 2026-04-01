import { elementosExibirAtiv, elementosNewAtiv } from "../../elements/elementsAtiv";
import { elementosLogin } from "../../elements/elementsLogin";
import { urls } from "../../urls";

// Comando e validação para acessar a pagina de 'Login'
export const a2wWebLogin = () => {

    cy.visit(urls.login);

    cy.get(elementosLogin.formularioLogin).should('be.visible');
}

// Comando e validação para acessar a pagina de 'Nova Atividade'
export const a2wWebNewAtividade = () => {

    cy.visit(urls.novaAtividade);

    cy.get(elementosNewAtiv.formularioNewAtiv).should('be.visible');
}

// Comando e validação para acessar a pagina de 'Exibir Atividade'
export const a2wWebExibirAtividade = () => {
    
    cy.visit(urls.exibirAtividade);

    cy.get(elementosExibirAtiv.formularioExibAtiv).should('be.visible');
}