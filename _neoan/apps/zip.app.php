<?php
class zip {
	
	static function create($files = array(),$destination = null,$overwrite = false) {
		
		if(file_exists($destination) && !$overwrite)
			return false;
		
		$valid_files = array();
		if(is_array($files)) {
			foreach($files as $file) {
				if(file_exists($file)) 
				{
					$valid_files[] = $file;
				}
			}
		}
		if(!empty($valid_files)) {
			$zip = new ZipArchive();
			if($zip->open($destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
				return false;
			}
			foreach($valid_files as $file) {
			    $filename = explode('/',$file);
				$zip->addFile($file,end($filename));
			}
			$zip->close();
			return file_exists($destination);
		} else {
			return false;
		}

	}
}