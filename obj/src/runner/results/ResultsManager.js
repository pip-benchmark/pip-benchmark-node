"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultsManager = void 0;
class ResultsManager {
    constructor() {
        this._results = [];
        this._updatedListeners = [];
        this._messageListeners = [];
        this._errorListeners = [];
    }
    get all() {
        return this._results;
    }
    add(result) {
        this._results.push(result);
    }
    clear() {
        this._results = [];
    }
    addUpdatedListener(listener) {
        this._updatedListeners.push(listener);
    }
    removeUpdatedListener(listener) {
        for (let index = this._updatedListeners.length - 1; index >= 0; index--) {
            if (this._updatedListeners[index] == listener)
                this._updatedListeners = this._updatedListeners.splice(index, 1);
        }
    }
    notifyUpdated(result) {
        for (let index = 0; index < this._updatedListeners.length; index++) {
            try {
                let listener = this._updatedListeners[index];
                listener(result);
            }
            catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }
    addMessageListener(listener) {
        this._messageListeners.push(listener);
    }
    removeMessageListener(listener) {
        for (let index = this._messageListeners.length - 1; index >= 0; index--) {
            if (this._messageListeners[index] == listener)
                this._messageListeners = this._messageListeners.splice(index, 1);
        }
    }
    notifyMessage(message) {
        for (let index = 0; index < this._messageListeners.length; index++) {
            try {
                let listener = this._messageListeners[index];
                listener(message);
            }
            catch (ex) {
                // Ignore and send a message to the next listener.
            }
        }
    }
    addErrorListener(listener) {
        this._errorListeners.push(listener);
    }
    removeErrorListener(listener) {
        for (let index = this._errorListeners.length - 1; index >= 0; index--) {
            if (this._errorListeners[index] == listener)
                this._errorListeners = this._errorListeners.splice(index, 1);
        }
    }
    notifyError(error) {
        for (let index = 0; index < this._errorListeners.length; index++) {
            try {
                let listener = this._errorListeners[index];
                listener(error);
            }
            catch (ex) {
                // Ignore and send an error to the next listener.
            }
        }
    }
}
exports.ResultsManager = ResultsManager;
//# sourceMappingURL=ResultsManager.js.map