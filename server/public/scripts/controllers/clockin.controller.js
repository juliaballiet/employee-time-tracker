timeApp.controller('ClockinController', function ($http, $mdToast, $mdDialog) {
    let vm = this;

    // opens dialog that allows employee to clock in or out
    vm.clockInEmployee = function (code) {
        console.log('in clockInEmployee with: ', code);
        // gets the employee associated with the clock in code
        $http({
            method: 'GET',
            url: '/employees/' + code
        }).then(function (response) {
            console.log('back from server with: ', response.data);
            vm.employee = response.data[0];
            // does not allow a deactivated employee to clock in
            if (vm.employee.active === false) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('This employee is not active.')
                        .textContent('A deactivated employee cannot clock in.')
                        .ariaLabel('Deactivated employee')
                        .ok('Okay')
                );
            } else {
                if (vm.employee.clocked_in === false) {
                    // clocks employee in if they are currently clocked out
                    let confirm = $mdDialog.confirm()
                        .title(`Hello ${vm.employee.first_name}!`)
                        .textContent('You are currently clocked out.')
                        .ariaLabel('Clock in')
                        .targetEvent()
                        .ok('Clock in')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        vm.clockIn(vm.employee.id);
                    });
                } else {
                    // clocks employee out if they are currently clocked in
                    let confirm = $mdDialog.confirm()
                        .title(`Hello ${vm.employee.first_name}!`)
                        .textContent('You are currently clocked in.')
                        .ariaLabel('Clock out')
                        .targetEvent()
                        .ok('Clock out')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        vm.clockOut(vm.employee.id);
                    });
                }
            }
            vm.clockInCode = '';
        }).catch(function (error) {
            console.log('error: ', error);
            // alert shows if not employee exists with that clock in number
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Please enter a valid clockin number.')
                    .ariaLabel('Invalid clockin')
                    .ok('Okay')
            );
        })
    } // end clockInEmployee

    vm.clockIn = function (id) {
        console.log('in clockIn with: ', id);
        // changes employee status to clocked in
        $http({
            method: 'PUT',
            url: '/employees/' + id
        }).then(function (response) {
            console.log('back from server with: ', response);
            // runs funtion to add new entry to timeclock
            addToTimeclock(id);
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error clocking in');
        })
    } // end clockIn

    vm.clockOut = function (id) {
        console.log('in clockOut with: ', id);
        // sets clockout time to current time
        $http({
            method: 'PUT',
            url: '/timeclock/' + id
        }).then(function (response) {
            console.log('back from server with: ', response);
            // confirms the employee has been clocked out
            $mdToast.show(
                $mdToast.simple()
                    .textContent('you are now clocked out')
                    .position('top right')
                    .hideDelay(1500)
            );
            // runs function to change employee status to clocked out
            clockOutStatus(id);
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error clocking out');
        })
    } // end clockOut

    function clockOutStatus(id) {
        // changes employee status to clocked out
        $http({
            method: 'PUT',
            url: '/employees/' + id
        }).then(function (response) {
            console.log('back from server with: ', response);
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error clocking out');
        })
    } // end clockOutStatus

    function addToTimeclock(id) {
        console.log('in addToTimeclock with: ', id);
        // sends the new clock in to the database
        $http({
            method: 'POST',
            url: '/timeclock/' + id
        }).then(function (response) {
            console.log('back from server with: ', response);
            // confirms the employee has been clocked in
            $mdToast.show(
                $mdToast.simple()
                    .textContent('you are now clocked in')
                    .position('top right')
                    .hideDelay(1500)
            );
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error clocking in');
        })
    } // end addToTimeClock
})