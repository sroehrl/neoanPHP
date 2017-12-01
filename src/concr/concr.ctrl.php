<?php

/**
 * Created by PhpStorm.
 * User: Stefan
 * Date: 7/27/2016
 * Time: 12:05 AM
 * @property layout uni
 *
 * WARNING: Concr is by NO MEANS a good example of utilizing neoanPHP
 * It is written to fit into one component and therefore HEAVILY violates code-separation!
 */

class concr extends unicore
{
    function init()
    {

        ini_set('error_reporting','E_ALL');
        ini_set('display_errors',true);
        parent::uni('concr','layout="column"');
        /*
        I recommend uncommenting this in production
        session::admin_restricted();

        */
        $arr = [
          'mysql'=>true,
            'name'=>'test',
          'tables'=>[
              [
                  'name'=>'test',
                  'primary'=>'id',
                  'fields'=>[
                      ['name'=>'id','type'=>'int'],
                      ['name'=>'insert_date','type'=>'timestamp'],
                      ['name'=>'delete_date','type'=>'datetime'],
                  ]
              ],[
                  'name'=>'test_email',
                  'primary'=>'id',
                  'fields'=>[
                      ['name'=>'id','type'=>'int'],
                      ['name'=>'test_id','type'=>'int'],
                      ['name'=>'insert_date','type'=>'timestamp'],
                      ['name'=>'delete_date','type'=>'datetime'],
                  ]
              ]

          ]
        ];
        //$this->createModel($arr);
        //exit();
        $this->uni->include_js_vars(['structure'=>json_encode($this->getStructure()),'api_point'=>'{{base}}_neoan/apps/api.app.php']);
        $this->uni->hook('main_hook','concr');
        $this->uni->output();

    }
    private function getStructure(){
        require_once(path.'/src/concr/frames.php');
        return $frames;
    }

    function getFrames(){
        $frames = scandir(path .'/frame');
        $return =[];
        $version = '';

        foreach($frames as $frame){
            if(file_exists(path.'/frame/'.$frame.'/version.json')){
                $get = json_decode(file_get_contents(path.'/frame/'.$frame.'/version.json'),true);
                if(isset($get['version'])){
                    $version = $get['version'];
                }
            }
            if($frame !='.'&&$frame!='..'){
                array_push($return,['name'=>$frame,'version'=>$version]);
            }
        }
        return $return;
    }
    function getLocal(){
        $models = scandir(path.'/model');
        $comps = scandir(path.'/src');
        $return = ['component'=>[],'directive'=>[],'frame'=>[],'service'=>[],'model'=>[],'hybrid'=>[]];
        foreach($comps as $comp){

            if(file_exists(path.'/src/'.$comp.'/version.json')){
                $get = json_decode(file_get_contents(path.'/src/'.$comp.'/version.json'),true);
                array_push($return[$get['type']],$get);

            }

        }
        foreach($models as $model){
            if(file_exists(path.'/model/'.$model.'/version.json')){
                $get = json_decode(file_get_contents(path.'/model/'.$model.'/version.json'),true);
                array_push($return[$get['type']],$get);

            }

        }
        return $return;
    }
    private function write($path,$string){
        file_put_contents($path,$string);
        chmod($path, fileperms($path) | 16);
    }

    function installModel($obj){
        $sql = file_get_contents(path.'/model/'.explode('_',$obj['name'])[0].'/install.sql');
        db::multi_query($sql);
        return ['done'=>true];
    }

