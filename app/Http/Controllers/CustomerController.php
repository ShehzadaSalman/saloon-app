<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Customer;
use DB;

class CustomerController extends Controller
{
    public function index() {
        $customers = Customer::all();
        return view('pages.customers')->with('customers', $customers);
    }

    function getdata()
    {
         $customers = Customer::all();
         echo json_encode($customers);          
    }

    public function save_customer(Request $request) {
        $customer = new Customer;
        $customer->full_name = $request->input('full_name');
        $customer->phone_no  = $request->input('phone_no');
        $customer->email     = $request->input('email');
        $customer->gender    = $request->input('gender');      
        if($customer->save()){
            echo json_encode("success");
        }else{
            echo json_encode("failed");
        }
    }

    public function GetCustomer($id) {
        echo json_encode(DB::table('customers')->where('id', $id)->first());
    }

    public function update_customer(Request $request) {
        $update = DB::table('customers')->where('id', $request->customer_updating_id)->update([
            "full_name"    =>  $request->full_name,
            "phone_no"     =>  $request->phone_no, 
            "email"        =>  $request->email,
            "gender"       =>  $request->gender
        ]);
    
        if($update) {
            echo json_encode('updated');
        } else {
            echo json_encode('failed');
        }
    }
}
