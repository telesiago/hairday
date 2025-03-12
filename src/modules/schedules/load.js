import { hoursLoad } from "../form/hours-load.js"

const selectedDate = document.getElementById("date")
export function schedulesDay(){
    const date = selectedDate.value
    // Renderiza as horas disponíveis
    hoursLoad({date})
}