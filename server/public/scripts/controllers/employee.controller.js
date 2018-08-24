timeApp.controller('EmployeeController', function ($http, $mdDialog) {
    let vm = this;
    vm.editing = 0;

    getEmployees();

    vm.addNewEmployee = function () {
        $mdDialog.show({
            controller: 'AddEmployeeController as ac',
            templateUrl: 'views/add-employee.tmpl.html',
            parent: angular.element(document.body),
            // targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function (answer) {
                vm.addEmployee(answer);
                getEmployees();
            }).catch(function (error) {
                console.log('error: ', error);
            });
    }

    vm.addEmployee = function (employee) {
        console.log('in addEmployee with: ', employee);

        $http({
            method: 'POST',
            url: '/employees',
            data: employee
        }).then(function (response) {
            console.log('back from server with: ', response);
            vm.newEmployee = {
                first_name: '',
                last_name: '',
                clockin_code: ''
            }
            getEmployees();
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error adding the employee');
        })
    }

    vm.viewEditFields = function (employee) {
        vm.editing = employee.id;
        vm.employeeToEdit = employee;
        console.log(vm.employeeToEdit);
    }

    vm.cancelEdit = function(){
        vm.editing = 0;
    }

    vm.editEmployee = function (employee) {
        console.log('in editEmployee with: ', employee);

        $http({
            method: 'PUT',
            url: '/employees',
            data: employee
        }).then(function (response) {
            console.log('back from server with: ', response);
            vm.editing = 0;
            getEmployees();
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error editing the employee');
        })
    }

    vm.changeEmployeeStatus = function (employee) {
        console.log('in changeEmployeeStatus with: ', employee);

        employee.active = !employee.active;

        $http({
            method: 'PUT',
            url: `employees/status/${employee.id}/${employee.active}`
        }).then(function (response) {
            console.log('back from server with: ', response);
            getEmployees();
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error editing the employee');
        })
    }

    function getEmployees() {
        console.log('in getEmployees');
        vm.employeeArray = [];
        vm.deactivatedEmployeeArray = [];

        $http({
            method: 'GET',
            url: '/employees'
        }).then(function (response) {
            console.log('back from server with: ', response.data);
            employeeArrayToLoopThrough = response.data;
            for (let employee of employeeArrayToLoopThrough) {
                if (employee.active === true) {
                    vm.employeeArray.push(employee);
                } else {
                    vm.deactivatedEmployeeArray.push(employee);
                }
            }
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error getting the employees');
        })
    }

})