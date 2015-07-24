React   = require 'React'
Slider  = require './slider/Slider'

images = [
    'http://s3.amazonaws.com/rapgenius/cats-animals-kittens-background.jpg',
    'http://images6.fanpop.com/image/photos/34800000/Kittens-3-animals-34865509-1680-1050.jpg',
    'http://www.southernhillsanimalhospital.com/sites/site-1450/images/kittens.jpg'
]

document.addEventListener 'DOMContentLoaded', ->
    React.render <Slider images={images} interval={2000} />,
    document.getElementById 'app-container'