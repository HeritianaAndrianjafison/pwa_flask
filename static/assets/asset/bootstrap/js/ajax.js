

/* - Exemples AJAX -

   ATTENTION : La plupart de ces exemples pratiques font appel à la fonction console.log()
   Ils ne pourront donc s'exécuter correctement qu'en ayant activé et affiché la console de l'extension Firebug dans Firefox.
   N'oubliez pas de retirer les appels à cette fonction lorsque vous publiez votre site en ligne.
   
*/


/* Ajax Load */

$(document).ready(function() {

	$("#load").click(function() {
		$("#resultat").load("liste.html #maliste");
	});

});


/* Ajax Load avec paramètre */

$(document).ready(function() {

	$("#load-param").click(function() {
		$("#resultat").load("ajax-load-param.php", 
		{
			login: $("#login").val()
		});
	});

});


/* $.ajax avec html */

$(document).ready(function() {

	$("#ajax-html:button").click(function() {
		$.ajax({
			url: 'liste.html',
			type:'GET',
			dataType:'html',
			complete: function(resultat, status) {
				console.log(resultat);
			},
			success: function(codehtml, status) {
				console.log(codehtml);
				$(codehtml).find("#maliste").appendTo("#resultat");
			},
			error: function(resultat, status, err) {
				console.log(err);
			}
		});
	});

});


/* Ajax $.post */

$(document).ready(function() {
        var target = document.ctx + '/ajax_post';
        var cartItems =  [
                  {id: 1, name: 'product 1', summary: 'summary 1', price: 10, quantity: 1, image: 'images/img_1.png'},
                  {id: 2, name: 'product 2', summary: 'summary 2', price: 20, quantity: 2, image: 'images/img_2.png'},
                  {id: 3, name: 'product 3', summary: 'summary 3', price: 30, quantity: 1, image: 'images/img_3.png'}
                ];
	$("#ajax-post:button").click(function() {
	alert("post ajax from " + document.ctx );
        
		$.post(
			target,
			cartItems,
			function(data) {
				console.log(data);
				if(data==='OK') {
					$("#resultat").html("<p>Vous avez été identifié</p>");
					$("#resultat p").addClass("highlight2");
				} else {
					$("#resultat").html("<p>Erreur lors de l'identification</p>");
					$("#resultat p").addClass("erreur");
				}
			},
			'text' // type
		);
	
	});

});


/* Ajax $.get*/

$(document).ready(function() {

	$("#ajax-get:button").click(function() {
		$.get(
			"ajax.xml",
			false,
			decodeXml, // fonction de callback
			"xml"
		);
	});

});

// Callback
function decodeXml(xml) {

	// On affiche le contenu dans la console (Firebug)
	console.log(xml);
	// On itère sur les éléments XML
	$(xml).find("formation").each(function() {
		var titre = $(this).find("titre").text();
		var formateur = $(this).find("formateur").text();
		var annee = $(this).find("annee").text();
		$("#resultat").append("<p><strong>"+titre+"</strong> par "+formateur+" ("+annee+")</p>");
	});
	
}


/* Ajax $.getJSON */

$(document).ready(function() {

	$("#ajax-json:button").click(function() {
	
		// Appel Ajax avec fonction de callback photosLoaded
		$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?",
		photosLoaded);
		
	});

});


// Fonction de callback
function photosLoaded(data) {
	//console.log(data);
	$.each(data.items, function(i, item) {
		console.log(item.media.m);
		$("<img/>").attr("src",item.media.m).appendTo("#resultat").css("margin","1em");
	});
}



/* Gestion globale des événements Ajax sur la page */

$(document).ready(function() {

	// Animation de chargement
	$("<div id=\"loading\"></div>").insertAfter("h2");
	$("#loading").css({
		"background":"url(ajax-loading.gif) no-repeat top left",
		"float":"right",
		"height":"30px",
		"width":"30px"
	}).hide();

	// Affichage complémentaire dans l'élément #debug
	$("#debug").bind("ajaxStart",function() {
		$("#loading").show();
		$(this).empty();
		$("#resultat").empty();
		$(this).append("<p>Requête Ajax en cours...</p>");
	});
	
	$("#debug").bind("ajaxError",function() {
		$(this).append("<p>Erreur Ajax</p>");
	});

	$("#debug").bind("ajaxSuccess",function() {
		$(this).append("<p>Succès Ajax !</p>");
	});
	
	$("#debug").bind("ajaxComplete",function() {
		$(this).append("<p>Requête terminée</p>");
		$("#loading").slideUp();
	});
	
});

