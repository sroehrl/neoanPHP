<?php

/**
 * Created by PhpStorm.
 * User: Stefan
 * Date: 4/13/2017
 * Time: 8:29 PM
 * @property layout uni
 */
class push {
    static function send_notification($app_id, $appAuth, $headings, $contents, $url=false, $filter=false){
        $arguments = [
            'app_id'=>$app_id,
            'contents'=>$contents,
            'headings'=>$headings
        ];
        if($url){
            $arguments['url'] = $url;
        }
        if(!$filter){
            $arguments['included_segments'] = ['All'];
        } else {
            $arguments['filters'] = $filter;
        }
        ini_set('display_errors',1);
        ini_set('error_reporting',E_ALL);
        return curl::call('https://onesignal.com/api/v1/notifications/',$arguments,$appAuth,'Basic');

    }
    static function update_name($appId,$newName,$userAuth){
        return curl::put('https://onesignal.com/api/v1/apps/'.$appId,['name'=>$newName],$userAuth,'Basic');
    }
    static function get_notification($appId,$notification_id,$userAuth){
        return curl::get('https://onesignal.com/api/v1/notifications/'.$notification_id,['app_id'=>$appId],$userAuth,'Basic');
    }
    static function get_app($appId,$basic){
        return curl::get('https://onesignal.com/api/v1/apps/'.$appId,[],$basic,'Basic');
    }
    static function create_app($user_id,$name,$upload_id,$url){
        if(substr($url,-1)=='/'){
            $url = substr($url,0,-1);
        }
        $img = db::easy('upload.path',['id'=>$upload_id])[0]['path'];
        $params = [
            'name' => $name,
            'chrome_web_origin'=>$url,
            'chrome_web_default_notification_icon'=>base.'img/user_upload'.$img,
            'site_name'=>$name,
            'safari_site_origin'=>$url,
            'safari_icon_256_256'=>base.'img/user_upload'.$img
        ];
        $try = curl::call('https://onesignal.com/api/v1/apps',$params,onesignal_userauth,'Basic');
        if($try && isset($try['id'])){
            db::ask('user_notification',[
                'user_id'=>$user_id,
                'name'=>$name,
                'upload_id'=>$upload_id,
                'app_id'=>$try['id'],
                'basic_auth'=>$try['basic_auth_key']
            ]);

        }
        return $try;
    }
}