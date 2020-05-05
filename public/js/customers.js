///////////////////////// Check the closing and editing tab///////////
$(document).ready(function () {
    getCustomersList();
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
    $(document).on('click', '.openSidebarForAddCustomer', function() {

    if(lastOp == "update") {

        $('input[name="first_name"]').val("");
        $('input[name="first_name"]').blur();

        $('input[name="phone_no"]').val("");
        $('input[name="phone_no"]').blur();

        $('input[name="email"]').val("");
        $('input[name="email"]').blur();

        $('input[name="gender"]').val("");
        $('input[name="gender"]').blur();

    }
        lastOp = 'add';
        $('#operation').val('add');
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

    // Check the url to Add or Edit
    var ajaxUrl = '';
    if($('#operation').val() == 'add') {
        ajaxUrl = 'save_customer';
    } else {
        ajaxUrl = 'update_customer';
    }

    $('#saveCustomerBtn').attr('disabled', 'disabled');
    $('#saveCustomerBtn').text('Processing..');
        
    $('#saveCustomerForm').ajaxSubmit({
        type:'POST',
        url: ajaxUrl,
        data: $('#saveCustomerForm').serialize(),
        cache: false,
        success:function(response) {
            $('#saveCustomerBtn').removeAttr('disabled');
            $('#saveCustomerBtn').text('Save');
            
            // Save the expense
            if (JSON.parse(response) == "success") {
                getCustomersList();
                $('#pl-close').click();
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'green');
                $('#notifDiv').text('Customers Added successfully');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);

                if($('#operation').val() == 'add'){
                    $('[name="first_name"]').val('');
                    $('[name="phone_no"]').val('');
                    $('[name="email"]').val('');
                    $('[name="gender"]').val('');
                 }
            
            // Update Expense
            } else if(JSON.parse(response) == "updated") {
                getCustomersList();
                $('#pl-close').click();
                $('#saveCustomerBtn').removeAttr('disabled');
                $('#saveCustomerBtn').text('Save');
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'green');
                $('#notifDiv').text('Customer have been updated successfully');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);
            }
                    // Check the customer if failed 
                else if(JSON.parse(response) == "failed"){
                    $('#saveCustomerBtn').removeAttr('disabled');
                    $('#saveCustomerBtn').removeAttr('disabled');
                    $('#saveCustomerBtn').text('Save');
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
//////////////////////// End of Customers Management Save / Update ////////////////


//////////////////////// Update Sidebar for Customers //////////////////
$(document).on('click', '.openDataSidebarForUpdateCustomer', function() {
    $('#operation').val('update');
    lastOp = 'update';
    $('#dataSidebarLoader').show();
    $('._cl-bottom').hide();
    $('.pc-cartlist').hide();


    var id = $(this).attr('id');
    $('input[name="customer_updating_id"]').val(id);
    $.ajax({
        type: 'GET',
        url: 'GetCustomer/' + id,
        success: function(response) {
            var response = JSON.parse(response);
            $('#dataSidebarLoader').hide();
            $('._cl-bottom').show();
            $('.pc-cartlist').show();
            $('#uploadedImg').remove();

            $('input[name="full_name"]').focus();
            $('input[name="full_name"]').val(response.full_name);
            $('input[name="full_name"]').blur();

            $('input[name="phone_no"]').focus();
            $('input[name="phone_no"]').val(response.phone_no);
            $('input[name="phone_no"]').blur();

            $('input[name="email"]').focus();
            $('input[name="email"]').val(response.email);
            $('input[name="email"]').blur();

            $('select[name="gender"]').val(response.gender).trigger('change');

        }
    });
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');
});
///////////////////////// End of Sidebar for Customer ////////////////////




// Get All the customers Listings
function getCustomersList() {
    $.ajax({
        type: 'GET',
        url: "fetchCustomersList",
        success: function (response) {
            var response = JSON.parse(response);
            $('.customersListHolder').empty();
            $('.customersListHolder').append(`<table class="table table-hover dt-responsive nowrap customersList" id="example" style="width:100%">
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
        </tbody>
        </table>`);
            response.forEach(element => {
                $('.customersList tbody').append(`<tr>
        <td>${element.id}</td>
        <td>${element.full_name}</td>
        <td>${element.email}</td>
        <td>${element.phone_no}</td>
        <td>${element.gender}</td> 
        <td>
            <button class="btn btn-default btn-line openDataSidebarForUpdateCustomer" id="${element['id']}">Edit</button>
            <button id="str" class="btn btn-default">Status</button>
            <button class="btn btn-default">Detail</button>
        </td>
</tr>`);
            });
            $('.customersList').DataTable();
        }
    });
}
