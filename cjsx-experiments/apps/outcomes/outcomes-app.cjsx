Outcomes    = require './outcomes/Outcomes'
React       = require 'React'

document.addEventListener 'DOMContentLoaded', ->
    React.render <Outcomes />, document.getElementById 'app-container'