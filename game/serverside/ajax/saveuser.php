<?php
/***************************************
 * 
 * 	Name: 			scores
 * 	Description: 	returns top 3 highscores
 * 
 * 
 ***************************************/

	require_once('../php_classes.php');
	
	$user = $_GET['user'];
	$mail = $_GET['mail'];
	$score = $_GET['score'];
	$time = time();
	$output = array('user'=>$user,'mail'=>$mail);
	
	$query = "INSERT INTO scores VALUES('',".$score.",'".$user."','".$mail."',".$time.")";  
	$connector = new Connector(__SERVER__,__USER__,__PASS__,__DBNAME__);
	$output =  $connector->RunQuery($query,'insert');
	
	echo json_encode($output);
 
?>
