'use strict';
var yeoman = require('yeoman-generator');
var fs = require('fs')

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.routeHook = '/* deslight route hook - do not modify this line */';
		this.requireHook = '/* deslight require hook - do not modify this line */';
		this.argument('name', {
			required: false,
			type: String,
			desc: 'The subgenerator name'
		});
		this.styleHook = '/* deslight style hook - do not modify this line */'
	},

	prompting: {
		params: function() {
			var done = this.async();
			var prompts = [
				{
					name: 'name',
					message: 'What\'s the name of the route? (e.g. About)',
					default: this.name ? this.name : 'About'
				}
			]

			this.prompt(prompts, function(props) {
				this.name = props.name;
				done();
			}.bind(this));
		},
		path: function() {
			var done = this.async();
			var prompts = [
				{
					name: 'path',
					message: 'What\'s the path of the route? (e.g. about)',
					default: this.name.toLowerCase()
				}
			];

			this.prompt(prompts, function(props) {
				this.path = props.path;
				done();
			}.bind(this));
		}
	},

	writing: {
		add_route: function() {
			this.template('GenericRoute.js', 'app/routes/'+ this.name + '/' + this.name + 'RouteHandler.js');
		},
		add_hook: function() {
			var routeInsert = '<Route handler={'+ this.name + 'RouteHandler} name=\''+this.name+'\' path=\''+this.path+'\'/>';
			var requireInsert = 'var ' + this.name + 'RouteHandler = require(\'./routes/' + this.name + '/' + this.name + 'RouteHandler\');';
			var path = this.destinationPath('./app/main.js');
			var contents = this.readFileAsString(path);

			var insertText = function(hook, insert) {
				if (contents.indexOf(insert) === -1) {
					contents = contents.replace(hook, insert+'\n'+hook)
				}
			}
			insertText(this.requireHook, requireInsert);
			insertText(this.routeHook, routeInsert);

			this.write(path, contents);
		},
		add_styling: function() {
			var masterStyleFile = fs.readdirSync(this.destinationPath('app')).filter(function(filename) {
				var test = /app\.(css|less|scss)$/.test(filename)
				return test
			})[0]
			var ext = masterStyleFile.split('.')[1]

			var masterContents = this.readFileAsString(this.destinationPath('app/' + masterStyleFile))

			var insertText = function(hook, insert) {
				if (masterContents.indexOf(insert) === -1) {
					masterContents= masterContents.replace(hook, insert+'\n'+hook)
				}
			}

			var styleFile = this.name + '.' + ext;
			this.template('GenericRoute.css', 'app/routes/'+ this.name + '/' + this.name + '.' + ext);

			switch (ext) {
				case 'css':
					insertText(this.styleHook, '@import "routes/' + this.name + '/' + this.name + '.' + ext+'"');
				break;
				case 'scss':
					insertText(this.styleHook, '@import "routes/' + this.name + '/' + this.name+'";');
				break;
				case 'less':
					insertText(this.styleHook, '@import "routes/' + this.name + '/' + this.name+'";');
				break;
			}

			this.write('app/' + masterStyleFile, masterContents);

		}
	}
});
