<?php

/**
 * Created by PhpStorm.
 * User: neoan
 * Date: 10/7/2016
 * Time: 4:43 PM
 */
class ftp
{
    static function init(){

        require_once(neoan_path .'/apps/plugins/FtpClient/FtpClient.php');
        require_once(neoan_path .'/apps/plugins/FtpClient/FtpException.php');
        require_once(neoan_path .'/apps/plugins/FtpClient/FtpWrapper.php');
        return new \FtpClient\FtpClient();

    }
    static function login($host,$username,$password,$port=21,$passive = true,$ssl=false){
        $ftp = self::init();
        $ftp->connect($host,$ssl,$port);

        try{
            $ftp->login($username, $password);
        } catch (FtpClient\FtpException $e){
            return false;
        }
        $ftp->pasv($passive);
        return $ftp;
    }

}