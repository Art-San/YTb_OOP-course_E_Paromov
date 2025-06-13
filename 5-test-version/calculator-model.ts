import type { CalculatorDisplay } from './calculator-display'
import type { CalculatorExpression } from './calculator-expression'
import type { CalculatorHistory } from './calculator-history'
import type { Operator } from './operator'

export class CalculatorModel {
  private firstOperand: number | null = null
  private operator: Operator | null = null
  private secondOperand: number | null = null

  constructor(
    private display: CalculatorDisplay,
    private expresssion: CalculatorExpression,
    private history: CalculatorHistory
  ) {}

  public addDigit(digitText: string) {
    if (this.operator === null) {
      this.firstOperand = parseInt(`${this.firstOperand ?? ''}${digitText}`)
      this.display.setNumber(this.firstOperand)
    } else {
      this.secondOperand = parseInt(`${this.secondOperand ?? ''}${digitText}`)
      this.display.setNumber(this.secondOperand)
    }
  }

  public addOperator(operator: Operator) {
    if (this.firstOperand && this.operator && this.secondOperand) {
      this.processCalculation()
      this.addOperator(operator)
    }

    if (this.firstOperand) {
      this.operator = operator

      this.expresssion.setOperator(this.firstOperand, this.operator)
      this.display.clear()
    }
  }

  //   public addOperator(operatorText: string) {
  //     if (this.firstOperand && this.operator && this.secondOperand) {
  //       this.processCalculation()
  //       this.addOperator(operatorText)
  //     }

  //     if (this.firstOperand) {
  //       this.operator = operatorText

  //       this.expresssion.setOperator(this.firstOperand, this.operator)
  //       this.display.clear()
  //     }
  //   }

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

      this.history.addOperation(
        this.firstOperand,
        this.operator,
        this.secondOperand
      )

      this.firstOperand = result
      this.operator = null
      this.secondOperand = null

      this.display.setNumber(this.firstOperand)
      this.expresssion.clear()
    }
  }

  public clear() {
    this.firstOperand = null
    this.operator = null
    this.display.clear()
    this.expresssion.clear()
  }
}
