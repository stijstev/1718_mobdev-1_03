const Handlebars = require('handlebars');
Handlebars.registerHelper('testHelper', () => {
  return "Hello world!";
});