<?php 
/*
 * 		Name:	php_classes.php
 * 		Description: Php server side classes to interact with the serverside content
 */

class Connector { 
	
	public $host;
  public $db_name; 
  public $user;
  public $password; 
  private $con;

    function Connector($host_p,  $user_p, $password_p, $dbname_p) {
    	 $this->host = $host_p;
    	 $this->user = $user_p;
    	 $this->password = $password_p;	
    	 $this->db_name = $dbname_p;
    }

    public function Connect() {
		  $this->con=mysqli_connect($this->host,$this->user,$this->password,$this->db_name);
			// Check connection
			if (mysqli_connect_errno($this->con)) {
			 return false;
			}
			else {
				return true;
			}  
    }  // Connect ends here
    
    
    public function RunQuery($query,$option=null){

    	$link = mysql_connect($this->host, $this->user,$this->password);
    	if (!$link){
    	   return "Failed to connect to MySQL: " . mysql_error();		
    	}
    	else {
    		$output=array();
    		// make foo the current db
    		$db_selected = mysql_select_db($this->db_name, $link);
    		
    		if (!$db_selected) { 
          die ('Error in selecting : '.$this->db_name.': '.mysql_error()); 
        }

    		else {
				  $result = mysql_query($query) or die(mysql_error());
				
				  if ($option!=='insert') {
    				while($row=mysql_fetch_object($result)) {
						  array_push($output, $row);
    				}
    			 mysql_free_result($result);
				  }
				
				  else{
					 return $result;
				  }

    		} // else ends here
    		mysql_close($link);
    		return $output;
    	}  // else ends here
    	
    }  //RunQuery ends here
    
    public function Close(){
    	mysqli_close($this->con);
    	
    }  
  
}  // Connect ends here

?>