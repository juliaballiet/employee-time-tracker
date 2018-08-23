timeApp.controller('ClockinController', function($http){
    let vm = this;
    vm.clockingIn = false;

    vm.clockInEmployee = function(code){
        console.log('in clockInEmployee with: ', code);

        $http({
            method: 'GET',
            url: '/employees/' + code
        }).then(function(response){
            console.log('back from server with: ', response.data);
            vm.clockingIn = true;
            vm.employee = response.data[0];
            if (vm.employee.clocked_in === false) {
                vm.status = 'You are currently clocked out.';
                vm.button = 'clock in'
            } else {
                vm.status = 'You are currently clocked in.';
                vm.button = 'clock out'
            }
            vm.clockInCode = '';
        }).catch(function(error){
            console.log('error: ', error);
            alert('please enter a valid clockin number!');
        })
    }

    vm.changeStatus = function(id){
        console.log('in changeStatus with: ', id);

        $http({
            method: 'PUT',
            url: '/employees/' + id
        }).then(function(response){
            console.log('back from server with: ', response);
            alert('success!');
            vm.clockingIn = false;
        }).catch(function(error){
            console.log('error: ', error);
            alert('there was an error clocking in');
        })
    }
})