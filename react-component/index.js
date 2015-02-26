'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.argument('name', {
			required: false,
			type: String,
			desc: 'The subgenerator name'
		});
	},

	prompting: {
		params: function() {
			var done = this.async();
			var prompts = [
				{
					name: 'name',
					message: 'What\'s the name of the component? (e.g. StatusBar)',
					default: this.name ? this.name : 'StatusBar'
				}
			]

			this.prompt(prompts, function(props) {
				this.name = props.name;
				done();
			}.bind(this));
		}
	},

	writing: {
		add_route: function() {
			this.template('GenericComponent.js', 'app/components/'+ this.name + '.js');
		}
	}
});
