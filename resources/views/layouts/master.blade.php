<!DOCTYPE html>
<html lang="en">
<head>
    @include('inc.header')
</head>
<body>

    <div id="notifDiv"
        style="z-index:10000; display: none; background: green; font-weight: 450; width: 350px; position: fixed; top: 80%; left: 5%; color: white; padding: 5px 20px">
    </div>
   
        @if(\Request::is('login'))  
              @else
              @include('inc.nav')
        @endif
 
    @yield('content')
    
    @if(\Request::is('login'))
        @else  
       @include('inc.footer')
    @endif

    @include('inc.scripts')
</body>
</html>