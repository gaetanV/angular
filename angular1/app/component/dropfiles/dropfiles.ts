angular.module('app.dropfiles').component('dropFiles',{
    template:`
        <form  method="POST" action="" name="form">
            {{files}} 
            <input ng-drop-file name="files"  type="file" ng-model="files"  multiple />
            <input ng-drop-file="{maxsize:72000,mimeTypes:['image/png']}" name="file"  type="file" ng-model="file"  />
            <div ng-show="form.$submitted || form.file.$touched">
                <span ng-show="form.file.$error.maxsize">maxSize</span>
                <span ng-show="form.file.$error.mimeTypes">mimeTypes</span>
            </div>
            <input type="submit"  value="Post" />
            {{file}}
        </form>
    `
});