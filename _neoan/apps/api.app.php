<?php
ini_set('error_reporting',E_ALL ^E_NOTICE);
if(!defined('path')) {
    define('path', dirname(dirname(dirname(__FILE__))));
    define('neoan_path', dirname(dirname(__FILE__)));
}
if(!defined('base')){
    $protocol = ($_SERVER['SERVER_PORT']!='80'&&empty($_SERVER['HTTPS'])?':8080':'');

    define('base', (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'? 'https':'http') . '://' . $_SERVER['SERVER_NAME'] . $protocol .  substr($_SERVER['PHP_SELF'],0,-23) );
}

/*
 * You may allow cross origin, but be aware of the security implications
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
}
*/
$data = file_get_contents('php://input');
if(!empty($data)){
    $divide = json_decode($data, true);
    // secure here!!
    $post = $divide;
} elseif(!empty($_FILES)){
    $post = $_POST;
}
//override
if(!empty($_GET['c']) && !empty($_SESSION['logged_id'])){
    $post = $_GET;
}

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    header("Content-Type: application/json");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
} elseif(!empty($post) && $post != '' && isset($post['c']) && isset($post['f'])) {

    require_once(path.'/frame/' . $post['config'] . '/config.php');

    require_once(neoan_path.'/base/functions.php');
    class unicore{}
    require_once(path. '/src/' . $post['c'] . '/' . $post['c'] .  '.ctrl.php');

    $class = $post['c'];
    $c = new $class(false);

    $function = $post['f'];
    $obj = (isset($post['d'])?$post['d']:array());
    header('Content-type: application/json');
    if(!empty($obj)){
        echo json_encode($c->$function($obj));
    } else {
        echo json_encode($c->$function());
    }
    //api::flush();
    die();
}
class api {
    static function script() {
        return 'not implemented yet';
    }
    static function flush(){
        ob_flush();
        flush();
        ob_clean();
    }
    static function clean($obj){
        if(is_array($obj)){
            $return = array();
            foreach($obj as $key => $val){
                $return[$key] = addslashes(trim($val));
            }
            return $return;
        } else {
            return addslashes(trim($obj));
        }
    }
}