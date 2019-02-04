angular.module('HEMS').controller('SignupController', SignupController);

function SignupController($http) 
{

  var x = this;

  x.register = function() 

  {
    var user = {

      username: x.username,
      password: x.password,
      email:x.email

    };

    if (!x.username || !x.password||!x.email) 

    {

      x.error = 'Please add a Username, email and a Password.';

    } 

    else 

    {

      if (x.password !== x.passwordRepeat) 

      {

          x.error = 'Please make sure the passwords match.';

      } 

      else 

      {

        $http.post('/api/user/signup', user).then(function(result) 

        {

          console.log(result);
          x.message = 'Successful Registration, please Login.';
          x.error = '';
        }).catch(function(error) 

        {

          console.log(error);

        });

      }

    }

  }
  
};
