@extends('layouts.master')
@section('content')

<body class="bg_main">
        <div id="wrapper">
            <div class="log_con">
                <div class="container-fluid"> 
                  <!-- Row -->
                  <div class="table-struct full-width">
                    <div class="table-cell vertical-align-middle auth-form-wrap">
                      <div class="auth-form">
                
                          <div class="row m-0">
                            <div class="col-md-6">
                              <div class="login-left">
                                <!--<div class="logo-company"> <img src="images/.jpg"  alt=""/> </div>-->
                                
                                <h1>ABNATION  <span>Saloon</span></h1>
                              </div>
                            </div>
                            <div class="col-md-6"  style="background-color: #f5f5f5">
                              <div class="login-right">
                                <h3>LOG <span>IN</span></h3>
                                <form method="POST">
                                    @csrf
                                  
                                    <div class="form-group">
                                    <div class="user"> <span class="fa fa-user-alt"></span>
                                      <input type="text" id="name" name="name" class="form-control" value="{{ old('name') }}" placeholder="Enter Username" required autocomplete="name" autofocus style="font-size: 13px">
                                    </div>
                                  </div>
        
        
                                  <div class="form-group">
                                    <div class="clearfix"></div>
                                    <div class="pass"> <span class="fa fa-unlock"></span>
                                      <input type="password" id="password" class="form-control" style="font-size: 13px" placeholder="Enter Password" name="password" required autocomplete="current-password">
                                    </div>
                                  </div>
                                  
                                    <a class="f_pass" href="#">Forget Your Password</a>
                                
                                  <div class="form-group mb-0">
                                    <button type="submit" class="btn btn-info btn-login "><span>Login</span></button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                      
                      </div>
                      <div class="Log_footer"> © 2020 Abnation Programmers Services All rights reserved.<br> 
                        Design &amp; Developed by <a href="#" target="_blank">ABNATION PROGRAMMERS</a> </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
    </body>
    @endsection




@section('javascript')
<script src="{{ asset('public/assets/js/jquery-3.3.1.slim.min.js') }}"></script>
<script>
    $(document).ready(function() {
        $(".btn-login").click(function(e) {
            e.preventDefault();
            var name     = $("#name").val();
            var password  = $("#password").val();

            $.ajax({
                url: 'user_login',
                type: 'POST',
                data: {
                    name: name,
                    password: password,
                    "_token": "{{ csrf_token() }}"
                },
                success: function(data) {
                    if(data.success) {
                    $('#notifDiv').fadeIn();
                    $('#notifDiv').css('background', 'green');
                    $('#notifDiv').text('User Successfully Login');
                    setTimeout(() => {
                        $('#notifDiv').fadeOut();
                    }, 3000);
                    window.location = "{{ route('home') }}";
                  }
                     else {
                       $('#notifDiv').fadeIn();
                       $('#notifDiv').css('background', 'red');
                       $('#notifDiv').text('An error occured. Please try later');
                       setTimeout(() => {
                        $('#notifDiv').fadeOut();
                       }, 3000);
                    }
                }
            });
          });  
        }); 
</script>
@endsection