    function siblings($obj){
        $host = dirname(path);
        $structure = scandir($host.$obj['path']);
        $folders = [];
        $i=0;
        foreach($structure as $entity){
            if(strpos($entity,'.') === false){
                $folders[$i]['type'] = 'folder';
                $deep = scandir($host.$obj['path'].'/'.$entity);
                foreach($deep as $inType){
                    if($inType == 'version.json'){
                        $file = file_get_contents($host.$obj['path'].'/'.$entity.'/version.json');
                        $version = json_decode($file,true);
                        $folders[$i]['version'] = $version['version'];
                        $folders[$i]['type'] = $version['type'];
                    }
                }
                $folders[$i]['name'] = $entity;
            }
            $i++;
        }
        return $folders;
    }
    private function mySqlTypes($type){
        switch($type){
            case 'int': $answer = ' int(11) '; break;
            case 'datetime': $answer = ' datetime DEFAULT NULL'; break;
            case 'timestamp': $answer = ' timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP '; break;
            default: $answer = ' varchar(255) '; break;
        }
        return $answer;
    }
    function createModel($obj){
        $path = path.'/model/'.$obj['name'];
        if(!$this->saveGuard($obj['name'],'model','model')){
            return ['error'=>'Service exists!'];
        }
        if(!$this->versioning($path,'model',$obj['name'])){
            return ['error'=>'version!'];
        }
        $str = "<?php\n/**\n* Created by UNICORE-Concr " . date('m/d/Y') . "\n* */\n";
        $str .= "class " . $obj['name'] ."_model extends index_model{\n";
        $str .= "\t".'static function data($id){'."\n";
        if($obj['mysql']){
            $str .= "\t\t".'$answer = false;'."\n";
            $str .= "\t\t".'$q = db::easy(\''.$obj['name'].'*\',[\'id\'=>$id]);'."\n";
            $str .= "\t\t".'if(!empty($q)){'."\n";
            $str .= "\t\t\t".'$answer = $q[0];'."\n";
            $mysql = '';
            foreach ($obj['tables'] as $table){
                if($table['name'] != $obj['name']){
                    $str .= "\t\t\t" .'$answer[\''.$table['name'] . '\'] = parent::undeleted(\'user\',\''.$table['name'] . '\',$id);'."\n";
                }

                $mysql .= 'CREATE TABLE IF NOT EXISTS `' . $table['name'] ."` ( \n";
                foreach ($table['fields'] as $field){
                    $mysql .= '`'.$field['name'] . '` ' . $this->mySqlTypes($field['type']) . ($field['name']==$table['primary']?'NOT NULL AUTO_INCREMENT':'') . ','."\n";
                }
                $mysql .= 'PRIMARY KEY (`'.$table['primary'].'`)'."\n";
                $mysql .= ') ENGINE=MyISAM DEFAULT CHARSET=utf8;'."\n";
            }
            $mysql .= 'COMMIT;';
            $str .= "\t\t".'}'."\n";
        }
        $str .= "\t\t".'return $answer;'."\n";
        $str .= "\t}\n";
        $str .= "}";
        $this->write(path.'/model/'.$obj['name'].'/'.$obj['name'].'.model.php',$str);
        if(isset($mysql)){
            $this->write(path.'/model/'.$obj['name'].'/install.sql',$mysql);
            $this->installModel($obj);
        }
        if(isset($obj['service'])&&$obj['service']){
            $this->createService($obj);
        }
        return ['error'=>false];

    }
    function createService($obj){
        $path = path.'/src/'.$obj['name'];
        if(!$this->saveGuard($obj['name'],'service')){
            return ['error'=>'Service exists!'];
        }
        if(!$this->versioning($path,'model',$obj['name'])){
            return ['error'=>'version!'];
        }
        $includes = $this->includes('$q, com');
        $str = "/**\n* Created by UNICORE-Concr " . date('m/d/Y') . "\n*/\n";
        $str .= "app.factory('" . $obj['name'] ."',[".$includes['parenthesis']."function(";
        $str .= $includes['bare'];
        $str .="){\n\treturn{\n\t\t".$obj['name']."s:[],\n";
        $str .= "\t\tget:function(".$obj['name']."_id){\n";
        $str .= "\t\t\t".'var self=this, exists = false;'."\n";
        $str .= "\t\t\t".'return $q(function(resolve,reject){'."\n";
        $str .= "\t\t\t\t".'angular.forEach(self.'.$obj['name'].'s,function(item){'."\n";
        $str .= "\t\t\t\t\t".'if(item.id==='.$obj['name'].'_id){'."\n";
        $str .= "\t\t\t\t\t\t".'exists = item;'."\n";
        $str .= "\t\t\t\t\t".'}'."\n";
        $str .= "\t\t\t\t".'});'."\n";
        $str .= "\t\t\t\t".'if(!exists){'."\n";
        $str .= "\t\t\t\t\tcom('".$obj['name']."::get',{id:".$obj['name']."_id})\n";
        $str .= "\t\t\t\t\t.success(function (data) {\n";
        $str .= "\t\t\t\t\t\tself.".$obj['name']."s.push(data);\n";
        $str .= "\t\t\t\t\t\tresolve(data)\n";
        $str .= "\t\t\t\t\t}).error(function (){\n";
        $str .= "\t\t\t\t\t\treject({error:'not found'})\n";
        $str .= "\t\t\t\t\t})\n";
        $str .= "\t\t\t\t".'} else {'."\n";
        $str .= "\t\t\t\t\t".'resolve(exists)'."\n";
        $str .= "\t\t\t\t".'}'."\n";
        $str .= "\t\t\t".'})'."\n";
        $str .= "\t\t}\n";
        $str .= "\t}\n";
        $str .= "}]);";
        $this->write($path.'/'.$obj['name'].'.service.js',$str);
        $this->serviceGetCtrl($obj['name']);
        return ['error'=>false];
    }
    function serviceGetCtrl($modelName){
        $str = "\t".'function get($obj){'."\n";
        $str .= "\t\t".'load::model(\''.$modelName.'\');'."\n";
        $str .= "\t\t".'return '.$modelName.'_model::data($obj[\'id\']);'."\n";
        $str .= "\t".'}'."\n";
        if(file_exists(path . '/src/' . $modelName . '/'.$modelName. '.ctrl.php')){
            $instance = load::controller($modelName);
            if(method_exists($instance,'get')){
                return false;
            }
            $ctrl = file_get_contents(path . '/src/' . $modelName . '/'.$modelName. '.ctrl.php');

            $str = substr($ctrl,0,-1).$str."\n}";
        } else {
            $ctrl = "<?php\n/**\n* Created by UNICORE-Concr " . date('m/d/Y') . "\n* @property layout uni\n*/\n";
            $ctrl .= "class " . $modelName ." extends unicore{\n";
            $ctrl .= $str;
            $ctrl .= "}";
            $str = $ctrl;
        }
        $this->write(path.'/src/'.$modelName.'/'.$modelName.'.ctrl.php',$str);
        return true;

    }

