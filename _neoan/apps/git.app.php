<?php

/**
 * Created by PhpStorm.
 * User: sroehrl
 * Date: 5/31/2017
 * Time: 2:29 PM
 */
//use Cz\Git\GitRepository;
//require_once(neoan_path.'/apps/plugins/git-php-3.9.0/GitRepository.php');
//require_once(neoan_path.'/apps/plugins/git-php-3.9.0/IGit.php');
class git
{
    static function init($path){
        return new Cz\Git\GitRepository($path);
    }
}