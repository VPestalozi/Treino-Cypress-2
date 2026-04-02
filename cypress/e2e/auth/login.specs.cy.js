import '../../support/authCommands'

describe('Usuario deve fazer a etapa de autentificação com sucesso', () => {
    let dados;

    beforeEach(() => {
        cy.fixture('authLogin').then((dadosLogin) =>{
            dados = dadosLogin;
        });
    });
    
    it('Realizar login com sucesso',() => {
        cy.login(dados.email, dados.password);
    });

    it('Realiza login com sucesso e depois logout',() => {
        cy.login(dados.email, dados.password);
        cy.logout(dados.username);
    });
});