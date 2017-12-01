<?php

/**
 * Created by PhpStorm.
 * User: neoan
 * Date: 9/15/2016
 * Time: 3:20 PM
 */
class formloader
{
    static function api($FLc,$FLf,$obj=[]){
        $call = self::auth();
        $call .= '&FLc=' . $FLc .'&FLf=' . $FLf;
        if(!empty($obj)){
            foreach($obj as $key => $value){
                $call .= '&'.$key.'='.urlencode($value);
            }
        }
        return self::call($call);
    }
    static function payment($func,$obj=[]){
        return self::api('m::payment',$func,$obj);
    }
    static function texting($func,$obj=[]){
        return self::api('m::texting',$func,$obj);
    }
    static function shorten($func,$obj=[]){
        return self::api('m::gs',$func,$obj);
    }
    private static function call($call){
        $curl = curl_init('https://formloader.com/v1/');
        curl_setopt( $curl, CURLOPT_POST, 1);
        curl_setopt( $curl, CURLOPT_POSTFIELDS, $call);
        curl_setopt( $curl, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt( $curl, CURLOPT_HEADER, 0);

        $fp = fopen(path.'/errorlog.txt', 'w+');
        curl_setopt($curl, CURLOPT_VERBOSE, 1);
        curl_setopt($curl, CURLOPT_STDERR, $fp);
        curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1);
        $return = curl_exec ($curl);
        curl_close ($curl);
        $answer = json_decode($return,true);
        switch(json_last_error()) {
            case JSON_ERROR_NONE: return $answer; break;
            default: return ['error'=>'API-error','info'=>$return];
        }
    }
    private static function auth(){
        $string = 'FLkey=' . formloaderKey;
        $string .= '&FLlID=' . formloaderLabelID;
        return $string;
    }
}