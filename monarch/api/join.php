<?php

$Servername = 'localhost';
$userName = 'root';
$password = '';
$dbName = 'grading_system';

try {
	$con = new PDO(
		"mysql:host=$Servername;dbname=$dbName",
		$userName,
		$password
	);

	$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	echo 'Connection Success';
} catch (PDOException $e) {
	echo 'Error in Connection' . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="html.html"></a>
    
</body>
</html>