<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Employee;
use DB;
use Illuminate\Support\Facades\Storage;
use File;
use URL;


class EmployeeController extends Controller
{
    public function index() {
        return view('pages.employees');
    }

    public function getdata()
    {
         $employees = Employee::all();
         echo json_encode($employees);          
    }

    public function save_employee(Request $request) {
        $employee = new Employee;

            
        $employee->first_name         = $request->input('first_name');
        $employee->phone_no           = $request->input('phone_no');
        $employee->cnic               = $request->input('cnic');
        $employee->gender             = $request->input('gender');
        $employee->address            = $request->input('address');
        $employee->salary             = $request->input('salary');
        $employee->designation        = $request->input('designation');   
        $employee->hire_date          = $request->input('hire_date');  
        $employee->image              = URL::to('/').'/storage/emp_pic/'.$compPic;
        if($employee->save()){
            echo json_encode("success");
            } else{
             echo json_encode("failed");
        }
    }

    public function GetEmployee($id) {
        echo json_encode(DB::table('employees')->where('id', $id)->first());
    }

    public function update_employee(Request $request) {
        $update = DB::table('employees')->where('id', $request->employee_updating_id)->update([
            "first_name"     =>  $request->first_name,
            "phone_no"       =>  $request->phone_no, 
            "cnic"           =>  $request->cnic,
            "gender"         =>  $request->gender,
            "address"        =>  $request->address,
            "salary"         =>  $request->salary,
            "designation"    =>  $request->designation,
            "hire_date"      =>  $request->hire_date    
        ]);
    
        if($update) {
            echo json_encode('updated');
        } else {
            echo json_encode('failed');
        }
    }


    public function active_deactive_emp($id) {
        $employee = Employee::find($id);
        if($employee->status == 1) {
            $employee->status = 0;
        } else {
        $employee->status = 1;
        }
        if($employee->save()) {
            echo json_encode('success');
        } else {
            echo json_encode('failed');
        }
    }
}
