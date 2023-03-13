app.controller("AppsController", ($scope, $http, HelperService) => {
    $scope.appId = 0;
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
        frequency: '',
        adx_status_1: true,
        adx_status_2: true,
        adx_status_3: true,
        vpn_status: true,
        web_url_status: true,
        all_status: true
    };
    $scope.addNew = function () {
        window.location.href = "/apps/create";
    }
    $scope.create = function () {
        $http({
            url: BASE_URL + 'apps',
            method: "POST",
            cache: false,
            data: { appdata: $scope.appdata },
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
    $scope.updateApp = function () {
        if($scope.appId != '' && $scope.appId != 0){
            $http({
                url: BASE_URL + 'apps/update',
                method: "POST",
                cache: false,
                data: { appid : $scope.appId, appdata: $scope.appdata },
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
    }
    $scope.cancleBtn = () => {
        window.location.href = "/apps";
    }
    $scope.page = 1;
    $scope.limit = "10";
    $scope.search = "";
    $scope.apps = [];
    $scope.pageNumberList = [];
    $scope.getapps = () => {
        let request = { page: $scope.page, limit: $scope.limit, search: $scope.search };
        $http({
            url: BASE_URL + "apps/list",
            method: "POST",
            data: request,
            cache: false,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        }).then(
            function (response) {
                if (response.data.IsSuccess == true) {
                    $scope.apps = response.data.Data;
                    $scope.pageNumberList = HelperService.paginator($scope.apps.totalPages, $scope.page, 9);
                }
            },
            function (error) {
                $('#loadingdiv').hide();
                console.log(error);
                if (error.status == 401) {
                    window.location.href = AUTO_LOGOUT;
                }
            }
        );
    }
    $scope.getapps();
    $scope.onSearch = () => {
        $scope.page = 1;
        $scope.getapps();
    };
    $scope.$watch("page", () => { $scope.getapps() });
    $scope.onLimitChange = () => { $scope.page = 1; $scope.getapps(); };
    $scope.changeadx_status_1 = (mapp) => {
        $http({
            url: BASE_URL + "apps/changeadx_status_1",
            method: "POST",
            cache: false,
            data: { aid: mapp._id, adx_status_1: mapp.adx_status_1 },
            headers: { "Content-Type": "application/json; charset=UTF-8" },
        }).then(
            function (response) {
                if (response.data.IsSuccess == true) {
                    $scope.getapps();
                }
            }
        );
    };
    $scope.changeadx_status_2 = (mapp) => {
        $http({
            url: BASE_URL + "apps/changeadx_status_2",
            method: "POST",
            cache: false,
            data: { aid: mapp._id, adx_status_2: mapp.adx_status_2 },
            headers: { "Content-Type": "application/json; charset=UTF-8" },
        }).then(
            function (response) {
                if (response.data.IsSuccess == true) {
                    $scope.getapps();
                }
            }
        );
    };
    $scope.changeadx_status_3 = (mapp) => {
        $http({
            url: BASE_URL + "apps/changeadx_status_3",
            method: "POST",
            cache: false,
            data: { aid: mapp._id, adx_status_3: mapp.adx_status_3 },
            headers: { "Content-Type": "application/json; charset=UTF-8" },
        }).then(
            function (response) {
                if (response.data.IsSuccess == true) {
                    $scope.getapps();
                }
            }
        );
    };
    $scope.changevpn_status = (mapp) => {
        $http({
            url: BASE_URL + "apps/changevpn_status",
            method: "POST",
            cache: false,
            data: { aid: mapp._id, vpn_status: mapp.vpn_status },
            headers: { "Content-Type": "application/json; charset=UTF-8" },
        }).then(
            function (response) {
                if (response.data.IsSuccess == true) {
                    $scope.getapps();
                }
            }
        );
    };
    $scope.changeweb_url_status = (mapp) => {
        $http({
            url: BASE_URL + "apps/changeweb_url_status",
            method: "POST",
            cache: false,
            data: { aid: mapp._id, web_url_status: mapp.web_url_status },
            headers: { "Content-Type": "application/json; charset=UTF-8" },
        }).then(
            function (response) {
                if (response.data.IsSuccess == true) {
                    $scope.getapps();
                }
            }
        );
    };
    $scope.changeall_status = (mapp) => {
        $http({
            url: BASE_URL + "apps/changeall_status",
            method: "POST",
            cache: false,
            data: { aid: mapp._id, all_status: mapp.all_status },
            headers: { "Content-Type": "application/json; charset=UTF-8" },
        }).then(
            function (response) {
                if (response.data.IsSuccess == true) {
                    $scope.getapps();
                }
            }
        );
    };
    $scope.removeapp = (appid) => {
        swal({
            title: "Are you sure?",
            text: "To delete the App permanently ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                $http({
                    url: BASE_URL + "apps/removeapp",
                    method: "POST",
                    cache: false,
                    data: { aid: appid },
                    headers: { "Content-Type": "application/json; charset=UTF-8" },
                }).then(
                    function (response) {
                        if (response.data.IsSuccess == true) {
                            swal("Congo.", "App data removed successfully...", "success");
                            $scope.getapps();
                        }
                    }
                );
            }
        });
    };
    $scope.onEditLoad = () => {
        let aid = HelperService.queryString('aid');
        if (aid != 0 && aid != null && aid != '' && aid != undefined) {
            $scope.appId = aid;
            $http({
                url: BASE_URL + "apps/getone",
                method: "POST",
                cache: false,
                data: { aid: aid },
                headers: { "Content-Type": "application/json; charset=UTF-8" },
            }).then(
                function (response) {
                    if (response.data.IsSuccess == true && response.data.Data != 0) {
                        $scope.appdata = response.data.Data;
                    } else {
                        window.location.href = "/apps";
                    }
                }, function (error) {
                    console.error(error);
                    if (error.status == 401) {
                        window.location.href = AUTO_LOGOUT;
                    }
                }
            );
        }
    };
    $scope.onEditLoad();
});
