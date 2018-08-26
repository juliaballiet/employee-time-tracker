timeApp.controller('HoursController', function($http){
    let vm = this;
    vm.searching = false;
    
    vm.getHours = function(dates){
        console.log('/in getHours with: ', dates);
        vm.searching = true;
        let start = moment(dates.start).format('YYYY-MM-DD');
        let end = moment(dates.end).format('YYYY-MM-DD');

        $http({
            method: 'GET',
            url: `/timeclock/hours?start=${start}&end=${end}`
        }).then(function(response){
            console.log('back from server with: ', response.data);
            let responseArray = response.data
            for (let response of responseArray) {
                if (response.hours.minutes > 0) {
                    response.hours.minutes = '.' + Math.floor(((response.hours.minutes / 60) * 100));
                }
            }
            console.log(responseArray);
            vm.hoursArray = responseArray;
        }).catch(function(error){
            console.log('error: ', error);
            alert('there was an error getting the timeclock');
        })
    }

})