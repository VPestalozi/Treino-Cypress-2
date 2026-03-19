import '../../support/authCommands'

describe('Usuario deve fazer a etapa de autentificação com sucesso', () => {
    
    beforeEach(function () {
        cy.fixture('authLogin').then((dados) =>{
            this.dados = dados;
        });
    });
    
    it('Realizar login com sucesso',function () {
        cy.login(this.dados.email, this.dados.password);
    });
});