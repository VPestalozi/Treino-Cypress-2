import '../../support/authCommands'
import '../../support/ativiPageCommands'

describe('Usuario deve conseguir fazer todos os processos das atividades', () => {
    let dadosCheckIn;
    let dadosExibir;
    let dados;

    before(() =>{
        cy.fixture('newAtividadeCheckIn').then((dadosNewAtiv) =>{
            dadosCheckIn = dadosNewAtiv;
        })
        cy.fixture('exibAtivCheckIn').then((dadosExibAtiv)=>{
            dadosExibir = dadosExibAtiv;
        })
        cy.fixture('authLogin').then((dadosLogin) =>{
            dados = dadosLogin;
        });
    });
    
    beforeEach(() => {
        cy.login(dados.email, dados.password);
    })

    after(() => {
        cy.limparFiltro();
    });
    
    it('Cria uma atividade do tipo Check-In sem notificação',() => {
        cy.newAtividadeCheckIn(
            dadosCheckIn.consultorNewAtivCheckIn,
            dadosCheckIn.clienteNewAtivCheckIn,
            dadosCheckIn.empresaNewAtivCheckIn,
            dadosCheckIn.semNotificacao
        );
    });

    it('Busca por atividade do tipo Check-in e limpa o filtro',() => {
        cy.filtroExibAtivCheckIn(
            dadosExibir.idExibAtivCheckIn,
            dadosExibir.clienteExibAtivCheckIn,
            dadosExibir.consultorExibAtivCheckIn
        );
    });
    
    it('Cria e visualiza uma atividade do tipo Check-In sem notificação',() => {
        cy.newAtividadeCheckIn(
            dadosCheckIn.consultorNewAtivCheckIn,
            dadosCheckIn.clienteNewAtivCheckIn,
            dadosCheckIn.empresaNewAtivCheckIn,
            dadosCheckIn.semNotificacao
        );
        cy.get('@idAtividadeCap').then((idAtivCapturado) => {
            expect(idAtivCapturado, 'O ID deve ser um numero').to.be.a('number');
            expect(idAtivCapturado).to.not.be.NaN;
            expect(idAtivCapturado).to.be.greaterThan(0);
            cy.filtroExibAtivCheckIn(idAtivCapturado);
        });
    });
});