timeApp.controller('HoursController', function($http){
    let vm = this;
    
    vm.getHours = function(dates){
        console.log('/in getHours with: ', dates);

        $http({
            method: 'POST',
            url: '/timeclock/hours',
            data: dates
        }).then(function(response){
            console.log('back from server with: ', response.data);
            vm.hoursArray = response.data
        }).catch(function(error){
            console.log('error: ', error);
            alert('there was an error getting the timeclock');
        })
    }

})