!function(w,d){
  
  function loadAthleteData($scope,$http,localSearch){
    var athletes = $scope.runnersList;
    var length = athletes.length;
    var i = 0

    function getAthleteData(athlete){
      if(localSearch==$scope.search && athlete.id_db){
        $http.get('/util/runnerdata',{params:{id:athlete.id_db}})
          .success(function(data, status, headers, config){
            // console.log(i);
            if(localSearch==$scope.search){
              athletes[i].loaded = true;
              athletes[i].events = data
              if((++i)<length){          
                getAthleteData(athletes[i])
              }
            }
          })
      }
    }

    getAthleteData(athletes[i])
  }

  function getSearchFromUrl(){
    var url = window.location.href
    var splitUrl = url.split('/')
    if (splitUrl.length == 4 && splitUrl[3] !== '') return splitUrl[3].replace('%20',' ')
    return 'Mark Brandly'
    console.log(splitUrl)
  }


  var app = angular.module('runner',[]);
  app.controller('ctrl', function($scope,$http){
    // getSearchFromUrl()
    $scope.search = getSearchFromUrl()

    $scope.firstClick = function(){
      return function(){
        var clicked
        if(!clicked){
          clicked=true
          $scope.search = ''
        }
        console.log(clicked)
      }()
    }

    $scope.findRunners = function(wait){
      if(typeof wait == 'undefined') wait = 300
      var localSearch = $scope.search;
      setTimeout(function(){
        // console.log(localSearch, $scope.search)
        if(localSearch == $scope.search){
          $scope.runnersList = []
          $http.get('http://www.athletic.net/api/v1/AutoComplete/search',{params:{q:localSearch}})
            .success(function(data, status, headers, config){
              var athletes = data.response.docs.filter(function(obj){return obj.type == 'Athlete'});
              $scope.runnersList = athletes;
              loadAthleteData($scope,$http,localSearch)
            })
        }

      },wait)
    };

    $scope.changeUrl = function(){
      history.replaceState({},'','/'+$scope.search)
    }
    $scope.findRunners(0)
  });

}(window,document)