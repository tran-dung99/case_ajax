$(document).ready(function () {


    let baseUrl = origin;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: baseUrl + '/api/books',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            // console.log(res)
            displayBookList(res)
        }
    })

    function displayBookList(books) {
        let str = ""
        for (let i = 0; i < books.length; i++) {
            str += `<tr id="book-${books[i].id}">
                    <td>${books[i].id}</td>
                    <td>${books[i].title}</td>
                    <td>${books[i].code}</td>
                     <td>${books[i].author}</td>
                     <td><button data-id="${books[i].id}" class="btn btn-danger update-function">Update</button></td>
                     <td><button data-id="${books[i].id}" class="btn btn-danger delete-function">Delete</button></td>
                    </tr>`
        }
        $('.body-book').html(str);
    }


    $("body").on("click",".delete-function",function (){
        let id = $(this).attr("data-id");
        $.ajax({
           url: baseUrl + "/api/books/delete/"+id,
            type: "GET",
            success: function(){
               $("#book-"+id).remove();
            }

        })
    })

    $(".add-book").click(function(){
        $(".modal-add").show();
    })

    $("body").on("click",".stop-here",function (){
        $(".modal").hide();
    })

    function addNewBook(book){
        let str = `<tr id="book-${book.id}">
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.code}</td>
                     <td>${book.author}</td>
                     <td><button data-id="${book.id}" class="btn btn-danger delete-function">Delete</button></td>
                    </tr>`
        $('.body-book').prepend(str);
    }

    $("#btn-save").on("click",function (){
        let title = $('#title').val();
        let code = $('#code').val();
        let author = $('#author').val();
        // $("#btn-save").html('Please Wait...');
        $("#btn-save"). attr("disabled", true);
        $.ajax({
            url: baseUrl + "/api/books/add",
            type : "POST",
            data : {
                title : title,
                code : code,
                author : author,
            },
            success: function (res){
                // console.log(res.data)
                // window.location.reload();
                // // $("#btn-save").html('add');
                $("#btn-save"). attr("disabled", false);
                // $(".modal-add").hide();
                $(".form-add").trigger("reset")
                addNewBook(res.data)
                console.log(res.data.title);
            }
        })
    })

    $("body").on("click",".update-function",function (){
        $(".modal-update").show();
        let id = $(this).attr("data-id");
        $.ajax({
            url:baseUrl + "/api/books/"+id,
            type : "GET",
            success :function (res){
                $(".id-update").val(res.data.id);
                $(".title-update").val(res.data.title);
                $(".code-update").val(res.data.code);
                $(".author-update").val(res.data.author);
            }
        })
    })

    $("body").on("click",".btn-update",function (){
        let id = $('.id-update').val();
        let title = $('.title-update').val();
        let code = $('.code-update').val();
        let author = $('.author-update').attr("data-id");
        $.ajax({
            url:baseUrl + "/api/books/update/"+id,
            type : "POST",
            data:{
                id : id,
                title: title,
                code: code,
                author: author,
            },
            success :function (res){
                console.log(res);
                $(".modal-update").hide();
                $(`#book-${id} td:nth-child(2)`).html(res.data.title);
                $(`#book-${id} td:nth-child(3)`).html(res.data.code);
                $(`#book-${id} td:nth-child(4)`).html(res.data.author);

            }
        })
    })

    $('body').on('click','.logout-list',function () {
        $.ajax({
            url: baseUrl + '/api/logout',
            type: "GET",
            success: function () {
                window.location = baseUrl;
            }
        })
    })

    $('#input-search-ajax').keyup(function () {
        let text = $(this).val();
        // alert(text);
        let _html = '';
        for (let i = 0; i < 5; i++) {
            _html += `<div class="media">
                <a class="pull-left">
                    <img class="mr-3 rounded order-0" width="50px"
                         src="https://i.pinimg.com/236x/d1/53/85/d1538552cd2e82e25d3f5693fb056388--flower-corsage-a-flower.jpg">
                </a>
                <div class="media-body">
                    <p>okela</p>
                </div>
            </div>`
        }
        $('.result-search').html(_html);
    })


})
