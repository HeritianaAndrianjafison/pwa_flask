<?php 

// Récupération du paramètre GET
$numero_livraison = isset($_GET['numero_livraison']) ? trim($_GET['numero_livraison']) : '';



include("connection.php");

$where_conditions = [
    "ZBSL_0 = ''",
    "CFMFLG_0 = '1'",
    "NDEFLG_0 = '2'",
    "SDELIVERYD.STOFCY_0 LIKE 'C%'",
    "client.BPCNUM_0 = '1101087'"
];


$sql = "
SELECT SDELIVERY.SDHNUM_0 numero_livraison , 
SDELIVERY.SHIDAT_0 date_expedition,
SDELIVERY.DLVDAT_0 date_livraison,
SDELIVERY.SOHNUM_0 numero_commande, 

SDELIVERYD.ITMDES_0 produit, 
SDELIVERYD.QTY_0 qte_livre, 
SDELIVERYD.QTYSTU_0 qte_recept , 
SDELIVERYD.ZBSL_0 bsl,

client.BPCNAM_0 as client ,
transporteur.BPCNAM_0 transporteur_name,
SDELIVERYD.ROWID

FROM SDELIVERY 

INNER JOIN SDELIVERYD ON SDELIVERY.SDHNUM_0 = SDELIVERYD.SDHNUM_0
INNER JOIN BPCUSTOMER as transporteur  on transporteur.BPCNUM_0 = SDELIVERY.ZBPTNUM_0
INNER JOIN BPCUSTOMER as client on client.BPCNUM_0 = SDELIVERY.BPCORD_0

WHERE (CFMFLG_0='1') and NDEFLG_0='2' and SDELIVERYD.STOFCY_0 like 'C%'
AND SDELIVERY.SDHNUM_0='$numero_livraison'
AND SDELIVERYD.ITMREF_0 !='RET_CAUTION'
AND SDELIVERYD.ITMREF_0 !='TPXV00009'
ORDER BY SDELIVERYD.ROWID DESC , ZBPTNUM_0 , SDELIVERYD.SOHNUM_0
";

$livraison= array();
$result = odbc_exec($connectionodbcx3,$sql);

while($row = odbc_fetch_array($result)){
 $livraison[] = $row;
}

header('Content-Type: application/json');
echo json_encode($livraison);

?>