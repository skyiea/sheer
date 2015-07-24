React = require 'React'

require './todo.less'

Todo = React.createClass

    _handleInput: ->
        @setState input_text: @refs.input.value

    getInitialState: ->
        input_text: ''

    render: ->
        <div className="todo-container">
            <input  type="text"
                    ref="input"
                    onChange={@_handleInput}
                    value={@state.input_text} />
        </div>

module.exports = Todo