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
                selected: false

            @setState
                input_text  : ''
                list        : @state.list

    _removeListItem: (list_item) ->
        @state.list.splice @state.list.indexOf(list_item), 1
        @setState list: @state.list # для перезапуску render'a необхідно пропустити новий list через setState метод

    _removeSelected: ->
        @setState list: @state.list.filter (list_item) -> not list_item.selected

    _toggleListItemSelection: (list_item) ->
        list_item.selected = not list_item.selected
        @setState list: @state.list

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
                        <div    className="btn select-btn"
                                data-selected={list_item.selected || null}
                                onClick={=> @_toggleListItemSelection list_item}>o</div>
                        <div className="name">{list_item.value}</div>
                        <div    className="btn remove-btn"
                                onClick={=> @_removeListItem list_item}>X</div>
                        <div className="date">{new Date(list_item.time).toGMTString()}</div>
                    </div>
            }
            {
                <button     className="remove-selected-btn"
                            onClick={@_removeSelected}>
                        Видалити обрані
                </button> if @state.list.some (list_item) -> list_item.selected
            }
            </div>
        </div>

module.exports = Todo