<?php

    Route::get('/', function () {
        return view('welcome');
    });

    Route::get('/home', 'HomeController@index')->name('home');
    Route::get('login', 'LoginController@login');
    Route::post('user_login', 'LoginController@user_login');

    Route::get('logout', 'LoginController@logout')->name('logout'); 

    Route::group(['middleware' => ['auth']], function() {
        // Employee Route
        Route::get('employees', 'EmployeeController@index');   
        Route::get('/employeeFetchList', 'EmployeeController@getdata');
        Route::post('save_employee', 'EmployeeController@save_employee');
        Route::get('GetEmployee/{id}', 'EmployeeController@GetEmployee');
        Route::post('update_employee', 'EmployeeController@update_employee');
        Route::get('active_deactive_emp/{id}', 'EmployeeController@active_deactive_emp');

        

        // Customers Route
        Route::get('/customers', 'CustomerController@index');
        Route::get('fetchCustomersList', 'CustomerController@getdata');
        Route::post('save_customer', 'CustomerController@save_customer');
        Route::get('GetCustomer/{id}', 'CustomerController@GetCustomer');
        Route::post('update_customer', 'CustomerController@update_customer');

        // Services Route
        Route::get('/services', 'ServiceController@index');
        Route::get('fetchServiceList', 'ServiceController@getdata');
        Route::post('save_service', 'ServiceController@save_service');
        Route::get('GetServices/{id}', 'ServiceController@GetServices');
        Route::post('update_service', 'ServiceController@update_service');


        // Expenses Module
        Route::get('expenses', 'ExpenseController@index');
        Route::post('save_expense', 'ExpenseController@save_expense');
        Route::get('fetchExpenseList', 'ExpenseController@getExpenseData');
        Route::get('GetExpense/{id}', 'ExpenseController@GetExpense');
        Route::post('update_expense', 'ExpenseController@update_expense');

        // Reports
        Route::get('reports', 'ReportController@index');
        
        // Sales
        Route::get('sales', 'SaleController@index');
        Route::get('sales/getServices/{gender}', 'SaleController@getServicesFor');
        Route::get('sales/getEmployees', 'SaleController@getEmployees');
        Route::post('sales/postdata', 'SaleController@postdata');
});
