<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use App\Service;
use App\sales;
use App\Employee;

class SaleController extends Controller
{
    public function index() {
        $services = Service::all(); 
        $customers = Customer::all(); 
        return view('pages.sales')->with('customers', $customers);
    }

    public function getServicesFor($gender){
        echo json_encode(Service::where('service_type', $gender)->get());
    }
    

    public function getEmployees() {
        $employees = Employee::all();
        echo json_encode($employees);  
    }

    public function postdata(Request $request){
     
        foreach($request->data as $item) {
            $sale = new sales;
            $sale->service_id    = $item['service_id'];
            $sale->emp_id   = $item['emp_id'];
            $sale->total_amount  = $item['amount'];
            $sale->save();
        }
        if($sale->save()) {
            echo json_encode('success');
        } else {
            echo json_encode('error');
        }
    }
}
