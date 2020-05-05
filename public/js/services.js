///////////////////////// Check the closing and editing tab///////////
$(document).ready(function () {
    getServicesList();
        $('#pl-close, .overlay').on('click', function () {
        $('#product-cl-sec').removeClass('active');
        $('.overlay').removeClass('active');
            $('body').toggleClass('no-scroll')
        });
        $('#productlist01').on('click', function () {
        $('#operation').val('add');       
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');
        }); 
});


//////////////////////// Customers Management Save / Update //////////////////////
$(document).ready(function() {
    // Add Sidebar for Customers
    var lastOp = "add";
    $(document).on('click', '.openDataSidebarForAddService', function() {

    if(lastOp == "update") {

        $('input[name="service_name"]').val("");
        $('input[name="service_name"]').blur();

        $('input[name="service_charge"]').val("");
        $('input[name="service_charge"]').blur();

        $('input[name="service_type"]').val("");
        $('input[name="service_type"]').blur();

    }
        lastOp = 'add';
        $('#operation').val('add');
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');
    });

    $('#saveServiceBtn').click(function() {
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
    
        // Check the url to Add or Edit
        var ajaxUrl = '';
        if($('#operation').val() == 'add') {
            ajaxUrl = 'save_service';
        } else {
            ajaxUrl = 'update_service';
        }
    
        $('#saveServiceBtn').attr('disabled', 'disabled');
        $('#saveServiceBtn').text('Processing..');
            
        $('#saveServiceForm').ajaxSubmit({
            type:'POST',
            url: ajaxUrl,
            data: $('#saveServiceForm').serialize(),
            cache: false,
            success:function(response) {
                $('#saveServiceBtn').removeAttr('disabled');
                $('#saveServiceBtn').text('Save');
                
                // Save the expense
                if (JSON.parse(response) == "success") {
                    getServicesList();
                    $('#pl-close').click();
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Services Added successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
    
                    if($('#operation').val() == 'add'){
                        $('[name="service_name"]').val('');
                        $('[name="service_charge"]').val('');
                        $('[name="service_type"]').val('');
                     }
                
                // Update Expense
                } else if(JSON.parse(response) == "updated") {
                    getServicesList();
                    $('#pl-close').click();
                    $('#saveCustomerBtn').removeAttr('disabled');
                    $('#saveCustomerBtn').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Services updated successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }
                        // Check the customer if failed 
                    else if(JSON.parse(response) == "failed"){
                        $('#saveServiceBtn').removeAttr('disabled');
                        $('#saveServiceBtn').removeAttr('disabled');
                        $('#saveServiceBtn').text('Save');
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
//////////////////////// End of Services Management Save / Update ////////////////


//////////////////////// Update Sidebar for Department //////////////////
$(document).on('click', '.openDataSidebarForUpdateService', function() {
    $('#operation').val('update');
    lastOp = 'update';
    $('#dataSidebarLoader').show();
    $('._cl-bottom').hide();
    $('.pc-cartlist').hide();


    var id = $(this).attr('id');
    $('input[name="service_updating_id"]').val(id);
    $.ajax({
        type: 'GET',
        url: 'GetServices/' + id,
        success: function(response) {
            var response = JSON.parse(response);
            $('#dataSidebarLoader').hide();
            $('._cl-bottom').show();
            $('.pc-cartlist').show();

            $('input[name="service_name"]').focus();
            $('input[name="service_name"]').val(response.service_name);
            $('input[name="service_name"]').blur();

            $('input[name="service_charge"]').focus();
            $('input[name="service_charge"]').val(response.service_charge);
            $('input[name="service_charge"]').blur();


            $('select[name="service_type"]').val(response.service_type).trigger('change');

        }
    });
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');
});
//////////////////////// Get All Services End ///////////////////////////////


// Get all the Services Listings
function getServicesList() {
    $.ajax({
        type: 'GET',
        url: "fetchServiceList",
        success: function (response) {
            var response = JSON.parse(response);
            $('.serviceListHolder').empty();
            $('.serviceListHolder').append(`<table class="table table-hover dt-responsive nowrap serviceList" id="example" style="width:100%">
            <thead>
            <tr>
                <th>Service ID</th>
                <th>Services Name</th>
                <th>Price</th>
                <th>Gender</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
        </table>`);
                response.forEach(element => {
                $('.serviceList tbody').append(`<tr>
                <td>${element.id}</td>
                <td>${element.service_name}</td>
                <td>${element.service_charge}</td>
                <td>${element.service_type}</td>
                <td>
                <button class="btn btn-default btn-line openDataSidebarForUpdateService" id="${element['id']}">Edit</button>
                <button class="btn btn-default">Active</button>
                <button class="btn btn-default">Detail</button>
                </td>
            </tr>`);
            });
            $('.serviceList').DataTable();
        }
    })
}
