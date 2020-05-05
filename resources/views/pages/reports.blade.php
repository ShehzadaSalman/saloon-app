@extends('layouts.master')
@section('content')

<div id="wrapper">
    <div id="content-wrapper">
        <div class="container container-1240 _dashboard">
            <div class="row mt-2 mb-3">
                <div class="col-lg-8 col-md-8 col-sm-12">
                    <h2 class="_head01">Dashboard <span></span></h2>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <div class="_dash-select">
                        <select class="custom-select custom-select-sm">
                            <option selected>Current Month</option>
                            <option value="1">Last Month</option>
                            <option value="2">Overall</option>
                        </select>
                    </div>
                </div>
            </div>


            <div class="row">


                <div class="col-lg-5 col-12">
                    <div class="row">
                        <div class="col-md-6 mb-30">
                            <div class="card cp-stats">
                                <div class="cp-stats-icon"><img src="images/totalreveneue.svg" alt="" /></div>
                                <h5 class="text-muted">Total Reveneue</h5>
                                <h3 class="cp-stats-value">22</h3>
                                <!--<p class="mb-0"><span class="weight600 text-success"><i class="fa fa-arrow-up"> </i> 5.27%</span> <span class="bm_text"> Since last month</span> </p>-->
                            </div>

                        </div>

                        <div class="col-md-6 mb-30">

                            <div class="card cp-stats">
                                <div class="cp-stats-icon"><img src="images/totalbookings.svg" alt="" /></div>
                                <h5 class="text-muted">Total Bookings</h5>
                                <h3 class="cp-stats-value">24</h3>
                                <!--<p class="mb-0"><span class="weight600 text-success"><i class="fa fa-arrow-up"> </i> 5.27%</span> <span class="bm_text"> Since last month</span> </p>-->
                            </div>

                        </div>

                        <div class="col-md-6 mb-30">

                            <div class="card cp-stats">
                                <div class="cp-stats-icon"><img src="images/active-cust.svg" alt="" /></div>
                                <h5 class="text-muted">Active Customers</h5>
                                <h3 class="cp-stats-value">54</h3>
                                <!--<p class="mb-0"><span class="weight600 text-danger"><i class="fa fa-arrow-down"> </i> 5.27%</span> <span class="bm_text"> Since last month</span> </p>-->
                            </div>

                        </div>

                        <div class="col-md-6 mb-30">

                            <div class="card cp-stats">
                                <div class="cp-stats-icon"><img src="images/avg-rv-cust.svg" alt="" /></div>
                                <h5 class="text-muted">AVG. REV. / Cust</h5>
                                <h3 class="cp-stats-value">25</h3>
                                <!--<p class="mb-0"><span class="weight600 text-danger"><i class="fa fa-arrow-down"> </i> 5.27%</span> <span class="bm_text"> Since last month</span> </p>-->
                            </div>

                        </div>

                    </div>

                </div>

                <div class="col-lg-7 col-12 mb-30">

                    <div class="card _grap-bar pt-0">
                        <div class="mt-3 chartjs-chart">
                            <div id="e_chart_1" class="e_chart"></div>
                        </div>
                    </div>

                </div>

            </div>

            <div class="card _grayB">

                <div class="row m-0">
                    <div class="col-md-4 _amState">
                        <p>Total Outstanding Payment</p>
                        <h3> <small class="fa fa-circle align-middle text-warning"></small> 55648</h3>
                    </div>

                    <div class="col-md-4 _amState BLight _borL B_border">
                        <p>Amount Received </p>
                        <h3><small class="fa fa-circle align-middle text-success"></small> 35600</h3>
                    </div>

                    <div class="col-md-4 _amState _borL">
                        <p>Pending Amount</p>
                        <h3><small class="fa fa-circle align-middle text-danger"></small> 10048</h3>
                    </div>

                </div>

            </div>

            <div class="row">

                <div class="col-md-9 mb-30">
                    <div class="card _grap-bar">
                        <canvas id="line-chart-example" class="line-chart"></canvas>
                    </div>
                </div>

                <div class="col-md-3 mb-30">
                    <div class="row _RVperDay">

                        <div class="col-12">
                            <div class="card cp-stats">
                                <div class="cp-stats-icon"><img src="images/avg-revenue.svg" alt="" /></div>
                                <h3 class="cp-stats-value">22</h3>
                                <h5 class="text-muted">AVG Revenue Per Day</h5>
                            </div>
                        </div>

                        <div class="col-12">

                            <div class="card cp-stats">
                                <div class="cp-stats-icon"><img src="images/avg-revenue-shipment.svg" alt="" /></div>
                                <h3 class="cp-stats-value">22</h3>
                                <h5 class="text-muted">AVG Revenue Per Shipment</h5>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="card cp-stats">
                                <div class="cp-stats-icon"><img src="images/avg-shipment-day.svg" alt="" /></div>
                                <h3 class="cp-stats-value">22</h3>
                                <h5 class="text-muted">AVG Shipments Per Day</h5>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="card cp-stats">
                                <div class="cp-stats-icon"><img src="images/weight-shipment.svg" alt="" /></div>
                                <h3 class="cp-stats-value">22</h3>
                                <h5 class="text-muted">AVG Weight Per Shipment</h5>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="card cp-stats border-0">
                                <div class="cp-stats-icon"><img src="images/avg-delivery-time.svg" alt="" /></div>
                                <h3 class="cp-stats-value">22</h3>
                                <h5 class="text-muted">AVG Delivery Time</h5>
                            </div>
                        </div>


                    </div>
                </div>

            </div>


            <div class="row">

                <div class="col-md-4 mb-30">
                    <div class="card p-20 top_border">
                        <h2 class="_head03 border-0">Revenue <span>By Location</span></h2>

                        <div class="_dash-prog">
                            <h5>Lahore</h5>
                            <div class="progress-w-percent">
                                <span class="progress-value">52% </span>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width:52%;" aria-valuenow="52"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>

                        <div class="_dash-prog">
                            <h5>Karachi</h5>
                            <div class="progress-w-percent">
                                <span class="progress-value">80% </span>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 80%;" aria-valuenow="80"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>

                        <div class="_dash-prog">
                            <h5>Multan</h5>
                            <div class="progress-w-percent">
                                <span class="progress-value">40% </span>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 40%;" aria-valuenow="40"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>

                        <div class="_dash-prog">
                            <h5>Lahore</h5>
                            <div class="progress-w-percent">
                                <span class="progress-value">25% </span>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>

                        <div class="_dash-prog">
                            <h5>Lahore</h5>
                            <div class="progress-w-percent">
                                <span class="progress-value">72% </span>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 72%;" aria-valuenow="72"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="col-md-8 mb-30">
                    <div class="card p-20 top_border">
                        <h2 class="_head03 border-0 pb-0">Top <span>List Here...</span></h2>

                        <div class="table-responsive _dash-table">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>SERVICE</th>
                                        <th>QUANTITY</th>
                                        <th>WEIGHT</th>
                                        <th>RATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> ASOS Ridley High Waist </td>
                                        <td> $79.49 </td>
                                        <td> 82 </td>
                                        <td> $6,518.18 </td>
                                    </tr>
                                    <tr>
                                        <td> Marco Lightweight Shirt </td>
                                        <td> $128.50 </td>
                                        <td> 37 </td>
                                        <td> $4,754.50 </td>
                                    </tr>
                                    <tr>
                                        <td> Half Sleeve Shirt </td>
                                        <td> $39.99 </td>
                                        <td> 64 </td>
                                        <td> $2,559.36 </td>
                                    </tr>
                                    <tr>
                                        <td> Lightweight Jacket </td>
                                        <td> $20.00 </td>
                                        <td> 184 </td>
                                        <td> $3,680.00 </td>
                                    </tr>
                                    <tr>
                                        <td> Lightweight Jacket </td>
                                        <td> $20.00 </td>
                                        <td> 184 </td>
                                        <td> $3,680.00 </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection