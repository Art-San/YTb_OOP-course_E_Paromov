import type { Operator } from './operator'

export class AddOperator implements Operator {
  calculate(firstOperand: number, secondOperand: number): number {
    return firstOperand + secondOperand
  }
  getExpression(firstOperand: number): string {
    return `${firstOperand} +`
  }
  getHistoryText(firstOperand: number, secondOperand: number): string {
    return `${firstOperand} + ${secondOperand} = ${this.calculate(
      firstOperand,
      secondOperand
    )}`
  }
  getHistoryClass(): string {
    return `add`
  }
}
