import { elementosNewAtiv } from "../../elements/elementsAtiv";
import { a2wWebNewAtividade } from "../visit/visit_helpers";

export const newAtividadeCIHelper = (consultorNewAtivCI,clienteNewAtivCI,empresaNewAtivCI,notifica) => {
    a2wWebNewAtividade();
    cy.intercept('POST', '/api/v1/Atividades').as('newAtivCheckIn');
    cy.intercept('POST', '/api/v1/Notificacoes').as('newAtivCheckInNotifi');
    cy.get(elementosNewAtiv.barraDeTipoAtiv).click();
    cy.contains('span', 'Check-in').click();
    cy.get(elementosNewAtiv.barraConsultorAtiv).type(consultorNewAtivCI);
    cy.contains('span', `${consultorNewAtivCI}`).click();
    cy.get(elementosNewAtiv.barraClienteAtiv).type(clienteNewAtivCI);
    cy.contains('span', `${clienteNewAtivCI}`).click();
    cy.get(elementosNewAtiv.barraEmpresaAtiv).click().clear().type(empresaNewAtivCI);
    cy.contains('span', `${empresaNewAtivCI}`).click();
    cy.get(elementosNewAtiv.botaoAddNewAtiv).click();
    cy.wait('@newAtivCheckIn').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);

        const idAtiv = interception.response.body.idAtividade;
        const numero = (idAtiv != "" && idAtiv !== null) ? Number(idAtiv) : NaN;
        expect(numero, `ID Capturado ${idAtiv}`).to.be.a('number');
        expect(numero).to.not.be.NaN;
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