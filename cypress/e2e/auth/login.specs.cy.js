import '../../support/authCommands'

describe('Usuario deve fazer a etapa de autentificação com sucesso', () => {
    let dados;
    
    beforeEach(function () {
        cy.fixture('authLogin').then((dadosLogin) =>{
            dados = dadosLogin;
        });
    });
    
    it('Realizar login com sucesso',function () {
        cy.login(dados.email, dados.password);
    });

    it('Realiza login com sucesso e depois logout',function () {
        cy.login(dados.email, dados.password);
        cy.logout(dados.username);
    });
});