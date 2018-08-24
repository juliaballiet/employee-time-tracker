timeApp.controller('TimeclockController', ['$http', 'moment', function ($http, moment) {
    let now = moment();
    console.log(now);
    let vm = this;
 
    vm.timeclockArray = [];
    vm.editing = 0;
    vm.searching = false;

    vm.cancelEdit = function () {
        vm.editing = 0;
    }

    vm.getHours = function (dates) {
        console.log('/in getHours with: ', dates);
        vm.searching = true;

        $http({
            method: 'POST',
            url: '/timeclock/',
            data: dates
        }).then(function (response) {
            console.log('back from server with: ', response.data);
            let responseArray = response.data;
            for (let response of responseArray) {
                response.date = moment(response.date).format("ddd M/D/YY");
                response.clockin_time = moment(response.clockin_time, 'HH:mm:ss.SSSSSS').format('hh:mm a');
                response.clockout_time = moment(response.clockout_time, 'HH:mm:ss.SSSSSS').format('hh:mm a');
                if (response.hours.minutes > 0) {
                    response.hours.minutes = '.' + Math.floor(((response.hours.minutes / 60) * 100));
                }
            }
            console.log(responseArray);
            vm.timeclockArray = responseArray;
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error getting the timeclock');
        })
    }

    vm.deleteEntry = function (id) {
        console.log('in deleteEntry with: ', id);

        $http({
            method: 'DELETE',
            url: '/timeclock/' + id
        }).then(function (response) {
            console.log('back from server with: ', response.data);
            vm.getHours(vm.dates);
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error getting the timeclock');
        })
    }

    vm.viewEditFields = function (entry) {
        console.log('in viewEditFields with: ', entry);
        vm.editing = employee.id;
        vm.employeeToEdit = employee;
        console.log(vm.employeeToEdit);
    }

    // vm.viewEditEntry = function (entry) {
    //     console.log('in viewEditEntry with: ', entry);
    //     vm.editing = true;
    //     vm.edit = entry;
    // }

    vm.editEntry = function (entry) {
        console.log('in editEntry with: ', entry);

        entry.date = moment(entry.date, 'ddd M/D/YY').format('YYYY-MM-DD');

        $http({
            method: 'PUT',
            url: '/timeclock',
            data: entry
        }).then(function (response) {
            console.log('back from server with: ', response.data);
            vm.editing = false;
            vm.getHours(vm.dates);
        }).catch(function (error) {
            console.log('error: ', error);
            alert('there was an error editing the timeclock');
        })
    }

}])