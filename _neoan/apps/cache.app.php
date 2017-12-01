<?php
class cache {
	static function output($params = null, $cachetime = 18000) {
		
		$filename = self::mk_filename($params);
		
		if(file_exists($filename) && ((time()- $cachetime) < filemtime($filename)) && empty($_POST))
			exit(include($filename));
		else
            ob_start();
	}
	static function caching($params = null,$strict=false) {
		if(empty($_POST)) {
			$filename = self::mk_filename($params);
            
            if($strict && !is_writable($filename))
                echo '&nbsp;&nbsp;NEOAN-warning!  caching prevented: folder not writable (' . $filename . ') | The script-user "' . exec('whoami') . '" might not have the right to do this (FIX: chmod 777 or change of chown-settings)';
			if($cache = fopen($filename,'w') === false){

                echo 'cannot create file';
            }



            $neoantext = "<!-- DELIVERED AS CACHE-FILE by NEOAN-->\n\r<!-- by neoan.us -->\n\r";
			
			file_put_contents($filename,ob_get_contents() . $neoantext);
		}
		
        ob_end_flush();    
		ob_end_clean();	
	}
	static function mk_filename($params = null) {
		$filename = path .'/_neoan/apps/plugins/cache/';
		if(!empty($params)) {
			foreach($params as $key => $value) {
				$filename .= $key . '_' . preg_replace('/[^a-zA-Z_]/','',$value) . '-';
			}
		}
		isset($_GET['action']) ? $action = $_GET['action'] : $action = '_';
		
		$filename .= str_replace('/','_',$_SERVER['REQUEST_URI']) . '.' . $action . '.html';
		return $filename;
	}
	static function clear(){
        $filename = path .'/_neoan/apps/plugins/cache/';
        $files = glob($filename .'*');
        foreach($files as $file){
            if(is_file($file))
                unlink($file);
        }
    }
}