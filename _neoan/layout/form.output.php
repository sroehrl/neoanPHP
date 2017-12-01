<?php
class form
{
	function __construct($additional = null)
	{
		$this->form = '<form action="#" role="form" method="post"' . $additional . '>';
        $this->bot = '';
	}	
	function create($array, $i = null)
	{
		if(empty($i))
			$i = 1;
		foreach($array as $key=>$value)
		{
			$this->form .= '<div class="form-group group' . $i .'">';
			if(!is_array($value))
			{
				switch($value) 
				{
					case 'text': 
						$this->form .= '<label class="label' . $i .'" for="' . $key . '">' . $key . '</label><input id="' . $key . '" class="input' . $i .' form-control" type="text" name="' . $key . '">'; break;
					case 'password':	
						$this->form .= '<label class="label' . $i .'" for="' . $key . '">' . $key . '</label><input id="' . $key . '" class="input' . $i .' form-control" type="password" name="' . $key . '">'; break;
					case 'checkbox':	
						$this->form .= '<label class="label' . $i .'" for="' . $key . '">' . $key . '</label><input id="' . $key . '" class="input' . $i .' form-control" type="checkbox" name="' . $key . '">'; break;
					case 'textarea':	
						$this->form .= '<label class="label' . $i .'" for="' . $key . '">' . $key . '</label><textarea id="' . $key . '" class="input' . $i .' form-control" rows="3" name="' . $key . '"></textarea>'; break;
					case 'radio':	
						$this->form .= '<label class="label' . $i .'" for="' . $key . '">' . $key . '</label><input id="' . $key . '" class="input' . $i .' form-control" type="radio" name="' . $key . '">'; break;
				}
			}
			else
			{
				$this->form .=	'<label class="label' . $i .'" for="' . $key . '">' . $key . '</label><select class="form-control" name="' . $key . '" id="' . $key . '">';
				$count = 1;
				foreach($value as $subvalue)
				{
					$this->form .= '<option class="option' . $i . '-' . $count . '" >' . $subvalue . '</option>';
					$count++;	
				}
				$this->form .= '</select>';
			}
			$this->form .= '</div>';
			$i++;
		}
	}
    function antibot()
    {
        $this->ranValue = mt_rand();
        $this->form .= '
            <div>
                <label class="label' . ($this->ranValue + 1) . '">Are you human?</label><input class="input' . ($this->ranValue + 1) . '" type="text" name="human" placeholder="are you human?">
                <label class="label' . ($this->ranValue + 2) . '">First Name</label><input class="input' . ($this->ranValue + 2) . '" type="text" name="first_name_since_yesterday" required="required" value="John" placeholder="are you human?">
                <label class="label' . ($this->ranValue + 3) . '">Last Name</label><input class="input' . ($this->ranValue + 3) . '" type="text" name="last_name_from_today" required="required" value="' . $this->ranValue . '" placeholder="are you human?">
                <div class="ver"></div>
            </div>';
        $this->bot .= 
            '<script type="text/javascript">
                $(".label' . ($this->ranValue + 1) .'").hide();
                $(".label' . ($this->ranValue + 2) .'").hide();
                $(".label' . ($this->ranValue + 3) .'").hide();
                $(".input' . ($this->ranValue + 1) .'").hide();
                $(".input' . ($this->ranValue + 2) .'").hide();
                $(".input' . ($this->ranValue + 3) .'").hide();
                $(".input' . ($this->ranValue + 2) .'").attr("value","JohnDoe");
                $(".ver").html("<label class=\"labelOkey \">Type \"not sure\":</label><input class=\"form-control human\" type=\"text\" name=\"verhuman\" placeholder=\"are you human?\">");';
        if(!isset($_POST['human']))
                $this->bot .= '$.cookie("humanize", "' . $this->ranValue . '");';
                
        $this->bot .= '        
            </script>
            <noscript>
                You need Javascript here!
            </noscript>';
    }
    function checkhuman()
    {
        if($_POST['human'] == '' && $_POST['first_name_since_yesterday'] == 'JohnDoe' && $_POST['last_name_from_today'] == $_COOKIE['humanize'] && $_POST['verhuman'] == 'not sure')
            return true;
        else
            return false;
    }
	function output($submitText,$js_onclick = null)
	{
		$this->form .= '<input class="btn btn-info" type="submit" value="' . $submitText . '" ' . (!empty($js_onclick)?'onclick="' . $js_onclick . '"' : '') . '>
		</form>';
        
        //rename labels
        $this->form .=
            '<script type="text/javascript">
                function rename_label(label,newlabel)
                {
                    $("."+label).html(newlabel);
                };
            </script>' . $this->bot;
		return $this->form;
	}
	
}
?>