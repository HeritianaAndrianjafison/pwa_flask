<?php
$serverx3='192.168.130.180\SQLX3PROD';
$databasex3="basex3";
$userx3="JOVPROD";
$passwordx3="P@sswordSQL4321!";

global $connectionodbcx3;
$connectionodbcx3 = odbc_connect("Driver={SQL Server};Server=$serverx3;Database=$databasex3;", $userx3, $passwordx3);
?>