import { CalculatorButton } from './button/calculator-button'
import { ClearButton } from './button/clear-button'
import { NumberButton } from './button/number-button'
import { DivideButton } from './operators/DivideOperator'
import { SubtractionButton } from './operators/SubtractOperator'
import { AddButton } from './operators/AddOperator'
import { MultiplyButton } from './operators/MultiplyOperator'
import { ProcessButton } from './button/process-button'
import { CalculatorDisplay } from './calculator-display'
import { CalculatorExpression } from './calculator-expression'
import { CalculatorHistory } from './calculator-history'
import { CalculatorModel } from './calculator-model'
import { injectCss } from './utils'
import { PowButton } from './operators/PowOperator'

class Calculator {
  private root: HTMLDivElement
  private display: CalculatorDisplay
  private expression: CalculatorExpression
  private model: CalculatorModel
  private history: CalculatorHistory
  private buttons: CalculatorButton[]

  constructor() {
    this.display = new CalculatorDisplay()
    this.expression = new CalculatorExpression()
    this.history = new CalculatorHistory()
    this.model = new CalculatorModel(
      this.display,
      this.expression,
      this.history
    )

    this.buttons = [
      // 1 row
      new NumberButton('7', this.model),
      new NumberButton('8', this.model),
      new NumberButton('9', this.model),
      new DivideButton(this.model),
      // 2 row
      new NumberButton('4', this.model),
      new NumberButton('5', this.model),
      new NumberButton('6', this.model),
      new MultiplyButton(this.model),
      // 3 row
      new NumberButton('1', this.model),
      new NumberButton('2', this.model),
      new NumberButton('3', this.model),
      new SubtractionButton(this.model),
      // 4 row
      new NumberButton('0', this.model),
      new ClearButton(this.model),
      new ProcessButton(this.model),
      new AddButton(this.model),
      // 5 row
      new PowButton(this.model)
    ]

    this.root = this.createRoot()
  }

  public renderTo(container: Element) {
    this.initCss()
    container.append(this.root)
  }

  private createRoot() {
    const root = document.createElement('div')
    root.classList.add('calculator')

    this.expression.renderTo(root)
    this.display.renderTo(root)

    const buttonsContainer = document.createElement('div')
    buttonsContainer.classList.add('calculator_buttons')

    this.buttons.forEach((button) => {
      button.renderTo(buttonsContainer)
    })

    root.append(buttonsContainer)

    this.history.renderTo(root)

    return root
  }

  private initCss() {
    injectCss(
      /* css*/ `
      .calculator {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
        margin: 20px 0;
      }

      .calculator_buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin: 10px 0;
      }
        `,
      'calculator'
    )
  }
}

const calculator1 = new Calculator()
calculator1.renderTo(document.body)

const calculator2 = new Calculator()
calculator2.renderTo(document.body)
