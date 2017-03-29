namespace Lesson03 {

    // product.model.js
    class Product {
        public id: number = null;
        public name: string = '';
        public price: number = null;
    }

    // application.controller.js
    class ApplicationController {
        private ProductResource: ng.resource.IResourceClass<Product>;
        public products: Product[];
        public product: Product = new Product();
        public validationErrors: string[] = [];

        static $inject = ['$resource'];

        constructor(private $resource: ng.resource.IResourceService) {
            this.ProductResource = $resource<Product>('api/products');

            this.products = this.ProductResource.query();
        }

        public save(): void {
            this.ProductResource.save(
                // Data to send to Endpoint
                this.product,

                // Success Handler (promise.then/success)
                () => {
                    this.products.push(this.product);
                    this.clearForm();
                },
                
                // Error Handler (promise.error/fail/failure)
                (response: any) => {
                    // clear old errors
                    this.validationErrors = [];

                    // for...in iterates the KEYs or Properties of an object
                    for (let prop in response.data) {
                        this.validationErrors.push(`${prop} - ${response.data[prop]}`);
                    }
                }
            );
        }

        private clearForm(): void {
            this.product = new Product();
            this.validationErrors = [];
        }
    }

    // app.js
    let module: ng.IModule = angular.module('app', [
        'ngResource'
    ]);

    module.controller('ApplicationController', ApplicationController);
}