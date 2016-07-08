var dayPlanner = angular.module('dayPlanner', []);

function mainController($scope, $http) {
    $scope.formData = {};

    //when landing on page, get all events and display
    $http.get('/api/events')
        .success(function(data) {
            $scope.events = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error ' + data);
        });

        //when posting a new event, send text to Node API
        $scope.createEvent = function() {
            $http.post('/api/events', $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; //clear form so we can reuse it
                    $scope.events = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error ' + data);
                });
        };

        //delete an event after button press
        $scope.deleteEvent = function(id) {
            $http.delete('/api/events/' + id)
                .success(function(data) {
                    $scope.events = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error ' + data);
                });
        };
}
