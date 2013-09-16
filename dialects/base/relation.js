// Base Relation
// ---------------
(function(define) {

"use strict";

define(function(require, exports) {

  var _        = require('underscore');
  var Backbone = require('backbone');

  var CollectionBase = require('./collection').CollectionBase;

  // Used internally, the `Relation` helps in simplifying the relationship building,
  // centralizing all logic dealing with type & option handling.
  var RelationBase = function(type, Target, options) {
    this.type = type;
    if (this.target = Target) {
      this.targetTableName = _.result(Target.prototype, 'tableName');
      this.targetIdAttribute = _.result(Target.prototype, 'idAttribute');
    }
    _.extend(this, options);
  };

  RelationBase.prototype = {

    // Creates a new relation instance, used by the `Eager` relation in
    // dealing with `morphTo` cases, where the same relation is targeting multiple models.
    instance: function(type, Target, options) {
      return new this.constructor(type, Target, options);
    },

    // Creates a new model, used internally in the eager fetch helper methods.
    createModel: function(data) {
      if (this.target.prototype instanceof CollectionBase) {
        return new this.target.prototype.model(data, {parse: true})._reset();
      }
      return new this.target(data, {parse: true})._reset();
    },

    // Eager pair the models.
    eagerPair: function() {}

  };

  RelationBase.extend = Backbone.Model.extend;

  exports.RelationBase = RelationBase;

});

})(
  typeof define === 'function' && define.amd ? define : function (factory) { factory(require, exports); }
);