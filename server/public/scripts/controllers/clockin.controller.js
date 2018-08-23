timeApp.controller('ClockinController', function ($http) {
    let vm = this;
    vm.clockingIn = false;

    vm.clockInEmployee = function (code) {
        console.log('in clockInEmployee with: ', code);

        $http({
            method: 'GET',
            url: '/employees/' + code
        }).then(function (response) {
            console.log('back from server with: ', response.data);
            vm.clockingIn = true;
            vm.employee = response.data[0];
            if (vm.employee.clocked_in === false) {
                vm.status = 'You are currently clocked out.';
                vm.clockedOut = true;
            } else {
                vm.status = 'You are currently clocked in.';
                vm.clockedOut = false;
            }
            vm.clockInCode = '';
        }).catch(function (error) {
            console.log('error: ', error);
            alert('please enter a valid clockin number!');
        })
    }

    vm.clockIn = function (id) {
        console.log('in clockIn with: ', id);

        $http({
            method: 'PUT',
            url: '/employees/' + id
        }).then(function (response) {
            console.log('back from server with: ', response);
            addToTimeclock(id);
            vm.clockingIn = false;
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error clocking in');
        })

    }

    vm.clockOut = function (id) {
        console.log('in clockOut with: ', id);

        $http({
            method: 'PUT',
            url: '/timeclock/' + id
        }).then(function(response){
            console.log('back from server with: ', response);
            alert('success!');
            vm.clockingIn = false;
            clockOutStatus(id);
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error clocking out');
        })
    }

    function clockOutStatus(id){
        $http({
            method: 'PUT',
            url: '/employees/' + id
        }).then(function (response) {
            console.log('back from server with: ', response);
            vm.clockingIn = false;
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error clocking out');
        })
    }

    function addToTimeclock(id) {
        console.log('in addToTimeclock with: ', id);

        $http({
            method: 'POST',
            url: '/timeclock/' + id
        }).then(function (response) {
            console.log('back from server with: ', response);
            alert('success!');
            vm.clockingIn = false;
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error clocking in');
        })
    }
})