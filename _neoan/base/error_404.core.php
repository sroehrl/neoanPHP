<?php
class error_404
{
	function init()
	{
        error_reporting(E_ALL ^E_NOTICE);
        ini_set('display_errors',1);
	    header("HTTP/1.0 404 Not Found");
		$this->out = new layout;
        $this->out->title('NOT FOUND');
		$this->action();
        $this->out->output();
	}
	function action()
	{
		$this->out->html .= '
			<h3>404 - Nothing can be found here</h3>
			<h5>Possible reasons:</h5>
			<p>Your mistake: wrong link, typo in your browser-bar etc.</p>
			<p>My mistake: not built yet, wrong link provided etc.</p>
			<p>ANYWAY: ' . a(base,'TAKE ME HOME') . '</p>';
	}
}