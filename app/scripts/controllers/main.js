'use strict';

/**
 * @ngdoc function
 * @name escapeRlApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the escapeRlApp
 */
angular.module('escapeRlApp')
    .controller('MainCtrl', function ($scope, Game, Player, Pedro) {
        Game.init(Player, Pedro);

        $scope.fontSize = Game.display.fontSize;

        $scope.changeFont = function (size) {
            Game.display.setOptions({fontSize: size});
        }
    })
;
