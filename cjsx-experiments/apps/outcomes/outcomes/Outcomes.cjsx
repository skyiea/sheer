React       = require 'React'
lodash      = require 'lodash'
superagent  = require 'superagent'

Outcomes = React.createClass
    _handleOutcomes: (json_response) ->
        data = JSON.parse json_response

        processData = (data) ->
            if _.isArray data
                result = []

                for el in data
                    temp = processData el
                    result = result.concat temp if _.isArray temp
            else if _.isObject data
                for prop_name, prop of data
                    if prop_name is 'outcomes'
                        result = prop
                        break
                    else if _.isObject prop
                        result = processData prop

            result

        this.setState(
            status  : 'load',
            outcomes: processData data
        )

    getInitialState: ->
        status  : 'idle'
        outcomes: null

    componentWillMount: ->
        this.setState(status: 'loading')

        superagent
            .get 'https://www.favbet.com/live/markets/?0.826076822122559' #public/json/outcomes.json'
            .set 'Accept', 'application/json'
            .end (err, res) =>
                if err
                    this.setState status: 'error'
                else
                    this._handleOutcomes res.text

    render: ->
        switch this.state.status
            when 'idle', 'loading' then <div>Loading outcomes..</div>
            when 'load' then <div>{this.state.outcomes}</div>

module.exports = Outcomes