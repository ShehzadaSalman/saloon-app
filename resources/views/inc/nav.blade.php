<nav class="navbar navbar-expand  static-top">   
        <a class="_logo" href="{{ route('home') }}"><h1>ABNATION  <span>Saloon</span></h1></a>
            <ul class="navbar-nav ml-auto top_nav">     
                <li class="nav-item TM_icon dropdown no-arrow">
                    <a class="nav-link dropdown-toggle" href="#" id="Qlinks" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="{{ asset('public/assets/images/q-link-icon.svg') }}" alt=""/></a>
                
                    <div class="dropdown-menu dropdown-menu-right Qlinks" aria-labelledby="Qlinks">
                        <h4 class="notiF-title">Quick Actions</h4> 
                        <a href="#"><img src="{{ asset('public/assets/images/cr-report-new.svg') }}" alt=""> Add New CVR</a>
                        <a href="#"><img src="{{ asset('public/assets/images/add-report.svg') }}" alt=""> CVR List</a>
                  
                        <a href="#"><img src="{{ asset('public/assets/images/add-emp.svg') }}" alt=""> Employee List</a>
                        <a href="#"><img src=" {{ asset('public/assets/images/customer-list.svg') }}" alt=""> 
                        Customer List</a>    
                    </div>
                </li>
            
                
            <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="{{ asset('public/assets/images/profile-img.jpg') }}" class="user_log" alt=""/>
                <span class="uname">{{ Auth::user()->name }}</span>
                </a>

                <div class="dropdown-menu dropdown-menu-right"                 aria-labelledby="userDropdown">
                    <span class="dropdown-item usernamelab">Tayyab Ali</span>
                    <a class="dropdown-item" href="#"><i class="fa fa-user"> </i> Profile</a>
                    <a class="dropdown-item" href="#"><i class="fa fa-cogs"> </i> Settings</a>      
                    <a class="dropdown-item" href="{{ route('logout') }}"><i class="fa fa-power-off"> </i>Logout</a>
                 </div>  
              </li>
            </ul>
        </nav>