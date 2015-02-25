console.log("main js file");

<% if (props.frameworks == 'react' ) { %>

var React = require('react/addons');
var Router = require('react-router');

var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var RootRouteHandler = require('./routes/RootRouteHandler')
var HomeRoute = require('./routes/HomeRouteHandler');

var routes = (
	<Route handler={RootRouteHandler} path="/">
		<DefaultRoute handler={HomeRoute} />
	</Route>
);

Router.run(routes, function(Handler) {
	React.render(<Handler />, document.getElementById('root_<%= _.slugify(appname) %>'));
});

<% } %>
