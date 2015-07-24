Todo    = require './todo/Todo'
React   = require 'React'

document.addEventListener 'DOMContentLoaded', ->
    React.render <Todo />,
    document.getElementById 'app-container'