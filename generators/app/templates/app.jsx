(function() {
  var React = require('react');
  window.React = React;

  var injectTapEventPlugin = require("react-tap-event-plugin");
  injectTapEventPlugin();

  var Router = require('react-router');
  var AppRoutes = require('./app-routes.jsx');

  $(function() {
    Router.run(AppRoutes, function (Handler) {
      React.render(<Handler/>, document.body);
    });
  });
}) ();
