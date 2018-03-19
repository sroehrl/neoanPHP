<?php
/**
 * Created by PhpStorm.
 * User: Stefan
 * Date: 7/29/2016
 * Time: 12:56 AM
 */
class frame_translate{
    function translate(){
        // do something smart with db
        return [
            'de-DE'=>['Wide open'=>'Weit offen'],
            'en-US'=>['Wide open'=>'Wide open']
        ];
    }
    function single($key,$lang){
        $all = $this->translate();
        if(isset($all[$lang][$key])){
            return $all[$lang][$key];
        } else {
            return $key;
        }
    }
}
