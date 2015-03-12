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
			if (!this.name) {
				var done = this.async();
				var prompts = [
					{
						name: 'name',
						required: true,
						type: String,
						message: 'What\'s the name of the component?',
					}
				]

				this.prompt(prompts, function(props) {
					this.name = props.name;
					if (props.name.length == 0) {
						console.error("Invalid name");
						process.exit(1);
					}
					done();
				}.bind(this));
			}
		}
	},

	writing: {
		add_route: function() {
			this.template('GenericComponent.js', 'app/components/'+ this.name + '.js');

			this.template('__tests__/GenericComponent-test.js', 'app/components/__tests__/' + this.name + '-test.js', {
				name: this.name
			});
		}
	}
});
