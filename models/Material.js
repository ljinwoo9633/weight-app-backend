"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Material = /** @class */ (function () {
    function Material(name, weight, price, imageUrl) {
        var _this = this;
        this.name = '';
        this.weight = 0;
        this.price = 0;
        this.imageUrl = '';
        this.GetName = function () {
            return _this.name;
        };
        this.GetPrice = function () {
            return _this.weight;
        };
        this.GetWeight = function () {
            return _this.price;
        };
        this.GetImageUrl = function () {
            return _this.imageUrl;
        };
        this.name = name;
        this.weight = weight;
        this.price = price;
        this.imageUrl = imageUrl;
    }
    return Material;
}());
exports.default = Material;
