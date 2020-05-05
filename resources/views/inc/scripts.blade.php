@yield('javascript')
<script src="{{ asset('public/assets/js/jquery-3.3.1.slim.min.js') }}"></script>
<script src="{{ asset('public/assets/js/popper.min.js') }}"></script>
<script src="{{ asset('public/assets/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('public/assets/js/datatables.min.js') }}"></script>
<script src="{{ asset('public/assets/js/select2.min.js') }}"></script>
<script src="{{ asset('public/assets/js/jquery.form.min.js') }}"></script>
<script src="{{ asset('public/assets/js/bootstrap-datepicker.js') }}"></script> 
<script src="{{ asset('public/assets/js/dropify.min.js') }}"></script>
<script src="{{ asset('public/assets/js/form-file-upload-data.js') }}"></script>
<script src="{{ asset('public/assets/js/custom.js') }}"></script>
<script src="{{ asset('public/js/sales.js') }}"></script>
<script src="{{ asset('public/js/employees.js') }}"></script>
<script src="{{ asset('public/js/expenses.js') }}"></script>
<script src="{{ asset('public/js/customers.js') }}"></script>
<script src="{{ asset('public/js/services.js') }}"></script>


  <script>$(document).ready(function() {
    $('#example').DataTable();
  });

  $(document).ready(function () { 
    $('#pl-close, .overlay').on('click', function () {
    $('#product-cl-sec').removeClass('active');
    $('.overlay').removeClass('active');
    $('body').toggleClass('no-scroll')
  });

    $('#productlist01').on('click', function () {
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll')		
    }); 
});
	
    $('.form-control').on('focus blur', function (e) {
      $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
       
       
        $(".formselect").select2();
        $('.sd-type').select2({
          createTag: function (params) {
            var term = $.trim(params.term);

            if (term === '') {
              return null;
            }

            return {
              id: term,
              text: term,
              newTag: true // add additional parameters
            }
          }
        });
	
        $('#datepicker').datepicker({
            format: 'yyyy-mm-dd'
        });
</script>



