import { elementosExibirAtiv } from "../../elements/elementsAtiv";
import { a2wWebExibirAtividade } from "../visit/visit_helpers";

export const searchBarAtivHelperID = (idPesquisa) => {

    // Verifica se o teste esta ou não na pagina desejada 
    cy.url().then((urlAtual) => {
        // Se estiver na pagina correta avisa no terminal do cypress
        if(urlAtual.includes('/a2w/gestor/atividades')){
            cy.log('Ja estou na página correta. Seguindo os testes....');
        } else { 
            cy.log('URL diferente. Indo para a pagina correta...');
            a2wWebExibirAtividade();
        }
    })

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