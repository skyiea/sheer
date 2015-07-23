React = require 'React'

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

images = [
    'http://s3.amazonaws.com/rapgenius/cats-animals-kittens-background.jpg',
    'http://images6.fanpop.com/image/photos/34800000/Kittens-3-animals-34865509-1680-1050.jpg',
    'http://www.southernhillsanimalhospital.com/sites/site-1450/images/kittens.jpg'
]

document.addEventListener 'DOMContentLoaded', ->
    React.render <Slider images={images} interval={2000} />,
    document.getElementById 'app-container'