
@extends('layouts.master')
@section('content')

<div id="wrapper">     
    <div id="content-wrapper">
        <div class="container">              
            <div class="row PT-20">   
                <div class="col-md-4">
                    <a href="{{url('/employees')}}" class="box-sec">
                        <span class="img-svg"><img src="{{ asset('public/assets/images/add-emp2.svg') }}" alt=""></span>		    		
                        <strong>Employee</strong>			    			
                    </a>
                </div>
                         
                <div class="col-md-4">
                    <a href="{{url('/customers')}}" class="box-sec">
                    <span class="img-svg"><img src="{{ asset('public/assets/images/add-customer.svg') }}" alt=""></span>		    		
                    <strong>Customer</strong>			    			
                    </a>
                </div>
    
                <div class="col-md-4">
                  <a href="{{url('/services')}}" class="box-sec">
                  <span class="img-svg"><img src="{{ asset('public/assets/images/services-saloon.svg') }}" alt=""></span>		     
                  <strong>Services</strong>			    			
                  </a>
                </div>
                     
                <div class="col-md-4">
                  <a href="{{ url('/expenses') }}" class="box-sec">
                  <span class="img-svg"><img src="{{ asset('public/assets/images/expenses-icon.svg') }}" alt=""></span>		    		
                  <strong>Expenses</strong>			    			
                  </a>
                </div>
                        
                <div class="col-md-4">
                    <a href="{{url('/sales')}}" class="box-sec">
                    <span class="img-svg"><img src="{{ asset('public/assets/images/services-icon.svg') }}" alt=""></span>		    		
                    <strong>Add Sales</strong>			    			
                    </a>
                </div>
                        
                  <div class="col-md-4">
                      <a href="{{url('/reports')}}" class="box-sec">
                        <span class="img-svg"><img src="{{ asset('public/assets/images/report-icon-2.svg') }}" alt=""></span>		    		
                        <strong>Reports</strong>			    			
                     </a>
                </div>                               
            </div>   
         </div>      
     </div>
 </div>  
@stop