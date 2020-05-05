// Update Case
// $('#customerForm').append('<input type="text" name="_method" value="PUT" />');
// Add Case
// $('#customerForm [name="_method"]').remove();
var staffList = [];
let data = [];
const csrf_token_val = $('meta[name="csrf_token"]').attr('content');

let loc = window.location.pathname;
if (loc !== "/sales") {
    getCustomersList();
    getServicesList();
    getEmployeeList();
    getExpenseList();
} else {
    addCustomerSelection();
    getemployeelistcard();
}

// let servicesAdded = [];

$(document).ready(function () {
    $(document).on('click', '.Ser-Link', function () {
        let serviceId = $(this).find('.serviceId').val();

        // if(servicesAdded.includes(serviceId)){
        //     alert("Service already added");
        //     return;
        // }

        // servicesAdded.push(serviceId);

        let itmFnd = data.find(x => x.id == serviceId);
        // $('#ttlAm, #balance, #grndTtl').text('Rs. '+itmFnd.service_charge);
        let options = ``;
        staffList.forEach(element => {
            options += `<option value="${element.id}">${element.full_name}</option>`;
        });
        $('.mycardreview').append(`
            <div class="servicesToAdd">
                <input type="hidden" name="serviceId" value="${serviceId}">
                <div class="row">
                <div class="col-md-6">
                <h3 id="servNameHeader">${itmFnd.service_name}</h3>
                </div>
                <div class="col-md-6 text-right"> <a href="#" class="close-btn-pl removeService"></a> </div>
            </div>
            <div id="floating-label">
                <div class="form-wrap p-0">
                <div class="row">
                    <div class="col-md-6">
                    <div class="form-s2 pt-23 mystafflistselection" >
                        <select class="form-control formselect" id="getstafflist" name="customer_id" placeholder="Select Staff">
                        <option value="-1">Select Staff</option>
                        ${options}
                        </select>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <label class="font12 m-0">Amount</label>
                    <div class="form-group h-auto">
                        <input type="text" name="total_amount" id="" value="${itmFnd.service_charge}" class="form-control ttl_amount" placeholder="" style="font-size:16px">
                    </div>
                    </div>
                </div>
                </div>
            </div></div>`);

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
        url: '/sales/getServices/male',
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
    })
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
                staff_id: $(this).find('[name="customer_id"]').val(),
                amount: $(this).find('[name="total_amount"]').val(),
                unpaid: $(this).find('[name="unpaid_item"]').val() 
            };
                dataArr.push(temp);
        });
        $.ajax({
            type: 'post',
            url: "/sales/postdata",
            data: { _token: $('meta[name="csrf_token"]').attr("content"), data: dataArr },
            dataType: 'json',
            success: function (response) {
                if(response == "Success"){
                    location.replace('/home');
                    showAlert(200, "Successfully data added");
                }else{
                    showAlert(700, "Failed");
                }
            }
        });
    });

    ////////////////// Save Unpaid Payment /////////////////
     $('.saveUnpaidPayment').click(function() {
        let dataArrUnpaid = [];
        $('.servicesToadd').each(function() {
            let data_temp = {
                service_id: $(this).find('[name="serviceId"]').val(),
                staff_id: $(this).find('[name="customer_id"]').val(),
                amount: $(this).find('[name="total_amount"]').val()

            };
            dataArrUnpaid.push(data_temp);
        });
        $.ajax({
            type:'post',
            url: 'sales/postdataunpaid',
            data: { _token: $('meta[name="csrf_token"]').attr("content"), data: dataArrUnpaid },
            dataType:'json',
            success:function(response) {
                if(response == "Success") {
                         
                    showAlert(200, "Data inserted Succesfully");
                } else {
                    showAlert(700, "Failed");
                }
            }
        })
     });


     /////////////////// End of Sale Unpaid Post //////////////




