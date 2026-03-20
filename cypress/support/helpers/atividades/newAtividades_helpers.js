import { a2wWebNewAtividade } from "../visit/visit_helpers";

export const newAtividadeCIHelper = (consultorNewAtivCI,clienteNewAtivCI,empresaNewAtivCI,notifica) => {
    a2wWebNewAtividade();
    cy.intercept('POST', '/api/v1/Atividades').as('newAtivCheckIn');
    cy.intercept('POST', '/api/v1/Notificacoes').as('newAtivCheckInNotifi');
    cy.get('[data-test-id="atividade-input-tipo"]').click();
    cy.contains('span', 'Check-in').click();
    cy.contains('mat-label', 'Consultor').closest('div').find('input').type(consultorNewAtivCI);
    cy.contains('span', `${consultorNewAtivCI}`).click();
    cy.contains('mat-label', 'Cliente').closest('div').find('input').type(clienteNewAtivCI);
    cy.contains('span', `${clienteNewAtivCI}`).click();
    cy.contains('mat-label', 'Empresa').closest('div').find('input').click().clear().type(empresaNewAtivCI);
    cy.contains('span', `${empresaNewAtivCI}`).click();
    cy.contains('span', ' Adicionar ').click();
    cy.wait('@newAtivCheckIn').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);

        const idAtiv = interception.response.body.idAtividade;
        const numero = (idAtiv != "" && idAtiv !== null) ? Number(idAtiv) : NaN;
        expect(numero, `ID Capturado ${idAtiv}`)
            .to.not.be.NaN
            .and.to.be.a('number');
        expect(numero).to.be.greaterThan(0);
        cy.wrap(idAtiv).as('idAtividadeCap');
        cy.log(`ID validado: ${numero}`);
    });
    cy.contains('span', `${notifica}`).click();
    cy.wait('@newAtivCheckInNotifi').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
    cy.contains('span',' Atividades ').should('have.text',' Atividades ');
}