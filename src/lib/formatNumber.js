export function formatNumber(number) {
  // format number e.g 1500 to 1.5k and 1120000 to 1.12m
  if (number < 1e3) return number
  if (number >= 1e3 && number < 1e6) return +(number / 1e3).toFixed(2) + "k"
  if (number >= 1e6 && number < 1e9) return +(number / 1e6).toFixed(2) + "m"
  if (number >= 1e9 && number < 1e12) return +(number / 1e9).toFixed(2) + "b"
}