///////////////// Male Tab Appended List///////////////////////
    $(document).on('click', '#tab1', function () {
        $.ajax({
            type: 'GET',
            url: '/sales/getServices/male',
            success: function (response) {
                var response = JSON.parse(response);
                data = response;
                $('#tab01').empty();
                response.forEach(element => {
                    $('#tab01').append(`<a class="Ser-Link">${element.service_name}<span>Rs: ${element.service_charge} </span> <input type="hidden" class="serviceId" value="${element.id}" /></a>`);
                });
                $('#tab01').append(`<div class="clearfix"></div>`);  
            }
        })
    })


 ///////////////// Female Tab Appended List///////////////////////
    $(document).on('click', '#tab2', function () {
        $.ajax({
            type: 'GET',
            url: '/sales/getServices/female',
            success: function (response) {
                var response = JSON.parse(response);
                data = response;
                $('#tab02').empty();
                response.forEach(element => {
                    $('#tab02').append(`<a class="Ser-Link">${element.service_name}<span>Rs: ${element.service_charge} </span> <input type="hidden"  class="serviceId" value="${element.id}" /></a>`);
                });
                $('#tab02').append(`<div class="clearfix"></div>`);  
            }
        })
    })

    
/////////////// Updated Price for Total Services /////////////////////
    $(document).on('input', '.ttl_amount', function () {
        updateTotalPrice();
    });

    // Function for the close sidebar
    $('#pl-close, .overlay').on('click', function () {
        closeSidebar();
    });

    // Function for the close sidebar
    $('#pl-close-trans, .overlay').on('click', function () {
        closeSidebarTrans();
    });


    // For All Sidebar close/show
    $('#productlist01').on('click', function () {
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll');
        $('#employee_form').find('#dropifyImgDiv').empty();
        $('#employee_form').find('#dropifyImgDiv').append('<input type="file" name="EmpPic" id="EmpPic" class="dropify" />');
        $('#employee_form').find('#EmpPic').dropify();
    });


    // For Transaction in Sales
    $('#productlist02').on('click', function () {
        $('#product-cl-trans').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll')
    });


    // Post data of Customer
    $(document).on('click', '.save_cust_form', function(){
        var verif = [];
        $('.required_save_cust').each(function () {
            $(this).css("border", "0px solid red");
            $(this).parent().css("border", "0px solid red");
            if ($(this).val() == "") {
                $(this).css("border", "1px solid red");
                verif.push(false);
                return;
            }else if( $(this).val() == 0 || $(this).val() == null){
                $(this).parent().css("border", "1px solid red");
                verif.push(false);
                return;
            } else {
                verif.push(true);
            }
        });
        if(jQuery.inArray(false, verif) != -1){
            return;
        }
        var thisRef = $(this);
        thisRef.text('Processing...');
        event.preventDefault();
        var form_data = $('.customer_form').serialize();
        $.ajax({
            url: "/customers/postdata",
            type: "POST",
            data: form_data,
            dataType: "json",
            success: function (data) {
                //console.log(data);
                thisRef.text('Save');
                if (data == "Success") {
                    $('#showDiv').show();
                    closeSidebar();
                    showAlert(200, "Data Inserted successfully");
                    getCustomersList();
                    //For Sales Page
                    addCustomerSelection();
                } else if(data == "already_exist"){
                    alert('Email already_exist');
                }else {
                    //console.error(error);
                    showAlert(700, "There was an error while inserting the data");
                }
            },
            error: function (error) {
                console.error(error);
                showAlert(700, "There was an error while inserting the data");
            }
        });
    });
    /////////////////End of Customers//////////////////////////////


    // Post Data on Service
    $(document).on('click', '.save_service_form', function(){
        var verif = [];
        $('.required_save_service').each(function () {
            $(this).css("border", "0px solid red");
            $(this).parent().css("border", "0px solid red");
            if ($(this).val() == "") {
                $(this).css("border", "1px solid red");
                verif.push(false);
                return;
            }else if( $(this).val() == 0 || $(this).val() == null){
                $(this).parent().css("border", "1px solid red");
                verif.push(false);
                return;
            } else {
                verif.push(true);
            }
        });
        if(jQuery.inArray(false, verif) != -1){
            return;
        }
        var thisRef = $(this);
        thisRef.text('Processing...');
        event.preventDefault();
        var form_data = $('#service_form').serialize();
        $.ajax({
            url: "/services/postdata",
            type: "POST",
            data: form_data,
            dataType: "json",
            success: function (data) {
                if (data == "Success") {
                    // $('#error_servicename').html('<label class="text-success">Service Available</label>');
                    closeSidebar();
                    showAlert(200, "Data Inserted successfully");
                    getServicesList();
                } else {
                    console.error(error);
                    // $('#error_servicename').html('<label class="text-danger">Service not Available</label>');
                    showAlert(700, "There was an error while inserting the data");
                }
            },
            error: function (error) {
                console.error(error);
                showAlert(700, "There was an error while inserting the data");
            }
        });
    });
    ////////////////////// End of Services////////////////////////



    // Post all Data from Employees
    $(document).on('click', '.save_employee', function(){
        var form_data = $('#employee_form').serialize();
        // console.log(form_data);
        // return;
         var verif = [];
        $('.required_save_emp').each(function () {
            $(this).css("border", "0px solid red");
            $(this).parent().css("border", "0px solid red");
            if ($(this).val() == "") {
                $(this).css("border", "1px solid red");
                verif.push(false);
                return;
            }else if( $(this).val() == 0 || $(this).val() == null){
                $(this).parent().css("border", "1px solid red");
                verif.push(false);
                return;
            } else {
                verif.push(true);
            }
        });
        if(jQuery.inArray(false, verif) != -1){
            return;
        }
        var thisRef = $(this);
        thisRef.text('Processing...');
        event.preventDefault();
        
        var form_data = $('#employee_form').serialize();
        $('#employee_form').ajaxSubmit({
            url: "/employees/postdata",
            type: 'POST',
            data: form_data,
            dataType: "json",
            success: function (data) {
                // document.write(data);
                // return;
                thisRef.text('Save');
                if (data == "Success") {
                    closeSidebar();
                    showAlert(200, "Data Inserted successfully");
                    getEmployeeList();
                } else {
                    //console.error(error);
                    showAlert(700, "There was an error while inserting the data");
                }
            }
        });
    })
    //////////////////////// End of Employees//////////////////////////


    /////////////  Post Expenses List ////////////////////
    $(document).on('click', '.save_expense_form', function(){
        var verif = [];
        $('.required_save_expense').each(function () {
            $(this).css("border", "0px solid red");
            $(this).parent().css("border", "0px solid red");
            if ($(this).val() == "") {
                $(this).css("border", "1px solid red");
                verif.push(false);
                return;
            }else if( $(this).val() == 0 || $(this).val() == null){
                $(this).parent().css("border", "1px solid red");
                verif.push(false);
                return;
            } else {
                verif.push(true);
            }
        });
        if(jQuery.inArray(false, verif) != -1){
            return;
        }
        var thisRef = $(this);
        var form_data = $('#expense_form').serialize();
        thisRef.text('Processing...');
        $.ajax({
            url: "/expenses/postform",
            type: 'POST',
            data:form_data,
            dataType: "json",
            success:function(data) {
                thisRef.text('Save');
                if(data == "Success") {
                    closeSidebar();
                    showAlert(200, "Data Inserted Succesfully");
                    getExpenseList();
                }
                else {
                    console.log(error);
                    showAlert(700, "There was an error while inserting the data");
                }
            }
        });
    });
    ///////////// End of Post Expenses List   //////////////////



    /////////////  Post Transaction List ////////////////////
    $('#transactionForm').on('submit', function(event) {
        event.preventDefault();
        var form_data = $(this).serialize();
        console.log(form_data);
        $.ajax({
            url: "/expenses/postdata",
            type: 'POST',
            data:form_data,
            dataType: "json",
            success:function(data) {
                if(data == "Success") {
                    closeSidebarTrans();
                    location.replace('/home');
                    showAlert(200, "Data Inserted Succesfully");
                }
                else {
                    console.log(error);
                    showAlert(700, "There was an error while inserting the data");
                }
            }
        });
    });
    ///////////// End of Post Expenses List   //////////////////


    // Edit functionalities for services 
    $(document).on('click', '.editServiceButton', function () {
        // let servId = $(this).parent().parent().find('td:eq(0)').text();
        let servId = $(this).attr('id');
        $.ajax({
            type: 'GET',
            url: `/getService/${servId}`,
            success: function (response) {
                var response = JSON.parse(response);
                showSidebar();
                $('#id').val(response.id);
                $('#service_name').val(response.service_name);
                $('#service_charge').val(response.service_charge);
                $('#service_type').val(response.service_type);
                $('input').focus();
            }
        });
    });


    $(document).on('click', '.update_service_form', function(){
        var verif = [];
        $('.required_edit_service').each(function () {
            $(this).css("border", "0px solid red");
            $(this).parent().css("border", "0px solid red");
            if ($(this).val() == "") {
                $(this).css("border", "1px solid red");
                verif.push(false);
                return;
            }else if( $(this).val() == 0 || $(this).val() == null){
                $(this).parent().css("border", "1px solid red");
                verif.push(false);
                return;
            } else {
                verif.push(true);
            }
        });
        if(jQuery.inArray(false, verif) != -1){
            return;
        }
        var thisRef = $(this);
        thisRef.text('Processing...');
        var id = $('#id').val();
        $.ajax({
            type: "PUT",
            url: "services/serviceupdate/" + id,
            data: $('#editform').serialize(),
            success: function (response) {
                thisRef.text('Update');
                closeSidebar();
                showAlert(200, "Data updated successfully");
                getServicesList();
            },
            error: function (error) {
                console.log(error);
                showAlert(700, error);
            }
        });
    });
    //////////////////// End of Edit Service ////////////////////////////


    ////////////////// Start of Edit Expense /////////////////////////   
    $(document).on('click', '.editExpenseButton', function () {
        let expId = $(this).attr('id');
        $.ajax({
            type: 'GET',
            url: `/getExpense/${expId}`,
            success: function (response) {
                var response = JSON.parse(response);
                console.log(response);
                showSidebar();
                $('#id').val(response.id);
                $('[name="expense_date"]').val(response.expense_date);
                $('#expense_name').val(response.expense_name);
                $('#expense_type').val(response.expense_type);
                $('#expense_amount').val(response.expense_amount);
                $('input').focus();
            }
        });
    });


    $(document).on('click', '.update_expense_form', function(){
        var verif = [];
        $('.required_edit_expense').each(function () {
            $(this).css("border", "0px solid red");
            $(this).parent().css("border", "0px solid red");
            if ($(this).val() == "") {
                $(this).css("border", "1px solid red");
                verif.push(false);
                return;
            }else if( $(this).val() == 0 || $(this).val() == null){
                $(this).parent().css("border", "1px solid red");
                verif.push(false);
                return;
            } else {
                verif.push(true);
            }
        });
        if(jQuery.inArray(false, verif) != -1){
            return;
        }
        var thisRef = $(this);
        thisRef.text('Processing...');
       // e.preventDefault();
        var id = $('#id').val();
        //console.log('My ID is', id);
        $.ajax({
            type: "PUT",
            url: "expenses/expenseupdate/" + id,
            data: $('#editexpense').serialize(),
            success: function (response) {
                console.log(response);
                closeSidebar();
                showAlert(200, "Data updated successfully");
                getExpenseList();
            },
            error: function (error) {
                console.log(error);
                showAlert(700, error);
            }
        });
    });
    //////////////// End of Edit Expenses Service ////////////////////



    // Edit For Customer
    $(document).on('click', '.editCustomerButton', function () {
        showSidebar();
        $tr = $(this).closest('tr');
        console.log($tr);
        const data = $tr.children("td").map(function () {
            return $(this).text();
        }).get();
        console.log(data);
        $('#id').val(data[0]);
        $('#full_name').val(data[1]);
        $('#phone_no_update_cust').val(data[3]);
        $('#email_update_cust').val(data[2]);
        $('input').focus();
    });
    $(document).on('click', '.update_cust_form', function(){
        var verif = [];
        $('.required_edit_cust').each(function () {
            $(this).css("border", "0px solid red");
            $(this).parent().css("border", "0px solid red");
            if ($(this).val() == "") {
                $(this).css("border", "1px solid red");
                verif.push(false);
                return;
            }else if( $(this).val() == 0 || $(this).val() == null){
                $(this).parent().css("border", "1px solid red");
                verif.push(false);
                return;
            } else {
                verif.push(true);
            }
        });
        if(jQuery.inArray(false, verif) != -1){
            return;
        }
        var thisRef = $(this);
        thisRef.text('Processing...');
        //e.preventDefault();
        var id = $('#id').val();
        //debugger;
        $.ajax({
            type: "PUT",
            url: "/customers/customerupdate/" + id,
            data: $('#editCustomerForm').serialize(),
            success: function (response) {
                thisRef.text('Update');
                closeSidebar();
                showAlert(200, "Data updated successfully");
                getCustomersList();
            },
            error: function (error) {
                console.log(error);
                showAlert(700, error);
            }
        });
    });
  
    //////////////////////////End of Customer Edit///////////////////////////////


    // Employee Edit
    $(document).on('click', '.editEmployeeButton', function () {
        //alert(location.protocol + "//" + location.host +'/storage/emp_pic/');
        $('#employeeeditform').find('#dropifyImgDivEdit').empty();
        $('#employeeeditform').find('#dropifyImgDivEdit').append('<input type="file" name="EmpPicEdit" id="EmpPicEdit" class="dropify" />');
        showSidebar();
        $tr = $(this).closest('tr');
        console.log($tr);
        const data = $tr.children("td").map(function () {
            return $(this).text();
        }).get();
        console.log(data);
        $('#id').val(data[0]);
        $('#first_name').val(data[1]);
        $('#phone_no').val(data[2]);
        $('#cnic').val(data[3]);
        $('#address').val(data[5]);
        $('#salary').val(data[6]);
        // alert("//" + location.host + '/' + data[7]);
        $("#EmpPicEdit").attr("data-height", '100px');
        $("#EmpPicEdit").attr("data-default-file", location.protocol + "//" + location.host +'/storage/emp_pic/'+ data[8]);
        $('#EmpPicEdit').dropify();
        $('input').focus();
    });
    
    $(document).on('click', '.edit_emp_form', function(){
        var verif = [];
        $('.required_edit_emp').each(function () {
            $(this).css("border", "0px solid red");
            $(this).parent().css("border", "0px solid red");
            if ($(this).val() == "") {
                $(this).css("border", "1px solid red");
                verif.push(false);
                return;
            }else if( $(this).val() == 0 || $(this).val() == null){
                $(this).parent().css("border", "1px solid red");
                verif.push(false);
                return;
            } else {
                verif.push(true);
            }
        });
        if(jQuery.inArray(false, verif) != -1){
            return;
        }
        var thisRef = $(this);
        thisRef.text('Processing...');
        //e.preventDefault();
        var id = $('#id').val();
        $('#employeeeditform').ajaxSubmit({
            type: "POST",
            url: "employees/employeeupdate/" + id,
            data: $('#employeeeditform').serialize(),
            success: function (response) {
                thisRef.text('Save');
                closeSidebar();
                showAlert(200, "Data updated successfully");
                getEmployeeList();
            },
            error: function (error) {
                console.log(error);
                showAlert(700, error);
            }
        });
    });




    //Activate Or Deactivate Employee
    $(document).on('click', '.activate_deactivate_emp', function(){
        var thisRef = $(this);
        thisRef.text('Processing...')
        $.ajax({
            type: 'GET',
            url: '/activate_deactivate_emp/'+thisRef.attr('id'),
            success: function (response) {
                var response = JSON.parse(response);
                if(response == 'success'){
                    getEmployeeList();
                }else{
                }
            }
        })
    });

    //Activate Or Deactivate Customers
    $(document).on('click', '.activate_deactivate_cust', function(){
        var thisRef = $(this);
        thisRef.text('Processing...')
        $.ajax({
            type: 'GET',
            url: '/activate_deactivate_cust/'+thisRef.attr('id'),
            success: function (response) {
                var response = JSON.parse(response);
                if(response == 'success'){
                    getCustomersList();
                }else{
                }
            }
        })
    });

    //Activate Or Deactivate Expense
    $(document).on('click', '.activate_deactivate_expense', function(){
        var thisRef = $(this);
        thisRef.text('Processing...')
        $.ajax({
            type: 'GET',
            url: '/activate_deactivate_expense/'+thisRef.attr('id'),
            success: function (response) {
                var response = JSON.parse(response);
                if(response == 'success'){
                    getExpenseList();
                }else{
                }
            }
        })
    });

    //Active Or Deactive Service
    $(document).on('click', '.activate_deactivate_service', function(){
        var thisRef = $(this);
        thisRef.text('Processing...')
        $.ajax({
            type: 'GET',
            url: '/activate_deactivate_service/'+thisRef.attr('id'),
            success: function (response) {
                var response = JSON.parse(response);
                if(response == 'success'){
                    getServicesList();
                }else{
                }
            }
        })
    });


});


