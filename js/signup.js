(function () {
    jQuery.validator.addMethod("isUserName", function(value, element) {
         return this.optional(element) || /^[a-zA-z][a-zA-Z0-9_]{1,17}$/.test(value);
    });

    var validator = $("#signupForm").validate({
        rules: {
            username: {
                isUserName:true,
                required: true,
                minlength: 2,
                maxlength: 16
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 25
            },
            confirm_password: {
                required: true,
                minlength: 6,
                maxlength: 25,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            username: {
                required: "请输入用户名",
                isUserName: "请输入以字母开头的字母数字，可包含'_'符号",
                minlength: "用户名必需由 2 个字母组成",
                maxlength: "用户名最长不得超过 16 个字符"
            },
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于 6 个字母",
                maxlength: "密码长度不能小于 25 个字母"
            },
            confirm_password: {
                required: "请输入密码",
                minlength: "密码长度不能小于 6 个字母",
                maxlength: "密码长度不能大于 25 个字母",
                equalTo: "两次密码输入不一致"
            },
            email: {
                required: "请输入邮箱",
                email: "请输入一个正确的邮箱"
            }
        },
        submitHandler: function(form)
        {
            var alert = $(".js-alert");
            $.ajax({
                type: "POST",
                url: "signup.php",
                data: $("form").serialize(),
                dataType: "html",
                success: function(msg){
                    if(msg == 0) {
                        alert.html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>注册成功，1秒后将自动跳转到登录页面，如没有，请<strong><a href="login.html">点击跳转</a></strong>。</div>');
                        setTimeout(function () {
                            window.location.href = "./login.html";
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
