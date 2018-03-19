<?php
include_once(frame('concr') . '/config.php');
$hooks = array(
    'header_hook' => stringops::embrace(file_get_contents(frame('concr') . '/header.html'),array('base'=>base)),
    'main_hook' => 'Empty',
    'footer_hook' => ''
    );
$constants = array(
    'favicon' => array(
        array(
            'tag' => 'link',
            'sizes' => '32x32',
            'type' => 'image/png',
            'rel' => 'icon',
            'href' => base .'/img/favicon/favicon-32x32.png'
        )
    ),
    'stylesheet' => array(
        base . '/_neoan/css/style.css',
        base . '/asset/md-color-picker/mdColorPicker.css',
        base . '/asset/mdPickers/mdPickers.min.css',
        base . '/frame/concr/concr.css',
        base . '/asset/angular-meditor/meditor.css',
        'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.3/angular-material.min.css',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic',
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
    ),
    'link'=>array(),
    'meta' => array(
        array('name' => 'viewport', 'content' => 'width=device-width, initial-scale=1.0')
    ),
    'js' => array(
        array('src' => 'https://code.jquery.com/jquery-3.2.1.min.js'),
        array('src' => 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js'),
        array('src' => 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-animate.min.js'),
        array('src' => 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-aria.min.js'),
        array('src' => 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-messages.min.js'),
        array('src' => 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-114/svg-assets-cache.js'),
        array('src' => 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js'),
        array('src' => 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.16.0/moment.min.js'),
        array('src' => 'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.3/angular-material.min.js'),
        array('src' => 'https://secure.aadcdn.microsoftonline-p.com/lib/1.0.17/js/adal.min.js'),
        array('src' => 'https://secure.aadcdn.microsoftonline-p.com/lib/1.0.17/js/adal-angular.min.js'),

        array('src' => path . '/_neoan/js/app.js', 'data' => array(
            'base'=>base,
            'api-point' => base .'/_neoan/apps/api.app.php',
            'config' => 'concr',
            'modules' => "ngAnimate','ngStorage','ngAria','ngMaterial','ngMessages', 'material.svgAssetsCache','neoan-meditor','ngDraggable','mdPickers','mdColorPicker','AdalAngular")),
        array('src' => 'https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.10/ngStorage.min.js'),
        array('src' => path .'/asset/md-color-picker/mdColorPicker.js', 'data'=>array()),
        array('src' => path .'/asset/mdPickers/mdPickers.min.js', 'data'=>array()),
        array('src' => path .'/asset/ngDraggable/ngDraggable.js', 'data'=>array()),
        array('src' => path .'/asset/angular-meditor/meditor.js', 'data'=>array(
            'templateUrl'=>base.'/asset/angular-meditor/neoan-toolbar.html')
        ),
        array('src' => frame('concr').'/concr.js', 'data' => array(
            'base' => base,
            'signedIn'=>(session::is_logged_in()?'yes':'no'))),
        array('src' => base .'/_neoan/js/filter.js', 'data' => array()),
        array('src' => base .'/_neoan/js/directives.js', 'data' => array())
    )
);