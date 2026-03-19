import '../../support/authCommands'
import '../../support/ativiPageCommands'

describe('Usuario deve cnseguir criar e examinar uma atividade', () => {
    
    beforeEach(function () {
        cy.fixture('authLogin').then((dadosLogin) =>{
            this.dadosLogin = dadosLogin;
        });
        cy.fixture('newAtividadeCheckIn').then((dadosCheckIn) =>{
            this.dadosCheckIn = dadosCheckIn;
        })
    });
    
    it('Cria uma atividade do tipo Check-In sem notificação',function () {
        cy.login(this.dadosLogin.email, this.dadosLogin.password);
        cy.newAtividadeCheckIn(
            this.dadosCheckIn.consultorNewAtivCI,
            this.dadosCheckIn.clienteNewAtivCI,
            this.dadosCheckIn.empresaNewAtivCI,
            this.dadosCheckIn.semNotificacao
        );
    });
});