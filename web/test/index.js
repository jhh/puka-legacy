// import './misc/test_helper';

const context = require.context('.', true, /.+_spec\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
