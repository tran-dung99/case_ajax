$(document).ready(function () {
    let baseUrl = origin;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('body').on('click','.login',function () {
        let email = $('#email').val();
        let password = $('#password').val();
        // if(email == "") {
        //     $("#thong-bao").html("email không được để trống")
        //         return false;
        // }
        // if(password == "") {
        //     $("#thong-bao").html("Nhập mật khẩu")
        //     return false;
        // }
        $.ajax({
            url : baseUrl + '/api/login',
            type: 'POST',
            data: {
                email: email,
                password: password,
            },
            success: function (res){
                if(res.error){
                    alert(res.error);
                    return false;
                }else{
                    window.location = baseUrl + '/api/booksList';
                }
            }
        })
    })

    $('body').on('click','.register',function (){
        $(".register-form").show();
    })

    $('body').on("click",".save-register",function (){
         let name = $("#name-register").val();
         let email = $("#email-register").val();
         let password = $("#password-register").val();
         $.ajax({
             url: baseUrl + "/api/users",
             type: "POST",
             data: {
                 name : name,
                 email: email,
                 password : password,
             },
             success: function (res) {
                 $(".register-form").hide();
             }
         })
    })
});
