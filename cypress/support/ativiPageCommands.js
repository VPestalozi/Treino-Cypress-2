import { exibirAtivCIHelper } from "./helpers/atividades/findAtividade_helpers";
import { newAtividadeCIHelper } from "./helpers/atividades/newAtividades_helpers"

Cypress.Commands.add('newAtividadeCheckIn', (consultorNewAtivCI,clienteNewAtivCI,empresaNewAtivCI,notifica) =>{
    newAtividadeCIHelper(consultorNewAtivCI,clienteNewAtivCI,empresaNewAtivCI,notifica);
})

Cypress.Commands.add('exibAtivCheckIn',(idExibAtivCI, clienteExibAtivCI, consultorExibAtivCI)=> {
    exibirAtivCIHelper(idExibAtivCI,clienteExibAtivCI,consultorExibAtivCI);
})