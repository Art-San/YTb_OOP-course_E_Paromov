export interface Operator {
  calculate(firstOperand: number, secondOperand: number): number
  getExpression(firstOperand: number): string

  getHistoryText(firstOperand: number, secondOperand: number): string
  getHistoryClass(): string
}
