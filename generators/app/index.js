'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the hunky-dory ' + chalk.red('ReactRails') + ' generator!'
    ));

    var prompts = [{
      name: 'project_name',
      message: 'What is project name?',
      default: "react-rails-project"
    }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );

      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        {project_name: this.props.project_name}
      );

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {project_name: this.props.project_name}
      );

      this.fs.copy(
        this.templatePath('_Gemfile'),
        this.destinationPath('Gemfile')
      );

      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );

      this.fs.copy(
        this.templatePath('app.jsx'),
        this.destinationPath('app/assets/javascripts/app.jsx')
      );

      this.fs.copy(
        this.templatePath('app-routes.jsx'),
        this.destinationPath('app/assets/javascripts/app-routes.jsx')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();

    var self = this;
    this.spawnCommand('bundle', ['install', '--path', 'vendor/bundle']).on('close', function() {
      self.spawnCommand('bundle', ['exec', 'rails new . -d mysql']).on('close', function() {
        self.spawnCommand('bundle', ['exec', 'rails g controller react index']).on('close', function() {
          self.spawnCommand('cp', ['config/database.yml', 'config/database.yml.example']);
          self.spawnCommand('sed', ['-i -e', 's/require_tree ./require bundle.js/', 'app/assets/javascripts/application.js']);

          self.spawnCommand('npm', ['install', '--save-dev', 'browserify', 'reactify', 'watchify']).on('close', function() {
            self.spawnCommand('npm', ['install', '--save', 'react', 'react-router', 'react-tap-event-plugin']).on('close', function() {
              self.log(chalk.yellow('Please edit config/database.yml.'));
              self.spawnCommand('vi', ['config/database.yml'])
              self.log(chalk.yellow("Please type 'npm start' to start server."));
            });
          });
        });
      });
    })
  }
});
