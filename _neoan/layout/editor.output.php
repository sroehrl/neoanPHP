<?php

class editor
{
	function __construct()
	{
		$head = 
			'<script src="' . layout('ckeditor/ckeditor.js',true) . '"></script>' .
			'<script src="' . layout('ckeditor/styles.js',true) . '"></script>' .
			'<link rel="stylesheet" type="text/css" src="' .layout('ckeditor/ckeditor/skins/mooncolor/editor.css',true) . '" />';
		
		$this->include =  $head;
		$this->include_js1 = layout('ckeditor/ckeditor.js',true);
		$this->include_js2 = layout('ckeditor/styles.js',true);
		$this->head = '<link rel="stylesheet" type="text/css" src="' .layout('ckeditor/ckeditor/skins/mooncolor/editor.css',true) . '">';
		
	}
	function editor($name='editor1',$class=null,$content=null)
	{
		$textarea =
			'<textarea class="ckeditor ' . $class . '" id="' . $name . '" name="' . $name . '">' . $content . '</textarea>';
		return $textarea;	
	}
	
	
}	
?>