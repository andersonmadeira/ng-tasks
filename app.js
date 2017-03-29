angular.module('tasksApp', ['ngStorage'])
  .controller('TaskListController', ['$scope', '$localStorage', 'Util', function($scope, $localStorage, Util) {
    var ctrl = this;
    ctrl.taskText = "";

    ctrl.tasks = $localStorage.tasks || [
      {id:Util.genRandomId(), text:'Learn AngularJS', done:true, createdAt:new Date(), completedAt:new Date()},
      {id:Util.genRandomId(), text:'Build an AngularJS app', done:false, createdAt:new Date(), completedAt:'-'}];

    ctrl.archives = $localStorage.archives || [];

    $localStorage.tasks = ctrl.tasks;
    $localStorage.archives = ctrl.archives;

    ctrl.addTask = function() {
      if (ctrl.taskText != "") {
        var new_task = {id:Util.genRandomId(), text:ctrl.taskText, done:false, createdAt:new Date(), completedAt:'-'};
        ctrl.tasks.push(new_task);
        ctrl.taskText = '';
      }
    };

    ctrl.completeTask = function(task, done) {
      if (done) {
        task.completedAt = new Date();
      } else {
        task.completedAt = '-';
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
        else ctrl.archives.push(task);
      });
      $localStorage.tasks = ctrl.tasks;
      $localStorage.archives = ctrl.archives;
    };

    ctrl.removeCompleted = function(task) {
      var index = ctrl.archives.map(function(e) {return e.id; }).indexOf(task.id);
      ctrl.archives.splice(index, 1);
    }
  }]).service('Util', function() {
    this.genRandomId = function (length=20) {
      return Math.random().toString(36).substr(2, length);
    };
  });
