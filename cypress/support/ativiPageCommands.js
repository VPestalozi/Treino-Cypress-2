import { newAtividadeCIHelper } from "./helpers/atividades/newAtividades_helpers"

Cypress.Commands.add('newAtividadeCheckIn', (consultorNewAtivCI,clienteNewAtivCI,empresaNewAtivCI) =>{
    newAtividadeCIHelper(consultorNewAtivCI,clienteNewAtivCI,empresaNewAtivCI);
})