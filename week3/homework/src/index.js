'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');


/// Get a single to-do with ID :id
exports.readTodo = function (req, res) {
  Task.findById(req.params.taskId, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

/// Delete a task by id

exports.clearTodos = function (req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task Successfully deleted' });
  });
};


///  Sets the done flag of a single to-do to true, update true
exports.markAsDone = function (req, res) {
  Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


///  Sets the done flag of a single to-do to false, update false
exports.markAsNotDone = function (req, res) {
  Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: false }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.list_all_tasks = function (req, res) {
  Task.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_a_task = function (req, res) {
  var new_task = new Task(req.body);
  new_task.save(function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};