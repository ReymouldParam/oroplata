
$(document).ready(function () {
    // Get the current page filename (e.g. "services.html")
    var currentPage = window.location.pathname.split("/").pop();

    // Loop through each nav link
    $('.main-nav a').each(function () {
        var linkPage = $(this).attr('href').split("/").pop();

        // If the href matches the current page, add the "active" class
        if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
            $(this).addClass('active');
        }
    });
});
