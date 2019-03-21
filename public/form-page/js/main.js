var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dnsxp4zpv/upload";
var CLOUDINARY_UPLOAD_PRESET = 'fxd5nzcm';
(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    // Image uplaod on click function
    $('#imageUpload').on("click", cloudWidget);

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    // Cloud
    function cloudWidget() {

        var widget = cloudinary.createUploadWidget({ 
            cloudName: "dnsxp4zpv", uploadPreset: "fxd5nzcm" }, (error, result) => {
                if(result.event === "success"){
                    var img = result.info.url;
                    $("[name='image']").val(img);
                    $("#form-image").attr("src", img)
                    // var formData = new FormData();
                    // formData.append('img', img);
                    // formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
                } 
                console.log(result);

                // axios({
                //     url: CLOUDINARY_URL,
                //     method: 'POST',
                //     headers: {
                //         "Content-Type": "application/x-www-form-urlencoded"
                //     },
                //     data: formData
                // }).then(function(res) {
                //     console.log(res);
                // }).catch(function(err) {
                //     console.error(error);
                // })

             });

        widget.open();
    }
    

})(jQuery);