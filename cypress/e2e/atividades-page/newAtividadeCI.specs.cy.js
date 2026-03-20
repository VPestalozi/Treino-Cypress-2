import '../../support/authCommands'
import '../../support/ativiPageCommands'

describe('Usuario deve cnseguir criar e examinar uma atividade', () => {
    
    before(function () {
        cy.fixture('newAtividadeCheckIn').then((dadosCheckIn) =>{
            this.dadosCheckIn = dadosCheckIn;
        })
        cy.fixture('exibAtivCheckIn').then((dadosExibAtiv)=>{
            this.dadosExibAtiv = dadosExibAtiv;
        })
        cy.fixture('authLogin').then((dadosLogin) =>{
            this.dadosLogin = dadosLogin;
        });
    });

    beforeEach(function() {
        cy.login(this.dadosLogin.email, this.dadosLogin.password);
    })
    /*
    it('Cria uma atividade do tipo Check-In sem notificação',function () {
        cy.login(this.dadosLogin.email, this.dadosLogin.password);
        cy.newAtividadeCheckIn(
            this.dadosCheckIn.consultorNewAtivCI,
            this.dadosCheckIn.clienteNewAtivCI,
            this.dadosCheckIn.empresaNewAtivCI,
            this.dadosCheckIn.semNotificacao
        );
    });

    it('Busca por atividade do tipo Check-in',function(){
        cy.login(this.dadosLogin.email, this.dadosLogin.password);
        cy.exibAtivCheckIn(this.dadosExibAtiv.idExibAtivCI,
            this.dadosExibAtiv.clienteExibAtivCI,
            this.dadosExibAtiv.consultorExibAtivCI
        );
    });
    */
    it('Cria e visualiza uma atividade do tipo Check-In sem notificação', function() {
        cy.newAtividadeCheckIn(
            this.dadosCheckIn.consultorNewAtivCI,
            this.dadosCheckIn.clienteNewAtivCI,
            this.dadosCheckIn.empresaNewAtivCI,
            this.dadosCheckIn.semNotificacao
        );
        cy.get('@idAtividadeCap').then((idAtivCapturado) => {
            cy.exibAtivCheckIn(idAtivCapturado,this.dadosCheckIn.clienteNewAtivCI,this.dadosCheckIn.consultorNewAtivCI);
        });
    });
});