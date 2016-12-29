import React from 'react'
import {observer} from 'mobx-react'

export const Shell = observer(({store}) =>
  <div className="shell" tabIndex={0} onKeyDown={event => store.keyDown(event.key, event.keyCode)}>
    {store.lines.slice(-24).map(line =>
      <pre className="shell-line">
        {line.prompt}{line.text}
      </pre>)}
    <pre className="shell-line">
      {store.prompt}
      {store.input.slice(0, store.cursor)}
      <span className="cursor">
        {store.input[store.cursor] || ' '}
      </span>
      {store.input.slice(store.cursor + 1)}
    </pre>
  </div>
)
