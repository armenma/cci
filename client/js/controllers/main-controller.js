/**
 * Created by armen on 7/11/2017.
 */
angular
  .module('app')
  .controller('MainController', ['$scope', '$anchorScroll', '$location', 'coreFactory', '$state', "$timeout", "UserEmails", function($scope, $anchorScroll, $location, coreFactory, $state, $timeout, UserEmails)
  {
    $scope.MenuItemSelectedIndex = -1;
    $scope.SelectedLanguage = coreFactory.Language;

    $scope.Whitepaper = $scope.SelectedLanguage === "English" ? "English-whitepaper.pdf" : "Russian-whitepaper.pdf";
    $scope.Benefits = $scope.SelectedLanguage === "English" ? "English-profit.pdf" : "Russian-profit.pdf";
    $scope.SelectMenuItem = function (index)
    {
      $scope.MenuItemSelectedIndex = index ==  $scope.MenuItemSelectedIndex ? -1 : index;

      if(index === 3) $state.go('ico');
      if(index === 2) $state.go('whitepaper');
      if(index === 4) $state.go('crypto-currencies');
      if(index === 5) $state.go('profit');

    }

    $scope.AddEmail = function ()
    {
      UserEmails
        .create({'content': $scope.Email.text})
        .$promise
        .then(function() {
          $scope.Email.text = '';
        });
    }

    $scope.CloseMenu = function ()
    {
      $scope.MenuItemSelectedIndex = -1;
    }

    $scope.Email = {text:""}

    /*$scope.SendEmail = function () {
      window.open('mailto:armen.mardoyan@outlook.com?subject=subject&body=' + $scope.Email.text);
    }*/


    $scope.ChangeLanguage = function (value, event)
    {
      event.stopPropagation();
      //$scope.SelectedLanguage = value;
      coreFactory.SetLanguage(value);
      location.reload();
    }

    $scope.GoToTeam = function ()
    {
      $state.go("home");
      timeoutPromise =  $timeout(function(){$scope.GoToById("our-team")},200);
    }

    $scope.GoToById = function (id)
    {
      var newHash = id;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash(id);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    }

    $scope.Language = {
      availableLanguages: [
        {id: '1', name: 'English'},
        {id: '2', name: 'Russian'}
      ],
      selectedLanguage: {id: '1', name: 'English'}
    };

    var timeoutPromise;

    $scope.$on('go-home-ico', function (event) {
      $state.go("home");
     timeoutPromise =  $timeout(function(){$scope.GoToById("home-ico-box")},200);
    });

    $scope.$on('go-home-team', function (event) {
    $state.go("home");
    timeoutPromise =  $timeout(function(){$scope.GoToById("our-team")},200);
  });

    $scope.$on("$destroy", function() {
      if (timeoutPromise) {
        $timeout.cancel(timeoutPromise);
      }
    });
  }]);