// Updated Price for card
function updateTotalPrice() {
    let ttl = 0;
    $('.ttl_amount').each(function () {
        if (!isNaN(parseInt($(this).val()))) {
            ttl += parseInt($(this).val());
        }
    });
    $('.price_tot').text(`Rs. ${ttl}`);
}
////////////////// End of updated Sidebar ////////////////




//////////// Close Sidebar for all forms/////////////
function closeSidebar() {
    $('#product-cl-edit').removeClass('active');
    $('#product-cl-sec').removeClass('active');
    $('.overlay').removeClass('active');
    $('body').toggleClass('no-scroll')
}
///////////////// End of close Sidebar /////////////////


//////////// Close Sidebar for Transaction /////////////
function closeSidebarTrans() {
    $('#product-cl-trans').removeClass('active');
    $('#product-cl-sec').removeClass('active');
    $('.overlay').removeClass('active');
    $('body').toggleClass('no-scroll')
}
///////////////// End of close Sidebar for transaction /////////////////




///////////// Show Sidebar for all forms ///////////////////////////

function showSidebar() {
    //debugger;
    $('#product-cl-edit').addClass('active');
    $('.overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    $('body').toggleClass('no-scroll');
    $('#dropifyImgDiv').empty();
    $('#dropifyImgDiv').append('<input type="file" name="EmpPic" id="EmpPic" class="dropify" />');
    $('#EmpPic').dropify();
}
////////////// End of Show Sidebar ////////////////



// Show Alert
function showAlert(code, message) {
    $('.customAlert').css('background', (code === 200 ? 'green' : 'red'));
    $('.customAlert').fadeIn();
    $('.customAlert').text(message);
    setTimeout(() => {
        $('.customAlert').fadeOut();
    }, 3000);
}
///////// End of Document ////////////////
// Get All the customers list from database
function getCustomersList() {
    $.ajax({
        type: 'GET',
        url: "/customers/getdata",
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
            <button class="btn btn-default btn-line editCustomerButton">Edit</button>
            <button class="btn btn-default activate_deactivate_cust" id="${element.id}">${element.status == 1 ? `Deactivate` : `Activate`}</button>
            <button class="btn btn-default">Detail</button>
        </td>
</tr>`);
            });
            $('.customersList').DataTable();
        }
    });
}
////////////////////// Get all Customers //////////////////////////////


// Get all the services from DB
function getServicesList() {
    $.ajax({
        type: 'GET',
        url: "/services/getdata",
        success: function (response) {
            var response = JSON.parse(response);
            $('.serviceListHolder').empty();
            $('.serviceListHolder').append(`<table class="table table-hover dt-responsive nowrap serviceList" id="example" style="width:100%">
    <thead>
    <tr>
        <th>Service ID</th>
        <th>Services Name</th>
        <th>Price</th>
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
        <td>
        <button class="btn btn-default btn-line editServiceButton" id="${element.id}">Edit</button>
        <button class="btn btn-default activate_deactivate_service" id="${element.id}">${element.is_active == 1 ? `Deactivate` : `Activate`}</button>
        <button class="btn btn-default">Detail</button>
        </td>
</tr>`);
            });
            $('.serviceList').DataTable();
        }
    })
}

/////////////////// End of Services ////////////////////////////


// Get All Employee from DB
function getEmployeeList() {
    $.ajax({
        type: 'GET',
        url: "/employees/getdata",
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
        <td class="emp_pic" style="display:none">${element.picture}</td>
        <td>
        <button class="btn btn-default btn-line editEmployeeButton">Edit</button>
        <button class="btn btn-default activate_deactivate_emp" id="${element.id}">${element.is_active == 1 ? `Deactivate` : `Activate`}</button>
        <button class="btn btn-default">Detail</button>
        </td>
</tr>`);
            });
            $('.employeeList').DataTable();
        }
    });
}



