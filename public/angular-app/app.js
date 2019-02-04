angular.module('HEMS', ['ngRoute','ui.bootstrap','angular-jwt']).config(config).run(run);

 function config($routeProvider, $httpProvider)
 {

 	$httpProvider.interceptors.push('AuthInterceptor');

	 $routeProvider
	 .when('/',

	 {

    		 templateUrl:'angular-app/main/home.html',
    		 controller: MainController,
    		 access:{restricted:false}

	 })

	 .when('/Appliance',

     {      

         templateUrl:'angular-app/add_appliance/add.html',
    		 controller: AddController,
    		 controllerAs:'x',
    		 access:{restricted:true}

	 })

	.when('/DeleteAppliance',

     {      

         templateUrl:'angular-app/ApplianceList/DeleteAppliance.html',
    		 controller: ApplianceListController,
    		 controllerAs:'x',
    		 access:{restricted:true}


	 })

	.when('/signup',

     {      

         templateUrl:'angular-app/SignUp/signup.html',
    		 controller: SignupController,
    		 controllerAs:'x',
    		 access:{restricted:false}


	 })

	.when('/login',

     {      

         templateUrl:'',
    		 controller: LoginController,
    		 controllerAs:'x',


	 })

    .when('/forgetpassword',

     {      

         templateUrl:'angular-app/ForgetPassword/ForgetPassword.html',
          controller: ForgetPasswordController,
          controllerAs: 'x',
         access:{restricted:false}

     })

    .when('/HomeCons',

     {      

         templateUrl:'angular-app/Home_Consumption/EnergyConsumption.html',
         access:{restricted:true}


	 })

    .when('/Room1Cons',

     {      

         templateUrl:'angular-app/Room1Consumption/Room1Consumption.html',
         access:{restricted:true}

	 })

    .when('/Room2Cons',

     {      

         templateUrl:'angular-app/Room2Consumption/Room2Consumption.html',
         access:{restricted:true}

	 })

   .otherwise({

   	redirectTo:'/'

    });



 }


  function run($rootScope, $location, $window, AuthFactory)
  
  {

  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) 

  {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) 
    {
      event.preventDefault();
      $location.path('/');
    }

  
  });

}