/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var legislator = require('./legislator.model');

exports.register = function(socket) {
  legislator.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  legislator.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('legislator:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('legislator:remove', doc);
}