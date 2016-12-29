(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.email, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.email, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

    angular
        .module('app')
        .controller('ForgotpasswordController', ForgotpasswordController);

    ForgotpasswordController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function ForgotpasswordController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.forgotpassword = forgotpassword;

        function forgotpassword() {
            UserService.Forgot(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('send successfully', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
