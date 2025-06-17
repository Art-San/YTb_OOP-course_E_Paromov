import { CalculatorButton } from '../button/calculator-button'
import type { CalculatorModel } from '../calculator-model'
import type { Operator } from '../operator'

class SubtractOperator implements Operator {
  calculate(firstOperand: number, secondOperand: number): number {
    return firstOperand - secondOperand
  }
  getExpression(firstOperand: number): string {
    return `${firstOperand} -`
  }
  getHistoryText(firstOperand: number, secondOperand: number): string {
    return `${firstOperand} - ${secondOperand} = ${this.calculate(
      firstOperand,
      secondOperand
    )}`
  }
  getHistoryClass(): string {
    return `subtract`
  }
}
export class SubtractionButton extends CalculatorButton {
  constructor(private model: CalculatorModel) {
    super('-')
  }
  onClick() {
    this.model.addOperator(new SubtractOperator())
  }
}
