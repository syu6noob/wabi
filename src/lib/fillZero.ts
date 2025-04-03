export default function fillZero(
  value: number,
  digit: number
): string {
  return String(value).padStart(digit, '0');
}