import { elementosExibirAtiv } from "../../elements/elementsAtiv";
import { elementosFiltroAtivCheckIn } from "../filtors/filtrosAtividades_helpers";
import { a2wWebExibirAtividade } from "../visit/visit_helpers"

export const filtroAtivCheckInHelper = (idAtividadeCheckIn, clienteAtivCheckIn, consultorAtivCheckIn) => {

    // Acessando a pagina de 'Exibir Atividade'
    a2wWebExibirAtividade();

    // Intercept para capturar os dados da paginação (movido para antes do filtro)
    cy.intercept('POST', '/api/v1/Atividades/PostAtividadePaginacao*').as('paginacao')

    // Realizando o filtro com a atividade desejada
    elementosFiltroAtivCheckIn(idAtividadeCheckIn, clienteAtivCheckIn, consultorAtivCheckIn);
    
    // Função auxiliar para aguardar a requisição correta
    const aguardarPaginacaoCorreta = () => {
        return cy.wait('@paginacao', { timeout: 10000 }).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            const lista = interception.response.body.list;
            const primeiroItemId = lista.length > 0 ? lista[0].idAtividade : null;

            if (primeiroItemId !== idAtividadeCheckIn) {
                console.log(`Ignorando ID ${primeiroItemId}. Aguardando a requisição correta para o ID ${idAtividadeCheckIn}...`);
                // Recursão para tentar novamente
                return aguardarPaginacaoCorreta();
            }

            return interception;
        });
    };

    // Validando que os dados do filtro batem com o da paginação
    aguardarPaginacaoCorreta().then((interception) => {
        const lista = interception.response.body.list;
        const atividade = lista.find(item => item.idAtividade === idAtividadeCheckIn);

        console.log('Dados da API CORRETA:', lista);

        // Validações finais
        expect(atividade, 'Atividade deve existir no JSON').to.not.be.undefined;
        expect(atividade.idAtividade).to.equal(idAtividadeCheckIn);
        expect(atividade.nmCliente).to.equal(clienteAtivCheckIn);
        expect(atividade.nmVendedor).to.equal(consultorAtivCheckIn);
        expect(atividade.idStatus).to.equal(3);
    });

    // Faz uma validação minima da UI para validar sua visualização
    cy.get(elementosExibirAtiv.exibCampoId).should('be.visible').and('contain', idAtividadeCheckIn);
}