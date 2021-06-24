enum Months {
  stycznia,
  lutego,
  marca,
  kwietnia,
  maja,
  czerwca,
  lipca,
  sierpnia,
  września,
  października,
  listopada,
  grudnia
}

export function dateToString(date?: Date) {
  if(!date){
    date = new Date()
  }
  return `${date.getDate()} ${Months[date.getMonth()]} ${date.getFullYear()}`;
}