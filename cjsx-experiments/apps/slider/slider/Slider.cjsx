React = require 'React'

require './slider.less'

Slider = React.createClass

    _interval_handler: null

    _showNextImage: ->
        new_index = if @state.image_index isnt @props.images.length - 1
        then @state.image_index + 1
        else 0

        @setState image_index: new_index

    _showPrevImage: ->
        new_index = if @state.image_index isnt 0
        then @state.image_index - 1
        else @props.images.length - 1

        @setState image_index: new_index

    _start: -> @_interval_handler = setInterval @_showNextImage, @props.interval

    _pause: -> clearInterval @_interval_handler

    getInitialState: -> image_index: 0

    getDefaultProps: -> interval: 5000

    componentDidMount: -> @_start()

    render: ->
        <div    id="slider"
                style={ backgroundImage: 'url(' + @props.images[@state.image_index] + ')'}
                onMouseOver={@_pause}
                onMouseOut={@_start}>
            <div    className='btn left-btn'
                    onClick={@_showPrevImage}><</div>
            <div    className='btn right-btn'
                    onClick={@_showNextImage}>></div>
        </div>

module.exports = Slider