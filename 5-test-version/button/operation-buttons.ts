import type { CalculatorModel } from '../calculator-model'
import { CalculatorButton } from './calculator-button'

export class MultiplyButton extends CalculatorButton {
  constructor(private model: CalculatorModel) {
    super('*')
  }
  onClick() {
    this.model.addOperator('*')
  }
}

export class AddButton extends CalculatorButton {
  constructor(private model: CalculatorModel) {
    super('+')
  }
  onClick() {
    this.model.addOperator('+')
  }
}

export class SubtractionButton extends CalculatorButton {
  constructor(private model: CalculatorModel) {
    super('-')
  }

  onClick() {
    this.model.addOperator('-')
  }
}

export class DivideButton extends CalculatorButton {
  constructor(private model: CalculatorModel) {
    super('/')
  }

  onClick() {
    this.model.addOperator('/')
  }
}
