export function currencyFormat (value: number, currency: string = 'BRL') {
  const currencyFormatted = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency
  })

  return currencyFormatted
}
