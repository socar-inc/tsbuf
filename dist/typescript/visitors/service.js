"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceVisitor = /** @class */ (function () {
    function ServiceVisitor() {
        var _this = this;
        this.services = [];
        this.visitor = {
            Proto: {
                enter: function (path) {
                    path.context.services = _this.services;
                },
            },
            Service: {
                enter: function (path) {
                    var service = path.node;
                    _this.services.push({
                        name: service.name.name,
                        methods: [],
                    });
                },
                exit: function (path) {
                    //
                },
            },
            Rpc: {
                enter: function (path) {
                    var rpc = path.node;
                    var service = _this.services.slice(-1)[0];
                    service.methods.push({
                        type: 'rpc',
                        name: rpc.name.name,
                        argTypeName: rpc.argTypeName,
                        returnTypeName: rpc.returnTypeName,
                    });
                },
            },
        };
    }
    ServiceVisitor.prototype.getVisitor = function () {
        return this.visitor;
    };
    return ServiceVisitor;
}());
exports.ServiceVisitor = ServiceVisitor;
