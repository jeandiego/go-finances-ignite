export function dateFormat (date: string, language: string = 'pt-BR') {
  const dateFormatted = Intl.DateTimeFormat(language, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(new Date(date))

  return dateFormatted
}
