var React = require('react/addons');
var classNames = require('classnames')

module.exports = React.createClass({
	render: function() {
		return (
			<div className="<%= _.slugify(name) %>">
			</div>
		);
	}
});
