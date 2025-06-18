import type { BiOperator, UnOperator } from './operator'

export type UnOperatorCalculatedEvent = {
  operator: UnOperator
  operand: number
  result: number
}

export type BiOperatorCalculatedEvent = {
  operator: BiOperator
  firstOperand: number
  secondOperand: number
  result: number
}
export interface CalculatorSubscriber {
  currentOperandUpdated(operand: number, type: 'first' | 'second'): void
  biOperatorAdded(operator: BiOperator, firstOperand: number): void
  unOperatorCalculated(event: UnOperatorCalculatedEvent): void
  biOperatorCalculated(event: BiOperatorCalculatedEvent): void
  cleared(): void
}

export class BaseCalculatorSubscriber implements CalculatorSubscriber {
  currentOperandUpdated(operand: number, type: 'first' | 'second'): void {}
  biOperatorAdded(operator: BiOperator, firstOperand: number): void {}
  biOperatorCalculated(e: BiOperatorCalculatedEvent): void {}
  unOperatorCalculated(e: UnOperatorCalculatedEvent): void {}
  cleared(): void {}
}
