import { a2wWebNewAtividade } from "../visit/visit_helpers";

export const newAtividadeHelper = () => {
    a2wWebNewAtividade();
    cy.intercept('POST', '/api/v1/Atividades').as('newAtivCheckIn');
    cy.contains('mat-label', 'Tipo de Atividade').closest('div').find('input').click();
    cy.contains('span', 'Check-in').click();
    cy.contains('mat-label', 'Consultor').closest('div').find('input').type(consultorNewAtivCI);
    cy.contains('span', `${consultorNewAtivCI}`).click();
    cy.contains('mat-label', 'Cliente').closest('div').find('input').type(clienteNewAtivCI);
    cy.contains('span', `${clienteNewAtivCI}`).click();
    cy.contains('mat-label', 'Empresa').closest('div').find('input').clear().type(empresaNewAtivCI);
    cy.contains('span', `${empresaNewAtivCI}`).click();
    cy.wait('@newAtivCheckIn').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
}