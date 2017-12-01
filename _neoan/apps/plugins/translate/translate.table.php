<?php
class table_translate
{
	function __construct($lang = null)
	{
		//die(var_dump(method_exists($lang)));
		if(isset($lang) )//&& function_exists($lang))
		{
			$this->$lang();
			return $this->translation;
		}
				
	}
	function de()
	{
		
		$this->translation =  array(
			'Translate this' => 'Übersetze das',
			'In German please' => 'Auf Deutsch, bitte');	
	}
	function en()
	{
		
		$this->translation =  array(
			'Translate this' => 'Translate this',
			'In German please' => 'In German please');	
	}
	function ha()
	{
		
		$this->translation =  array(
			'Translate this' => 'Hatanau');	
	}
	
}