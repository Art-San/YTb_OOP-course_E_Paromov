import { injectCss } from './utils'

export class CalculatorButton {
  private root: HTMLButtonElement

  constructor(text: string) {
    this.root = this.createRoot(text)
  }

  public addClass(className: string) {
    this.root.classList.add(className)
    return this
  }

  public onClick(listener: () => void) {
    this.root.addEventListener('click', listener)
    return this
  }

  public renderTo(container: Element) {
    this.initCss()
    container.append(this.root)
  }

  private createRoot(text: string) {
    const root = document.createElement('button')
    root.classList.add('calculator_button')
    root.innerText = text
    return root
  }

  private initCss() {
    injectCss(
      /* css*/ `
    .calculator_button {
      padding: 10px;
      font-size: 18px;
      border: 1px solid #ccc;
      border-radius: 3px;
      background: #fff;
      cursor: pointer;
    }
    .calculator_button:hover {
      background: #f0f0f0;
    }
    .calculator_button.red {
      background: red;
      color: white;
    }
    .calculator_button.red:hover {
      opacity: 0.9;
      background: red;
    }
    .calculator_button.grey {
      background: grey;
      color: white;
    }
    .calculator_button.grey:hover {
      opacity: 0.9;
      background: grey;
    }
          `,
      'calculator_button'
    )
  }
}
