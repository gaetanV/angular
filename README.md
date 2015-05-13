# angular directive package

###ng-drag
directive/ngdrag.directive.js
```
/**
 * #CONSTRUCT
 * 
 *  ##DRAG
 *  @target dom 
 *  @syntax ng-drag {attribut}  
 *          - optional : namespace {string} 
 *          - optional : transport  {entiy|entities} 
 *          - optional : callback {function} on drop
 *                -Scope :Apply
 *  @exemple : [  ng-drag = "namespace: 'groupe1'  , transport='item' callback:'remove( item , $index  )'  " , ng-drag = ""  ]
 *          
 *  ##DROP
 *  @target dom 
 *  @syntax ng-drop {attribut}  
 *          - optional : namespace {string} 
 *          - optional : contraint {function}  contraint for callback
 *                -Require: return (true|false)
 *                -Scope :Inject
 *                      $drag {scope}
 *                      $transport {entity}
 *          - optional : callback {function} on drop
 *                -Scope :Inject
 *                      $drag {scope}
 *                      $transport {entity}
 *                -Scope :Apply
 *  @exemple : [  ng-drop = "namespace:'groupe1' ,  callback:'add( $transport , list  )' , contraint:'notChild($drag.item , list)' " , ng-drop = ""]
 *
 */
 
```

###children-repeat
directive/childrenRepeat.directive.js
```
/**
 * #CONSTRUCT
 * 
 *  @target dom 
 *  @syntax children-repeat {attribut}  
 *      Require: 
 *          repeat {string} 
 *          in {string} 
 *          track by {string}
 *  @exemple : [  children-repeat = "item in sample track by children" ]
 *
 *
  * ## DOM ( Child ) : Options 
 *  @syntax depth {attribut}  
 *      :depth {integer} | end {string} 
 *  @exemple : [ depth = "1" ,  depth = "end"   ]
*   If exist use this node else use first node
 *   
 *   ## DOM ( Child ) : Inject Variables
  *  @scope 
  *     \children-repeat\repeat {object} 
 *      $index {integer} 
 *      $depth {integer} 
 *      $collection {object} (object parent)
 *    @exemple : [  {{item.title}} , {{$index}} , {{$depth}}  , {{$parent.children}}  , {{$parent.title}}]
 *      
 * # RESULT 
 * 
 * ## DOM ( Child )
 * @class  depth{{ :depth | integer }}  
 * @exemple : class="depth1"
 *              
 *
 */
```
###finder-field
directive/finderField.directive.js
```
/**
 * #CONSTRUCT
 * 
 *  @target dom {select}
 *  @syntax  finder-field {attribut}  
 *      Option:  {integer} | 4
 *  @option  multiple {attribut} 
 *  @exemple : [   finder-field= "3" multiple ,  finder-field ]
 *
 */
```
###finder-field
directive/matchField.directive.js
```
/**
 * #CONSTRUCT
 * 
 *  @target dom {select}
 *  @syntax  match-field {attribut}  
 *      ng-model {entity}  reference
 *  @Require : ng-model {attribut}  
 *  @exemple : [    match-field= "user.pass" ]
 *   
* # RESULT 
 * 
 * ##  Form 
 * $validators.match {intger}
 * @exemple : [ form.passCtr.$error.match ]
 *
 */
```