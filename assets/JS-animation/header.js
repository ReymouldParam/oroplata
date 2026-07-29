$(function () {
    let current = window.location.pathname;

    // Normalize the current path
    current = current.replace(/index\.html$/, "");
    current = current.replace(/\.html$/, "");
    current = current.replace(/\/$/, "");

    if (current === "") current = "/";

    $(".main-nav a").each(function () {
        let href = new URL($(this).attr("href"), window.location.origin).pathname;

        href = href.replace(/index\.html$/, "");
        href = href.replace(/\.html$/, "");
        href = href.replace(/\/$/, "");

        if (href === "") href = "/";

        if (current === href) {
            $(this).addClass("active");
        }
    });
});