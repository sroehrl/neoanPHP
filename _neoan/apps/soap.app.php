<?php
/**
 * Created by PhpStorm.
 * User: sroehrl
 * Date: 10/9/2017
 * Time: 9:31 AM
 */

class soap{
    private static $_client;
    static function connect(){
        if(!self::$_client) {
            self::$_client = new SoapClient(wsdl);
        }
    }
    static function call($function,$params){
        self::connect();
        self::$_client->__soapCall($function,$params);
    }
    static function salesForce(){
        require_once(path.'/_neoan/apps/plugins/salesforceToolkit/SforceEnterpriseClient.php');
        $connect = new SforceEnterpriseClient();
        //$connect->createConnection(path.'/_neoan/apps/plugins/salesforceToolkit/enterprise.wsdl.xml');
        $connect->createConnection(path.'/frame/omnishell/wsdl.xml');
        return $connect;
    }

}