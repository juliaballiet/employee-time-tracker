timeApp.controller('ClockinController', function($http){
    let vm = this;
    vm.employeeArray = [];

    getEmployees();

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