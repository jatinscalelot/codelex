app.controller("AppsController", ($scope, $http, HelperService) => {
    $scope.appdata = {
        acccount_name: '', 
        package_name: '',
        banner_ADS: '',
        native_ADS: '',
        VPN_key: '',
        priority: '',
        application_name: '',
        app_open_ads: '',
        interstitial_ADS: '',
        rewarded_ADS: '',
        web_URL: '',
        privacy_policy: '',
        adx_status_1 : true,
        adx_status_2 : true,
        adx_status_3 : true,
        vpn_status : true,
        web_url_status : true,
        all_status : true 
    };
    $scope.addNew = function () {
        window.location.href = "/apps/create";
    }
    $scope.create = function () {
        $http({
            url: BASE_URL+'apps',
            method: "POST",
            cache: false,
            data: {appdata : $scope.appdata},
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
