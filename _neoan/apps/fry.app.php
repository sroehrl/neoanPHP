<?php

/**
 * Created by PhpStorm.
 * User: Stefan
 * Date: 9/4/2015
 * Time: 3:23 PM
 */
class fry
{
    static function message($obj){
        db::ask('user_message', [
            'to_user_id' => $obj['to_user_id'],
            'from_user_id' => (isset($obj['from_user_id']) ? $obj['from_user_id'] : ''),
            'route_id' => (isset($obj['route_id']) ? $obj['route_id'] : ''),
            'message' => $obj['message']
        ]);
    }
}