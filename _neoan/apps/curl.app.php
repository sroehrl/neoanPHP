<?php

/**
 * Created by PhpStorm.
 * User: neoan
 * Date: 11/17/2016
 * Time: 11:10 AM
 * @property layout uni
 */
class curl {
    static function call($url,$array, $auth = false, $authType = 'Bearer', $headerOverride=false){
        $call = '';
        foreach($array as $key => $value){
            if(!is_array($value)){
                $call .= $key.'='.urlencode($value) .'&';
            }

        }
        $curl = curl_init();
        if($auth&&!$headerOverride){
            $header = [
                'Authorization: '.$authType. ' '.$auth,
                'Content-Type: application/json'
            ];
            curl_setopt( $curl, CURLOPT_HTTPHEADER, $header);
            $call = json_encode($array);
        }
        if($headerOverride){
            curl_setopt( $curl, CURLOPT_HTTPHEADER, $headerOverride);
        }
        curl_setopt( $curl, CURLOPT_URL, $url);
        curl_setopt( $curl, CURLOPT_POST, 1);
        curl_setopt( $curl, CURLOPT_POSTFIELDS, $call);
        curl_setopt( $curl, CURLOPT_FOLLOWLOCATION, 1);
        //curl_setopt( $curl, CURLOPT_HEADER, 0);

        $fp = fopen(path.'/errorlog.txt', 'w+');
        curl_setopt($curl, CURLOPT_VERBOSE, 1);
        curl_setopt($curl, CURLOPT_STDERR, $fp);
        curl_setopt($curl, CURLOPT_HTTP200ALIASES, [400]);
        curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1);
        $return = curl_exec ($curl);
        curl_close ($curl);

        $answer = json_decode($return,true);
        switch(json_last_error()) {
            case JSON_ERROR_NONE: return $answer; break;
            default: return ['error'=>'API-error','info'=>$return]; break;
        }
    }
    static function put($url,$array, $auth = false, $authType = 'Bearer'){
        $call = json_encode($array);

        $curl = curl_init($url);
        $fp = fopen(path.'/errorlog.txt', 'w+');
        curl_setopt($curl, CURLOPT_VERBOSE, 1);
        curl_setopt($curl, CURLOPT_STDERR, $fp);
        curl_setopt($curl, CURLOPT_HTTP200ALIASES, [400]);
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
        //curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $header = [
            'Authorization: '.$authType. ' '.$auth,
            'Content-Type: application/json'
        ];
        curl_setopt( $curl, CURLOPT_HTTPHEADER, $header);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $call);
        $return = curl_exec ($curl);
        curl_close ($curl);
        $answer = json_decode($return,true);
        switch(json_last_error()) {
            case JSON_ERROR_NONE: return $answer; break;
            default: return ['error'=>'API-error','info'=>$return]; break;
        }

    }

    static function get($url,$array=[], $auth = false, $authType = 'Bearer'){
        if(!empty($array)){
            $url .='?';
            foreach($array as $key => $value){
                $url .= $key.'='.urlencode($value) .'&';
            }
        }
        $curl = curl_init();
        if($auth){
            $header = [
                'Authorization: '.$authType. ' '.$auth,
                'Content-Type: application/json'
            ];
            curl_setopt( $curl, CURLOPT_HTTPHEADER, $header);
        }
        curl_setopt( $curl, CURLOPT_URL, $url);

        curl_setopt( $curl, CURLOPT_FOLLOWLOCATION, 1);
        //curl_setopt( $curl, CURLOPT_HEADER, 0);

        $fp = fopen(path.'/errorlog.txt', 'w+');
        curl_setopt($curl, CURLOPT_VERBOSE, 1);
        curl_setopt($curl, CURLOPT_STDERR, $fp);
        curl_setopt($curl, CURLOPT_HTTP200ALIASES, [400]);
        curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1);
        $return = curl_exec ($curl);
        curl_close ($curl);
        $answer = json_decode($return,true);
        switch(json_last_error()) {
            case JSON_ERROR_NONE: return $answer; break;
            default: return ['error'=>'API-error','info'=>$return]; break;
        }
    }
}