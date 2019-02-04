angular.module('HEMS').controller('MainController', MainController);



function MainController($scope)

 {

     $scope.myInterval = 4000;
     $scope.slides =
      
   [

    {

      image: 'angular-app/main/a.jpg'

    },

    {

      image: 'angular-app/main/z.jpg'

    },

    {

      image: 'angular-app/main/d.jpg'

    }

  ];

 }