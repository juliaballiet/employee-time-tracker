// controller for the dialog used to add new employee
timeApp.controller('AddEmployeeController', function ($http, $mdDialog) {
    let vm = this;

    vm.answer = function (answer) {
        $mdDialog.hide(answer);
    };

    vm.cancel = function () {
        $mdDialog.cancel();
    };

})