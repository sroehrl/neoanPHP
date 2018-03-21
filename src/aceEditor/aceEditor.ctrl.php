<?php
/**
 * Created by PhpStorm.
 * User: sroehrl
 * Date: 11/9/2017
 * Time: 11:10 AM
 */

class aceEditor extends unicore {
    static function directive_require(){
        return [
            ['function'=>'include_js','value'=>'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/ace.js'],
            ['function'=>'include_js','value'=>'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/mode-php.js'],
            ['function'=>'include_js','value'=>'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/mode-html.js'],
            ['function'=>'include_js','value'=>'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/theme-ambiance.js'],
            ['function'=>'include_js','value'=>'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/mode-javascript.js'],
            ['function'=>'include_js','value'=>'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/mode-json.js'],
            ['function'=>'include_js','value'=>'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.1/ext-beautify.js'],
        ];

    }
}