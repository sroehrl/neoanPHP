<?php
require_once(neoan_path . '/apps/plugins/fpdf/neoan.pdf.php');
class pdf {

	static function create() {
		$pdf = new neoan_pdf;
		return $pdf;	
	}
}