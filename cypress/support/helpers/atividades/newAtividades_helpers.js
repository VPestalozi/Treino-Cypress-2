import { elementosNewAtiv } from "../../elements/elementsAtiv";
import { a2wWebNewAtividade } from "../visit/visit_helpers";

export const newAtividadeCheckInHelper = (consultorNewAtivCheckIn,clienteNewAtivCheckIn,empresaNewAtivCheckIn,notifica) => {

    a2wWebNewAtividade();
    
    // Criando os intercepts para as rotas a serem validadas
    cy.intercept('POST', '/api/v1/Atividades').as('newAtivCheckIn');
    cy.intercept('POST', '/api/v1/Notificacoes').as('newAtivCheckInNotifi');
    cy.intercept('GET', '/api/v1/VinculoTipoAtividadeGrupoEmpresa/SelecionarPorGrupoEmpresa/1').as('esperarEmpresa');
    
    // Adicionando tipo de atividade no formulario
    cy.get(elementosNewAtiv.barraDeTipoAtiv).click();
    cy.contains('span', 'Check-in').click();

    // Adicionando consultor no formulario
    cy.get(elementosNewAtiv.barraConsultorAtiv).type(consultorNewAtivCheckIn);
    cy.contains('span', `${consultorNewAtivCheckIn}`).click();

    // Adicionando o cliente no formulario
    cy.get(elementosNewAtiv.barraClienteAtiv).type(clienteNewAtivCheckIn);
    cy.contains('span', `${clienteNewAtivCheckIn}`).click();

    // Esperando aparecer a empresa no formulario para apagar
    cy.wait('@esperarEmpresa', {timeout: 10000}).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });

    // Adicionando a empresa vinculada ao consultor no formulario
    cy.get(elementosNewAtiv.barraEmpresaAtiv).clear().should('have.value','').type(empresaNewAtivCheckIn);
    cy.contains('span', `${empresaNewAtivCheckIn}`).should('be.visible').click();

    // Criando a atividade
    cy.get(elementosNewAtiv.botaoAddNewAtiv).click();

    // Validando a rota e capturando o id da atividade criada
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

    // Marcando para enviar a notificação para o consultor ou não
    cy.contains('span', `${notifica}`).click();

    // Validando a rota
    cy.wait('@newAtivCheckInNotifi').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });

    //cy.contains('span',' Atividades ').should('have.text',' Atividades ');
    cy.url().should('include', '/a2w/gestor/atividades');
}