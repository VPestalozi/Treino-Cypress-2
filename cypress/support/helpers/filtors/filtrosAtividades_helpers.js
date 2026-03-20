import { elementosFiltroAtiv } from "../../elements";
import { a2wWebExibirAtividade } from "../visit/visit_helpers"

export const limparFiltroAtiv = () => {
    a2wWebExibirAtividade();
    cy.intercept('POST', '/api/v1/user/salvar-filtro').as('filtroExibAtivLimpar');
    cy.get(elementosFiltroAtiv.botaoDoFiltro).click();
    cy.contains('span','OPÇÕES DE FILTROS').should('have.text','OPÇÕES DE FILTROS');
    cy.contains('span','LIMPAR FILTROS').click();
    cy.wait('@filtroExibAtivLimpar').then((interception) =>{
        expect(interception.response.statusCode).to.eq(200);
    });
    cy.get(elementosFiltroAtiv.botaoDoFiltro).click();
    cy.contains('span','OPÇÕES DE FILTROS').should('have.text','OPÇÕES DE FILTROS');
}

export const filtroAtividadeCI = (idAtividade,clienteExibAtivCI,consultorExibAtivCI) => {
    limparFiltroAtiv();
    cy.intercept('POST', '/api/v1/user/salvar-filtro').as('filtroExibAtiv');
    cy.contains('mat-label','Tipo de Atividade').closest('div').find('mat-select').click();
    cy.contains('span','Check-in').click();
    if(idAtividade){
        //cy.contains('mat-label','Id').closest('div').find('input').clear().type(`${idAtividade}`);
        cy.get("[formcontrolname='IdAtividade']").clear().type(`${idAtividade}`);
    }
    if(clienteExibAtivCI){
        cy.contains('mat-label','Cliente').closest('div').find('input').clear().type(`${clienteExibAtivCI}`);   
    }
    if(consultorExibAtivCI){
        cy.contains('mat-label','Consultor').closest('div').find('input').scrollIntoView().should('be.visible').clear().type(`${consultorExibAtivCI}`);
    }
    cy.contains('span','FILTRAR').click();
    cy.wait('@filtroExibAtiv').then((interception) =>{
        expect(interception.response.statusCode).to.eq(200);
    });
}