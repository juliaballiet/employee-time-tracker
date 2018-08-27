timeApp.controller('HoursController', function($http){
    let vm = this;
    // hides the table that lists the hours
    vm.showHours = false;
    
    vm.getHours = function(dates){
        console.log('/in getHours with: ', dates);
        // shows the table that lists the hours
        vm.showHours = true;
        // sets start and end date to their corresponding inputs and formats the date
        let start = moment(dates.start).format('YYYY-MM-DD');
        let end = moment(dates.end).format('YYYY-MM-DD');
        // gets the hour totals between the selected date
        $http({
            method: 'GET',
            url: `/timeclock/hours?start=${start}&end=${end}`
        }).then(function(response){
            console.log('back from server with: ', response.data);
            let responseArray = response.data
            // loops through the array and converts minutes into hour decimals
            for (let response of responseArray) {
                if (response.hours.minutes > 0) {
                    response.hours.minutes = '.' + Math.floor(((response.hours.minutes / 60) * 100));
                }
            }
            console.log(responseArray);
            // sets vm.hoursArray to the array received from the database
            vm.hoursArray = responseArray;
        }).catch(function(error){
            console.log('error: ', error);
            alert('there was an error getting the timeclock');
        })
    } // end getHours

})