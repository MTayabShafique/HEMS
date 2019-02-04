 angular.module('HEMS').controller('ForgetPasswordController', ForgetPasswordController);
 
 function ForgetPasswordController( $http)

{


   var x = this;

   x.show_pass=function()

   {


       var changepass={

        email: x.email,
        password: x.password
      };
      
      if(x.password == x.passwordRepeat)
      {
      
        $http.post('api/update_pass', changepass).then(function(res) {
            if (res.data.nModified) 

            {
              
              alert("Password is changed!")
              window.location = '#/';
             
            } 

            else 

            {
              
              alert("Email not found!");

            }

          });
      }

      else

      {
         alert("Please make sure the passwords match."); 
      }


      }

};




