<?php

/**
 * Created by PhpStorm.
 * User: Stefan
 * Date: 9/1/2015
 * Time: 6:17 PM
 */
class stringops{
    static function serialize($any){
        return urlencode(base64_encode(json_encode($any)));
    }
    static function pin($length){
        $chars = "123456789";
        srand((double)microtime()*1000000);
        $i = 0;
        $pass = '';
        while($i < $length)
        {
            $num = rand(0,strlen($chars)-1);
            $tmp = substr($chars, $num, 1);
            $pass .= $tmp;
            $i++;
        }
        return $pass;
    }
    static function hash($length = 10, $special=false){
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        if($special){
            $chars .= ")(}{][";
        }
        srand((double)microtime()*1000000);
        $i = 0;
        $pass = 'N';
        while($i < $length)
        {
            $num = rand(0,strlen($chars)-1);
            $tmp = substr($chars, $num, 1);
            $pass .= $tmp;
            $i++;
        }
        return $pass;
    }
    static function encrypt($message, $key){
        $nonceSize = openssl_cipher_iv_length('aes-256-ctr');
        $nonce = openssl_random_pseudo_bytes($nonceSize);

        $ciphertext = openssl_encrypt(
            $message,
            'aes-256-ctr',
            $key,
            OPENSSL_RAW_DATA,
            $nonce
        );
        return base64_encode($nonce.$ciphertext);

    }
    static function decrypt($message, $key) {
        $message = base64_decode($message, true);
        if ($message === false) {
            throw new Exception('Encryption failure');
        }

        $nonceSize = openssl_cipher_iv_length('aes-256-ctr');
        $nonce = mb_substr($message, 0, $nonceSize, '8bit');
        $ciphertext = mb_substr($message, $nonceSize, null, '8bit');

        $plaintext = openssl_decrypt(
            $ciphertext,
            'aes-256-ctr',
            $key,
            OPENSSL_RAW_DATA,
            $nonce
        );

        return $plaintext;
    }
    static function base64url_to_base64($input=""){
        $padding = strlen($input) % 4;
        if ($padding > 0) {
            $input .= str_repeat("=", 4 - $padding);
        }
        return strtr($input, '-_', '+/');
    }
    static function extrude($array,$objArray){
        $return = array();
        foreach ($array as $key){
            if(isset($objArray[$key])){
                $return[$key] = $objArray[$key];
            }
        }
        return $return;
    }
    static function embrace($content,$array){
        return str_replace(array_map('self::curlyBraces', array_keys($array)), array_values($array), $content);
    }
    static function hardEmbrace($content,$array){
        return str_replace(array_map('self::hardBraces', array_keys($array)), array_values($array), $content);
    }
    static function tEmbrace($content,$array){
        return str_replace(array_map('self::tBraces', array_keys($array)), array_values($array), $content);
    }

    static function isJSobj($val){
        if(is_numeric($val)){
            return true;
        }
        if(substr($val,0,1) == '{' && substr($val,-1) == '}'){
            return true;
        }
        if(substr($val,0,1) == '[' && substr($val,-1) == ']'){
            return true;
        }
        return false;
    }

    private static function curlyBraces($input) {
        return '{{' . $input . '}}';
    }
    private static function hardBraces($input){
        return '[[' . $input .']]';
    }
    private static function tBraces($input) {
        return '<t>' . $input . '</t>';
    }
}