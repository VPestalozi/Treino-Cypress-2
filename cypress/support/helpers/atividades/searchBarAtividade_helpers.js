import { elementosExibirAtiv } from "../../elements/elementsAtiv";
import { limparFiltroAtiv } from "../filtors/filtrosAtividades_helpers";

export const searchBarAtivHelperID = (idPesquisa) => {

    limparFiltroAtiv();

    // Intercepta a rota da barra de pesquisa
    cy.intercept('POST', '/api/v1/ParceiroNegocio/filtrarazao').as('barraPesquisa');

    // Digita o id na barra de pesquisa
    cy.get(elementosExibirAtiv.barraDePesquisa).type(`${idPesquisa}`);

    // Captura e intercepta a rota da barra de pesquisa para validar o conteudo
    cy.wait('@barraPesquisa').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.request.body).to.deep.equal({
            nomeRazaoSocial: `${idPesquisa}`
        });
    });

    // Valida se o ID exibido esta correto
    cy.get(elementosExibirAtiv.exibCampoId).should('have.text', `${idPesquisa}`);
}