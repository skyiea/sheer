React   = require 'React'
Todo    = require './todo/Todo'

document.addEventListener 'DOMContentLoaded', ->
    React.render <Todo />,
    document.getElementById 'app-container'