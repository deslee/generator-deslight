'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var utils = require('./utils');

var DeslightGenerator = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: {
		intro: function() {
			// Have Yeoman greet the user.
			this.log(yosay(
				'Welcome to Deslight, the lightning fast webapp generator!'
			));
		},
		libraries_and_frameworks: function() {
			var done = this.async();
			var prompts = [{
				name: 'appname',
				message: 'What\'s the name of your app?',
				default: this.appname
			},
			{
				// Libraries
				type: 'checkbox',
				name: 'libs',
				message: 'Choose some basic libraries to install via npm:',
				choices: [{
					value: 'jquery',
					name: 'jQuery'
				},
				{
					value: 'lodash',
					name: 'lodash'
				}]
			},
			{
				// CSS Preprocessor
				type: 'list',
				name: 'css_preprocessor',
				message: 'Choose a CSS preprocessor, if any',
				choices: [{
					value: 'none',
					name: 'None (CSS)'
				},
				{
					value: 'sass',
					name: 'SASS'
				},
				{
					value: 'less',
					name: 'LESS'
				}]
			},
			{
				// Frameworks
				type: 'list',
				name: 'frameworks',
				message: 'Choose some frameworks to include',
				choices: [{
					value: 'none',
					name: 'None (Vanilla JS/HTML/CSS)'
				},
				{
					value: 'react',
					name: 'ReactJS'
				}]
			}];

			this.prompt(prompts, function (props) {
				this.props = props;
				this.appname = props.appname;
				done();
			}.bind(this));


		},
		next: function() {
		}
	},

	writing: {
		app: function () {
			console.log(this.props);
			/*create package.json*/
			var pkgs = this.fs.readJSON(this.templatePath('_package.json'));

			utils.addDependencies(pkgs, this.props.libs);

			this.browserify_transforms = [];

			// css preprocesors
			switch(this.props.css_preprocessor) {
				case 'none':
					this.copy('_app/app.css', 'app/app.css');
					break;
				case 'sass':
					this.copy('_app/app.scss', 'app/app.scss');
					pkgs.devDependencies['gulp-sass']= '*'
					break;
				case 'less':
					this.copy('_app/app.less', 'app/app.less');
					pkgs.devDependencies['gulp-less'] = '*'
					break;
			}

			// frameworks
			switch(this.props.frameworks) {
				case 'react':
					this._handle_react_package(pkgs);
				break;
			}

			this.fs.write(this.destinationPath('package.json'), JSON.stringify(pkgs, null, 2));
			//then, compile the template
			this.fs.copyTpl(this.destinationPath('package.json'), this.destinationPath('package.json'), this);

			this.template('_bower.json', 'bower.json');
			this.template('_Gulpfile.js', 'Gulpfile.js');

			this.template('_app/index.html', 'app/index.html');
			this.copy('_app/noop.js', 'app/noop.js');
			this.copy('_app/main.js', 'app/main.js');
		},

		projectfiles: function () {
			this.src.copy('editorconfig', '.editorconfig');
			this.src.copy('jshintrc', '.jshintrc');
		}
	},

	end: function () {
		this.installDependencies({
			skipInstall: this.options['skip-install']					
		});
	},

	_handle_react_package: function(pkgs) {
		this.browserify_transforms.push('reactify');
		pkgs.devDependencies.reactify = '*'
		var react_libraries = ['react', 'react-router', 'object-assign', 'flux', 'keymirror'];
		utils.addDependencies(pkgs, react_libraries);
	}
});

module.exports = DeslightGenerator;
