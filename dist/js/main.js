!function(n,e){function t(n,e,t){function r(o){t==n.search&&o.id_db&&e.get("/util/runnerdata",{params:{id:o.id_db}}).success(function(e,o,a,u){t==n.search&&(c[s].loaded=!0,c[s].events=e,++s<i&&r(c[s]))})}var c=n.runnersList,i=c.length,s=0;r(c[s])}function r(){var n=window.location.href,e=n.split("/");return 4==e.length&&""!==e[3]?e[3].replace("%20"," "):"Mark Brandly"}var c=angular.module("runner",[]);c.controller("ctrl",["$scope","$http",function(n,e){n.search=r(),n.firstClick=function(){return function(){var e;e||(e=!0,n.search=""),console.log(e)}()},n.findRunners=function(r){"undefined"==typeof r&&(r=300);var c=n.search;setTimeout(function(){c==n.search&&(n.runnersList=[],e.get("http://www.athletic.net/api/v1/AutoComplete/search",{params:{q:c}}).success(function(r,i,s,o){var a=r.response.docs.filter(function(n){return"Athlete"==n.type});n.runnersList=a,t(n,e,c)}))},r)},n.changeUrl=function(){history.replaceState({},"","/"+n.search)},n.findRunners(0)}])}(window,document);