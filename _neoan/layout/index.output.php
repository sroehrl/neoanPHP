<?php
class layout
{
	function __construct($frame = '',$body='')
	{
		$this->html = '';
        $this->bodyStr = '';
		$this->startjs = '';
		$this->js = '';
		$this->frame ='';
		$this->starthead = '';
		$this->head = '';
        $this->scripts ='';
        $this->style = '';
        $this->imports = '';
		$this->hooks = [];
		$this->constants = [];
		if(!empty($frame)){
			include_once(path . '/frame/' . $frame . '/' . $frame . '.php');
			$this->hooks = $hooks;
			$this->constants = $constants;
		}

		$this->body($body);
		$this->frame = $frame;
		$this->endfooter();

	}
	function hook($hook,$view,$array=[]){
	    if(!isset($array['base'])){
	        $array['base'] = base;
        }
	    $this->hooks[$hook] = $this->view($view,$array);
        return $this;
    }
    function meta($what,$input,$ident ='name'){
        $i=0;
        $handle = $this->constants['meta'];
        $found = false;
        foreach($handle as $tag){
            if(isset($tag[$ident])&&$tag[$ident]==$what){
                $this->constants['meta'][$i] = [$ident=> $what,'content'=> $input];
                $found = true;
            }
            $i++;
        }
        if(!$found){
            $this->constants['meta'][] = [$ident=> $what,'content'=> $input];
        }
    }
    function title($title){
        $this->add2head('<title>' . $title . '</title>');
    }
	function starthead()
	{
		$this->starthead .= '<!DOCTYPE html><html style="height:100%;"><head class="neoan_head"><meta charset="utf-8"/>';
		// link
        if(!empty($this->constants['link'])){
            foreach($this->constants['link'] as $link){
                $this->add2head('<link rel="' . $link['rel'] .'" href="' . $link['href'].'">');
            }
        }
        //base
        if(!empty($this->constants['base'])){
            $this->add2head('<base href="' . $this->constants['base'].'">');
        }
		// stylesheets
		if(!empty($this->constants['stylesheet'])){
			foreach($this->constants['stylesheet'] as $style){
                $this->addStylesheet($style);
			}
		}
		// js
		if(!empty($this->constants['js'])){
			foreach($this->constants['js'] as $js){
				if(!isset($js['data'])){
					$this->include_js($js['src']);
				} else {
				    $cont = $this->get_contents(substr($js['src'],0,-3),'js',$js['data']);
                    $btr = explode(DIRECTORY_SEPARATOR,$js['src']);
					$this->startjs .= "\n/* include(" .end($btr) .') */' . $cont;
				}
			}
		}
		// favicon
		if(!empty($this->constants['favicon'])){
			foreach($this->constants['favicon'] as $favicon){
                $this->starthead .= '<' . $favicon['tag'];
				unset($favicon['tag']);
				foreach($favicon as $key => $val){
                    $this->starthead .= ' ' . $key . '="' . $val . '"';
				}
                $this->starthead .= '/>';
			}
		}
		// meta
		if(!empty($this->constants['meta'])){
			foreach($this->constants['meta'] as $meta){
                $this->starthead .= '<meta';
				foreach($meta as $key => $val){
                    $this->starthead .= ' ' . $key . '="' . $val . '"';
				}
                $this->starthead .= '/>';
			}
		}
	}
	function include_ngController($ctrl,$includes=[]){
        $this->js .= $this->get_contents(src($ctrl,'ctrl'),'js',$includes);
    }
    function addStylesheet($style){

        if(strpos($style,base)!==false){
            $file = file_get_contents($style);
            $this->style .= stringops::embrace($file,['base'=>base]);
        } else {
            $this->imports  .= ' @import url(' . $style . '); ';
        }

    }
	function add2head($string)
	{
		//load external func etc
		$this->head .= $string;
	}
	function body($body)
	{
		$this->bodyStr = '</head><body ng-app="neoan" ' . $body .'>';
	}
	function navbar($array, $class = null, $brand = null, $style = 'default')
	{
		$this->navcont = '';
		$this->bodyStr .=
			'<nav class="navbar navbar-' . $style . ' ' . ($class == null ? '' : $class) . '" role="navigation">
			  <div class="navbar-header">
			  	 <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-1">
			      <span class="sr-only">Navigation</span>
			      <span class="icon-bar"></span>
			      <span class="icon-bar"></span>
			      <span class="icon-bar"></span>
			    </button>
			    <a class="navbar-brand" href="http://' . $_SERVER['SERVER_NAME'] . '/' . base . '/">'. ($brand == null ? 'NEOAN' : $brand) . '</a>
			  </div>
			  <div class="collapse navbar-collapse" id="navbar-1">
			    <ul class="nav navbar-nav">';
			    foreach($array as $key => $value)
			    {
				    	
					    		
				    	if(!is_array($value) && strpos($value,'{') === false)
				    	{
				    		$this->bodyStr .= '<li id="menu_' . $key . '">' . a(ctrl($key,true),$value) . '</a></li>';
					    	
				    	}
				    	elseif(!is_array($value) && strpos($value,'{') !== false)
				    	{
				    		$clearedString = substr($value,1,-1);
				    		
				    		$this->navcont .=  $clearedString;	
				    	}
				    	else 
				    	{
				    		$this->bodyStr .= '<li id="menu_' . $key . '" class="dropdown">
				    			<a class="dropdown-toggle" id="dLabel" href="#" data-toggle="dropdown">' .
				    				$key . '<b class="caret"></b></a>
				    			<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">';
				    		foreach($value as $subkey => $subvalue)
				    		{
				    			if(is_array($subvalue))
				    				$this->subnav($subkey,$subvalue);
				    			else 
				    			{
					    			$this->bodyStr .=
					    				'<li id="submenu_' . $key . '">' .a(ctrl($subkey,true),$subvalue)  . '</a></li>';
				    			}
				    		}
				    		$this->bodyStr .= '</ul></li>';
				    	}
			    }
						    
			   
			    $this->js .= "$('.dropdown-toggle').dropdown();";
			   
			    if(isset($_GET['action']))
			    	$action = sub(0);
			    else 
			    	$action = '';
			    $this->bodyStr .=
			    '</ul>' . $this->navcont .
			  '</div>
			</nav>
			
			<script type="text/javascript">
			var class2 = "' . $class . '";
			$(document).ready(function(){
				$( "#menu_' . $action . '").addClass("active");
				if(class2 == "navbar-fixed-top")
				{
					$("body").attr("style","padding-top:50px");
					$(".navbar-collapse").attr("style","padding-left:10px; padding-right:10px;");
				}
				});
			</script>';	
	}
	function subnav($subkey,$subarray)
	{
		$this->bodyStr .='
			<li class="dropdown-submenu">
			    <a tabindex="-1" href="#">' . $subkey . '</a>
			    <ul class="dropdown-menu">';
		$i = 1;
		foreach($subarray as $key => $value)
		{
			if(!is_array($value))
				$this->bodyStr .= '<li id="submenu_' . $subkey . $i . '">' . a(ctrl($key,true),$value) . '</a></li>';
			else 
				$this->subnav($key,$value);
			$i++;
		}
		$this->bodyStr .= '
			    </ul>
		  </li>';
	}
	function endfooter()
	{
		$this->footer = '</body></html>';
	}
	function include_js($path)
	{
		/*
	    $clearpath = str_replace('/','-',substr($path,8));
        if(file_exists(neoan_path . '/js/cache/'.$clearpath)){
            $cont = file_get_contents(neoan_path . '/js/cache/'.$clearpath);
        } else {
            $cont = file_get_contents($path);
            file_put_contents(neoan_path . '/js/cache/'.$clearpath,$cont);
        }

        $this->scripts .= $cont;
		*/

        $this->scripts .= '<script type="text/javascript" src="' . $path . '"></script>';
	}
	function include_js_vars($array){
		foreach($array as $key => $val){
			$this->js .= 'var ' . $key . ' = ' . (stringops::isJSobj($val) ? $val : '"' . $val . '"') . ';';
		}

	}
	function load($include)
	{
		require_once($include . '.output.php');
	}
	function new_obj($include)
	{
		$this->load($include);
		$obj = new $include;
		return $obj; 	
	}
	function view($folder, $array=null){
		return $this->get_contents(substr(view($folder),0,-5),'html',$array);
	}
	function get_contents($path, $type = 'js', $array = null) {
		$buffer = file_get_contents($path . '.' . $type);
		return $this->useHTMLTemplate($buffer, $array);

	}
    function include_service($service){

        $this->js .= $this->get_contents(src($service,'service'),'js',['base'=>base]);
        $ctrl = '/src/' . $service . '/' . $service .'.ctrl.php';

        if(file_exists(path.$ctrl)){
            require_once(path.$ctrl);
            if(method_exists($service,'service_require')){
                $loop = $service::service_require();
                foreach ($loop as $try){
                    if(isset($try['function'])){
                        $this->$try['function']($try['value']);
                    }
                }
            }
        }
    }
	function include_directive($directive,$template=null){
	    if(empty($template)){
	        $template = $directive;
        }
	    $this->js .= $this->get_contents(src($directive,'directive'),'js',['templateUrl'=>template($template.'.directive'),'base'=>base]);

	    $sheet = '/src/' . $template . '/' . $template .'.directive.css';
	    $ctrl = '/src/' . $template . '/' . $template .'.ctrl.php';
	    if(file_exists(path.$sheet)){
            $this->addStylesheet(base . $sheet);
        }
        if(file_exists(path.$ctrl)){

	        require_once(path.$ctrl);
            if(method_exists($template,'directive_require')){

                $loop = $template::directive_require();

                foreach ($loop as $try){
                    if(isset($try['function'])){
                        $func = $try['function'];
                        $this->$func($try['value']);
                    }
                }
            }
        }
    }
	function useHTMLTemplate($tplContent, $params, $braceType = 'curlyBraces') {
		$text = $params;
		if(is_array($params)) {
			$tplContent = str_replace(
				array_map([$this,$braceType], array_keys($text)),
				array_map([$this,'checkNull'], array_values($text)),
				$tplContent);
		}
		return $tplContent;
	}

