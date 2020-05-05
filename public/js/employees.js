///////////////////////// Check the closing and editing tab///////////
$(document).ready(function () {
    getEmployeeList();
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

//////////////////////// Expense Management Save / Update //////////////////////
$(document).ready(function() {
    // Add Sidebar for Expense
    var lastOp = "add";
    $(document).on('click', '.openSidebarForAddEmployee', function() {

    if(lastOp == "update") {

        $('input[name="first_name"]').val("");
        $('input[name="first_name"]').blur();

        $('input[name="phone_no"]').val("");
        $('input[name="phone_no"]').blur();

        $('input[name="cnic"]').val("");
        $('input[name="cnic"]').blur();

        $('input[name="gender"]').val("");
        $('input[name="gender"]').blur();

        $('input[name="address"]').val("");
        $('input[name="address"]').blur();

        $('input[name="salary"]').val("");
        $('input[name="salary"]').blur();

        $('input[name="designation"]').val("");
        $('input[name="designation"]').blur();
    }
        lastOp = 'add';
        $('#operation').val('add');
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');
    });

$('#saveEmployeeBtn').click(function() {
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
        ajaxUrl = 'save_employee';
    } else {
        ajaxUrl = 'update_employee';
    }

    $('#saveEmployeeBtn').attr('disabled', 'disabled');
    $('#saveEmployeeBtn').text('Processing..');
        
    $('#saveEmployeeForm').ajaxSubmit({
        type:'POST',
        url: ajaxUrl,
        data: $('#saveEmployeeForm').serialize(),
        cache: false,
        success:function(response) {
            $('#saveEmployeeBtn').removeAttr('disabled');
            $('#saveEmployeeBtn').text('Save');
            
            // Save the expense
            if (JSON.parse(response) == "success") {
                getEmployeeList();
                $('#pl-close').click();
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'green');
                $('#notifDiv').text('Employee Added successfully');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);

                if($('#operation').val() == 'add'){
                    $('[name="first_name"]').val('');
                    $('[name="phone_no"]').val('');
                    $('[name="cnic"]').val('');
                    $('[name="gender"]').val('');
                    $('[name="address"]').val('');
                    $('[name="salary"]').val('');
                    $('[name="designation"]').val('');
                    $('[name="hire_date"]').val('');
                 }
            
            // Update Expense
            } else if(JSON.parse(response) == "updated") {
                getEmployeeList();
                $('#pl-close').click();
                $('#saveExpense').removeAttr('disabled');
                $('#saveExpense').text('Save');
                $('#notifDiv').fadeIn();
                $('#notifDiv').css('background', 'green');
                $('#notifDiv').text('Employee have been updated successfully');
                setTimeout(() => {
                    $('#notifDiv').fadeOut();
                }, 3000);
            }
                    // Check the expense if failed 
                else if(JSON.parse(response) == "failed"){
                    $('#saveExpense').removeAttr('disabled');
                    $('#saveExpense').removeAttr('disabled');
                    $('#saveExpense').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'red');
                    $('#notifDiv').text('Failed to add Expense at the moment......');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                }
            }
        });
    });
});
//////////////////////// End of Expense Management Save / Update ////////////////


//////////////////////// Update Sidebar for Employee //////////////////
$(document).on('click', '.openDataSidebarForUpdateEmployee', function() {
    $('#operation').val('update');
    lastOp = 'update';
    $('#dataSidebarLoader').show();
    $('._cl-bottom').hide();
    $('.pc-cartlist').hide();


    var id = $(this).attr('id');
    $('input[name="employee_updating_id"]').val(id);
    $.ajax({
        type: 'GET',
        url: 'GetEmployee/' + id,
        success: function(response) {
            var response = JSON.parse(response);
            $('#dataSidebarLoader').hide();
            $('._cl-bottom').show();
            $('.pc-cartlist').show();
            $('#uploadedImg').remove();

            $('input[name="first_name"]').focus();
            $('input[name="first_name"]').val(response.first_name);
            $('input[name="first_name"]').blur();

            $('input[name="phone_no"]').focus();
            $('input[name="phone_no"]').val(response.phone_no);
            $('input[name="phone_no"]').blur();

            $('input[name="cnic"]').focus();
            $('input[name="cnic"]').val(response.cnic);
            $('input[name="cnic"]').blur();

            $('select[name="gender"]').val(response.gender).trigger('change');
            $('select[name="designation"]').val(response.designation).trigger('change');

            $('input[name="address"]').focus();
            $('input[name="address"]').val(response.address);
            $('input[name="address"]').blur();

            $('input[name="salary"]').focus();
            $('input[name="salary"]').val(response.salary);
            $('input[name="salary"]').blur();

            $('input[name="designation"]').focus();
            $('input[name="designation"]').val(response.designation);
            $('input[name="designation"]').blur();

            $('input[name="designation"]').focus();
            $('input[name="designation"]').val(response.designation);
            $('input[name="designation"]').blur();

            $('input[name="hire_date"]').focus();
            $('input[name="hire_date"]').val(response.hire_date);
            $('input[name="hire_date"]').blur();

        }
    });
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');
});
///////////////////////// End of Sidebar for Employee ////////////////////




///////////////////// Employees Listing //////////////////////////////////
function getEmployeeList() {
    $.ajax({
        type: 'GET',
        url: 'employeeFetchList',
        success: function (response) {
            var response = JSON.parse(response);
            $('.EmployeeListHolder').empty();
            $('.EmployeeListHolder').append(`<table class="table table-hover dt-responsive nowrap employeeList" id="example" style="width:100%">
            <thead>
                <tr>
                    <th>Service ID</th>
                    <th>First Name</th>
                    <th>Phone Number</th>
                    <th>CINC</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Salary</th>
                    <th>Designation</th>
                    <th>Action</th>
                </tr>
                </thead>
            <tbody>
        </tbody>
    </table>`);
        
                    response.forEach(element => {
                        $('.employeeList tbody').append(`<tr>
                        <td>${element.id}</td>
                        <td>${element.first_name}</td>
                        <td>${element.phone_no}</td>
                        <td>${element.cnic}</td>
                        <td>${element.gender}</td>
                        <td>${element.address}</td>
                        <td>${element.salary}</td>
                        <td>${element.designation}</td>
                        <td>
                        <button class="btn btn-default btn-line openDataSidebarForUpdateEmployee" id="${element['id']}">Edit</button>
                        <button class="btn btn-default " id="${element.id}">${element.status == 1 ? `Deactive` : `Active`}</button>
                        <button class="btn btn-default">Detail</button>
                        </td>
                </tr>`);
            });
            $('.employeeList').DataTable();
        }
    })
}
//////////////////// End of Employee Listing ////////////////////////////




//////////////////// Active Deactive Custom Error Function //////////////

function showAlert(code, message) {
	$('#notifDiv').css('background', (code === 200 ? 'green': 'red'));
	$('#notifDiv').fadeIn();
	$('#notifDiv').text(message);
	setTimeout(() =>{
		$('#notifDiv').fadeOut();	
	}, 3000)
}
