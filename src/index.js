import React from 'react'
import ReactDOM from 'react-dom'

import {Shell} from './shell'
import {store} from './store'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Shell store={store} />, document.querySelector('#root'))
})