////////////////// Get All Expenses List /////////////////////////
function getExpenseList() {
    $.ajax({
        type: 'GET',
        url: '/expenses/getdata',
        success:function(response) {
            var response = JSON.parse(response);
            $('.expenseListHolder').empty();
            $('.expenseListHolder').append(`
            <table class="table table-hover dt-responsive nowrap expenseList" id="example" style="width:100%">
            <thead>
                <tr>
                    <th>Expense ID</th>
                    <th>Expense Date</th>
                    <th>Expense Type</th>
                    <th>Expense Amount</th>
                    <th>Action</th>
                </tr>
            </thead>
        <tbody>
</table>`);
        response.forEach(element => {
            $('.expenseList tbody').append(`<tr>
            <td>${ element.id }</td>
            <td>${ element.expense_date }</td>
            <td>${ element.expense_type }</td>
            <td>${ element.expense_amount }</td>           
            <td>
                <button class="btn btn-default btn-line editExpenseButton" id="${element.id}"">Edit</button>
                <button class="btn btn-default activate_deactivate_expense" id="${element.id}">${element.is_active == 1 ? `Deactivate` : `Activate`}</button>
                <button class="btn btn-default">Detail</button>
            </td>
        </tr>`);
            });
            $('.expenseList').DataTable();
        }
    });
}
////////////////// End of All Expenses List /////////////////////




// Get Customer List from sales
function addCustomerSelection() {
    $.ajax({
        type: 'GET',
        url: "/sales/getdata",
        success: function (response) {
            let options = ``;
            $('#getselectcustomer').empty();
            $('#getselectcustomer').append(`<option>Select customer</option>`);
            JSON.parse(response).forEach(element => {
                $('#getselectcustomer').append(`<option>${element.full_name}</option>`);
            });
        }
    });
}


// Get response of the given selection of rate list 
function getemployeelistcard() {
    $.ajax({
        type: 'GET',
        url: "/sales/getdata",
        success: function (response) {
            var response = JSON.parse(response);
            staffList = response;
            response.forEach(element => {
                $('#getstafflist').append(`<option>${element.full_name}</option>`)
            });
        }
    });
}




// Date Picker & Select 2 
$(document).ready(function() {
    $('.form-control').on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
      }).trigger('blur');
      $('.formselect').select2();  
      $('.sd-type').select2({
        createTag: function (params) {
          var term = $.trim(params.term);
      
          if (term === '') {
            return null;
          }
      
          return {
            id: term,
            text: term,
            newTag: true // add additional parameters
          }
        }
      });
      
    // Date Picker
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd'
    });


});