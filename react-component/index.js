'use strict';
var yeoman = require('yeoman-generator');
var fs = require('fs')

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.argument('name', {
			required: false,
			type: String,
			desc: 'The subgenerator name'
		});
		this.styleHook = '/* deslight style hook - do not modify this line */'
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
		add_component: function() {
			this.template('GenericComponent.js', 'app/components/'+ this.name +'/'+ this.name + '.js');
			this.template('__tests__/GenericComponent-test.js', 'app/components/__tests__/' + this.name+'/' + this.name + '-test.js', {
				name: this.name
			});
		},

		add_styling: function() {
			var masterStyleFile = fs.readdirSync(this.destinationPath('app')).filter(function(filename) {
				return /app\.(css|less|scss)$/.test(filename)
			})[0]
			var ext = masterStyleFile.split('.')[1]

			var masterContents = this.readFileAsString(this.destinationPath('app/' + masterStyleFile))

			var insertText = function(hook, insert) {
				if (masterContents.indexOf(insert) === -1) {
					masterContents= masterContents.replace(hook, insert+'\n'+hook)
				}
			}

			var styleFile = this.name + '.' + ext;
			this.template('GenericComponent.css', 'app/components/'+ this.name + '/' + this.name + '.' + ext);

			switch (ext) {
				case 'css':
					insertText(this.styleHook, '@import "components/' + this.name + '/' + this.name + '.' + ext+'"');
				break;
				case 'scss':
					insertText(this.styleHook, '@import "components/' + this.name + '/' + this.name+'";');
				break;
				case 'less':
					insertText(this.styleHook, '@import "components/' + this.name + '/' + this.name+'";');
				break;
			}

			this.write('app/' + masterStyleFile, masterContents);
		}

	}
});
