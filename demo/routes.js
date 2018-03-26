var router = new router();

/*
 * Routes calls
 */
router.before('*', function () {
    console.log('You were on ' + router.route.route + ' route');
});

router.add('home', '/', function () {
    content.innerHTML = '' +
        '<h1>Welcome!</h1>' +
        '<p>wow, such routing</p>'
    ;
});

router.add('about', '/#/about', function () {
    content.innerHTML = '' +
        '<h1>About me</h1>' +
        '<p>I\'m french</p>'
    ;
});

router.add('contact', '/#/contact', function () {
    content.innerHTML = '' +
        '<h1>Contact me</h1>' +
        '<p>You contact me at <strong>raphael at crvx dot fr</strong></p>'
    ;
});

router.setErrorCallback(function () {
    content.textContent = 'Woups, 404 error!';
    throw new TypeError('404 error');
});

router.run(function () {
    console.log('You are now on ' + router.route.route + ' route');

    var links = document.querySelectorAll('[data-router-link]');

    links.forEach(function (link) {
        if (link.dataset.routerLink !== router.route.name) {
            link.classList.remove('active');
        }
    });

    document.querySelector('[data-router-link=' + router.route.name + ']').classList.toggle('active');
});