	function curlyBraces($input) {
		return '{{' . $input . '}}';
	}
    function tBraces($input) {
        return '<t>' . $input . '</t>';
    }
	function hardBraces($input){
	    return '[[' . $input . ']]';
    }
	static function checkNull($input) {
		if($input === null) {
			$input = 'NULL';
		}
		return $input;
	}
	function unify_css($exceptions=[]){

	    $handle = '<style>';
        foreach($this->constants['stylesheet'] as $url){
            if(!in_array($url,$exceptions)){
                $handle .= file_get_contents($url);
            }
        }
        $handle .= '</style>';
        $this->html .= $handle;
        $this->constants['stylesheet'] = $exceptions;
    }
    function unify_js(){
        $handle = [];
        foreach($this->constants['js'] as $src){
            if(!isset($src['data'])){
                $this->scripts .= '<script type="text/javascript">' . file_get_contents($src['src']) . '</script>';
            } else {
                $handle[] = $src;
            }
        }
        $this->constants['js'] = $handle;
    }
	function minify($string)
	{
		//return trim(preg_replace('/\s+/', ' ', $string));
        return $string;
	}
	function translate($language=false){
        $stack = t::translate($this->frame);

        if(isset($_SESSION['lang']) && !$language) {
            $language = $_SESSION['lang'];
        }elseif(!$language && !isset($_SESSION['lang'])){
            $language = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,5);
        }

