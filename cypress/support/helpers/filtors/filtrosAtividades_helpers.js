import { a2wWebExibirAtividade } from "../visit/visit_helpers"

export const limparFiltroAtiv = () => {
    a2wWebExibirAtividade();
    cy.intercept('POST', '/api/v1/user/salvar-filtro').as('filtroExibAtivLimpar');
    cy.contains('mat-icon', 'filter_list').parent().click();
    cy.contains('span','LIMPAR FILTROS').click();
    cy.wait('@filtroExibAtivLimpar').then((interception) =>{
        expect(interception.response.statusCode).to.eq(200);
    });
    cy.contains('span','OPÇÕES DE FILTROS').should('have.text','OPÇÕES DE FILTROS');
}

export const filtroAtividadeCI = (idAtividade,clienteExibAtivCI,consultorAtivCI) => {
    limparFiltroAtiv();
    cy.intercept('POST', '/api/v1/user/salvar-filtro').as('filtroExibAtiv');
    cy.contains('mat-icon', 'filter_list').parent().click();
    cy.contains('mat-label','Tipo de Atividade').closest('div').find('mat-select').click();
    cy.contains('span','Check-in').click();
    if(idAtividade){
        cy.contains('mat-label','Id').closest('div').find('input').clear().type(`${idAtividades}`);
    }
    if(clienteExibAtivCI){
        cy.contains('mat-label','Cliente').closest('div').find('input').clear().type(`${clienteAtivCI}`);   
    }
    if(consultorAtivCI){
        cy.contains('mat-label','Consultor').closest('div').find('input').scrollIntoView().should('be.visible').clear().type(`${consultorAtivCI}`);
    }
    cy.contains('span','FILTRAR').click();
    cy.wait('@filtroExibAtiv').then((interception) =>{
        expect(interception.response.statusCode).to.eq(200);
    });
}