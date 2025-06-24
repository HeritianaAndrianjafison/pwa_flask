<?php 

include("connection.php");


$where_conditions = [
    "ZBSL_0 = ''",
    "CFMFLG_0 = '1'",
    "NDEFLG_0 = '2'",
    "SDELIVERYD.STOFCY_0 LIKE 'C%'",
    "client.BPCNUM_0 = '1101087'"
];


$sql = "
SELECT DISTINCT 
    SDELIVERY.SDHNUM_0 AS numero_livraison, 
    SDELIVERY.BPCORD_0 AS code_client, 
    SDELIVERY.SHIDAT_0 AS date_expedition,
    SDELIVERY.DLVDAT_0 AS date_livraison, 
    SDELIVERY.SOHNUM_0 AS numero_commande, 
    client.BPCNAM_0 AS station,
    transporteur.BPCNAM_0 AS transporteur,
    SDELIVERY.ZIMMAT_0 immatriculation_camion
FROM SDELIVERY 
INNER JOIN SDELIVERYD ON SDELIVERY.SDHNUM_0 = SDELIVERYD.SDHNUM_0
INNER JOIN BPCUSTOMER AS transporteur ON transporteur.BPCNUM_0 = SDELIVERY.ZBPTNUM_0
INNER JOIN BPCUSTOMER AS client ON client.BPCNUM_0 = SDELIVERY.BPCORD_0
WHERE " . implode(' AND ', $where_conditions) . "
ORDER BY SDELIVERY.DLVDAT_0 DESC
";

$livraison= array();
$result = odbc_exec($connectionodbcx3,$sql);

while($row = odbc_fetch_array($result)){
 $livraison[] = $row;
}

header('Content-Type: application/json');
echo json_encode($livraison);

?>