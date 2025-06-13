import type { CalculatorModel } from '../calculator-model'
import { CalculatorButton } from './calculator-button'

export class NumberButton extends CalculatorButton {
  constructor(private digit: string, private model: CalculatorModel) {
    super(digit)
    // this.onClick(() => model.addDigit(digit))
  }
  onClick() {
    this.model.addDigit(this.digit)
  }
}
