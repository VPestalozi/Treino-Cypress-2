import { filtroAtividadeCI } from "../filtors/filtrosAtividades_helpers";
import { a2wWebExibirAtividade } from "../visit/visit_helpers"

export const exibirAtivCIHelper = (idAtividades,clienteAtivCI,consultorAtivCI) => {
    a2wWebExibirAtividade();
    filtroAtividadeCI(idAtividades,clienteAtivCI,consultorAtivCI);
    cy.contains('p',`${idAtividades}`).should('have.text', `${idAtividades}`);
    cy.contains('p','Check-in').should('have.text','Check-in');
    cy.contains('p',`${clienteAtivCI}`).should('have.text',`${clienteAtivCI}`);
    cy.contains('p',`${consultorAtivCI}`).should('have.text',`${consultorAtivCI}`);
    cy.contains('span','CONCLUÍDO').should('have.text','CONCLUÍDO');
}