<?php

/**
 * Created by PhpStorm.
 * User: Stefan
 * Date: 10/22/2016
 * Time: 3:49 PM
 */
class mobile {
    static function detect(){
        require_once(neoan_path . '/apps/plugins/Mobile-Detect/mobile_detect.php');
        return new Mobile_Detect;
    }
}