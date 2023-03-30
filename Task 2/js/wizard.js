const phoneUtil = window.libphonenumber;

$(document).ready(function() {

    $("#next-step-2").click(function(){
        //if(validateBasicDetailsForm())
        {
            $('#img-step-1').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-1.png');
            $('#img-step-2').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-2-active.png');
            $(".form-basic-details").hide();
            $(".form-pass-change").show();
            setPasswordChangeForm();
        }
    });

    $("#previous-step-2").click(function(){
        $('#img-step-1').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-1-active.png');
        $('#img-step-2').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-2.png');
        $(".form-pass-change").hide();
        $(".form-basic-details").show();
    });

    $("#next-step-3").click(function(){
        //if(validatePassChangeForm())
        {
            $('#img-step-2').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-2.png');
            $('#img-step-3').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-3-active.png');
            $(".form-pass-change").hide();
            $("#cart-details").show();
        }
    });

    $("#previous-step-3").click(function(){
        $('#img-step-2').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-2-active.png');
        $('#img-step-3').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-3.png');
        $("#cart-details").hide();
        $(".form-pass-change").show();
    });

    $("#next-step-4").click(function(){
        $('#img-step-3').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-3.png');
        $('#img-step-4').attr('src', 'https://colorlib.com/etc/bwiz/colorlib-wizard-8/images/step-4-active.png');
        calculateSubTotal();
        calculateTotalAmount();
        $("#cart-details").hide();
        $('#cart-totals').show();
    });

    $(".plus").click(function() {
        var input = $(this).siblings(".quantity-input");
        incQuantity(input.val(), input);
        setTotalPrice(input.val(), $(this).closest("tr").find(".unit-price"), $(this).closest("tr").find(".amount"));
    });
    
    $(".minus").click(function() {
        var input = $(this).siblings(".quantity-input");
        decQuantity(input.val(), input);
        setTotalPrice(input.val(), $(this).closest("tr").find(".unit-price"), $(this).closest("tr").find(".amount"));
    });       
    

    $("#eye").click(function() {
        $(this).toggleClass("fa-eye-slash");
        togglePasswordVisibility();
    });

    $("#submit").click(function() {
        if (!validateForm()) {
            return false;
        }
    });

    $(".fin-btn").click(function() {

        const data = {
            id: $("#user-id").val(),
            totalAmount: parseFloat($(".total-amount").text())
        }

        fetch('#', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {

        })
        .catch(error => console.error(error));
    });

    function calculateSubTotal(){
        var amounts = $('.amount');
        var subTotalAmount = 0.00;
        amounts.each(function(){
            var amount = $(this);
            subTotalAmount = subTotalAmount + parseFloat(amount.text());
            console.log(subTotalAmount);

        });
        $(".sub-total-amount").text(subTotalAmount);
    }

    function calculateTotalAmount(){
        var totalAmount = parseFloat($(".sub-total-amount").text()) + parseFloat($(".service-amount").text());
        $(".total-amount").text(totalAmount);
    }

    function incQuantity(currentValue, inputElement) {
        var newValue = parseInt(currentValue) + 1;
        if (newValue > parseInt(inputElement.attr("max"))) {
            newValue = parseInt(inputElement.attr("max"));
        }
        inputElement.val(newValue);
    }
    
    function decQuantity(currentValue, inputElement) {
        var newValue = parseInt(currentValue) - 1;
        if (newValue < 1) {
            newValue = 1;
        }
        inputElement.val(newValue);
    }
    
    function setTotalPrice(quantity, unitPriceElement, totalElement) {
        var unitPrice = parseFloat(unitPriceElement.text());
        var total = unitPrice * parseInt(quantity);
        totalElement.text(total.toFixed(2));
    }


    function setPasswordChangeForm(){    
        $("#curr-pass").val( $("#password").val());
    }

    function comparePasswords(pass1, pass2, id){
        console.log("hello");
        if(pass1 === pass2){
            removeErrorMessage(id);
            return true;
        }
        showErrorMessage(id, 'Password and Confirm Password must match');
        return false;
    }
    function togglePasswordVisibility() {
        var passwordField = $("#password");
        const type = passwordField.attr("type") === "password" ? "text" : "password";
        passwordField.attr("type", type);
    }

    function validatePassword(id) {
        var password = $(id).val();
        if(password.length < 8){
           showErrorMessage($(id),'Password must contain at least 8 characters');
            return false;
        }
        else{
            removeErrorMessage($(id));
            return true;
        }
    }

    function validatePhoneNumber() {
        var number = $("#phoneNum").val();
        if(number === ""){
            return true;
        }
        var phoneNumber = phoneUtil.parsePhoneNumber(number, 'PK');
        if(!phoneNumber.isValid()){
           showErrorMessage($("#phoneNum"),'Please enter a valid phone number');
            return false;
        }
        else{
            removeErrorMessage($("#phoneNum"));
            return true;
        }
    }

    function validateEmail() {
        var email = $("#email").val();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showErrorMessage($("#email"),'Please enter a valid email address');
            return false;
        }
        else{
            removeErrorMessage($("#email"));
            return true;
        }
        
    }

    function showErrorMessage(input, message) {
        input.next('.error').remove();
        input.after('<span class="error" style="color: red">' + message +'</span>');
        input.css('border-color', 'red');
    }
    function removeErrorMessage(input) {
        input.next('.error').remove();
        input.css('border-color', 'grey');
    }

    function validateReqFieldsOfBDForm(){

        var inputs = $(".validate");
        var errorMessage = 'Please fill the required field.';
        var flag = true;

        inputs.each(function(){
            var input = $(this);
            console.log(input.val());
            if (input.val() === "") {
                console.log(input.val());
                showErrorMessage(input, errorMessage);
                flag = false;
              } else {
                removeErrorMessage(input);
              }
        });        
        return flag;
    }


    function validateBasicDetailsForm() {

        if (!validateReqFieldsOfBDForm() || !validateEmail() || !validatePassword($("#password")) || !validatePhoneNumber()) {
            return false;
        }        
        return true;
    }

    function validateReqFieldsOfPCForm(){
        var inputIds = ["#curr-pass-confirm", "#new-pass", "#new-pass-confirm"];
        var flag = true;

        inputIds.map((id) => {
            if($(id).val() === ""){
                showErrorMessage($(id), "Please fill the required fields.");
                flag = false;
            }
            else{
                removeErrorMessage($(id));
            }
        });

        return flag;
    }

    
    function validatePassChangeForm(){
        
        if (!validateReqFieldsOfPCForm()  || !comparePasswords($("#curr-pass").val(),
             $("#curr-pass-confirm").val(), $("#curr-pass-confirm")) || !validatePassword($("#new-pass"))
             || !comparePasswords($("#new-pass").val(), $("#new-pass-confirm").val(), $("#new-pass-confirm"))) {
            return false;
        }        
        return true;
       
    }

  
});
