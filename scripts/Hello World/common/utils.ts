export function toNumber(text: string) {
  const result = parseFloat(text)
  return isNaN(result) ? null : result
}