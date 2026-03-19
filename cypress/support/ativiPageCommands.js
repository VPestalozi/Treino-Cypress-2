import { newAtividadeCIHelper } from "./helpers/atividades/newAtividades_helpers"

Cypress.Commands.add('newAtividadeCheckIn', (consultorNewAtivCI,clienteNewAtivCI,empresaNewAtivCI,notifica) =>{
    newAtividadeCIHelper(consultorNewAtivCI,clienteNewAtivCI,empresaNewAtivCI,notifica);
})