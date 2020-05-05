<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Expense;
use DB;
class ExpenseController extends Controller
{
    public function index() {
        return view('pages.expense');
    }

    public function save_expense(Request $request) {
        $expense = new Expense;
        $expense->exp_name      = $request->input('exp_name');
        $expense->exp_type      = $request->input('exp_type');
        $expense->exp_amount    = $request->input('exp_amount');
        $expense->exp_date      = $request->input('exp_date');      
        if($expense->save()){
            echo json_encode("success");
        } else {
            echo json_encode("failed");
        }
    }

    public function getExpenseData() {
        $expenses = Expense::all();
        echo json_encode($expenses);  
    }

    public function GetExpense($id) {
        echo json_encode(DB::table('expenses')->where('id', $id)->first());
    }

    public function update_expense(Request $request) {
        $update = DB::table('expenses')->where('id', $request->expense_updating_id)->update([
            "exp_name"    =>  $request->exp_name,
            "exp_amount"  =>  $request->exp_amount, 
            "exp_type"    =>  $request->exp_type,
            "exp_date"    =>  $request->exp_date
        ]);
    
        if($update) {
            echo json_encode('updated');
        } else {
            echo json_encode('failed');
        }
    }
}
