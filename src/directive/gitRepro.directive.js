(function () {
    'use strict';

    angular
            .module('app')
            .directive('gitRepro', GitRepro);

    GitRepro.$inject = ["$compile","$http"];
    function GitRepro($compile,$http) {
          return {
            transclude: true,
            compile: compile,
        
        };
        function compile($element, $attrs, transclude) {
           
           
              return {
                 pre: preLink
            }
        
          function preLink(){
                var optionRepro = parseDomJson($attrs.gitRepro);
                var urlsGit="https://api.github.com/repos/"+optionRepro.user+"/"+optionRepro.repositories+"/git/trees/"+optionRepro.branch+"?recursive=1"
            
               $http.get(urlsGit).then(successListCallback, errorCallback);
               function successListCallback(response){
                     
                 for(var file in response.data.tree){
                      
                           if(response.data.tree[file].path==optionRepro.path){
                          
                               
                               $http.get(response.data.tree[file].url).then(successFileCallback, errorCallback);
                               return;
                           }
                   }
                     console.log("no match path");
               }
                function successFileCallback(response){
                    var str=atob(response.data.content);
                  var pre=document.createElement("PRE")
                   pre.innerHTML=str;
                   pre.className="language-javascript"
                    $element.append(pre);
   
                     Prism.highlightElement(pre);
          
                }
              
               function errorCallback(e){
                   console.log("wrong url");
               }
            }
         }
        }
 /**
     * @parm $domjson {String}
     * @return {object}
    */
    function parseDomJson($domjson) {
        var options = {};
        var tmp, arr, regex;
        tmp = $domjson.replace(/^({)(.*)(})$/, '$2');
        regex = /(.+?)[:]{1}\s*['"]+\s*(.+?)\s*['"]+\s*([,]{1}|$)/g
        var arr;
        while ((arr = regex.exec(tmp)) !== null) {
            options[arr[1].trim()] = arr[2].trim()
        }

        return options;

    }
})();
