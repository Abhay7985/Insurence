const weekName = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]
const getWeekName = (index: number) => {
    console.log('getWeekName called', index);
    console.log('getWeekName called', weekName[index]);

    return weekName[index]
}

export default {
    getWeekName
}