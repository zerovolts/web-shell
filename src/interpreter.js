
export class Interpreter {
  constructor() {

  }

  interpret(text) {
    let tokens = text.split(' ')
    switch (tokens[0]) {
      case 'help':
        return 'Here are a few things you can do.'
        break
      default:
        return 'Unknown command.'
        break
    }
  }
}
