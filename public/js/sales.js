
var staffList = [];
var CustomerList = [];
let data = [];
const csrf_token_val = $('meta[name="csrf_token"]').attr('content');

let loc = window.location.pathname;

$(document).ready(function () {
    getCustomersList();
    getemployeelistcard();

    $(document).on('click', '.Ser-Link', function () {
        let serviceId = $(this).find('.serviceId').val();
        let itmFnd = data.find(x => x.id == serviceId);
      
        let options = ``;
        staffList.forEach(element => {
            options += `<option value="${element.id}">${element.first_name}</option>`;
        });

        $('.mycardreview').append(`
            <div class="servicesToAdd">
                <input type="hidden" name="serviceId" value="${serviceId}">
            <div class="row">
                <div class="col-md-6">
                    <h3 id="servNameHeader">${itmFnd.service_name}</h3>
                </div>
                <div class="col-md-6 text-right">
                    <a href="#" class="close-btn-pl removeService"></a>
                </div>
            </div>
       
            <div id="floating-label">
                <div class="form-wrap p-0">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-s2 pt-19 mystafflistselection" >
                                <select class="form-control formselect" id="getstafflist" name="emp_id" placeholder="Select Staff">
                                <option value="-1">Select Staff</option>
                                ${options}
                            </select>
                        </div>
                    </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="text" name="total_amount" id="" value="${itmFnd.service_charge}" class="form-control ttl_amount" placeholder="" style="font-size:16px">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`);

        updateTotalPrice();
        // Adding the total of the bill
        $(".price_tot").each(function () {
            var total = 0;
            $(this).find(".serviceId").each(function () {
                total += parseInt($(this).text());
            });
        });
        $('.serviceChargesInvoiceDetails').show();     
      });


    $.ajax({
        type: 'GET',
        url: 'sales/getServices/male',
        success: function (response) {
            var response = JSON.parse(response);
            data = response;
            $('#tab01').empty();
            response.forEach(element => {
                $('#tab01').append(`<a class="Ser-Link">${element.service_name}<span>Rs: ${element.service_charge} </span> <input type="hidden"  class="serviceId" value="${element.id}" /></a>`);
            });
            $('#tab01').append(`<div class="clearfix"></div>`);
            $('#servNameHeader').text(data[0].service_name);
            $('#ttlAm, #grndTtl').text('Rs. ' + data[0].service_charge);
            $('.price_tot').text('Rs. ' + data[0].service_charge);
        }
    });


    // Remove a section
    $(document).on('click', '.removeService', function () {
        $(this).parent().parent().parent().remove();
        updateTotalPrice();
    });



    // Add all list of items together
    $('.saveFormData').click(function () {
        let dataArr = [];
        $('.servicesToAdd').each(function(){
            let temp = { 
                service_id: $(this).find('[name="serviceId"]').val(),
                emp_id: $(this).find('[name="emp_id"]').val(),
                amount: $(this).find('[name="total_amount"]').val() 
            };
                dataArr.push(temp);
        });
        $.ajax({
            type: 'post',
            url: "sales/postdata",
            data: { _token: $('meta[name="csrf_token"]').attr("content"), data: dataArr },
            dataType: 'json',
            success:function (response) {
                console.log(response);
                if(response == "success") {
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Sales Successfully Submitted');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                 }
                   else if(response == "error"){
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Something went wrong');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }
             }
        });
    });



    $(document).on('click', '#tab1', function () {
        $.ajax({
            type: 'GET',
            url: 'sales/getServices/male',
            success: function (response) {
                var response = JSON.parse(response);
                data = response;
                $('#tab01').empty();
                response.forEach(element => {
                    $('#tab01').append(`<a class="Ser-Link">${element.service_name}<span>Rs: ${element.service_charge} </span> <input type="hidden" class="serviceId" value="${element.id}" /></a>`);
                });
            }
        });
    });




    

    $(document).on('input', '.ttl_amount', function () {
        updateTotalPrice();
    });

    // Function for the close sidebar
    $('#pl-close, .overlay').on('click', function () {
        closeSidebar();
    });

    $('.productlist01').on('click', function () {
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll')
    });
});


// Transaction Card onclick event
$(document).ready(function () { 			
    $('#pl-close-card, .overlay').on('click', function () {
        $('#product-cl-sec-card').removeClass('active');
        $('.overlay').removeClass('active');
        $('body').toggleClass('no-scroll')
    });

    $('#productlist01-card').on('click', function () {
        $('#product-cl-sec-card').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll')		
    }); 
});


// Save Customer from sale 
$(document).ready(function() {
    $(document).on('click', 'openDataSidebarForAddCustomer', function() {
        
        $('input[name="first_name"]').val("");
        $('input[name="first_name"]').blur();

        $('input[name="phone_no"]').val("");
        $('input[name="phone_no"]').blur();

        $('input[name="email"]').val("");
        $('input[name="email"]').blur();

        $('input[name="gender"]').val("");
        $('input[name="gender"]').blur();


        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');
    });

    $('#saveCustomerBtn').click(function() {
        var verif = [];
        $('.required').css('border', '');
        $('.required').parent().css('border', '');

        $('.required').each(function () {
            if ($(this).val() == "") {
                $(this).css("border", "1px solid red");
                verif.push(false);
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'red');
                $('#notifDiv').text('Please provide all the required information (*)');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);
                return;
            }else if( $(this).val() == 0 || $(this).val() == null){
                $(this).parent().css("border", "1px solid red");
                verif.push(false);
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'red');
                $('#notifDiv').text('Please provide all the required information (*)');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);
                return;
            } else {
                verif.push(true);
            }
        });

        // Close Of required fields
        if(verif.includes(false)){
            return;
        }

        $('#saveCustomerBtn').attr('disabled', 'disabled');
        $('#saveCustomerBtn').text('Processing..');
            
        $('#saveCustomerForm').ajaxSubmit({
            type:'POST',
            url: 'save_customer',
            data: $('#saveCustomerForm').serialize(),
            cache: false,
            success:function(response) {
                $('#saveCustomerBtn').removeAttr('disabled');
                $('#saveCustomerBtn').text('Save');
                
                // Save the Customer
                if (JSON.parse(response) == "success") {
                    $('#pl-close').click();
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Customer Added successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);

                    if($('#operation').val() == 'add'){
                        $('[name="full_name"]').val('');
                        $('[name="email"]').val('');
                        $('[name="phone_no"]').val('');
                        $('[name="gender"]').val('');
                     }
                } 
                    // Check the expense if failed 
                else if(JSON.parse(response) == "failed") {
                    $('#saveExpense').removeAttr('disabled');
                    $('#saveExpense').removeAttr('disabled');
                    $('#saveExpense').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to add Customer at the moment......');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }
            }
        });
    });
}); 


function updateTotalPrice() {
    let ttl = 0;
    $('.ttl_amount').each(function () {
        if (!isNaN(parseInt($(this).val()))) {
            ttl += parseInt($(this).val());
        }
    });
    $('.price_tot').text(`Rs. ${ttl}`);
}


function closeSidebar() {
    $('#product-cl-edit').removeClass('active');
    $('#product-cl-sec').removeClass('active');
    $('.overlay').removeClass('active');
    $('body').toggleClass('no-scroll')
}


function showSidebar() {
    $('#product-cl-edit').addClass('active');
    $('.overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    $('body').toggleClass('no-scroll')
}



// Get Employees Listing in dropdown
function getemployeelistcard() {
    $.ajax({
        type: 'GET',
        url: "sales/getEmployees",
        success: function (response) {
            var response = JSON.parse(response);
            staffList = response;
            response.forEach(element => {
                $('#getstafflist').append(`<option>${element.first_name}</option>`)
            });
        }
    });
}


