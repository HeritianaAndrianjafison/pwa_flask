$(document).ready(function() {

    $(document).ready(function($) 
    { 
        // Lorsque l'élément avec la classe 'mihidy' est cliqué
        

        $(document).on('click', '#ajout_produit_togle', function(event) 
        {
            event.preventDefault();
            $('.ajout_produit').toggle( "slow", function() {
            });
        });
        //export excel
        $(document).on('click', '#export_excel', function(event) 
        {
            event.preventDefault();
            var table2excel = new Table2Excel();
            table2excel.export(document.querySelectorAll("table.table"));	
        });

        // Génération du PDF
        $(document).on('click', '.btn_print', function(event) 
        {
            event.preventDefault();
            var element = document.getElementById('container_content'); 
            var opt = 
            {
            margin:       0,
            filename:     'pageContent_'+js.AutoCode()+'.pdf',
            image: { type: 'jpeg', quality: 1.0 }, // Définit la qualité d'image à 1.0 pour la qualité maximale
            html2canvas: { scale: 3 }, 
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
        });
    });

    //Copirigt Jovena

    var currentYear = new Date().getFullYear();
    $('#copyrightYear').text('Copyright © Jovena ' + currentYear);

    

    var content = $('#content').html();
    $('#generate').click(function () {
        // Créer un nouveau document PDF
        var doc = new jsPDF();
        
        // Ajouter le contenu HTML au document PDF
        doc.html(content, {
            callback: function (pdf) {
                // Télécharger le PDF une fois la conversion terminée
                pdf.save('document.pdf');
            }
        });
    });


    // Génération du PDF tableau
    $('#generate-pdf').on('click', function() {
        const docDefinition = {
            content: [
                { text: 'Liste des Utilisateurs', style: 'header' },
                { table: { body: [] } }
            ],
            styles: {
                header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] }
            }
        };

        // Remplir les données de la table dans le PDF
        $('#utilisateurs_table tbody tr').each(function() {
            const rowData = [];
            $(this).find('td').each(function() {
                rowData.push($(this).text());
            });
            docDefinition.content[1].table.body.push(rowData);
        });

        // Générer le PDF et l'ouvrir dans une nouvelle fenêtre
        pdfMake.createPdf(docDefinition).open();
    });
});