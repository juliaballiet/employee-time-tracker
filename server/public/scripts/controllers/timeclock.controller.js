timeApp.controller('TimeclockController', function($http){
    let vm = this;

    vm.timeclockArray = [];
    vm.editing = false;

    vm.getHours = function(dates){
        console.log('/in getHours with: ', dates);

        $http({
            method: 'POST',
            url: '/timeclock/',
            data: dates
        }).then(function(response){
            console.log('back from server with: ', response.data);
            vm.timeclockArray = response.data
        }).catch(function(error){
            console.log('error: ', error);
            alert('there was an error getting the timeclock');
        })
    }
    
    vm.deleteEntry = function(id){
        console.log('in deleteEntry with: ', id);

        $http({
            method: 'DELETE',
            url: '/timeclock/' + id
        }).then(function(response){
            console.log('back from server with: ', response.data);
            vm.getHours(vm.dates);
        }).catch(function(error){
            console.log('error: ', error);
            alert('there was an error getting the timeclock');
        })
    }

    vm.viewEditEntry = function(entry){
        console.log('in viewEditEntry with: ', entry);
        vm.editing = true;
        vm.edit = entry;
    }

    vm.editEntry = function(entry){
        console.log('in editEntry with: ', entry);

        $http({
            method: 'PUT',
            url: '/timeclock',
            data: entry
        }).then(function(response){
            console.log('back from server with: ', response.data);
            vm.editing = false;
            vm.getHours(vm.dates);
        }).catch(function(error){
            console.log('error: ', error);
            alert('there was an error editing the timeclock');
        })
    }

})