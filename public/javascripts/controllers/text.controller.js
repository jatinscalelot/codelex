app.controller("TextController", ($scope, $http,) => {
    $scope.textid = 0;
    $scope.textdata = '';
    $scope.onLoad = function () {
        $http({
            url: BASE_URL + "text/get",
            method: "POST",
            cache: false,
            data: {},
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        }).then(
            function (response) {
                if (response.data.IsSuccess == true && response.data.Data != 0) {
                    $scope.textdata = response.data.Data.txt;
                    $scope.textid = response.data.Data._id;
                } else {
                    swal("Oops", response.data.Message, "error");
                }
            }
        );
    };
    $scope.onLoad();
    $scope.save = () => {
        $http({
            url: BASE_URL + "text/set",
            method: "POST",
            cache: false,
            data: {textid : $scope.textid, textdata : $scope.textdata},
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        }).then(
            function (response) {
                if (response.data.IsSuccess == true && response.data.Data != 0) {
                    swal("Congo.", "App.txt data saved successfully...", "success");
                } else {
                    swal("Oops", response.data.Message, "error");
                }
            }
        );
    };
});

