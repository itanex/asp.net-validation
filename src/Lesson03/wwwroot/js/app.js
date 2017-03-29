var Lesson03;
(function (Lesson03) {
    // product.model.js
    var Product = (function () {
        function Product() {
            this.id = null;
            this.name = '';
            this.price = null;
        }
        return Product;
    }());
    // application.controller.js
    var ApplicationController = (function () {
        function ApplicationController($resource) {
            this.$resource = $resource;
            this.product = new Product();
            this.validationErrors = [];
            this.ProductResource = $resource('api/products');
            this.products = this.ProductResource.query();
        }
        ApplicationController.prototype.save = function () {
            var _this = this;
            this.ProductResource.save(
            // Data to send to Endpoint
            this.product, 
            // Success Handler (promise.then/success)
            function () {
                _this.products.push(_this.product);
                _this.clearForm();
            }, 
            // Error Handler (promise.error/fail/failure)
            function (response) {
                // clear old errors
                _this.validationErrors = [];
                // for...in iterates the KEYs or Properties of an object
                for (var prop in response.data) {
                    _this.validationErrors.push(prop + " - " + response.data[prop]);
                }
            });
        };
        ApplicationController.prototype.clearForm = function () {
            this.product = new Product();
            this.validationErrors = [];
        };
        return ApplicationController;
    }());
    ApplicationController.$inject = ['$resource'];
    // app.js
    var module = angular.module('app', [
        'ngResource'
    ]);
    module.controller('ApplicationController', ApplicationController);
})(Lesson03 || (Lesson03 = {}));
//# sourceMappingURL=app.js.map