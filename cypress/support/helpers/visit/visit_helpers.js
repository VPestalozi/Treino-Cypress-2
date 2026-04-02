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

    cy.intercept('GET', '**/api/v1/VinculoTipoAtividadeGrupoEmpresa/SelecionarPorGrupoEmpresa/*').as('esperarEmpresa');

    cy.visit(urls.novaAtividade);

    cy.wait('@esperarEmpresa', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });

    cy.get(elementosNewAtiv.formularioNewAtiv).should('be.visible');
}

// Comando e validação para acessar a pagina de 'Exibir Atividade'
export const a2wWebExibirAtividade = () => {

    cy.visit(urls.exibirAtividade);

    cy.get(elementosExibirAtiv.formularioExibAtiv).should('be.visible');
}