$(document).ready(function(){
    console.log("[Util....]")

    
})
var targetTagName = '';
const Util = {
   placeRegist : function(){
       console.log("[Product Regist]")
        var target_input_group = $(".th-input-p input");
        var target_image_group = $(".imageList input");
        var target_select_group = $(".form-group-material select");
        
        let data = {};
        let images = []
        //select
        $.each(target_select_group,function(index,input){
          let value = $(input).val();
          let label = $(input).attr('name');
          data[label] = value
        })
        console.log(data);

        //input
        $.each(target_input_group,function(index,input){
            let value = $(input).val();
            let label = $(input).attr('name');

                data[label] = value
              
        })

        //image
        $.each(target_image_group,function(index,input){
            let value = $(input).val();
            let label = $(input).attr('name');

            images.push(value)
              
        })
        data.place_images = images;
        console.log(data)


        

        // var txt;
        // var r = confirm("등록 하시겠습니까?");
        // if (r == true) {
        //     $.ajax({
        //         type: "POST",
        //         url:  "/ADMIN/REGIST",
        //         data: data,
        //         timeout: 1000000,
        //         success: function (json) {
        //             console.log(json)
        //             if(json.success == true){
        //                 alert("성공적으로 등록 하였습니다.");
        //                 location.href = '/ADMIN/ENTER'
        //             }else{
        //                 alert("업로드에 문제가 발생하였습니다. 기술 담당자에게 문의하세요");
        //             }
        //         },
        //         error: function (e) {
        //             console.log(e);
        //         }
        //     });
        // }
},
upload : function(tagName){
    console.log(tagName)
    targetTagName = "#"+tagName;
    console.log(targetTagName)
    $("#file").click();
},
fileTagChange : function(){
    $(".loader").css("display","block");
    this.uploadAjax()
},
uploadAjax : function(){
    // Get form
    console.log("[업로드 준비]")
    var form = $('#uploadForm')[0];
    var formData = new FormData(form);
    console.log(formData);
    $.ajax({
        url: '/ADMIN/IMAGE_UPLOAD',
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
            $(".loader").css("display","none");
            if(data.success == 200){
                // console.log(data);
                // console.log(targetTagName);
                // $(targetTagName).val(data.url);
            
                let appendHtml = "<img src='"+data.url+"' style='width : 100px; height : 100px'/>"+"<input type='text' name='placeImage' value='"+data.url+"' hidden/>&nbsp&nbsp";

                $(".imageList").append(appendHtml);

            }else{
                alert("파일이 정상적으로 업로드 되지 않았습니다. 다시 시도해주세요");
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}
} 