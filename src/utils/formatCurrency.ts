export default function toWon(param: number): string {
  if (param && !Number.isNaN(param)) {
    return `₩${param.toLocaleString()}`
  }
  return '₩0'
}
