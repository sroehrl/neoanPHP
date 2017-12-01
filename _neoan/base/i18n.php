<?php
/**
 * Created by PhpStorm.
 * User: neoan
 * Date: 10/16/2015
 * Time: 11:47 AM
 */

// requires translate (t.app)
$data = file_get_contents('php://input');
if(!empty($data)){
    $converted = json_decode($data, true);
    $lang = false;
    if(isset($converted['language'])){
        $lang = $converted['language'];
    }
    require(dirname(dirname(__FILE__)).'/apps/t.app.php');
    echo json_encode(t::array_translate($converted['frame'],$converted['keys'],$converted['array'],$lang));
    exit();
}