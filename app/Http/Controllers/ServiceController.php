<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;
use DB;



class ServiceController extends Controller
{
    public function index() {
        return view('pages.services');
    }

    public function getdata() {
        $services = Service::all();
         echo json_encode($services);
    }

    public function GetServices($id) {
        echo json_encode(DB::table('services')->where('id', $id)->first());
    }


    public function save_service(Request $request) {
        $service = new Service;
        $service->service_name = $request->input('service_name');
        $service->service_charge = $request->input('service_charge');
        $service->service_type = $request->input('service_type');
        if($service->save()){
            echo json_encode("success");
        }else{
            echo json_encode($status);
        }
   }
 
   public function update_service(Request $request) {
    $update = DB::table('services')->where('id', $request->service_updating_id)->update([
        "service_name"    =>  $request->service_name,
        "service_charge"  =>  $request->service_charge, 
        "service_type"    =>  $request->service_type
    ]);

    if($update) {
        echo json_encode('updated');
    } else {
        echo json_encode('failed');
    }
}
    
}

