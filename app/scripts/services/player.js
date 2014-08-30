'use strict';

/**
 * @ngdoc service
 * @name escapeRlApp.Player
 * @description
 * # Player
 * Service in the escapeRlApp.
 */
angular.module('escapeRlApp')
    .service('Player', function Player(Game) {
        var Player = function (x, y) {
            this._x = x;
            this._y = y;
            this._draw();
        };

        Player.prototype.getSpeed = function () {
            return 100;
        };
        Player.prototype.getX = function () {
            return this._x;
        };
        Player.prototype.getY = function () {
            return this._y;
        };

        Player.prototype.act = function () {
            Game.engine.lock();
            window.addEventListener("keydown", this);
        };

        Player.prototype.handleEvent = function (e) {
            var code = e.keyCode;
            if (code == 13 || code == 32) {
                this._checkBox();
                return;
            }

            var keyMap = {
                "38": "0",
                "33": "1",
                "39": "2",
                "34": "3",
                "40": "4",
                "35": "5",
                "37": "6",
                "36": "7"
            };

            /* one of numpad directions? */
            if (!(code in keyMap)) {
                return;
            }

            /* is there a free space? */
            var dir = ROT.DIRS[8][keyMap[code]];
            var newX = this._x + dir[0];
            var newY = this._y + dir[1];
            var newKey = newX + "," + newY;
            if (!(newKey in Game.map)) {
                return;
            }

            Game.display.draw(this._x, this._y, Game.map[this._x + "," + this._y]);
            this._x = newX;
            this._y = newY;
            this._draw();
            window.removeEventListener("keydown", this);
            Game.engine.unlock();
        };

        Player.prototype._draw = function () {
            Game.display.draw(this._x, this._y, "@", "#ff0");
        };

        Player.prototype._checkBox = function () {
            var key = this._x + "," + this._y;
            if (Game.map[key] != "*") {
                alert("There is no box here!");
            } else if (key == Game.ananas) {
                alert("Hooray! You found an ananas and won this game.");
                Game.engine.lock();
                window.removeEventListener("keydown", this);
            } else {
                alert("This box is empty :-(");
            }
        };

        return Player;
    });
