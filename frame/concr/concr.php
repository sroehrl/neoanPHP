<?php
include_once(frame('concr') . '/config.php');
$hooks = [
    'header_hook' => stringops::embrace(file_get_contents(frame('concr') . '/header.html'),['base'=>base]),
    'main_hook' => 'Empty',
    'footer_hook' => ''
];
$constants = [
    'favicon' => [
        [
            'tag' => 'link',
            'sizes' => '32x32',
            'type' => 'image/png',
            'rel' => 'icon',
            'href' => base .'/img/favicon/favicon-32x32.png'
        ]
    ],
    'stylesheet' => [
        base . '/_neoan/css/style.css',
        base . '/asset/md-color-picker/mdColorPicker.css',
        base . '/asset/mdPickers/mdPickers.min.css',
        base . '/frame/concr/concr.css',
        base . '/asset/angular-meditor/meditor.css',
        'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.3/angular-material.min.css',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic',
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
    ],
    'link'=>[],
    'meta' => [
        ['name' => 'viewport', 'content' => 'width=device-width, initial-scale=1.0']
    ],
    'js' => [
        ['src' => 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js'],
        ['src' => 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-animate.min.js'],
        ['src' => 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-aria.min.js'],
        ['src' => 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-messages.min.js'],
        ['src' => 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-114/svg-assets-cache.js'],
        ['src' => 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js'],
        ['src' => 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.16.0/moment.min.js'],
        ['src' => 'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.3/angular-material.min.js'],

        ['src' => path . '/_neoan/js/app.js', 'data' => [
            'base'=>base,
            'api-point' => base .'/_neoan/apps/api.app.php',
            'config' => 'concr',
            'modules' => "ngAnimate','ngStorage','ngAria','ngMaterial','ngMessages', 'material.svgAssetsCache','neoan-meditor','ngDraggable','mdPickers','mdColorPicker"]],
        ['src' => 'https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.10/ngStorage.min.js'],
        ['src' => path .'/asset/md-color-picker/mdColorPicker.js', 'data'=>[]],
        ['src' => path .'/asset/mdPickers/mdPickers.min.js', 'data'=>[]],
        ['src' => path .'/asset/ngDraggable/ngDraggable.js', 'data'=>[]],
        ['src' => path .'/asset/angular-meditor/meditor.js', 'data'=>[
            'templateUrl'=>base.'/asset/angular-meditor/neoan-toolbar.html']
        ],
        ['src' => frame('concr').'/concr.js', 'data' => [
            'base' => base,
            'signedIn'=>(session::is_logged_in()?'yes':'no')]],
        ['src' => base .'/_neoan/js/filter.js', 'data' => []],
        ['src' => base .'/_neoan/js/directives.js', 'data' => []]
    ]
];