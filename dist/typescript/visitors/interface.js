"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InterfaceVisitor = /** @class */ (function () {
    function InterfaceVisitor() {
        var _this = this;
        this.rootInterfaces = [];
        this.interfaceScopeStack = [];
        this.visitor = {
            Proto: {
                exit: function (path) {
                    path.context.interfaces = _this.rootInterfaces;
                },
            },
            Message: {
                enter: function (path) {
                    var message = path.node;
                    var interfaceTree = {
                        node: {
                            name: message.name.name,
                            fields: [],
                        },
                        children: [],
                    };
                    _this.enterInterface(interfaceTree);
                },
                exit: function (path) {
                    _this.exitInterface();
                },
            },
            Field: {
                exit: function (path) {
                    var field = path.node;
                    var iscope = _this.getInterfaceScope();
                    if (iscope === null) {
                        throw new Error('Field should be included in Message.');
                    }
                    iscope.node.fields.push({
                        type: 'normal',
                        typeName: field.typeName,
                        name: field.name.name,
                        repeated: field.repeated,
                    });
                },
            },
            MapField: {
                exit: function (path) {
                    var field = path.node;
                    var iscope = _this.getInterfaceScope();
                    if (iscope === null) {
                        throw new Error('Map should be included in Message.');
                    }
                    iscope.node.fields.push({
                        type: 'map',
                        typeName: field.valueTypeName,
                        name: field.name.name,
                    });
                },
            },
            OneofField: {
                exit: function (path) {
                    var field = path.node;
                    var iscope = _this.getInterfaceScope();
                    if (iscope === null) {
                        throw new Error('OneofField should be included in Message.');
                    }
                    iscope.node.fields.push({
                        type: 'normal',
                        typeName: field.typeName,
                        name: field.name.name,
                        repeated: false,
                        optional: true,
                    });
                },
            },
        };
    }
    InterfaceVisitor.prototype.getVisitor = function () {
        return this.visitor;
    };
    InterfaceVisitor.prototype.enterInterface = function (i) {
        if (this.interfaceScopeStack.length === 0) {
            this.rootInterfaces.push(i);
        }
        else {
            var iscope = this.getInterfaceScope();
            iscope.children.push(i);
        }
        this.interfaceScopeStack.push(i);
    };
    InterfaceVisitor.prototype.exitInterface = function () {
        this.interfaceScopeStack.pop();
    };
    InterfaceVisitor.prototype.getInterfaceScope = function () {
        return this.interfaceScopeStack.slice(-1)[0] || null;
    };
    return InterfaceVisitor;
}());
exports.InterfaceVisitor = InterfaceVisitor;