    function createDirective($obj){
        $path = path.'/src/'.$obj['name'];
        if(!$this->saveGuard($obj['name'],'directive')){
            return ['error'=>'Directive exists!'];
        }
        if(!$this->versioning($path,'directive',$obj['name'])){
            return ['error'=>'version!'];
        }

        $includes = $this->includes($obj['ctrl']?$obj['injection']:[]);
        $str = "/**\n* Created by UNICORE-Concr " . date('m/d/Y') . "\n*/\n";
        $str .= "app.directive('" . $obj['name'] ."',[".$includes['parenthesis']."function(";
        $str .= $includes['bare'];
        $str .="){\n\treturn{\n\t\trestrict:'".$obj['restrict']."',\n";
        $str .= "\t\ttemplateUrl:'{{templateUrl}}',\n";
        $str .= "\t\tlink:function(scope,ele,attr){\n\n";
        $str .= "\t\t}\n";
        $str .= "\t}\n";
        $str .= "}]);";

        $this->write($path.'/'.$obj['name'].'.directive.js',$str);
        $this->write($path.'/'.$obj['name'].'.directive.html','<div></div>');
        return true;
    }
    function createFrame($obj){
        if(file_exists(path.'/frame/'.$obj['name'])){
            return ['error'=>'Component exists!'];
        }
        $this->mkDir('/frame/'.$obj['name']);
        // write html
        $frame = $this->getStructure()[$obj['frame']];
        $this->write(path.'/frame/'.$obj['name'].'/'.$obj['name'].'.html',$frame['content']);
        //write css
        $this->write(path.'/frame/'.$obj['name'].'/'.$obj['name'].'.css','.main{}');
        // js
        $this->ngCtrl($obj['name'],['$scope','$rootScope'],'frame');
        //constants
        $this->constants($obj,$frame['hooks']);
        //config
        $this->config($obj);
        // translate
        if(isset($obj['translate'])&& $obj['translate']){
            $this->translate($obj['name']);
        }
        $this->write(path.'/frame/'.$obj['name'].'/version.json',$this->version($obj['name'],'frame'));
        return $obj;
    }
    function createElement($obj){
        $path = path.'/src/'.$obj['name'];

        if(file_exists($path.'/'.$obj['name'].'.ctrl.php')){
            return ['error'=>'Component exists!'];
        }
        $this->mkDir('/src/'.$obj['name']);
        if(!$this->versioning($path,'component',$obj['name'])){
            return ['error'=>'version!'];
        }
        $ownService = false;
        if(isset($obj['ctrl'])&&$obj['ctrl']){
            $ownService = $this->ngCtrl($obj['name'],$obj['include']);

        }
        if(isset($obj['style'])&&$obj['style']){
            $this->write(path.'/src/'.$obj['name'].'/'.$obj['name'].'.style.css','.'.$obj['name'].'{}');
        }
        if(isset($obj['view'])&&$obj['view']){
            $this->view($obj['name'],(isset($obj['ctrl'])&&$obj['ctrl']?true:false));
        }
        $this->ctrl($obj,$ownService);
        return ['error'=>false,'location'=>'../'.$obj['name'].'/'];
    }
    private function translate($name){
        $str = "<?php\n/**\n* Created by UNICORE-Concr " . date('m/d/Y') . "\n* \n*/\n";
        $str .= "class frame_translate{\n";
        $str .= "\tfunction translate(){\n\t\treturn ['en-US'=>['new Component'=>'new localized component'],'de-DE'=>['new Component'=>'Neues Modul'];\n\t}\n";
        $str .= "\tfunction single(".'$key,$lang'."){\n\t\t".'return $this->translate()[$lang][$key]'.";\n\t}\n";
        $str .= "}";
        $this->write(path.'/frame/'.$name.'/translate.php',$str);
    }
    private function config($array){
        $str = "<?php\n/**\n* Created by UNICORE-Concr " . date('m/d/Y') . "\n* \n*/\n";
        $str .= "define('db_host','" . $array['db_host'] . "');\n";
        $str .= "define('db_name','" . $array['db_name'] . "');\n";
        $str .= "define('db_user','" . $array['db_user'] . "');\n";
        $str .= "define('db_password','" . $array['db_password'] . "');\n";

        if($array['smtp']){
            $str .= "define('mail_from','" . $array['mail_from'] . "');\n";
            $str .= "define('mail_from_name','" . $array['mail_from_name'] . "');\n";
            $str .= "define('mail_subject','" . $array['mail_subject'] . "');\n";
            $str .= "define('mail_smtp_host','" . $array['mail_smtp_host'] . "');\n";
            $str .= "define('mail_smtp_user','" . $array['mail_smtp_user'] . "');\n";
            $str .= "define('mail_smtp_pw','" . $array['mail_smtp_pw'] . "');\n";
        }
        $this->write(path.'/frame/'.$array['name'].'/config.php',$str);
    }
    private function constants($array,$hooks){
        $str = "<?php\n/**\n* Created by UNICORE-Concr " . date('m/d/Y') . "\n* \n*/\n";
        $str .= "include_once(frame('" . $array['name']."').'/config.php');\n";
        $str .= '$hooks'." =['base'=>base";
        foreach($hooks as $hook){
            $str .= ",\n'" . $hook ."'=>''";
        }
        $str .= "];\n";
        $load = "'blank'";
        define('handle_base',"'.base.'");
        $constantsArray = [
            'favicon' => [
                [
                    'tag' => 'link',
                    'sizes' => '32x32',
                    'type' => 'image/png',
                    'rel' => 'icon',
                    'href' => 'http://neoan.us/img/favicon/favicon-32x32.png'
                ]
            ],
            'stylesheet' => [
                handle_base . '_neoan/css/style.css',
                handle_base . 'frame/'. $array['name'] . '/' . $array['name'] .'.css'
            ],
            'meta' => [
                [
                    'name' => 'viewport',
                    'content' => 'width=device-width, initial-scale=1.0'
                ]
            ],
            'js' => [
                ['src' => 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js'],

            ]
        ];

        if(strlen(trim($array['modules']))>2){
            $load = '';
            $modules = explode(',',$array['modules']);
            $i = 0;
            foreach($modules as $module){
                switch(trim($module)){
                    case 'ngAnimate':
                        $constantsArray['js'][] = ['src' => 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-animate.min.js'];
                        break;
                    case 'ngStorage':
                        $constantsArray['js'][] = ['src' => 'https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.10/ngStorage.min.js'];
                        break;
                    case 'ngAria':
                        $constantsArray['js'][] = ['src' => 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-aria.min.js'];
                        break;
                    case 'ngMessages':
                        $constantsArray['js'][] = ['src' => 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular-messages.min.js'];
                        break;
                    case 'ngMaterial':
                        $constantsArray['stylesheet'][] = 'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.3/angular-material.min.css';
                        $constantsArray['stylesheet'][] = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic';
                        $constantsArray['js'][] = ['src' => 'https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0-rc2/angular-material.min.js'];
                        break;
                }
                $load .= ($i>0?',':'') . "'".trim($module)."'";
                    $i++;
            }
        }
        $constantsArray['js'][] = ['src' => handle_base . '_neoan/js/app.js', 'data' => ['api-point' => stringops::embrace($array['api_point'],['base'=>handle_base]), 'config'=>$array['name'], 'modules'=>'"'. substr($load,1,-1).'"']];
        $constantsArray['js'][] = ['src' => handle_base . 'frame/'. $array['name'] . '/' . $array['name'] .'.js', 'data' => ['base'=>'base']];



        $str .= "\n".'$constants = ';

        $str .= $this->prep_array($constantsArray);
        $str .= ";";
        $this->write(path.'/frame/'.$array['name'].'/'.$array['name'].'.php', $str);

    }
    private function prep_array($array){
        $return = "[";
        $i = 0;
        foreach ($array as $key => $value){
            $return .= ($i>0?',':''). (!is_int($key)?"'" . $key . "'=>":'');
            if(is_array($value)){
                $return .= $this->prep_array($value);
            } else {
                $return .= ($key!=='modules'? "'":'') . $value .($key!=='modules'? "'":'');
            }
            $i++;

        }
        $return .= "]";
        return $return;
    }
    private function view($name, $hasController=false){
        if($hasController){
            $str = '<div ng-controller="' . $name .'Ctrl">';
        } else {
            $str = '<div>';
        }
        $str .= "\n\t".'{{variable}}'."\n</div>";
        $this->write(path.'/src/'.$name.'/'.$name.'.view.html',$str);
    }
    private function ctrl($data,$serviceIncludes=false){
        $t ='';
        if(file_exists(path.'/frame/'.$data['frame'].'/translate.php')){
            $t = "'translate'";
        }
        $str = "<?php\n/**\n* Created by UNICORE-Concr " . date('m/d/Y') . "\n* @property layout uni\n*/\n";
        $str .= "class " . $data['name'] ." extends unicore{\n";
        $str .= "\tfunction init(){\n\t\t" .'parent::uni(\''.$data['frame'] ."');\n";
        if(isset($data['view'])&&$data['view']){
            $newC = "'new Component'";
            if($t!=''){
                $newC = 't::single(\''.$data['frame'].'\',\'new Component\',\'en-US\')';
            }
            $str .= "\t\t" .'$this->uni->hook(\'main_hook\',\'' . $data['name'] . "',['variable'=>$newC]);\n";
        }

        if(isset($data['includeDirectives'])&&$data['directives']){
            $directives = explode(',',$data['includeDirectives']);
            foreach ($directives as $directive){
                $str .= "\t\t" .'$this->uni->include_directive(\'' . trim($directive) .'\')'.";\n";
            }
        }
        if($serviceIncludes && is_array($serviceIncludes)){
            foreach ($serviceIncludes as $serviceInclude){
                if(file_exists(path.'/src/'.$serviceInclude.'/'.$serviceInclude.'.service.js')){
                    $str .= "\t\t" .'$this->uni->include_service(\'' . trim($serviceInclude) .'\')'.";\n";
                }
            }
        }

        $str .= "\t\t" .'$this->uni->output(' . $t .');' ."\n";
        $str .= "\t}\n";

        $str .= "\n}";

        $this->write(path.'/src/'.$data['name'].'/'.$data['name'].'.ctrl.php',$str);
    }
    private function ngCtrl($name,$includes,$where='src'){

        $str = "/**\n* Created by UNICORE-Concr " . date('m/d/Y') . "\n*/\n";
        $str .= "app.controller('" . ($where=='src'?$name:'frame') ."Ctrl',[";
        $includeArr = $this->includes($includes);

        $inner = '';
        foreach($includeArr['array'] as $include){
            switch($include){
                case '$localStorage': $inner .= "\n\t".'$scope.$storage = $localStorage;';
                break;
            }
        }
        $str .= $includeArr['parenthesis'];
        $str .= "function(" . $includeArr['bare'] . "){\n".$inner."\n}]);";

        $this->write(path.'/'.$where.'/'.$name.'/'.$name.($where=='src'?'.ctrl.js':'.js'),$str);
        return $includeArr['array'];

    }
    private function saveGuard($name,$type='ctrl',$parent='src'){
        switch($type){
            case 'view': $end = '.html'; break;
            case 'service':
            case 'directive': $end = '.js'; break;
            default:  $end = '.php'; break;
        }
        if(file_exists(path.'/'.$parent.'/'.$name)){
            if(file_exists(path.'/'.$parent.'/'.$name.'/'.$name.'.'.$type.$end)){
                return false;
            }
        } else {
            $this->mkDir('/'.$parent.'/'.$name);
        }
        return true;
    }
    private function includes($includeStr){
        $includes = explode(',',$includeStr);
        $return = [
            'parenthesis' => '',
            'bare' => '',
            'array' => []
        ];
        $i = 0;
        foreach($includes as $include){
            $trimmed = trim($include);
            $return['parenthesis'] .= "'" . $trimmed . "', ";
            $return['bare'] .= ($i>0?",":''). $trimmed;
            array_push($return['array'],$trimmed);
            $i++;
        }
        return $return;
    }
    function pull($obj){
        session::api_restricted();
        // does exist locally?
        // compare versions
        // copy

    }
    private function version($name,$type){
        return json_encode(['name'=>$name,'type'=>$type,'version'=>'0.0.0']);
    }
    private function versioning($path,$type,$name){
        if(file_exists($path.'/version.json')){
            $version = json_decode(file_get_contents($path.'/version.json'),true);
            if($version['type']=='type'){
                return false;
            } elseif ($version['type']=='hybrid'){
                $exists = false;
                foreach ($version['as'] as $as){
                    if($as==$type){
                        $exists = true;
                    }
                }
                if($exists){
                    return false;
                }
                array_push($version['as'],$type);
                $version['version'] = '0.0.0';
            } else {
                $version['as'] = [$type,$version['type']];
                $version['type'] = 'hybrid';

            }
            $this->write($path.'/version.json',json_encode($version));
            return true;
        }
        $this->write($path.'/version.json',$this->version($name,$type));
        return true;

    }
    private function mkDir($path){
        mkdir(path.$path,0775);
        chgrp(path.$path,'bitnami');
    }

}