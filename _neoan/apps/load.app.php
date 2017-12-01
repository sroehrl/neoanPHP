<?php

/**
 * Created by PhpStorm.
 * User: Stefan
 * Date: 10/16/2015
 * Time: 9:19 PM
 */
class load {
    static function model($name){
        if(!file_exists(path . '/model/' . $name . '/'.$name. '.model.php')){
            var_dump('Warning! Model ' . $name . ' is required but does not exist');
            die();
        }
        require_once(path . '/model/index/index.model.php');
        require_once(path . '/model/' . $name . '/'.$name. '.model.php');
    }
    static function controller($controller){
        if(!file_exists(path . '/src/' . $controller . '/'.$controller. '.ctrl.php')){
            var_dump('Warning! controller ' . $controller . ' is required but does not exist');
            die();
        }
        require_once(ctrl($controller));

        return new $controller(false);
    }
}