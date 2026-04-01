import { elementosExibirAtiv, elementosFiltroAtiv } from "../../elements/elementsAtiv";
import { a2wWebExibirAtividade } from "../visit/visit_helpers"

export const limparFiltroAtiv = () => {

    // Visitando a pagina de exibir atividade
    a2wWebExibirAtividade();

    // Interceptando a rota do filtor
    cy.intercept('POST', '/api/v1/user/salvar-filtro').as('filtroExibAtivLimpar');

    // Realizando o fluxo de limpar o filtro
    cy.get(elementosFiltroAtiv.botaoDoFiltro).click();
    cy.contains('span','OPÇÕES DE FILTROS').should('have.text','OPÇÕES DE FILTROS');
    cy.contains('span','LIMPAR FILTROS').click();

    // Validando a rota do filtro
    cy.wait('@filtroExibAtivLimpar').then((interception) =>{
        expect(interception.response.statusCode).to.eq(200);
    });

    // Garantindo que a aba do filtro esta aberta
    cy.get(elementosFiltroAtiv.botaoDoFiltro).click();
    cy.contains('span','OPÇÕES DE FILTROS').should('have.text','OPÇÕES DE FILTROS');
}

export const filtroAtivCheckIn = (idAtividade,clienteExibAtivCheckIn,consultorExibAtivCheckIn) => {

    // Realizando a limpeza do filtro
    limparFiltroAtiv();

    // interceptando rotas
    cy.intercept('POST', '/api/v1/Atividades/PostAtividadePaginacao*').as('esperarPaginacao');
    cy.intercept('POST', '/api/v1/user/salvar-filtro').as('filtroExibAtiv');

    // Aplicando o tipo de atividade no formulario
    cy.get(elementosFiltroAtiv.seletorTipoDeAtiv).click();
    cy.contains('span','Check-in').click();

    // Condições para preencher o formulario de acordo com oque foi enviado para a função
    if(idAtividade){
        cy.get(elementosFiltroAtiv.campoID)
        .focus()
        .should('be.visible')
        .clear()
        .type(`${idAtividade}`)
        .should('have.value', String(idAtividade));
    }
    if(clienteExibAtivCheckIn){
        cy.get(elementosFiltroAtiv.campoCliente).clear().type(`${clienteExibAtivCheckIn}`);   
    }
    if(consultorExibAtivCheckIn){
        cy.get(elementosFiltroAtiv.campoConsultor).scrollIntoView().should('be.visible').clear().type(`${consultorExibAtivCheckIn}`);
    }

    // Realizando o filtro
    cy.contains('span','FILTRAR').click();

    // Validando o filtro
    cy.wait('@filtroExibAtiv').then((interception) =>{
        expect(interception.response.statusCode).to.eq(200);
    });

    // Esperando a paginação
    cy.wait('@esperarPaginacao').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });

   //cy.get(elementosExibirAtiv.formularioExibAtiv).should('be.visible');

}

export const filtroAtivCheckInComValidacao = (idAtividade, clienteExibAtivCheckIn, consultorExibAtivCheckIn) => {

    // Visitando a página
    a2wWebExibirAtividade();

    // Interceptando ANTES de aplicar o filtro
    cy.intercept('POST', '/api/v1/Atividades/PostAtividadePaginacao*').as('paginacao');

    // Aplicando o filtro
    filtroAtivCheckIn(idAtividade, clienteExibAtivCheckIn, consultorExibAtivCheckIn);

    // Função auxiliar recursiva para validar a paginação correta
    const validarPaginacaoCorreta = () => {
        return cy.wait('@paginacao', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            const lista = interception.response.body.list;
            const primeiroItemId = lista.length > 0 ? lista[0].idAtividade : null;

            if (primeiroItemId !== idAtividade) {
                console.log(`Ignorando ID ${primeiroItemId}. Aguardando a requisição correta para o ID ${idAtividade}...`);
                return validarPaginacaoCorreta();
            }

            return interception;
        });
    };

    // Validando que os dados do filtro batem com o da paginação
    validarPaginacaoCorreta().then((interception) => {
        const lista = interception.response.body.list;
        const atividade = lista.find(item => item.idAtividade === idAtividade);

        console.log('Dados da API CORRETA:', lista);

        // Validações finais
        expect(atividade, 'Atividade deve existir no JSON').to.not.be.undefined;
        expect(atividade.idAtividade).to.equal(idAtividade);
        expect(atividade.nmCliente).to.equal(clienteExibAtivCheckIn);
        expect(atividade.nmVendedor).to.equal(consultorExibAtivCheckIn);
        expect(atividade.idStatus).to.equal(3);
    });

    // Validação minima da UI
    cy.get(elementosExibirAtiv.exibCampoId).should('be.visible').and('contain', idAtividade);

}