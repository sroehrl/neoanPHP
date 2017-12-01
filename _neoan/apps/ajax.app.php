<?php
class ajax {
	static function script($class,$func, $data) {
		$js= '
		
		  $.ajax({
		    type: "POST",
		    data: {
		      e: "ajax"
		      c: "' . $class . '",
		      f: "' . $func . '",
		      cont: \'' . $data . '\'
		    },
		    url: "' . app('ajax', true) . '",
		    dataType: "script",
		    async: false,
		    success: function(data) {
		      result=data;
		    }
		  });    
		';
		return $js;	
	}
}

//work with ajax
if(isset($_REQUEST['c']) && isset($_REQUEST['f']) && isset($_REQUEST['e']) && $_REQUEST['e'] == 'ajax') {
	require_once('../core/config.php');
	require_once('../core/' . $_REQUEST['c'] . '.core.php');
	 
	$class= $_REQUEST['c'] . '_core';
	$c = new $class(false);
	$function = $_REQUEST['f'];
	$c->$function($_REQUEST['cont']);
}