<?php
    
##################################################
#
#		Base-SETUP
// What is the default core?
	// deprecated define('default_ctrl','eodiffuser');
// Using mod_rewrite? (you need to use the .htaccess-file)
	define('mod_rewrite','true'); // true or false
// Using headers on correct domain?
    define('fake_domain',false);
// Instance-Warning
	define('instance_warning','You\'ve got some interesting ideas! But know what you are doing before playing with the index-core!');

##################################################
#
#		Installation-SETUP

    $call = '';
    if(isset($_SERVER['HTTP_HOST'])){
        $call = $_SERVER['HTTP_HOST'];
    }
    if(isset($_GET['cron'])){
        $call = $_GET['cron'];
    }

    if(strpos($call,'fr8.xyz') !== false){
        define('live', true);
    } else {
        define('live', false);
    }


// Mailing
	
	//default-from
	define('mail_from','system@fr8.xyz');
	//default-subject
	define('mail_subject','test-mail');
	

	//Caching (if cache.app is used & index.core should execute caching)
	define('general_cache',false);
##############################################
#
#	Done?
//defines done?

//set to true if done
$is_setup = true;

##########################################
#                                        #
#       INCLUDE GLOBAL FUNCS             #
#                                        #
##########################################

require_once(path . '/base/functions.php');

##########################################
#                                        #
#       SETUP PROJECT                    #
#                                        #
##########################################

// Constants (Always loaded!! Use the layout::_construct for dynamic loading)
    $constants = [
        'js'            => [
            ['src' => layout('js/jquery-2.0.3.min.js',true)],
            ['src' => layout('js/bootstrap.js',true)],
            ['src' => layout('js/bootstrap.min.js',true)],
            ['src' => layout('js/angular.min.js',true)],
            ['src' => layout('js/ngStorage.min.js',true)],
            ['src' => layout('js/app.js'), 'data'=> ['api-point'=>api_point]],
            ['src' => layout('js/ngFileUpload.js'), 'data'=> []],
            ['src' => layout('js/filter.js'), 'data'=> []],
            ['src' => frame('main.js'), 'data' =>[]]
        ],
        'navbar'        => [],
        'stylesheet'    => [
            layout('css/bootstrap.min.css',true),
            layout('css/style.css',true),
            frame('main.css',true),
            layout('css/font-awesome.css',true)
        ],
        'favicon'       => [
            [
                'tag' => 'link',
                'sizes' => '32x32',
                'type' => 'image/png',
                'rel' => 'icon',
                'href' => layout('img/favicon/favicon-32x32.png',true)
            ]
        ],
        'meta'          => [
            [
                'name'      => 'viewport',
                'content'   => 'width=device-width, initial-scale=1.0'
            ],
            [
                'charset'   => 'utf-8'
            ],
            [
                'name'      => 'robots',
                'content'   => 'index,follow,noodp,noydir'
            ],
            [
                'name'      => 'title',
                'content'   => 'iBuy Aromatherapy Oils Wholesale, Scents, Selling Aromatherapy Products'
            ],
            [
                'name'      => 'keywords',
                'content'   => 'selling aromatherapy products, where to buy aromatherapy oils, aromatherapy oils wholesale, aromatherapy scents'
            ],
            [
                'name'      => 'description',
                'content'   => 'We are one of the best suppliers of aromatherapy oils, scents and also selling aromatherapy products. We have online store, where you can buy aromatherapy oils and scents.'
            ]
        ]
    ];
    define('constants',json_encode($constants));