        if(isset($stack[$language])){
            //$replace = preg_replace('/\\<t>(.*?)\\<\/t>/','{{$1}}',$this->html);
            $this->html = $this->useHTMLTemplate($this->html,$stack[$language],'tBraces');
            $this->js = $this->useHTMLTemplate($this->js,$stack[$language],'tBraces');

        }

        // strip remaining tags

        $tags = ['<t>','</t>'];
        $this->html = str_replace($tags,['',''],$this->html);
        $this->html .= '<translated by neoanPHP />';
        $this->js = str_replace($tags,'',$this->js);
        $this->js .= ' console.info("neoanPHP (http://neoan.us) translation ran prior rendering.");';

    }
    function mailoutput($return=false){
        if(!empty($this->frame)){
            $this->html .= $this->get_contents(path. '/frame/' . $this->frame . '/' . $this->frame , 'html', $this->hooks);
        }
        if($return){
            return $this->html;
        } else {
            echo $this->html;
        }

    }
    function compile($render=false,$obj=false){
        $output = '';
        $this->starthead();
        $output .= $this->starthead;
        $output .= $this->head;
        $output .= $this->bodyStr;
        if(!empty($this->frame)){
            $this->html .= $this->get_contents(path. '/frame/' . $this->frame . '/' . $this->frame , 'html', $this->hooks);
        }
        if($render){
            $functions = explode(',',$render);
            foreach($functions as $func){
                $this->$func($obj);
            }
        }
        $output .= $this->minify($this->html);
        $output .= '<style>' . $this->imports . '</style>';
        $output .= $this->scripts;
        $output .= '<script type="text/javascript">'.
            //$this->scripts. "\n".
            $this->minify($this->startjs) .
            $this->minify($this->js) . '</script>';
        $output .= '<style>'. $this->minify($this->style) . '</style>';
        $output .= $this->footer;
        return $output;
    }
    function stringOutput($render=false,$obj=false){

        return $this->compile($render=false,$obj=false);
    }
	function output($render=false,$obj=false)
	{
		echo $this->compile($render,$obj);
	}
}
