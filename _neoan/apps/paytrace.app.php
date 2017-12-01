<?php

/**
 * Created by PhpStorm.
 * User: neoan
 * Date: 11/28/2016
 * Time: 11:44 AM
 * @property layout uni
 */

class paytrace {
    // requires curl.app and formloader.app
    private static $_auth;
    private static $_token;
    static function auth(){
        if(!self::$_auth){
            $credentials = formloader::payment('payments');
            foreach($credentials as $credential){

                if($credential['provider'] == 'paytrace'){
                    $handle = $credential;
                    $handle['oauth_credential'] = stringops::decrypt($credential['oauth_credential'],formloaderKey);
                    self::$_auth = $handle;
                }
            }
        }

        if(!self::$_auth){
            return false;
        }

        $url = self::pUrl();
        $url .= '/oauth/token';
        $get = curl::call($url,[
            'grant_type'=>'password',
            'username'=>self::$_auth['oauth_user'],
            'password'=>self::$_auth['oauth_credential']
        ]);

        if(isset($get['access_token'])){
            self::$_token = $get['access_token'];
            return $get;
        } else {
            return $get;
        }
    }
    static function charge($user_id, $label_id, $amount, $invoice_id){
        self::start();
        $arg = [
            'amount'        => $amount,
            'customer_id'   => 'L-'. $label_id.  '-user_' . $user_id,
            'invoice_id'    => 'L-'. $label_id.  '-nb-' . $invoice_id
        ];
        $url = self::pUrl();
        return curl::call($url . '/v1/transactions/sale/by_customer',$arg,self::$_token);
    }
    static function update_customer($customer){
        $url = self::pUrl();
        return curl::call($url . '/v1/customer/update',$customer,self::$_token);
    }
    static function get_customer($user_id,$label_id){
        self::start();
        $customer = ['customer_id'=>'L-'. $label_id.  '-user_' . $user_id];
        $url = self::pUrl();
        return curl::call($url . '/v1/customer/export',$customer,self::$_token);
    }
    static function create_customer($user_id, $email, $label_id, $creditcard, $billing){
        self::start();

        $customer = [
            'customer_id' => 'L-'. $label_id.  '-user_' . $user_id,
            'credit_card' => [
                'number'=>$creditcard['number'],
                'expiration_month'=>$creditcard['expiration_month'],
                'expiration_year'=>$creditcard['expiration_year']
            ],
            'csc'=> $creditcard['csv'],
            'email'=> $email,
            'billing_address' => [
                'name' => $billing['name'],
                'street_address' => $billing['street'],
                'city' => $billing['city'],
                'state' => $billing['state'],
                'zip' => $billing['zip'],
                'country' => $billing['country']
            ]
        ];


        $url = self::pUrl();
        return curl::call($url . '/v1/customer/create',$customer,self::$_token);
    }
    private static function pUrl(){
        return 'https://api.paytrace.com';
    }
    private static function start(){
        if(!self::$_auth){
            self::auth();
        }
    }

}