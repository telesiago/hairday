import dayjs from "dayjs"
import { scheduleNew } from "../../services/schedule-new";
import { schedulesDay } from "../schedules/load";


const form = document.querySelector("form");
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// Date atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual e Define a data mínima como sendo a data atual
selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
    event.preventDefault()

    try {
        // Recuperando o nome do cliente
        const name = clientName.value.trim();

        if(!name) {
            return alert("Informe o nome do cliente!")
        }

        // Recupera o horário selecionado.
        const hourSelected = document.querySelector(".hour-selected")

        if(!hourSelected) {
            return alert("Selecione a hora!")
        }

        // Recupera somente a hora
        const [hour] = hourSelected.innerText.split(":")
        
        // Insere a hora na data
        const when = dayjs(selectedDate.value).add(hour, "hour")
        
        // Gera um ID
        const id = new Date().getTime().toString()
        
        

        // Faz o agendamento
        await scheduleNew({
            id,
            name,
            when
        })

        // Recarrega os agendamentos
        await schedulesDay()

        // Limpa o input do nome do cliente
        clientName.value = ""
    } catch (error) {
        alert("Não foi possível realizar o agendamento.")
        console.log(error);
        
    }
}