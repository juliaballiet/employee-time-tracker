timeApp.controller('EmployeeController', function($http){
    let vm = this;
    vm.edit = false;

    getEmployees();

    vm.addEmployee = function(employee){
        console.log('in addEmployee with: ', employee);

        $http({
            method: 'POST',
            url: '/employees',
            data: employee
        }).then(function(response){
            console.log('back from server with: ', response);
            vm.newEmployee = {
                firstName: '',
                lastName: '',
                clockInCode: ''
            }
            getEmployees();
        }).catch(function(error){
            console.log('error: ', error);
            alert('there was an error adding the employee');
        })
    }

    vm.viewEditFields = function(employee){
        console.log('in viewEditFields with: ', employee);
        vm.edit = true;
        vm.employeeToEdit = employee;
        console.log(vm.employeeToEdit);
    }

    vm.changeEmployeeStatus = function(employee){
        console.log('in changeEmployeeStatus with: ', employee);

        employee.active = !employee.active;

        $http({
            method: 'PUT',
            url: `employees/status/${employee.id}/${employee.active}`
        }).then(function(response){
            console.log('back from server with: ', response);
            getEmployees();
        }).catch(function(error){
            console.log('error: ', error);
            alert('there was an error deactivating the employee');
        })
    }
    
    function getEmployees(){
        console.log('in getEmployees');
        vm.employeeArray = [];
        vm.deactivatedEmployeeArray = [];

        $http({
            method: 'GET',
            url: '/employees'
        }).then(function(response){
            console.log('back from server with: ', response.data);
            employeeArrayToLoopThrough = response.data;
            for (let employee of employeeArrayToLoopThrough) {
                if(employee.active === true) {
                    vm.employeeArray.push(employee);
                } else {
                    vm.deactivatedEmployeeArray.push(employee);
                }
            }
        }).catch(function(error){
            console.log('error: ', error);
            alert('there was an error getting the employees');
        })
    }
})