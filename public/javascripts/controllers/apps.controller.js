app.controller("AppsController", ($scope, $http,) => {
    $scope.addNew = function () {
        window.location.href = "/apps/create";
    }
    $scope.create = function () {
        let obj = {
            acccount_name : $scope.acccount_name,
            package_name : $scope.package_name,
            banner_ADS : $scope.banner_ADS,
            native_ADS : $scope.native_ADS,
            VPN_key : $scope.VPN_key,
            priority : $scope.priority,
            application_name : $scope.application_name,
            app_open_ads : $scope.app_open_ads,
            interstitial_ADS : $scope.interstitial_ADS,
            rewarded_ADS : $scope.rewarded_ADS,
            web_URL : $scope.web_URL,
            privacy_policy : $scope.privacy_policy
        };
        $http({
            url: BASE_URL+'apps',
            method: "POST",
            cache: false,
            data: obj,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        }).then(
            function (response) {
                if (response.data.IsSuccess == true && response.data.Data != 0) {
                    swal("Congo.", "App data saved successfully...", "success");
                    window.location.href = "/apps";
                } else {
                    swal("Oops", response.data.Message, "error");
                }
            },
            function (error) {
                console.log(error);
                if (error.status == 401) {
                    window.location.href = AUTO_LOGOUT;
                }
                console.error("Something Went Wrong! try again");
            }
        );
    }
});
