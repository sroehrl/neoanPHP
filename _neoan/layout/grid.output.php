<?php

class grid {
    function __construct() {
        $this->row = 0;
        $this->grid_nr = 0;
        $this->spanlen = 0;
        $this->rowhtml = '';
        $this->grid_html = '';
        $this->grids = '';
    }

    function add_grid($spanlen, $content = null, $last = false) {
        $this->spanlen = $this->spanlen + $spanlen;
        $this->rowhtml .= '<div class="grid col-md-' . $spanlen . ' span_nr_' . $this->grid_nr . '">' . $content . '</div>';
        $this->grid_nr++;
        if ($this->spanlen > 11 OR $last == true) {

            $this->grid_nr = 0;
            $this->grid_html .= $row = $this->row();

        }


    }

    function row() {

        $row = '<div class="row row_nr_' . $this->row . '">' . $this->rowhtml . '</div>';
        $this->row++;
        $this->rowhtml = '';
        $this->spanlen = 0;
        $this->grids .= $row;
        return $row;

    }

    function output() {
        return $this->grid_html;
    }

}