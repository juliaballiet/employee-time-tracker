timeApp.controller('EmployeeController', function($http){
    let vm = this;
    vm.employeeArray = [];

    getEmployees();

    vm.addEmployee = function(employee){
        console.log('in addEmployee with: ', employee);

        $http({
            method: 'POST',
            url: '/employees',
            data: employee
        }).then(function(response){
            console.log('back from server with: ', response);
            getEmployees();
        }).catch(function(error){
            console.log('error: ', error);
            alert('there was an error adding the employee');
        })
    }
    
    function getEmployees(){
        console.log('in getEmployees');

        $http({
            method: 'GET',
            url: '/employees'
        }).then(function(response){
            console.log('back from server with: ', response.data);
            vm.employeeArray = response.data;
        }).catch(function(error){
            console.log('error: ', error);
            alert('there was an error getting the employees');
        })
    }
})