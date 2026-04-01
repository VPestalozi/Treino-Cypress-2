import { filtroAtivCheckIn, limparFiltroAtiv } from "./helpers/filtors/filtrosAtividades_helpers";
import { newAtividadeCheckInHelper } from "./helpers/atividades/newAtividades_helpers"
import { searchBarAtivHelperID } from "./helpers/atividades/searchBarAtividade_helpers";


Cypress.Commands.add('newAtividadeCheckIn', (consultorNewAtivCheckIn,clienteNewAtivCheckIn,empresaNewAtivCheckIn,notifica) =>{
    newAtividadeCheckInHelper(consultorNewAtivCheckIn,clienteNewAtivCheckIn,empresaNewAtivCheckIn,notifica);
})

Cypress.Commands.add('filtroExibAtivCheckIn',(idExibAtivCheckIn, clienteExibAtivCheckIn, consultorExibAtivCheckIn)=> {
    filtroAtivCheckIn(idExibAtivCheckIn,clienteExibAtivCheckIn,consultorExibAtivCheckIn);
})

Cypress.Commands.add('searchBarID', (pesquisaID) =>{
    searchBarAtivHelperID(pesquisaID);
})

Cypress.Commands.add('limparFiltro', () =>{
    limparFiltroAtiv();
})