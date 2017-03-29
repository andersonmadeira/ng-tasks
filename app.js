angular.module('tasksApp', [])
  .controller('TaskListController', function() {
    var ctrl = this;
    ctrl.taskText = "";
    ctrl.tasks = [
      {text:'Learn AngularJS', done:true, createdAt:new Date(), completedAt:new Date()},
      {text:'Build an AngularJS app', done:false, createdAt:new Date(), completedAt:null}];

    ctrl.addTask = function() {
      if (ctrl.taskText != "") {
        ctrl.tasks.push({text:ctrl.taskText, done:false, createdAt:new Date(), completedAt:null});
        ctrl.taskText = '';
      }
    };

    ctrl.completeTask = function(task, done) {
      if (done) {
        task.completedAt = new Date();
      } else {
        task.completedAt = null;
      }
    }

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
