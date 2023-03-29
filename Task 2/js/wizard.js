const phoneUtil = window.libphonenumber;

$(document).ready(function() {

    $("#next-step-2").click(function(){
        $('#img-step-1').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-1.png');
        $('#img-step-2').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-2-active.png');
        $(".form-basic-details").hide();
        $(".form-pass-change").show();
        setPasswordChangeForm();
    });

    $("#previous-step-2").click(function(){
        $('#img-step-1').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-1-active.png');
        $('#img-step-2').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-2.png');
        $(".form-pass-change").hide();
        $(".form-basic-details").show();
    });

    $("#next-step-3").click(function(){
        $('#img-step-2').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-2.png');
        $('#img-step-3').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-3-active.png');
        $(".form-pass-change").hide();
    });

    $("#previous-step-3").click(function(){
        $('#img-step-2').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-2-active.png');
        $('#img-step-3').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-3.png');
        $(".form-pass-change").show();
    });

    $("#new-pass-confirm").blur(function(){
        comparePasswords($("#new-pass").val(), $("#new-pass-confirm").val());
    });

    $("#curr-pass-confirm").blur(function(){
        comparePasswords($("#curr-pass").val(), $("#curr-pass-confirm").val());
    });

    $("#new-pass").blur(function(){
        validatePassword();
    });

    $("#eye").click(function() {
        $(this).toggleClass("fa-eye-slash");
        togglePasswordVisibility();
    });

    $("#password").blur(function(){
        validatePassword();
    });

    $("#phoneNum").blur(function(){
        validatePhoneNumber();
    });

    $("#email").blur(function(){
        validateEmail();
    });

    $("#submit").click(function() {
        if (!validateForm()) {
            return false;
        }
    });

    function setPasswordChangeForm(){    
        $("#curr-pass").val( $("#password").val());
    }

    function comparePasswords(pass1, pass2){
        if(pass1 === pass2){
            return true;
        }
        showErrorMessage('Password and Confirm Password must match');
        return false;
    }
    function togglePasswordVisibility() {
        var passwordField = $("#password");
        const type = passwordField.attr("type") === "password" ? "text" : "password";
        passwordField.attr("type", type);
    }

    function validatePassword() {
        var password = $("#password").val();
        if(password.length < 8){
            showErrorMessage('Password must contain at least 8 characters');
            return false;
        }
        return true;
    }

    function validatePhoneNumber() {
        var number = $("#phoneNum").val();
        var phoneNumber = phoneUtil.parsePhoneNumber(number, 'PK');
        if(!phoneNumber.isValid()){
            showErrorMessage('Please enter a valid phone number');
            return false;
        }
        return true;
    }

    function validateEmail() {
        var email = $("#email").val();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showErrorMessage('Please enter a valid email address');
            return false;
        }
        return true;
    }

    function showErrorMessage(message) {
        console.log(message);
        $('.toast-body').text(message);
        $('.toast').toast('show');
    }

    function validateRequiredFields(){
        var firstName = $("#first-name").val();
        var lastName = $("#last-name").val();
        var email = $("#email").val();
        var userID = $("#user-id").val();
        var password = $("#password").val();
        
        if (firstName === "" || lastName === "" || email === "" || userID === "" || password === "") {
            showErrorMessage('Please fill out all the required fields.');
            return false;
        }
        return true;
    }


    function validateForm() {
        
        if (!validateRequiredFields() || !validateEmail() || !validatePassword() || !validatePhoneNumber()) {
            return false;
        }        
        return true;
    }

  
});
