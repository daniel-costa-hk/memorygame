<?php
/***************************************
 * 
 * 	Name: 			scores
 * 	Description: 	returns top 3 highscores
 * 
 * 
 ***************************************/

	define('__ROOT__', dirname(dirname(__FILE__)));
	require_once('../php_classes.php');
	
	//
	$query = "SELECT sum(s.score) AS score, s.uid, u.name FROM scores AS s INNER JOIN users AS u ON s.uid = u.uid GROUP BY s.uid ORDER BY s.score DESC LIMIT 0,3";
	$connector = new Connector('localhost','root','','memorygame');
	$output =  $connector->RunQuery($query);
	echo json_encode($output);

 

?>