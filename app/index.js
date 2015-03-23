'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var utils = require('./utils');

var DeslightGenerator = yeoman.generators.Base.extend({
	initializing: function () {
		this.react_libraries = ['react', 'react-router', 'object-assign', 'flux', 'keymirror'];
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
					name: 'React with React Router and Jest unit testing'
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
			/*create package.json*/
			var pkgs = this.fs.readJSON(this.templatePath('_package.json'));


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

			utils.addDependencies(pkgs, this.props.libs);
			console.log(this.props);

			this.fs.write(this.destinationPath('package.json'), JSON.stringify(pkgs, null, 2));
			//then, compile the template
			this.fs.copyTpl(this.destinationPath('package.json'), this.destinationPath('package.json'), this);

			this.template('_bower.json', 'bower.json');
			this.template('_Gulpfile.js', 'Gulpfile.js', {
				props: {
					libs: this.props.libs.map(function(lib) {
						var lib_name = typeof(lib) === 'string' ? lib : lib[0];
						if (lib_name == 'react') {
							return 'react/addons';
						}

						return lib_name;
					}),
					css_preprocessor: this.props.css_preprocessor
				},
				browserify_transforms: this.browserify_transforms,
				appname: this.appname
			});

			this.template('README.md', 'README.md');

			this.template('_app/index.html', 'app/index.html');
			this.copy('_app/noop.js', 'app/noop.js');
			this.copy('_app/main.js', 'app/main.js');

			this.config.save();
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
		pkgs.devDependencies['jest-cli'] = '*'
		pkgs.devDependencies['react-tools'] = '*'

		pkgs.scripts.test = 'jest';

		pkgs.jest = {
			scriptPreprocessor: "<rootDir>/preprocessor.js",
			unmockedModulePathPatterns: ["<rootDir>/node_modules/react"]
		}

		this.props.libs = this.props.libs.concat(this.react_libraries);
		
		this.template('preprocessor.js', 'preprocessor.js');
		this.copy('_react/routes/HomeRouteHandler.js', 'app/routes/HomeRouteHandler.js');
		this.copy('_react/routes/RootRouteHandler.js', 'app/routes/RootRouteHandler.js');
		this.copy('_react/routes/NotFoundRouteHandler.js', 'app/routes/NotFoundRouteHandler.js');

	}
});

module.exports = DeslightGenerator;
