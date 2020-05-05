@extends('layouts.master')
@section('content')

<div id="product-cl-sec">
    <a href="#" id="pl-close" class="close-btn-pl"></a>
    <div class="pro-header-text">New <span> Expense </span></div>
    <div class="pc-cartlist">
        <div class="overflow-plist">
            <div class="plist-content">
                <div class="_left-filter">
                    <form method="POST" id="saveExpenseForm">
                        <input type="hidden" name="expense_updating_id">
                        @csrf
                        <input type="text" id="operation" name="operation" hidden>
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div id="floating-label" class="card p-20 top_border mb-3">

                                        <h2 class="_head03">Expense <span>Details</span></h2>

                                        <div class="form-wrap p-0">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label class="PT-10 font12">Date</label>
                                                    <div class="form-group" style="height: auto">
                                                        <input type="text" id="datepicker" class="form-control required" name="exp_date"
                                                            placeholder="" style="font-size:13px">
                                                    </div>
                                                </div>

                                                <div class="col-md-12 PB-10">
                                                    <div class="form-s2 pt-19">
                                                        <select class="form-control formselect" id="exp_type" name="exp_type"
                                                            placeholder="Select Expense Type">
                                                            <option selected>Select Expense Type</option>
                                                            <option>Type 1</option>
                                                            <option>Type 2 </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Expense Name</label>
                                                        <input type="text" id="exp_name" name="exp_name" class="form-control required" placeholder=""
                                                            style="font-size:13px">
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Amount</label>
                                                        <input type="text" id="exp_amount" name="exp_amount" class="form-control required" placeholder=""
                                                            style="font-size:13px">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <div class="_cl-bottom">
        <button type="submit" class="btn btn-primary mr-2" id="saveExpenseBtn">Save</button>
        <button id="pl-close" type="submit" class="btn btn-cancel mr-2">Cancel</button>
    </div>
</div>

<div class="overlay"></div>
<div id="wrapper">
    <div id="content-wrapper">
        <div class="container">
            <div class="row mt-2 mb-3">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <h2 class="_head01">Expense <span>Management</span></h2>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6">
                    <ol class="breadcrumb">
                        <li><a href="#"><span>Expense</span></a></li>
                        <li><span>List</span></li>
                    </ol>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <a id="productlist01" href="#"
                             class="btn add_button openDataSidebarForAddExpense"><i class="fa fa-plus"></i>
                                <span>New Expense</span></a>
                            <h2>Expense <span> List</span></h2>
                        </div>
                        <div class="body expenseListHolder"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


@endsection
