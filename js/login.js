(function () {
    jQuery.validator.addMethod("isUserName", function(value, element) {
         return this.optional(element) || /^[a-zA-z][a-zA-Z0-9_]{1,17}$/.test(value);
    });

    var validator = $("#loginForm").validate({
        rules: {
            username: {
                isUserName:true,
                required: true,
                minlength: 2,
                maxlength: 17
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 25
            },
        },
        messages: {
            username: {
                required: "请输入用户名",
                isUserName: "请输入以字母开头的字母数字，可包含'_'符号",
                minlength: "用户名必需由 2 个字母组成",
                maxlength: "用户名最长不得超过 17 个字母"
            },
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于 6 个字母",
                maxlength: "密码长度不能小于 25 个字母"
            }
        },
        submitHandler: function(form)
        {
            var alert = $(".js-alert");
            $.ajax({
                type: "POST",
                url: "login.php",
                data: $("form").serialize(),
                dataType: "html",
                success: function(msg){
                    if(msg == 0) {
                        alert.html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>登录成功，1秒后将自动跳转到首页，如没有，请<strong><a href="index.php">点击跳转</a></strong>。</div>');
                        setTimeout(function () {
                            window.location.href = "./index.php";
                        },1000);
                    } else {
                        alert.html('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+msg+'</div>');
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(textStatus);
                }
            });
            return false;
        }

    });
})();
