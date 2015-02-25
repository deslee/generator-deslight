var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
	mixins: [ Router.State ],
	render: function() {
		var route = this.getRoutes();
		
		return (
			<div>
				<header><h1>{route}</h1></header>
				<main>
					<RouteHandler />
				</main>
			</div>
		);
	}
});
