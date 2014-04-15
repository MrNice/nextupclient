define(function(exports, module) {
  'use strict';

  var dummyData = {
    read: [
      { content: '<div>Hi there Human</div>' },
      { content: '<div>Hi there chicken</div>' }
    ],
    next: [
      { content: '<div>Hi there pig</div>' },
      { content: '<div>Hi there cow</div>' }
    ],
    reading: {
      { content: '<div>Hi there pig</div>' },
    }
  };

  module.exports = dummyData;
});
