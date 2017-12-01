<?php
/**
* Created by UNICORE-Concr 05/23/2017
* controller example and quick guide
* @property layout uni
*/


class neoan extends unicore{
    // init-function to make this controller callable through URL-part
    // other url-parts following the component-part
    // can be accessed through the global function sub(number)
	function init(){
	    // initializing the unicore singleton ($this->uni) with (here static) frame
		parent::uni(sub(1)?sub(1):'concr');

        // set title-tag or exchange if exists
        $this->uni->title('Quick Guide');

		// load sibling component's directive-files
        // optional second parameter overwrites default template
        $this->uni->include_directive('aceEditor');

        // unicore templating
        // filling 'demo'-frame's placeholder 'main_hook' with view neoan
		$this->uni->hook('main_hook','neoan');
        // collecting output buffer and echoing it
        // optional prameter (string or array) triggers post-rendered unicore-functions (like 'translate')
		$this->uni->output();
	}
	// unsecured function for open API-calls
    // see JS-side
	function displayYourself(){
	    // collect relevant file-contents of this component
        $php = file_get_contents(__FILE__);
        $js = file_get_contents(path . '/src/neoan/neoan.ctrl.js');
        $html = file_get_contents(path . '/src/neoan/neoan.view.html');
        // return array (api-calls are always converted to json)
        return ['php'=>$php,'js'=>$js,'html'=>$html];
    }
}