var React = require('react/addons');
var Router = require('react-router');
var classNames = require('classnames')

module.exports = React.createClass({
	mixins: [ Router.State, Router.Navigation ],
	render: function() {
		return (
			<div>
				<h2><%= name %></h2>
			</div>
		);
	}
});
