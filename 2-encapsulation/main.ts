import { CalculatorButton } from './calculator-button'
import { CalculatorDisplay } from './calculator-display'
import { CalculatorExpression } from './calculator-expression'
import { injectCss } from './utils'

class Calculator {
  private root: HTMLDivElement
  private display: CalculatorDisplay
  private expression: CalculatorExpression
  private buttons: CalculatorButton[]

  constructor() {
    this.display = new CalculatorDisplay()
    this.expression = new CalculatorExpression()

    this.buttons = [
      new CalculatorButton('7'),
      new CalculatorButton('8'),
      new CalculatorButton('9'),
      new CalculatorButton('/'),
      new CalculatorButton('4'),
      new CalculatorButton('5'),
      new CalculatorButton('6'),
      new CalculatorButton('-'),
      new CalculatorButton('1'),
      new CalculatorButton('2'),
      new CalculatorButton('3'),
      new CalculatorButton('+'),
      new CalculatorButton('0'),
      new CalculatorButton('*')
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
