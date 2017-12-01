<?php
class t {
	
	static function init_stack($stack) {
		
		if(file_exists(path .'/apps/plugins/translate.'. $stack . '.php') && isset($_COOKIE['lang'])) {
			
			include_once(path .'/apps/plugins/translate.'. $stack . '.php');
			$class= $stack . '_translate';
				
				$sec_test = new $class;
				if(method_exists($sec_test,$_COOKIE['lang'])) {
					$t_array = new $class($_COOKIE['lang']);
					return $t_array->translation;
				}
				else
					return 'Language "' . $_COOKIE['lang'] . '" not found in translation-file';
			
		}
		else
		 return 'No translation file found or no Cookie/Session set';
			
	}
	static function trl($stack, $key, $behave = null) {

		/*
		$bahave optional (int / string): 
			0 / default: output original if no language is found
			1          : only show when translation exists
			lang_str   : do not show in any other language than lang_str
		*/
		
		if(is_string($behave)) {
			if($behave != $_COOKIE['lang'])
				return '';	
		}
		$text = self::init_stack($stack);
		if(is_array($text)) {
			if(array_key_exists($key, $text))
				return $text[$key];	
			else {
				if($behave == 1)
					return '';
				else
					return $key;
			}
					
		}
		else
			return '<!-- ' . $text . ' -->' . $key;
	}
	static function translate($frame){
        // first check for settings
	    if(file_exists(path.'/frame/'.$frame.'/translate.php')){
	        include_once(path.'/frame/'.$frame.'/translate.php');
	        $get = new frame_translate;
            return $get->translate();
        }
        return [];
    }
    static function single($frame,$key,$lang){
        // first check for settings
        if(file_exists(path.'/frame/'.$frame.'/translate.php')){
            include_once(path.'/frame/'.$frame.'/translate.php');
            $get = new frame_translate;
            return $get->single($key,$lang);
        }
        return $key .' - translate error';
    }

    /**
     * @param string $frame
     * @param array $keys
     * @param array $array
     * @param bool $language
     * @return array
     */
    static function array_translate($frame, $keys, $array, $language=false){
	    $stack = self::translate($frame);
	    if(!$language){
	        $language = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2);
        }
	    $loadedStack = (isset($stack[$language])?$stack[$language]:$stack['else']);
	    $return = [];
	    $i=0;
	    foreach ($array as $item){
	        $return[$i] = $item;
	        foreach ($keys as $key){
                $return[$i][$key] = (isset($loadedStack[$item[$key]])?$loadedStack[$item[$key]]:$item[$key]);
            }
	        $i++;
        }
        return $return;
    }
    static function write_translate_src_all(){
        $components = scandir(path.'/src');
        $string = '';
        foreach ($components as $component){
            if($component != '.' && $component != '..'){
                $src = scandir(path.'/src/'.$component);
                foreach ($src as $file){
                    if(strpos($file,'.html')!==false || strpos($file,'.js')){
                        $string .= file_get_contents(path.'/src/'.$component.'/'.$file);
                    }
                }
            }

        }
        preg_match_all("/<t>(.*?)<\/t>/", $string, $output_translate);
        foreach($output_translate[1] as $translate) {
            if(!isset($stack['else'][$translate])){
                db::data('INSERT INTO translate SET identifier = "' . db::escape($translate)  .'" ON DUPLICATE KEY UPDATE identifier = identifier');
            }
        }
    }
}