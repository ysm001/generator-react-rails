var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

<% if (use_material_design) { %>
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var DatePicker = mui.DatePicker;
var AppBar = mui.AppBar;
<% } %>

var Root = React.createClass({
  render: function() {
    <% if (use_material_design) { %>
    return (
        <div>
          <AppBar/>
          <RouteHandler/>
        </div>
    );
    <% } else { %>
    return (
        <div>
          <p>header</p>
          <RouteHandler/>
          <p>footer</p>
        </div>
    );
    <% } %>
  }
});

var PathA = React.createClass({
  render: function() { return <p>path A</p>; }
});

var PathB = React.createClass({
  render: function() { return <p>path B</p>; }
});


var AppRoutes = (
  <Route name="app" path="/" handler={Root}>
    <DefaultRoute handler={PathA}/>
    <Route name="path-a" path="/path-a" handler={PathA} />
    <Route name="path-b" path="/path-b" handler={PathB} />
  </Route>
);

module.exports = AppRoutes;
