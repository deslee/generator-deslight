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

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to Deslight, the lightning fast webapp generator!'
    ));

    var prompts = [{
		name: 'appname',
		message: 'What\'s the name of your app?',
		default: this.appname
	},{
		type: 'checkbox',
		name: 'libs',
		message: 'Choose some basic libraries to install via npm:',
		choices: [{
			value: 'jquery',
			name: 'jQuery'
		}, {
			value: 'lodash',
			name: 'lodash'
		}]
	},{
   		type: 'list',
		name: 'packages',
		message: 'Choose some packages to include',
		choices: [{
			value: 'none',
			name: 'None (Vanilla JS/HTML/CSS)'
		},
		/*{*/
			//value: 'react',
			//name: 'ReactJS'
		/*}*/
		/*,{*/
			 //value: 'foundation',
			//name: 'Foundation'
		/*}*/]
    }];

    this.prompt(prompts, function (props) {
		this.props = props;
		this.appname = props.appname;

				done();
    }.bind(this));
  },

  writing: {
    app: function () {
		/*create package.json*/
		var pkgs = this.fs.readJSON(this.templatePath('_package.json'));
		utils.addDependencies(pkgs, this.props.libs);

		var browserify_transforms = [];

		switch(this.props.packages) {
			case 'react':
				this._handle_react_package(pkgs, browserify_transforms);
				break;
		}

		this.browserify_transforms = JSON.stringify(browserify_transforms);
		this.fs.write(this.destinationPath('package.json'), JSON.stringify(pkgs, null, 2));
		//then, compile the template
		this.fs.copyTpl(this.destinationPath('package.json'), this.destinationPath('package.json'), this);

		this.template('_bower.json', 'bower.json');
		this.template('_Gulpfile.js', 'Gulpfile.js');

		this.copy('_app/app.scss', 'app/app.scss');
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

  _handle_react_package: function(pkgs, browserify_transforms) {
	browserify_transforms.push('reactify');
	pkgs.devDependencies.reactify = '*'
	var react_libraries = ['react', 'react-router', 'object-assign', 'flux', 'keymirror'];
	utils.addDependencies(pkgs, react_libraries);
  }
});

module.exports = DeslightGenerator;
