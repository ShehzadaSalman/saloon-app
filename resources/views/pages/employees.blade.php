@extends('layouts.master')
@section('content')

<div id="product-cl-sec">
    <a href="#" id="pl-close" class="close-btn-pl"></a>
    <div class="pro-header-text">New <span>Employee</span></div>
    <div class="pc-cartlist">
        <div class="overflow-plist">
            <div class="plist-content">
                <div class="_left-filter">
                    <div class="container">
                        <form id="saveEmployeeForm" method="POST" enctype="multipart/form-data">
                            <input type="hidden" name="employee_updating_id">
                            @csrf
                            <input type="text" id="operation" name="operation" hidden>
                            <div class="row">
                                <div class="col-12">
                                    <div id="floating-label" class="card p-20 top_border mb-3">
                                        <h2 class="_head03">Profile <span>Details</span></h2>
                                        <div class="form-wrap p-0">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Full Name</label>
                                                        <input type="text" name="first_name" id="first_name"
                                                            class="form-control required" placeholder=""
                                                            style="font-size:13px">
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Phone No</label>
                                                        <input type="text" name="phone_no" id="phone_no"
                                                            class="form-control required" placeholder=""
                                                            style="font-size:13px">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">CNIC No</label>
                                                        <input type="text" name="cnic" id="cnic"
                                                            class="form-control required" placeholder=""
                                                            style="font-size:13px">
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-s2 pt-19">
                                                        <div>
                                                        <select class="form-control formselect required" id="gender" name="gender"
                                                            placeholder="Select Gender">
                                                            <option value="0" disabled selected>Select Gender</option>
                                                            <option value="male">Male</option>

                                                            <option value="female">Female</option>                                                        </select>
                                                    </div>
                                                    </div>
                                                </div>
                                        </div>

                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Address</label>
                                                        <input type="text" name="address" id="address"
                                                            class="form-control required" placeholder=""
                                                            style="font-size:13px">
                                                    </div>
                                                </div>


                                                <div class="col-md-12">
                                                    <div class="form-wrap up_h">
                                                        <div class="upload-pic"></div>
                                                        <input type="file" name="image"
                                                            id="input-file-now select_file" class="dropify" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <h2 class="_head03 PT-10">Additional <span> Details</span></h2>
                                        <div class="form-wrap p-0">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class="PT-10 font12">Hiring Date</label>
                                                    <div class="form-group" style="height: auto">
                                                        <input type="text" name="hire_date" id="datepicker" class="form-control required"
                                                            placeholder="" style="font-size:13px">
                                                    </div>
                                                </div>


                                                <div class="col-md-6 pt-17">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Salary</label>
                                                        <input type="text" name="salary" class="form-control required" 
                                                            placeholder="" style="font-size:13px">
                                                    </div>
                                                </div>


                                                <div class="col-md-6">
                                                    <div class="form-s2 pt-19">
                                                        <div>
                                                        <select class="form-control formselect required" name="designation"
                                                            placeholder="Select Designation">
                                                            <option value="0" disabled selected>Select Designation</option>
                                                            <option value="Sr. Stylist">Sr. Stylist</option>
                                                            <option value="Jr. Stylist">Jr. Stylist </option>
                                                            <option value="Helper">Helper</option>
                                                            <option value="Internee">Internee</option>
                                                        </select>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Row End -->
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="_cl-bottom">
        <button type="submit" class="btn btn-primary mr-2" id="saveEmployeeBtn">Save</button>
        <button id="pl-close" type="submit" class="btn btn-cancel mr-2">Cancel</button>
    </div>

</div>



<div class="overlay"></div>
<div id="wrapper">
    <div id="content-wrapper">
        <div class="container">
            <div class="row mt-2 mb-3">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <h2 class="_head01">Employee <span>Management</span></h2>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <ol class="breadcrumb">
                        <li><a href="#"><span>Employee</span></a></li>
                        <li><span>List</span></li>
                    </ol>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <a id="productlist01" href="#" class="btn add_button openSidebarForAddEmployee"><i
                                    class="fa fa-plus"></i> <span>New
                                    Employee</span></a>
                            <h2>Employee <span> List</span></h2>
                            <span id="form_output"></span>
                        </div>

                        <div class="body EmployeeListHolder">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@stop
