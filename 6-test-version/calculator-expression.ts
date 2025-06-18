import type { CalculatorSubscriber } from './calculator-model'
import type { BiOperator } from './operator'
import { injectCss } from './utils'

export class CalculatorExpression {
  private root: HTMLDivElement

  public readonly subscriber = new ExpressionSubscriber(this)

  constructor() {
    this.root = this.createRoot()
  }

  public renderTo(container: Element) {
    this.initCss()
    container.append(this.root)
  }

  public setOperator(firstOperand: number, operator: BiOperator) {
    this.root.innerText = operator.getExpression(firstOperand)
  }

  public clear() {
    this.root.innerText = ''
  }

  private createRoot() {
    const root = document.createElement('div')
    root.classList.add('calculator_expression')
    root.innerText = ''
    return root
  }

  private initCss() {
    injectCss(
      /* css*/ `
    .calculator_expression {
      font-size: 18px;
      color: #666;
      margin-bottom: 5px;
      min-height: 24px;
      padding: 5px 10px;
    }
          `,
      'calculator_expression'
    )
  }
}

class ExpressionSubscriber implements CalculatorSubscriber {
  constructor(private expression: CalculatorExpression) {}
  currentOperandUpdated(): void {}

  biOperatorAdded(): void {
    this.expression.clear()
  }

  unOperatorCalculated(): void {}

  biOperatorCalculated(e: { result: number }): void {
    this.expression.clear()
  }

  cleared(): void {
    this.expression.clear()
  }
}
