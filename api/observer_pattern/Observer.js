"use strict";
//Actividad: Observer
//Tecnico : Observer
//Centro de operacion : Subject 
exports.__esModule = true;
var CenterOperation = /** @class */ (function () {
    function CenterOperation(server, io) {
        this.observers = [];
        this.io = io;
        this.createSocket(server, this.io);
        this.temperature = 0;
    }
    CenterOperation.prototype.setTemperature = function (temp) {
        console.log('CenterOperation: new temperature measurement:' + temp);
        this.temperature = temp;
        this.notify();
    };
    CenterOperation.prototype.register = function (newObserver) {
        this.observers.push(newObserver);
    };
    CenterOperation.prototype.unregister = function (deleteObserver) {
        var index = this.observers.indexOf(deleteObserver);
        this.observers.splice(index, 1);
    };
    CenterOperation.prototype.notify = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this.temperature);
        }
    };
    CenterOperation.prototype.createSocket = function (server, socket) {
        this.io = socket(server);
        this.io.on('connection', function (socket) {
            socket.on("new user", function () {
                console.log('new user');
            });
        }, this.io.on('new message', function (message) {
            console.log(message);
            message.emit('user says', message);
        }), this.io.on('disconnect', function (socket) {
            socket.broadcast.emit("user disconnected", { message: "new user disconnected" });
        }));
        console.log(this.io.sockets._events);
    };
    return CenterOperation;
}());
var Activity = /** @class */ (function () {
    function Activity(WeatherStation) {
        this.subject = WeatherStation;
        WeatherStation.register(this);
    }
    Activity.prototype.update = function (temperature) {
        console.log('Activity: I need to update my display');
    };
    return Activity;
}());
var Technical = /** @class */ (function () {
    function Technical(WeatherStation) {
        this.subject = WeatherStation;
        WeatherStation.register(this);
    }
    Technical.prototype.update = function (temperature) {
        if (temperature > 25) {
            console.log('Tecnical: its not here, turning myself on...');
        }
        else {
            console.log('Tecnical: its nice and cool, turning myself off...');
        }
    };
    return Technical;
}());
// let centerOperation = new CenterOperation('io');
// let activity = new Activity(centerOperation);
// let technical = new Technical(centerOperation);
// centerOperation.setTemperature(20);
// centerOperation.setTemperature(30);
exports["default"] = CenterOperation;
