import type { CalculatorModel } from '../calculator-model'
import { CalculatorButton } from './calculator-button'

export class MultiplyButton extends CalculatorButton {
  constructor(model: CalculatorModel) {
    super('*')
    this.onClick(() => model.addOperator('*'))
  }
}

export class AddButton extends CalculatorButton {
  constructor(model: CalculatorModel) {
    super('+')
    this.onClick(() => model.addOperator('+'))
  }
}

export class SubtractionButton extends CalculatorButton {
  constructor(model: CalculatorModel) {
    super('-')
    this.onClick(() => model.addOperator('-'))
  }
}

export class DivideButton extends CalculatorButton {
  constructor(model: CalculatorModel) {
    super('/')
    this.onClick(() => model.addOperator('/'))
  }
}
