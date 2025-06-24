
$(document).ready(function () {
    $("#loading").fadeOut();
});
$(document).ajaxStart(function () {
    $("#loading").show();
});
$(document).ajaxStop(function () {
    $("#loading").fadeOut();
}); 