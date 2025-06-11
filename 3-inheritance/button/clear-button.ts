import type { CalculatorModel } from '../calculator-model'
import { injectCss } from '../utils'
import { CalculatorButton } from './calculator-button'

export class ClearButton extends CalculatorButton {
  constructor(model: CalculatorModel) {
    super('C')
    this.addClass('clear_calculator_button')
    this.onClick(() => {
      const isConfirm = confirm('Вы действительно?*')
      console.log(36, isConfirm)

      if (isConfirm) {
        model.clear()
      }
    })
  }

  protected initCss(): void {
    super.initCss()
    injectCss(
      /*css*/ `
      .clear_calculator_button {
        background: gray;
      }
      `,
      'clear_calculator_button'
    )
  }
}
