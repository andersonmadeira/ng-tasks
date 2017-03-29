angular.module('tasksApp', [])
  .controller('TaskListController', function() {
    var ctrl = this;
    ctrl.taskText = "";
    ctrl.tasks = [
      {text:'Learn AngularJS', done:true},
      {text:'Build an AngularJS app', done:false}];

    ctrl.addTask = function() {
      if (ctrl.taskText != "") {
        ctrl.tasks.push({text:ctrl.taskText, done:false});
        ctrl.taskText = '';
      }
    };

    ctrl.remaining = function() {
      var count = 0;
      angular.forEach(ctrl.tasks, function(task) {
        count += task.done ? 0 : 1;
      });
      return count;
    };

    ctrl.archive = function() {
      var oldTasks = ctrl.tasks;
      ctrl.tasks = [];
      angular.forEach(oldTasks, function(task) {
        if (!task.done) ctrl.tasks.push(task);
      });
    };
  });
