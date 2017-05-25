"use strict";
exports.__esModule = true;
/**
 * Возможные остояния плеера.
 */
var PlayerState;
(function (PlayerState) {
    PlayerState[PlayerState["INACTIVE"] = -1] = "INACTIVE";
    PlayerState[PlayerState["STOPPED"] = 0] = "STOPPED";
    PlayerState[PlayerState["PLAYING"] = 1] = "PLAYING";
    PlayerState[PlayerState["BUFFERING"] = 2] = "BUFFERING";
    PlayerState[PlayerState["PAUSED"] = 3] = "PAUSED";
})(PlayerState = exports.PlayerState || (exports.PlayerState = {}));
var PlayerApi = (function () {
    /**
     * Создает плеер с переданными параметрами.
     * @param params - Параметры нового плеера.
     * @returns Объект плеера.
     */
    function PlayerApi(params) {
    }
    return PlayerApi;
}());
exports.PlayerApi = PlayerApi;
