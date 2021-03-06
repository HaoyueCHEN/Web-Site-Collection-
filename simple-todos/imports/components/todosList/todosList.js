import angular from 'angular';

import angularMeteor from 'angular-meteor';

import { Tasks } from '../../api/tasks.js';

import template from './todosList.html';

 

class TodosListCtrl {

  

  constructor($scope) {

    $scope.viewModel(this);

 

    this.hideCompleted = false;

 

    this.helpers({

      tasks() {

        const selector = {};

    
 

        // Show newest tasks at the top

        return Tasks.find(selector, {

          sort: {

            createdAt: -1
          }

        });

      },

      incompleteCount() {

        return Tasks.find({

          checked: {

            $ne: true

          }

           }).count();

      },

      currentUser() {

        return Meteor.user();

      }

    })

  }



 
 

 

  addTask(task) {

    // Insert a task into the collection

    Meteor.call('tasks.insert', task);

 

    // Clear form

    this.task={};



  }


 

  removeTask(task) {

    Meteor.call('tasks.remove', task._id);

  }


 

}

 

export default angular.module('todosList', [

  angularMeteor

])

   .component('todosList', {

    templateUrl: 'imports/components/todosList/todosList.html',

    controller: ['$scope', TodosListCtrl]

  });




