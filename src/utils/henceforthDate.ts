const weekName = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo",
]
const getWeekName = (index: number) => {
    console.log('getWeekName called', index);

    return weekName[index-1]
}

export default {
    getWeekName
}