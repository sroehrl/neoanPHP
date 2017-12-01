<?php
class html{
    function __construct() {
        $this->html = '';
        $this->js = '';
    }
    function pre($input, $additional = null) {
        $this->html.= '<pre>' . $input . '</pre>';
    }
    function func($name, $inner, $obj = null) {
        $this->js .= 'function ' . $name . '(' . (!empty($obj) ? implode(',',$obj) : '') . ') {';
        $this->js .= $inner . '};';
    }
    function jQuery($string, $func, $value = null) {
        $selector = substr($string,0,1);
        return '$("' . $string . '").' . $func . '();';

    }
    function serve($what = null) {
        $js = $this->js;
        $html = $this->html;
        //clear
        $this->js = '';
        $this->html = '';
        if($what == 'js') {
            return $js;
        }
        return $html;
    }
}