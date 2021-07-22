export function getDate(date: string) {
  const dateObj = new Date(date);
  const dateToShow = `${dateObj.getDate()} ${Month[dateObj.getMonth()]} ${dateObj.getFullYear()}`

  return dateToShow;
}

enum Month {
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
