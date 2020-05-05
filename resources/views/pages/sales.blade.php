@extends('layouts.master')
@section('content')
<div id="product-cl-sec">
    <a href="#" id="pl-close" class="close-btn-pl"></a>
    <div class="pro-header-text">New <span> Customer </span></div>
    <div class="pc-cartlist">
        <div class="overflow-plist">
            <div class="plist-content">
                <div class="_left-filter">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div id="floating-label" class="card p-20 top_border mb-3">
                                    <h2 class="_head03">Customer <span>Details</span></h2>
                                    <div class="form-wrap p-0">
                                        <form method="POST" id="saveCustomerForm">
                                            @csrf
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Full Name</label>
                                                        <input type="text" id="full_name" name="full_name"
                                                            class="form-control required" placeholder=""
                                                            style="font-size:13px">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Phone No</label>
                                                        <input type="text" name="phone_no" id="phone_no" class="form-control required"
                                                            placeholder="" style="font-size:13px">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="control-label mb-10">Email ID</label>
                                                        <input type="text" name="email" id="email" class="form-control required"
                                                            placeholder="" style="font-size:13px">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group pt-19">
                                                    
                                                        <select class="custom-select" name="gender">
                                                            <option selected>Gender</option>
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
        <button type="submit" class="btn btn-primary mr-2" id="saveCustomerBtn">Save</button>
        <button id="pl-close" type="submit" class="btn btn-cancel mr-2">Cancel</button>
    </div>

</div>


                           {{-- Card Payment --}}


    <div id="product-cl-sec-card">	
        <a href="#" id="pl-close-card" class="close-btn-pl"></a> 
            <div class="pro-header-text">Card <span> Payment </span></div>              
                <div class="pc-cartlist">         
                    <div class="overflow-plist">      
                        <div class="plist-content">       
                             <div class="_left-filter"> 
                             <div class="container">
                                 <div class="row">
                                     <div class="col-12">
                                      <div id="floating-label" class="card p-20 top_border mb-3">
                                               <h2 class="_head03">Payment <span> Transaction ID</span></h2> 
                                               
                                               <div class="form-wrap p-0">			 
                                                   <div class="row">
                                                     <div class="col-md-12">
                                                       <div class="form-group">
                                                         <label class="control-label mb-10">Enter Transaction Id</label>
                                                         <input type="text" id="" class="form-control" placeholder="" style="font-size:13px">
                                                       </div>
                                                     </div> 
                                                </div> 
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
                <button type="submit" class="btn btn-primary mr-2">Save</button> 
                <button id="pl-close-card" type="submit" class="btn btn-cancel mr-2">Cancel</button>
            </div>
        </div>


<div class="overlay"></div>
<div id="wrapper">
    <div id="content-wrapper">
        <div class="container">
            <div class="row mt-2 mb-3">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <h2 class="_head01">Sales <span>Management</span></h2>
                </div>
            </div>
            <form id="postsaledata">
            @csrf
                <div class="row">
                    <div class="col-lg-5 col-md-5 col-md-12">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            
                            <li class="nav-item">
                                <a class="nav-link active" id="tab1" data-toggle="tab" href="#tab01" role="tab" aria-controls="tab01" aria-selected="true">Male</a>
                             </li>
                            
                             <li class="nav-item">
                                  <a class="nav-link" id="tab2" data-toggle="tab" href="#tab02" role="tab" aria-controls="tab02" aria-selected="false">Female</a>
                             </li>
                            <li class="nav-item">
                                 <a class="nav-link" id="tab3" data-toggle="tab" href="#tab03" role="tab" aria-controls="tab03" aria-selected="false">Child</a>
                            </li>
                        </ul>
                        
                        <div class="tab-content tab-style" id="myTabContent">
                            <div class="tab-pane fade show active" id="tab01" role="tabpanel" aria-labelledby="tab1">
                            </div>

                            <div class="tab-pane fade show" id="tab02" role="tabpanel" aria-labelledby="tab2">
                            </div>
                            
                            <div class="tab-pane fade show" id="tab03" role="tabpanel" aria-labelledby="tab3">
                            </div>
                        </div>

                    </div>
             
                    <div class="col-lg-7 col-md-7 col-md-12">          
                        <div class="col-md-6 p-0 PB-10">
                            <div class="_sa-customer">
                                <div class="form-s2 selpluse customerSelectionList">
                                    <select class="form-control formselect" id="getCustomerList"
                                        placeholder="Select Customer">
                                        <option value="-1" selected disabled>Select Customer</option>
                                        @foreach($customers as $customer)
                                        <option value="">{{ $customer->full_name }}</option>
                                        @endforeach
                                    </select>
                                        <a href="#" class="btn plus_button po-ab productlist01 _OA-disply openDataSidebarForAddCustomer"><i class="fa fa-plus"></i></a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card top_border _ser-cust mycardreview">
                        </div>
                        
                        
                        <div class="Total_am serviceChargesInvoiceDetails" style="display: none">
                            <div class="row m-0 mt-30">
                                <div class="col-md-6  border-bottom pb-10">Total: </div>
                                <div class="col-md-6 text-right border-bottom PB-10 price_tot" id="ttlAm"></div>
                            </div>
                          
                            <div class="row m-0 ">
                                <div class="col-md-6 pb-10 PT-10">Balance: </div>
                                <div class="col-md-6 text-right PB-10 PT-10 ">0</div>
                            </div>
                          
                            <div class="row m-0 PT-10">
                                <div class="col-md-12 pb-10 PT-10 _Paybill price_tot"></div>
                            </div>
                            
                            <div class="row PT-10">    
                                <div class="col-md-4 col-sm-4 col-12">
                                    <a href="#" class="btn _Paytype saveFormData">Cash</a>
                                </div>
                               
                                <div class="col-md-4 col-sm-4 col-12">
                                    <a href="#" class="btn _Paytype" id="productlist01-card">Card</a>
                                </div>
                         
                                <div class="col-md-4 col-sm-4 col-12">
                                    <a href="#" class="btn _Paytype">Save Unpaid</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@stop
