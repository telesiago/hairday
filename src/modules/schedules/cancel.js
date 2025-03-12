import { scheduleCancel } from "../../services/schedule-cancel"
import { schedulesDay } from "./load"

const periods = document.querySelectorAll(".period")

// Gera evento para cada lista (Manhã, tarde e noite)
periods.forEach((period) => {
    // Captura o evento de clique na lista
    period.addEventListener("click", async (event) =>{
        if(event.target.classList.contains("cancel-icon")){
            // Obtém a li pai do elemento clicado.
            const item = event.target.closest("li")
            // pega o id do agendamento para remover
            const {id} = item.dataset
            
            // Confirma que o id foi selecionado
            if(id){
                const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?")
                
                if(isConfirm){
                    await scheduleCancel({id})
                    schedulesDay()
                }
            }

        }
    })
})