<?php
/**
 * Created by PhpStorm.
 * User: sroehrl
 * Date: 11/28/2017
 * Time: 9:13 AM
 * @property layout uni
 */
ini_set('error_reporting', E_ALL );
ini_set('display_errors', true);
class install extends unicore{
    var  $dbcon;
    function init(){
        parent::uni('concr');
        $connection = $this->check_mysql();
        $db = $this->check_db();
        $this->uni->hook('main_hook','install',[
            'connection'=>(int)!$connection['error'],
            'database'=>(int)!$db['error'],
            'db_name'=>db_name
        ]);
        $this->uni->output();
    }
    function check_mysql(){
        try{
            $this->dbcon = mysqli_connect(db_host, db_user, db_password);
            return ['error'=>false];

        } catch (Exception $e){
            return ['error'=>true];
        }

    }
    function check_db(){
        try{
            $tables = mysqli_query($this->dbcon, 'SHOW tables FROM '.db_name);
            if($tables){
                return ['error'=>false];
            }
            return ['error'=>true];
        } catch (Exception $e){
            return ['error'=>true];
        }
    }
    function testUser(){
        $try = db::data('SHOW TABLES LIKE "user"')['data'];
        if(!empty($try)){
            return ['success'=>true];
        }
        return ['success'=>false];
    }
    function testApi(){
        return ['api'=>'connected'];
    }
    function createDB(){
        return db::query('CREATE DATABASE '.db_name);
    }

}