(function () {
    'use strict';

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
