// import type { CalculatorDisplay } from './calculator-display'
// import type { CalculatorExpression } from './calculator-expression'
// import type { CalculatorHistory } from './calculator-history'
import type { BiOperator, UnOperator } from './operator'

export interface CalculatorSubscriber {
  currentOperandUpdated(operand: number, type: 'first' | 'second'): void
  biOperatorAdded(operator: BiOperator, firstOperand: number): void
  unOperatorCalculated(event: {
    operator: UnOperator
    operand: number
    result: number
  }): void
  biOperatorCalculated(event: {
    operator: BiOperator
    firstOperand: number
    secondOperand: number
    result: number
  }): void
  cleared(): void
}

export class CalculatorModel {
  private firstOperand: number | null = null
  private operator: BiOperator | null = null
  private secondOperand: number | null = null
  private subscribers: CalculatorSubscriber[] = []

  public addSubscriber(subs: CalculatorSubscriber) {
    this.subscribers.push(subs)
  }

  // constructor(
  //   private display: CalculatorDisplay,
  //   private expression: CalculatorExpression,
  //   private history: CalculatorHistory
  // ) {}

  public addDigit(digitText: string) {
    if (this.operator === null) {
      const firstOperand = parseInt(`${this.firstOperand ?? ''}${digitText}`)
      this.firstOperand = firstOperand
      // this.display.setNumber(this.firstOperand)
      this.subscribers.forEach((s) =>
        s.currentOperandUpdated(firstOperand, 'first')
      )
    } else {
      this.secondOperand = parseInt(`${this.secondOperand ?? ''}${digitText}`)
      // this.display.setNumber(this.secondOperand)
      const secondOperand = parseInt(`${this.secondOperand ?? ''}${digitText}`)
      this.secondOperand = secondOperand
      this.subscribers.forEach((s) =>
        s.currentOperandUpdated(secondOperand, 'second')
      )
    }
  }

  public addBiOperator(operator: BiOperator) {
    if (this.firstOperand && this.operator && this.secondOperand) {
      this.processCalculation()
      this.addBiOperator(operator)
    }

    if (this.firstOperand) {
      this.operator = operator

      // this.expression.setOperator(this.firstOperand, this.operator)
      // this.display.clear()
      this.subscribers.forEach((s) =>
        s.biOperatorAdded(operator, this.firstOperand!)
      )
    }
  }

  public addUnOperator(operator: UnOperator) {
    if (
      this.firstOperand !== null &&
      this.operator === null &&
      this.secondOperand === null
    ) {
      const result: number = operator.calculate(this.firstOperand)

      this.subscribers.forEach((s) =>
        s.unOperatorCalculated({
          operand: this.firstOperand!,
          operator,
          result
        })
      )
      // this.history.addUnOperation(this.firstOperand, operator)
      this.firstOperand = result
      // this.display.setNumber(this.firstOperand)
    }
  }

  public canProcess() {
    return (
      this.firstOperand !== null && this.operator && this.secondOperand !== null
    )
  }

  public processCalculation() {
    if (
      this.firstOperand !== null &&
      this.operator &&
      this.secondOperand !== null
    ) {
      const result: number = this.operator.calculate(
        this.firstOperand,
        this.secondOperand
      )

      this.subscribers.forEach((s) =>
        s.biOperatorCalculated({
          firstOperand: this.firstOperand!,
          operator: this.operator!,
          result,
          secondOperand: this.secondOperand!
        })
      )

      // this.history.addBiOperation(
      //   this.firstOperand,
      //   this.operator,
      //   this.secondOperand
      // )

      this.firstOperand = result
      this.operator = null
      this.secondOperand = null

      // this.display.setNumber(this.firstOperand)
      // this.expression.clear()
    }
  }

  public clear() {
    this.firstOperand = null
    this.operator = null
    this.subscribers.forEach((s) => s.cleared())
    // this.display.clear()
    // this.expression.clear()
  }
}
