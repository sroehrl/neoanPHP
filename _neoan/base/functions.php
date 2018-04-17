<?php

####################################################
#
#  Global functions
#
##################################################

/**
 * @param $no
 * @return false or value
 */
function sub($no) {
    global $url_part;
    if(!empty($url_part[$no]))
        return $url_part[$no];
    else
        return false;
}
function a($link,$inner='',$add=null) {
    if($inner == '')
        $inner = $link;
    return '<a href="' . $link . '" ' . $add . '>' . $inner . '</a>';
}
function img($src,$alt = '',$additional ='') {
    if($alt == '') {
        $alt = explode('/',$src);
        $alt = explode('.',end($alt));
        $alt = $alt[0];
    }
    if(strpos($additional, 'id="') === false)
        $autoid = 'id= "' . $alt . '_img"';
    else
        $autoid = '';

    return '<img src="' . $src . '" alt="' . $alt . '" ' . $autoid . ' ' . $additional . ' />';
}
function app($app, $web=false) {
    if(!$web)
        return neoan_path . '/apps/' . $app. '.app.php';
    else
        return base . '/apps/' . $app . '.app.php';
}
function neoan($input = '', $web=false) {
    if(!$web)
        return neoan_path . '/' . $input;
    else
        return base . '_neoan/' . $input;
}
function asset($input = '', $web=false) {
    if(!$web)
        return asset_path . '/' . $input;
    else
        return base . 'asset/' . $input;
}
function layout($input = '', $web=false) {
    if(!$web)
        return neoan_path . '/layout/' . $input;
    else
        return base . '_neoan/layout/' . $input;
}
function css($input = '', $web=false) {
    if(!$web)
        return neoan_path . '/css/' . $input;
    else
        return base . '_neoan/css/' . $input;
}

function frame($input = '', $web=false){
    if(!$web)
        return path .'/frame/' . $input;
    else
        return base . 'frame/' . $input;
}
function src ($input, $type, $ending=false){
    return path .'/src/' . $input. '/' . $input . '.' . $type . ($ending ? '.' . $ending : '');
}

function ctrl($action = '', $web=false) {
    if(!$web)
        return path .'/src/' . $action. '/' . $action . '.ctrl.php';
    else
        return base . $action . '/';
}

function template($input){
    $src = explode('.',$input);
    return base  .'/src/' . $src[0]. '/' . $input .  '.html';
}
function style($input, $web=false){
    if(!$web)
        return path .'/src/' . $input . '/' . $input . '.style.css';
    else
        return base . '/src/' . $input . '/' . $input . '.style.css';
}
function view($input = '', $web=false){
    if(!$web)
        return path .'/src/' . $input. '/' . $input . '.view.html';
    else
        return base . '/src/' . $input . '/' . $input . '.view.html';
}

function redirect($where=base,$method='php',$get=false) {
    if($method == 'php')
        header('location: ' . ctrl($where,true) .($get?'?'.$get:'') );
    elseif($method == 'js') {
        return 'window.location = "' . ctrl($where,true) .($get?'?'.$get:'') . '";';
    }
}
function unicore($frame){
    return new layout($frame);
}

##################################################
#
#   PRELOADED APPS-Install
#

if(file_exists(neoan_path . '/base/applist.php') && sub(1) != 'NPHPinstall' && !isset($_GET['NPHPinstall'])) {
    require_once neoan_path . '/base/applist.php';

} else {
    if($files = opendir(neoan_path . '/apps/')) {
        $req_str = '';
        $exec_str = '';
        $expl = base64_decode('Ly8gQ0hBTkdFUyBNQURFIEhFUkUgV0lMTCBCRSBPVkVSV1JJVFRFTiEhIElGIFlPVSBXQU5UIFRPIElOU1RBTEwgQU4gQVBQLCBQTEVBU0UgRk9SQ0UgUkVXUklURSBXSVRIIEdFVC1wYXJhbSAiTlBIUGluc3RhbGwiIE9OIEFOWSBNQUlOIENPTlRST0xMRVIgUk9VVEU=');

        while(false !== ($app = readdir($files))) {

            if(strpos($app, '.app.php')) {
                $req_str .= "try { require_once('" . neoan_path . "/apps/" . $app . "');}" . ' catch(ErrorException $e){ echo "'.$app.' failed to load";}' . "\n\r";
                require_once(neoan_path . '/apps/' . $app);

                $class = substr($app,0,-8);
                $constructorTest = new $class;
                if(method_exists($constructorTest, '__construct')){
                    $exec_str .= "new " . $class . ";\n\r";
                }
            }
        }
        // include autoloader if present (composer)
        if(file_exists(neoan_path.'/apps/plugins/autoload.php')){
            $req_str .= "try { require_once('" . neoan_path.'/apps/plugins/autoload.php' . "');}" . ' catch(ErrorException $e){ echo "autoloader failed to load";}' . "\n\r";
        }
        file_put_contents(neoan_path . '/base/applist.php',"<?php\n\r" . $expl . "\n\r" . $req_str . $exec_str . "//FILE CREATED: " . date('m/d/Y H:i:s',time()));

    } else {
        var_dump('reading problem');
        die();
    }
}


