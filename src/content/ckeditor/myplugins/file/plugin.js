
CKEDITOR.dialog.add( 'simpleLinkDialog', function( editor )
{
    
    //var scope = angular.element($('[ng-controller=myController]')).scope();
    
    //var scope = angular.element($('#selectorId')).scope();
   
      var   insertImage  = function (e) {
             var dialog = this;
                var img = editor.document.createElement( 'img' );
                 img.setAttribute( 'alt', dialog.getValueOf( 'general', 'alt' ) );
                 img.setAttribute( 'src', dialog.getValueOf( 'general', 'url' ) );
                editor.insertElement( img );
      }
  
    var   initDirective  = function (e) {
   
         var vm=this;
          var elem = this.getContentElement('general', 'html');
          var element= document.getElementById(elem.domId);
        
             var scope = angular.element(element).scope();
                  
               compile.$inject = ['$compile','$route','$controller'];
               
               function compile($compile,$route) {
                   
                           scope.module="/symphony/cms/web/app_dev.php/fr/admin/gallery/views/update";     //+ TO DO  list params
  
                           scope.ck=function(entity){
                              
                                    var url= scope.$root.asset+entity.webPath;
                                    var urlDom = vm.getContentElement('general', 'url');
                                    urlDom.setValue(url)
                      
                           };
                          $compile(element)(scope);
              }        
                scope.$apply( 
                         angular.element(document).injector().invoke(compile)
                  );


    };
            
	return {
		title : 'Gallery',
		onOk: insertImage ,
                                   onLoad: initDirective,
		contents :
		[
			{
				id : 'general',
				label : 'Settings',
				elements :
				[
				 	{
                                                                                                id : 'html',
                                                                                                type : 'html',
                                                                                                html : ' <ng-include src="module"></ng-include>'
                                                                                                        
                
                                                                                        },
                                                                                        {
                                                                                                type : 'text',
                                                                                                id : 'url',
                                                                                                label : 'URL',
                                                                                                validate : CKEDITOR.dialog.validate.notEmpty( 'URL is required' ),
                                                                                                required : true,
                                                                                                commit : function( data )
                                                                                                {
                                                                                                        data.url = this.getValue();
                                                                                                }
                                                                                        },
                                                                                          {
                                                                                                type : 'text',
                                                                                                id : 'alt',
                                                                                                label : 'ALT',
                                                                                                validate : CKEDITOR.dialog.validate.notEmpty( 'ALT is required' ),
                                                                                                required : true,
                                                                                                commit : function( data )
                                                                                                {
                                                                                                        data.alt = this.getValue();
                                                                                                }
                                                                                        }
                                                                                        
				]
			}
		]
	};
});

CKEDITOR.plugins.add( 'file',
{
    
	init: function( editor )
	{
                   
                                editor.ui.addButton( 'File',
                                {
                                        label: 'Insert a Link',
                                        command: 'simpleLinkDialog',
                                        icon: this.path + 'icon.png'
                                });
                                
                                editor.addCommand( 'simpleLinkDialog', new CKEDITOR.dialogCommand( 'simpleLinkDialog' ) );
	}
});
/*
CKEDITOR.on('dialogDefinition', function (ev) {
        // Take the dialog name and its definition from the event data.
        var dialogName = ev.data.name;
        var dialogDefinition = ev.data.definition;
        // Check if the definition is from the dialog we're
        // interested in (the 'image' dialog).
        if (dialogName == 'image') {
            // Get a reference to the 'Image Info' tab.
            var infoTab = dialogDefinition.getContents('info');
      
            // Remove unnecessary widgets/elements from the 'Image Info' tab.
           
            infoTab.add('simplebox');
        }
    });*/