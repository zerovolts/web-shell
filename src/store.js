import {observable, computed, action} from 'mobx'

import {Interpreter} from './interpreter'

class ShellStore {
  @observable cursor = 0
  @observable prompt = '> '
  @observable input = ''
  @observable historyIndex = 0
  @observable lines = []

  @action printLine = (str) => {
    this.lines.push({prompt: '', text: str})
    console.log(str)
    this.input = ''
    this.cursor = 0
    this.historyIndex = this.lines.length
  }

  @action keyEnter = () => {
    this.lines.push({prompt: this.prompt, text: this.input})
    console.log(this.input)
    this.printLine(this.interpreter.interpret(this.input))
    this.input = ''
    this.cursor = 0
    this.historyIndex = this.lines.length
  }

  @action keyArrowLeft = () => {
    if (this.cursor > 0) {
      this.cursor--
    }
  }

  @action keyArrowRight = () => {
    if (this.cursor < this.input.length) {
      this.cursor++
    }
  }

  @action keyArrowUp = () => {
    if (this.historyIndex > 0) {
      this.input = this.lines[--this.historyIndex].text
      this.cursor = this.input.length
    }
  }

  @action keyArrowDown = () => {
    if (this.historyIndex < this.lines.length - 1) {
      this.input = this.lines[++this.historyIndex].text
      this.cursor = this.input.length
    } else if (this.historyIndex < this.lines.length) {
      this.input = ''
      this.cursor = 0
      this.historyIndex++
    }
  }

  @action keyBackspace = () => {
    if (this.cursor > 0) {
      this.input = this.input.slice(0, this.cursor - 1) + this.input.slice(this.cursor)
      this.cursor--
    }
  }

  @action keyDown = (key, keyCode) => {
    switch (keyCode) {
      case 9:
      case 16:
      case 17:
      case 18:
      case 20:
      case 27:
      case 91:
      case 93:
        break
      case 8:
        this.keyBackspace()
        break
      case 13:
        this.keyEnter()
        break
      case 37:
        this.keyArrowLeft()
        break
      case 39:
        this.keyArrowRight()
        break
      case 38:
        this.keyArrowUp()
        break
      case 40:
        this.keyArrowDown()
        break
      default:
        if (this.cursor == this.input) {
          this.input += key
        } else {
          this.input = this.input.slice(0, this.cursor) + key + this.input.slice(this.cursor)
        }
        this.cursor++
        break
    }
    //console.log(keyCode)
  }

  constructor(interpreter) {
    this.interpreter = interpreter
    this.printLine('Welcome to the shell!')
    this.printLine('Type \'help\' for a list of commands.')
  }
}


export const store = new ShellStore(new Interpreter())
window.store = store
