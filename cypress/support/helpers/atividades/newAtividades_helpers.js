import { a2wWebNewAtividade } from "../visit/visit_helpers";

export const newAtividadeCIHelper = (consultorNewAtivCI,clienteNewAtivCI,empresaNewAtivCI,notifica) => {
    a2wWebNewAtividade();
    cy.intercept('POST', '/api/v1/Atividades').as('newAtivCheckIn');
    cy.intercept('POST', '/api/v1/Notificacoes').as('newAtivCheckInNotifi');
    cy.contains('mat-label', 'Tipo de Atividade').closest('div').find('input').click();
    cy.contains('span', 'Check-in').click();
    cy.contains('mat-label', 'Consultor').closest('div').find('input').type(consultorNewAtivCI);
    cy.contains('span', `${consultorNewAtivCI}`).click();
    cy.contains('mat-label', 'Cliente').closest('div').find('input').type(clienteNewAtivCI);
    cy.contains('span', `${clienteNewAtivCI}`).click();
    cy.contains('mat-label', 'Empresa').closest('div').find('input').clear().type(empresaNewAtivCI);
    cy.contains('span', `${empresaNewAtivCI}`).click();
    cy.contains('span', ' Adicionar ').click();
    cy.wait('@newAtivCheckIn').then((interception) => {
        const idAtividade = interception.response.body.idAtividade;
        expect(interception.response.statusCode).to.eq(200);
        cy.wrap(idAtividade).as('idAtividadeCap');
    });
    cy.contains('span', `${notifica}`).click();
    cy.wait('@newAtivCheckInNotifi').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
    cy.contains('span',' Atividades ').should('have.text',' Atividades ');
}