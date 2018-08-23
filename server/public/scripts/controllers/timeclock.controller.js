timeApp.controller('TimeclockController', function($http){
    let vm = this;

    vm.timeclockArray = [];

    vm.getHours = function(dates){
        console.log('/in getHours with: ', dates);

        $http({
            method: 'GET',
            url: '/timeclock/' + dates
        }).then(function(response){
            console.log('back from server with: ', response.data);
            vm.timeclockArray = response.data
        }).catch(function(error){
            console.log('error: ', error);
            alert('there was an error getting the timeclock');
        })
    }
})