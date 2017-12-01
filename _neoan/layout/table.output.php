<?php
class table
{
	function __construct($additional = null)
	{
		
	}	
	function cal_table($data = null, $month = null , $year = null, $weekdays = null)
	{
		if(empty($month))
			$month = date('m',time());
		if(empty($year))
			$year = date('Y',time());
		if(empty($weekdays))
			$weekdays = array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
		
		$calendar = '<table class="calendar">';	
		$calendar.= '<tr class="calendar-row"><td class="calendar-day-head">'.implode('</td><td class="calendar-day-head">',$weekdays).'</td></tr>';
		$running_day = date('w',mktime(0,0,0,$month,1,$year));
		$days_in_month = date('t',mktime(0,0,0,$month,1,$year));
		$days_in_this_week = 1;
		$day_counter = 0;
		$dates_array = array();
		$calendar.= '<tr class="calendar-row">';
		for($x = 0; $x < $running_day; $x++)
		{
			$calendar.= '<td class="calendar-day-np"> </td>';
			$days_in_this_week++;
		}
		for($list_day = 1; $list_day <= $days_in_month; $list_day++)
		{
			$calendar.= '<td class="calendar-day">';
			$calendar.= '<a href="#" class="cur_date" id="' . $month . '-' . $list_day . '-' . $year . '"><div class="day-number">'.$list_day.'</div></a>';
				// MAGIC HERE
				
				foreach($data as $entry)
				{
					if(in_array($month . '-' . $list_day . '-' . $year,$entry))
					{
						$calendar .= '<p>' . $entry['time'] . ':<br />&nbsp;' . $entry['desc'] . '</p>';	
					}
					else
						$calendar .= '<p></p>';
				}
				
				
			$calendar.= '</td>';
			if($running_day == 6)
			{
				$calendar.= '</tr>';
				if(($day_counter+1) != $days_in_month):
					$calendar.= '<tr class="calendar-row">';
				endif;
				$running_day = -1;
				$days_in_this_week = 0;
			}
			$days_in_this_week++; $running_day++; $day_counter++;
		}
		/* finish the rest of the days in the week */
		if($days_in_this_week < 8)
		{
			for($x = 1; $x <= (8 - $days_in_this_week); $x++)
			{
				$calendar.= '<td class="calendar-day-np"> </td>';
			}
		}
	
		$calendar.= '</tr>
			</table>
			';
		
		
		return $calendar;
		
	}
	function auto_tbl($data,$array)
	{
		$table = '<table class="table table-striped"><tbody><tr>';
		$cols = count($array)-1;
		foreach($array as $head => $any)
		{
			$table .= '<th>' . $head . '</th>';
		}
		
		$table .= '</tr>';
        if(empty($data)) {
            return $table . '</table>';
        }
		$data_one = $data[0];
		$new = array();
		foreach($data_one as $row => $any)
		{
			
                foreach($array as $content)
                {
                    
                    if(strpos($content,$row) !== false)
                    {  
                        
                        $replace = '{' . $row . '}';
                        $with = '\' . $in[\'' . $row . '\'] . \'';
                        $new[] = str_replace($replace, $with, $content);      
                        #die(print_r($replace . '/' . $with));
                    }
                
                
                }	
                
				
		}
        $i = 0;
        foreach($data as $in)
        {
              
            $table .= '<tr class="tr tr_' . $i . '">';
            $i++; 
            $c = 0;
            
                foreach($array as $key => $content)
                {   
								                     
	                    $content1 = explode('{',$content);
	                    $name = explode('}',$content1[1]);
                    
                    
                    if(strpos($content,$name[0]) !== false)
                    {   
                        
                        $replace = '{' . $name[0] . '}';
                        $with = $in[$name[0]];
                        $replaced_part =  str_replace($replace, $with, $content);
                        
                        if(!empty($content1[2]))
                        {
                        	
                        	$name = explode('}',$content1[2]);
                        	if(strpos($content,$name[0]) !== false)
                    			{
                    				$replace = '{' . $name[0] . '}';
		                        $with = $in[$name[0]];
		                        $replaced_part =  str_replace($replace, $with, $replaced_part);
                        	}		
                        }
                        
	                        $table .= '<td class="td td_' . $c . '">';
											$table .= $replaced_part . '</td>';
											$c++;
											$replaced_part = '';
										
                    }
                    
                    
                }
                
          
                
               
            
            $table .= '</tr>';   
            
        }
        $table .= '</tbody></table>';
		return $table;
	}
}
?>