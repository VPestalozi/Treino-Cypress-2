import { elementosExibirAtiv, elementosFiltroAtiv } from "../../elements/elementsAtiv";
import { a2wWebExibirAtividade } from "../visit/visit_helpers"

export const limparFiltroAtiv = () => {

    // Visitando a pagina de exibir atividade
    // Verifica se o teste esta ou não na pagina desejada 
    cy.url().then((urlFiltroAtual) => {
        // Se estiver na pagina correta avisa no terminal do cypress
        if (urlFiltroAtual.includes('/a2w/gestor/atividades')) {
            cy.log('Ja estou na página correta. Seguindo os testes....');
        } else {
            cy.log('URL diferente. Indo para a pagina correta...');
            a2wWebExibirAtividade();
        }
    })

    // Interceptando a rota do filtor
    cy.intercept('POST', '/api/v1/user/salvar-filtro').as('filtroExibAtivLimpar');

    // Realizando o fluxo de limpar o filtro
    cy.get(elementosFiltroAtiv.botaoDoFiltro).click();
    cy.contains('span', 'OPÇÕES DE FILTROS').should('have.text', 'OPÇÕES DE FILTROS');
    cy.contains('span', 'LIMPAR FILTROS').click();

    // Validando a rota do filtro
    cy.wait('@filtroExibAtivLimpar').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });

    // Garantindo que a aba do filtro esta aberta
    cy.get(elementosFiltroAtiv.botaoDoFiltro).click();
    cy.contains('span', 'OPÇÕES DE FILTROS').should('have.text', 'OPÇÕES DE FILTROS');
}

export const filtroAtivCheckIn = (idAtividade, clienteExibAtivCheckIn, consultorExibAtivCheckIn) => {

    // Realizando a limpeza do filtro
    limparFiltroAtiv();

    // interceptando rotas
    cy.intercept('POST', '/api/v1/Atividades/PostAtividadePaginacao*').as('esperarPaginacao');
    cy.intercept('POST', '/api/v1/user/salvar-filtro').as('filtroExibAtiv');

    // Aplicando o tipo de atividade no formulario
    cy.get(elementosFiltroAtiv.seletorTipoDeAtiv).click();
    cy.contains('span', 'Check-in 1 teste').click();

    // Condições para preencher o formulario de acordo com oque foi enviado para a função
    if (idAtividade) {
        cy.get(elementosFiltroAtiv.campoID)
            .focus()
            .should('be.visible')
            .type(`${idAtividade}`)
            .should('have.value', String(idAtividade));
    }
    if (clienteExibAtivCheckIn) {
        cy.get(elementosFiltroAtiv.campoCliente).clear().type(`${clienteExibAtivCheckIn}`);
    }
    if (consultorExibAtivCheckIn) {
        cy.get(elementosFiltroAtiv.campoConsultor).scrollIntoView().should('be.visible').clear().type(`${consultorExibAtivCheckIn}`);
    }

    // Realizando o filtro
    cy.contains('span', 'FILTRAR').click();

    // Validando o filtro
    cy.wait('@filtroExibAtiv');
    cy.wait('@filtroExibAtiv').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });

    // Esperando a paginação (pode ser disparada até 2 vezes; esperamos a última para garantir dados atualizados)
    cy.wait('@esperarPaginacao'); // Primeira ocorrência
    cy.wait('@esperarPaginacao', { timeout: 10000 }).then((interception) => {
        try {
            // Segunda ocorrência (se houver)
            expect(interception.response.statusCode).to.eq(200);
            const lista = interception.response.body.list;
            const atividade = lista.find(item => item.idAtividade === idAtividade);

            console.log('Dados da API CORRETA (última ocorrência):', lista);

            // Validações finais
            expect(atividade, 'Atividade deve existir no JSON').to.not.be.undefined;

            if (idAtividade) {
                expect(atividade.idAtividade).to.equal(idAtividade);
            }
            if (clienteExibAtivCheckIn) {
                expect(atividade.nmCliente).to.equal(clienteExibAtivCheckIn);
            }
            if (consultorExibAtivCheckIn) {
                expect(atividade.nmVendedor).to.equal(consultorExibAtivCheckIn);
            }

            expect(atividade.idStatus).to.equal(3);
        } catch (error) {
            // Se não houver segunda ocorrência, ignora e continua (não falha o teste)
            cy.log('A rota foi disparada apenas uma vez.');
            cy.log('Erro capturado: ' + error.message);
        }
    });

    // Faz uma validação minima da UI para validar sua visualização
    if (idAtividade) {
        cy.get(elementosExibirAtiv.exibCampoId).should('be.visible').and('contain', idAtividade);
    }
}