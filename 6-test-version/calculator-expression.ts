import {
  BaseCalculatorSubscriber,
  type CalculatorSubscriber
} from './calculator-subscriber'
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

class ExpressionSubscriber
  extends BaseCalculatorSubscriber
  implements CalculatorSubscriber
{
  constructor(private expression: CalculatorExpression) {
    super()
  }

  biOperatorAdded(operator: BiOperator, firstOperand: number): void {
    this.expression.setOperator(firstOperand, operator)
  }

  biOperatorCalculated(): void {
    this.expression.clear()
  }

  cleared(): void {
    this.expression.clear()
  }
}
