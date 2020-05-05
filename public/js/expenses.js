///////////////////////// Check the closing and editing tab///////////
$(document).ready(function () {
    getExpenseList();
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

//////////////////////// Expense Management Save //////////////////////
$(document).ready(function() {
        // Add Sidebar for Expense
        var lastOp = "add";
        $(document).on('click', '.openDataSidebarForAddExpense', function() {
    
        if(lastOp == "update") {
    
            $('input[name="exp_name"]').val("");
            $('input[name="exp_name"]').blur();
    
            $('input[name="exp_amount"]').val("");
            $('input[name="exp_amount"]').blur();
    
            $('input[name="exp_date"]').val("");    
            $('input[name="exp_date"]').blur();
    
            $("#exp_type").val('').trigger('change');
        }
        lastOp = 'add';
        $('#operation').val('add');
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');
        });
    
    $('#saveExpenseBtn').click(function() {
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
            ajaxUrl = 'save_expense';
        } else {
            ajaxUrl = 'update_expense';
        }

        $('#saveExpenseBtn').attr('disabled', 'disabled');
        $('#saveExpenseBtn').text('Processing..');
            
        $('#saveExpenseForm').ajaxSubmit({
            type:'POST',
            url: ajaxUrl,
            data: $('#saveExpenseForm').serialize(),
            cache: false,
            success:function(response) {
                $('#saveExpenseBtn').removeAttr('disabled');
                $('#saveExpenseBtn').text('Save');
                
                // Save the expense
                if (JSON.parse(response) == "success") {
                     getExpenseList();
                    $('#pl-close').click();
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Expense  Added successfully');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);

                    if($('#operation').val() == 'add'){
                        $('[name="exp_name"]').val('');
                        $('[name="exp_amount"]').val('');
                        $('[name="exp_date"]').val('');
                     }
                
            
                    // Update Expense
                } else if(JSON.parse(response) == "updated") {
                    getExpenseList();
                    $('#pl-close').click();
                    $('#saveExpense').removeAttr('disabled');
                    $('#saveExpense').text('Save');
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('Expense have been updated successfully');
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

//////////////////////// Update Sidebar for Department //////////////////
$(document).on('click', '.openDataSidebarForUpdateExpense', function() {
    $('#operation').val('update');
    lastOp = 'update';
    $('#dataSidebarLoader').show();
    $('._cl-bottom').hide();
    $('.pc-cartlist').hide();


    var id = $(this).attr('id');
    $('input[name="expense_updating_id"]').val(id);
    $.ajax({
        type: 'GET',
        url: 'GetExpense/' + id,
        success: function(response) {
            var response = JSON.parse(response);
            $('#dataSidebarLoader').hide();
            $('._cl-bottom').show();
            $('.pc-cartlist').show();
            $('#uploadedImg').remove();

            $('input[name="exp_amount"]').focus();
            $('input[name="exp_amount"]').val(response.exp_amount);
            $('input[name="exp_amount"]').blur();

            $('input[name="exp_name"]').focus();
            $('input[name="exp_name"]').val(response.exp_name);
            $('input[name="exp_name"]').blur();


            $('input[name="exp_date"]').focus();
            $('input[name="exp_date"]').val(response.exp_date);
            $('input[name="exp_date"]').blur();

            $('select[name="exp_type"]').val(response.exp_type).trigger('change');

        }
    });
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');
});
//////////////////////// Get All Expenses ///////////////////////////////

function getExpenseList() {
    $.ajax({
        type: 'GET',
        url: "fetchExpenseList",
        success: function (response) {
        var response = JSON.parse(response);
        $('.expenseListHolder').empty();
        $('.expenseListHolder').append(`<table class="table table-hover dt-responsive nowrap expenseList" id="example" style="width:100%">
        <thead>
            <tr>
                <th>Expense ID</th>
                <th>Expense Name</th>
                <th>Expense Amount</th>
                <th>Expense Type</th>
                <th>Expense Date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
        </table>`);
            response.forEach(element => {
                $('.expenseList tbody').append(`<tr>
                <td>${element.id}</td>
                <td>${element.exp_name}</td>
                <td>${element.exp_amount}</td>
                <td>${element.exp_type}</td>
                <td>${element.exp_date}</td>
                <td>
                <button class="btn btn-default btn-line openDataSidebarForUpdateExpense" id="${element['id']}">Edit</button>
                <button class="btn btn-default">Active</button>
                <button class="btn btn-default">Detail</button>
                </td>
            </tr>`);
            });
            $('.expenseList').DataTable();
        }
    })
}
