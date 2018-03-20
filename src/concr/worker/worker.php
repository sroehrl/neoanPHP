<?php
/**
 * Created by PhpStorm.
 * User: sroehrl
 * Date: 3/19/2018
 * Time: 4:15 PM
 * @property layout uni
 */

class worker {
    static function scanner($path){
        $inDir = array_filter(scandir($path), function($item) {
            return $item[0] !== '.';
        });
        return $inDir;
    }
    static function findVersion($path){
        if(file_exists($path.'/version.json')){
            $get = json_decode(file_get_contents($path.'/version.json'),true);
            return $get;
        }
        return false;
    }

    static function recursiveCopy($source,$destination){

        $dir = scandir($source);

        @mkdir($destination);
        foreach($dir as $file ) {

            if (( $file != '.' ) && ( $file != '..' )) {
                if ( is_dir($source . DIRECTORY_SEPARATOR . $file) ) {
                    self::recursiveCopy($source . DIRECTORY_SEPARATOR . $file,$destination . DIRECTORY_SEPARATOR . $file);
                }
                else {
                    copy($source . DIRECTORY_SEPARATOR . $file,$destination . DIRECTORY_SEPARATOR .$file);
                }
            }
        }
    }

}