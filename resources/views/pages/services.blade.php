@extends('layouts.master')
@section('content')
<div id="product-cl-sec">
    <a href="#" id="pl-close" class="close-btn-pl"></a>
    <div class="pro-header-text">New <span> Service </span></div>
    <div class="pc-cartlist">
        <div class="overflow-plist">
            <div class="plist-content">
                <div class="_left-filter">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div id="floating-label" class="card p-20 top_border mb-3">
                                    <h2 class="_head03">Service <span>Details</span></h2>

                                    <div class="form-wrap p-0">
                                        <form method="POST" id="saveServiceForm">
                                            <input type="hidden" name="service_updating_id">
                                            @csrf
                                            <input type="text" id="operation" name="operation" hidden>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Service Name</label>
                                                        <input type="text" name="service_name" class="form-control required"
                                                            placeholder="" style="font-size:13px">
                                                        <span id="error_servicename"></span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Service Charges</label>
                                                        <input type="text" name="service_charge" class="form-control required"
                                                            placeholder="" style="font-size:13px">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group pt-19">
                                                        <select class="custom-select" name="service_type">
                                                            <option selected>Select Gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">female</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="_cl-bottom">
        <button type="submit" class="btn btn-primary mr-2" id="saveServiceBtn">Save</button>
        <button id="pl-close" type="submit" class="btn btn-cancel mr-2">Cancel</button>
    </div>
</div>



<div class="overlay"></div>
<div id="content-wrapper">
    <div class="container">

        <div class="row mt-2 mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6">
                <h2 class="_head01">Services <span>Management</span></h2>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6">
                <ol class="breadcrumb">
                    <li><a href="#"><span>Services</span></a></li>
                    <li><span>List</span></li>
                </ol>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="header">
                        <a id="productlist01" class="btn add_button openDataSidebarForAddService"><i class="fa fa-plus"></i> <span>New
                                Service</span></a>
                        <h2>Service <span> List</span></h2>
                        <span id="form_output"></span>
                    </div>
                    <div class="body serviceListHolder"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
@stop
