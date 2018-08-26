timeApp.controller('TimeclockController', ['$http', '$mdDialog', 'moment', '$mdToast', function ($http, $mdDialog, moment, $mdToast) {
    let now = moment();
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
        let start = moment(dates.start).format('YYYY-MM-DD');
        let end = moment(dates.end).format('YYYY-MM-DD');

        $http({
            method: 'GET',
            url: `/timeclock?start=${start}&end=${end}`
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

        let confirm = $mdDialog.confirm()
            .title('Are you sure you would like to delete this?')
            .textContent('Deleting an entry cannot be undone.')
            .ariaLabel('Delete')
            .ok('Delete')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function () {
            $http({
                method: 'DELETE',
                url: '/timeclock/' + id
            }).then(function (response) {
                console.log('back from server with: ', response.data);
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('entry deleted')
                        .position('top right')
                        .hideDelay(1500)
                );
                vm.getHours(vm.dates);
            }).catch(function (error) {
                console.log('error: ', error);
                alert('there was an error getting the timeclock');
            })
        }).catch(function(error){

        });

    }

    vm.viewEditFields = function (entry) {
        console.log('in viewEditFields with: ', entry);
        vm.editing = entry.id;
        entry.date = moment(entry.date).format('MM-DD-YYYY');
        vm.edit = entry;
        console.log(vm.edit);
    }

    vm.editEntry = function (entry) {
        console.log('in editEntry with: ', entry);

        entry.date = moment(entry.date, 'MM-DD-YYYY').format('YYYY-MM-DD');

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