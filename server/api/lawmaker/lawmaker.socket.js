/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var lawmaker = require('./lawmaker.model');

exports.register = function(socket) {
  lawmaker.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  lawmaker.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('lawmaker:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lawmaker:remove', doc);
}