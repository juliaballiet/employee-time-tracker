timeApp.controller('EmployeeController', function ($http, $mdDialog) {
    let vm = this;
    // defines the id of the employee being edited -- 0 for no one
    vm.editing = 0;
    vm.showDeactivated = false;

    // displays employees on page load
    getEmployees();

    vm.toggleDeactivatedEmployees = function () {
        // toggles the deactivated employees between showing and not showing
        vm.showDeactivated = !vm.showDeactivated;
    } // end toggleDeactivatedEmployees

    vm.addNewEmployee = function () {
        // opens a dialog to enter new employee info into
        $mdDialog.show({
            controller: 'AddEmployeeController as ac',
            templateUrl: 'views/add-employee.tmpl.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function (answer) {
            // adds employee using the value of the inputs on the dialog
            vm.addEmployee(answer);
        }).catch(function (error) {
            console.log('error: ', error);
        });
    } // end addNewEmployee

    vm.addEmployee = function (employee) {
        console.log('in addEmployee with: ', employee);
        // sends the employee info to the database
        $http({
            method: 'POST',
            url: '/employees',
            data: employee
        }).then(function (response) {
            console.log('back from server with: ', response);
            // gets the updated list of employees
            getEmployees();
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error adding the employee');
        })
    } // end addEmployee

    vm.viewEditFields = function (employee) {
        // sets the id of the employee to edit to the id of the employee clicked
        vm.editing = employee.id;
        // sets the value of the input fields to match the employee's info
        vm.employeeToEdit = employee;
        console.log(vm.employeeToEdit);
    } // end viewEditFields

    vm.cancelEdit = function () {
        // resets the editing id to 0
        vm.editing = 0;
    } // end cancelEdit

    vm.editEmployee = function (employee) {
        console.log('in editEmployee with: ', employee);
        // updates the employee in the database with the new information
        $http({
            method: 'PUT',
            url: '/employees',
            data: employee
        }).then(function (response) {
            console.log('back from server with: ', response);
            // resets the editing id to 0
            vm.editing = 0;
            // gets the updated list of employees
            getEmployees();
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error editing the employee');
        })
    } // end editEmployee

    vm.changeEmployeeStatus = function (employee) {
        console.log('in changeEmployeeStatus with: ', employee);
        // toggles the employees status
        employee.active = !employee.active;
        // sends the updated status to the database
        $http({
            method: 'PUT',
            url: `employees/status/${employee.id}/${employee.active}`
        }).then(function (response) {
            console.log('back from server with: ', response);
            // gets the updated list of employees
            getEmployees();
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error editing the employee');
        })
    } // end changeEmployeeStatus

    function getEmployees() {
        console.log('in getEmployees');
        // empties employee array
        vm.employeeArray = [];
        // empties deqactivated employee array
        vm.deactivatedEmployeeArray = [];
        // gets the employees from the database
        $http({
            method: 'GET',
            url: '/employees'
        }).then(function (response) {
            console.log('back from server with: ', response.data);
            employeeArrayToLoopThrough = response.data;
            // loops through the array received from the database
            for (let employee of employeeArrayToLoopThrough) {
                if (employee.active === true) {
                    // adds active employees to vm.employeeArray
                    vm.employeeArray.push(employee);
                } else {
                    // adds deactivated employees to vm.deactivatedEmployeeArray
                    vm.deactivatedEmployeeArray.push(employee);
                }
            }
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error getting the employees');
        })
    } // end getEmployees

})