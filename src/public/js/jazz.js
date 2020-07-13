window.onload=function () {
    main()
}

function main() {
    loadImages()
}

function  loadImages() {
    document
    .querySelectorAll('[data-src]')
    .forEach(c => c.setAttribute('src',c.getAttribute('data-src')));
}

