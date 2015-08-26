<?php
/***************************************
 * 
 * 	Name: 			  Scores
 * 	Description: 	Returns top 3 highscores
 * 
 * 
 ***************************************/
 	
	require_once('../php_classes.php');
	require_once('../config.php');
	
	$query = "SELECT s.score, s.name, s.email FROM scores AS s ORDER BY s.score DESC LIMIT 0,3";
	$connector = new Connector(__SERVER__,__USER__,__PASS__,__DBNAME__);
	$output =  $connector->RunQuery($query);

	echo json_encode($output);
?>