<?php

class navbar
{
    function __construct()
    {
        $user = '';
        if(isset($_SESSION['logged_id']))
        {
            $balance = db::data('SELECT SUM(amount) as amount FROM user_balance WHERE user_id = ' . $_SESSION['logged_id']);
            $user = 'Member area';
            $form = [
                'internal' => 'Dashboard',
                'internal.routes' => 'My routes',
                'internal.balance' => 'Your balance is ' . (!empty($balance['data'][0]['amount']) ? number_format($balance['data'][0]['amount'],2,'.',',') : 0) . ' $',
                'logout' => 'Logout'
            ];

        }
        else
        {
            $form = '{<form class="navbar-form navbar-right" method="post" action="' . ctrl(null,true) . '">
				<div class="form-group">
				  <input class="form-control" type="email" name="login" placeholder="email" class="span2">
                </div>
                <div class="form-group">
				  <input class="form-control" type="password" name="password" placeholder="password" class="span2">
                </div>
				  <input class="form-control" type="hidden" name="action" value="' . (isset($_GET['action']) && $_GET['action'] != '' ? $_GET['action'] : '') . '">
				<div class="form-group">
				  <button type="submit" class="btn">Login / Register</button>&nbsp;
				</div>
			</form>}';
        }
        $navarray = array(
            'home' => '<span class="glyphicon glyphicon-search"></span>Find routes',
            $user => $form
        );
        $this->navbar = $navarray;

    }

}