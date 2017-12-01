<?php
// deprecated class
class prepare {

	static function mysql($exclude = '') {
		$i = 0;		
		$post = '';		
		foreach($_POST as $key=> $value) {
			if($key != $exclude)
			{
				$post .= ($i == 0 ? '' : ',') . $key . ' = "' . mysql_real_escape_string($value) . '" ';
				$i++;
			} 			
		}
		return $post;	
	}
	static function post($exclude = '') {
		$post = array();
		foreach($_POST as $key=> $value) {
			if($key != $exclude) {
				$post[$key] = stripslashes($value);
			}
		}
		return $post;			
	}
	
}