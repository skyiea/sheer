document.addEventListener('DOMContentLoaded', function () {
    var el = document.getElementById('x');

    var Timer = React.createClass({
        getInitialState: function () {
            return {
                time: 0
            };
        },

        componentWillMount: function () {
            var this_ = this;

            setInterval(function () {
                this_.setState({
                    time: this_.state.time + 1
                });
            }, 1000);
        },

        render: function () {
            return (
                <div>{this.state.time}</div>
            );
        }
    });

    React.render(<Timer />, el);
});