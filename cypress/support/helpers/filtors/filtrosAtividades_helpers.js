import { elementosFiltroAtiv } from "../../elements/elementsAtiv";
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
    cy.intercept('GET', '/api/v1/Atividades/GetAtividadePaginacao*').as('esperarPaginacao')
    cy.intercept('POST', '/api/v1/user/salvar-filtro').as('filtroExibAtiv');
    cy.get(elementosFiltroAtiv.seletorTipoDeAtiv).click();
    cy.contains('span','Check-in').click();
    if(idAtividade){
        cy.get(elementosFiltroAtiv.campoID).clear().type(`${idAtividade}`);
    }
    if(clienteExibAtivCI){
        cy.get(elementosFiltroAtiv.campoCliente).clear().type(`${clienteExibAtivCI}`);   
    }
    if(consultorExibAtivCI){
        cy.get(elementosFiltroAtiv.campoConsultor).scrollIntoView().should('be.visible').clear().type(`${consultorExibAtivCI}`);
    }
    cy.contains('span','FILTRAR').click();
    cy.wait('@filtroExibAtiv').then((interception) =>{
        expect(interception.response.statusCode).to.eq(200);
    });
    cy.wait('@esperarPaginacao').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
}