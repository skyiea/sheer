React = require 'React'

require './todo.less'

Todo = React.createClass

    _handleTextInput: ->
        @setState input_text: @refs.input.getDOMNode().value

    _handleKeyPress: (e) ->
        if e.charCode is 13 # натиснута кнопка Enter
            @state.list.push
                value   : @refs.input.getDOMNode().value
                time    : Date.now()

            @setState
                input_text  : ''
                list        : @state.list

    _removeListItem: (index) ->
        @state.list.splice index, 1
        @setState list: @state.list # для перезапуску render'a необхідно пропустити новий list через setState метод

    getInitialState: ->
        input_text  : ''
        list        : []

    componentDidMount: ->
        @refs.input.getDOMNode().focus();

    render: ->
        <div className="todo-container">
            <input  type="text"
                    placeholder="Введіть завдання і натисніть Enter"
                    ref="input"
                    onChange={@_handleTextInput}
                    onKeyPress={@_handleKeyPress}
                    value={@state.input_text} />
            <div className="list">
            {
                @state.list.map (list_item, index) => # => на відміну від -> зберігає контекст this
                    <div key={index} className="list-item">
                        <div className="name">{list_item.value}</div>
                        <div    className="remove-btn"
                                onClick={=> @_removeListItem index}>X</div>
                        <div className="date">{new Date(list_item.time).toGMTString()}</div>
                    </div>
            }
            </div>
        </div>

module.exports = Todo