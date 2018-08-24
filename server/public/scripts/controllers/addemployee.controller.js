timeApp.controller('AddEmployeeController', function ($http, $mdDialog) {
    let vm = this;

    vm.answer = function (answer) {
        $mdDialog.hide(answer);
    };

    vm.cancel = function () {
        $mdDialog.cancel();
    };

})