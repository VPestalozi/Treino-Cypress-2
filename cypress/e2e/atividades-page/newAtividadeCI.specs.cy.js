import '../../support/authCommands'
import '../../support/ativiPageCommands'

describe('Usuario deve cnseguir criar e examinar uma atividade', () => {
    let dadosCI;
    let dadosExibir;
    let dados;

    before(function () {
        cy.fixture('newAtividadeCheckIn').then((dadosCheckIn) =>{
            dadosCI = dadosCheckIn;
        })
        cy.fixture('exibAtivCheckIn').then((dadosExibAtiv)=>{
            dadosExibir = dadosExibAtiv;
        })
        cy.fixture('authLogin').then((dadosLogin) =>{
            dados = dadosLogin;
        });
    });

    beforeEach(function() {
        cy.login(dados.email, dados.password);
    })

    afterEach(function() {
        cy.logout(dados.username);
    })

    it('Cria uma atividade do tipo Check-In sem notificação',function () {
        cy.newAtividadeCheckIn(
            dadosCI.consultorNewAtivCI,
            dadosCI.clienteNewAtivCI,
            dadosCI.empresaNewAtivCI,
            dadosCI.semNotificacao
        );
    });

    it('Busca por atividade do tipo Check-in',function(){
        cy.exibAtivCheckIn(
            dadosExibir.idExibAtivCI,
            dadosExibir.clienteExibAtivCI,
            dadosExibir.consultorExibAtivCI
        );
    });

    it('Cria e visualiza uma atividade do tipo Check-In sem notificação', function() {
        cy.newAtividadeCheckIn(
            dadosCI.consultorNewAtivCI,
            dadosCI.clienteNewAtivCI,
            dadosCI.empresaNewAtivCI,
            dadosCI.semNotificacao
        );
        cy.get('@idAtividadeCap').then((idAtivCapturado) => {
            expect(idAtivCapturado, 'O ID deve ser um numero').to.be.a('number');
            expect(idAtivCapturado).to.not.be.NaN;
            expect(idAtivCapturado).to.be.greaterThan(0);
            cy.exibAtivCheckIn(
                idAtivCapturado,
                dadosCI.clienteNewAtivCI,
                dadosCI.consultorNewAtivCI
            );
        });
    });
});