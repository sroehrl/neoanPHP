<?php
##################################################
#
#   SETUP
#
define('path', dirname(dirname(dirname(__FILE__))));
define('neoan_path', dirname(dirname(__FILE__)));
define('asset_path', dirname(dirname(dirname(__FILE__))).'/asset');

// catch all errors?
function exception_error_handler($errno, $errstr, $errfile, $errline ) {
    if (!(error_reporting() & $errfile)) {
        return;
    }
    throw new ErrorException($errstr, $errno, 0, $errfile, $errline);

}
set_error_handler("exception_error_handler");


//always executed by index.php
$protocol = ($_SERVER['SERVER_PORT']!='80'&&empty($_SERVER['HTTPS'])?':8080':'');
define('base', (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'? 'https':'http') . '://' . $_SERVER['SERVER_NAME'] . $protocol .  substr($_SERVER['PHP_SELF'],0,-9) );


$call = default_ctrl;


if (isset($_GET['action']) && trim($_GET['action']) != '') {
    $url_part = explode('/', $_GET['action']);
    $call = $url_part[0];

}


if(file_exists(path . '/src/' . $call . '/' . $call . '.ctrl.php')){
    require_once(path . '/src/' . $call . '/' . $call . '.ctrl.php');
} else {

    require_once(neoan_path .'/base/error_404.core.php');
    $call = 'error_404';
}

include_once(neoan_path . '/base/functions.php');

include_once(neoan_path . '/layout/index.output.php');



####################################################
#
# RUN CORE
#

/**

 * @property layout uni
 */
class unicore{
    /**
     * @param $frame
     * @param string $add
     */
    function uni($frame, $add=''){
        $this->uni = new layout($frame,$add);
        $track = debug_backtrace();

        $this->get_files($track[0]['file']);
    }
    function get_files($file){
        $folder = substr($file,0,strrpos($file,DIRECTORY_SEPARATOR));
        $files = scandir($folder);
        if(!empty($files)){
            foreach ($files as $include){
                $buffer ='';
                if($include!='.'&&$include!='..'&&!is_dir($folder . DIRECTORY_SEPARATOR . $include)){
                    $buffer = file_get_contents($folder . DIRECTORY_SEPARATOR . $include);
                }
                switch(substr($include,-8)){
                    case 'tyle.css':
                        $this->uni->addStylesheet(style(substr($include,0,-10),true));
                        break;
                    case '.ctrl.js':
                        $this->uni->js .= stringops::embrace($buffer,array('base'=>base));
                        break;
                }
            }
        }
    }
}

$run = new $call;
$run->init();

