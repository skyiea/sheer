'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var el = document.getElementById('x');

    var Timer = React.createClass({
        displayName: 'Timer',

        getInitialState: function getInitialState() {
            return {
                time: 0
            };
        },

        componentWillMount: function componentWillMount() {
            var this_ = this;

            setInterval(function () {
                this_.setState({
                    time: this_.state.time + 1
                });
            }, 1000);
        },

        render: function render() {
            return React.createElement(
                'div',
                null,
                this.state.time
            );
        }
    });

    React.render(React.createElement(Timer, null), el);
});
