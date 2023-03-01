app.controller("LoginController", ($scope, $http,) => {
    $scope.onLogin = function () {
        $http({
            url: BASE_URL,
            method: "POST",
            cache: false,
            data: { email : $scope.email, password : $scope.password },
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        }).then(
            function (response) {
                if (response.data.IsSuccess == true && response.data.Data != 0) {
                    sessionStorage.setItem("userName", response.data.Data[0].name);
                    sessionStorage.setItem(CHANNEL_DATA, response.data.Data[0].channelId);
                    sessionStorage.setItem(UNIQID, response.data.Data[0]._id);
                    sessionStorage.setItem(USER_ROLE, response.data.Data[0].roleId.name);
                    sessionStorage.setItem("LoginToken", response.data.Data[0].loginToken);
                    window.location.href = "/chats";
                } else {
                    $('#loadingdiv').hide();
                    swal("Oops", response.data.Message, "error")
                }
            },
            function (error) {
                $('#loadingdiv').hide();
                console.log(error);
                if (error.status == 401) {
                    window.location.href = AUTO_LOGOUT;
                }
                console.error("Something Went Wrong! try again");
            }
        );
    };
});
