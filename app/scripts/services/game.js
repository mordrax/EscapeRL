'use strict';

/**
 * @ngdoc service
 * @name escapeRlApp.Game
 * @description
 * # Game
 * Service in the escapeRlApp.
 */
angular.module('escapeRlApp')
    .service('Game', function Game() {
        var Game = {
            display: null,
            map: {},
            engine: null,
            player: null,
            pedro: null,
            ananas: null,

            init: function (Player, Pedro) {
                this.display = new ROT.Display({spacing: 1.1});
                document.getElementById('display').appendChild(this.display.getContainer());
                this.display.setOptions({
                    fontSize: 18
                });

                this._generateMap(Player, Pedro);

                var scheduler = new ROT.Scheduler.Simple();
                scheduler.add(this.player, true);
                scheduler.add(this.pedro, true);

                this.engine = new ROT.Engine(scheduler);
                this.engine.start();
            },

            _generateMap: function (Player, Pedro) {
                var digger = new ROT.Map.Digger();
                var freeCells = [];

                var digCallback = function (x, y, value) {
                    if (value) {
                        return;
                    }

                    var key = x + "," + y;
                    this.map[key] = ".";
                    freeCells.push(key);
                };
                digger.create(digCallback.bind(this));

                this._generateBoxes(freeCells);
                this._drawWholeMap();

                this.player = this._createBeing(Player, freeCells);
                this.pedro = this._createBeing(Pedro, freeCells);
            },

            _createBeing: function (what, freeCells) {
                var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
                var key = freeCells.splice(index, 1)[0];
                var parts = key.split(",");
                var x = parseInt(parts[0]);
                var y = parseInt(parts[1]);
                return new what(x, y);
            },

            _generateBoxes: function (freeCells) {
                for (var i = 0; i < 10; i++) {
                    var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
                    var key = freeCells.splice(index, 1)[0];
                    this.map[key] = "*";
                    if (!i) {
                        this.ananas = key;
                    }
                    /* first box contains an ananas */
                }
            },

            _drawWholeMap: function () {
                for (var key in this.map) {
                    var parts = key.split(",");
                    var x = parseInt(parts[0]);
                    var y = parseInt(parts[1]);
                    this.display.draw(x, y, this.map[key]);
                }
            }
        };

        return Game;
    });
