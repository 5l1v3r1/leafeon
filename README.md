<p align="center">
  <img src="https://i.imgur.com/oIbG1gB.png" />
</p>

<p align="center">
  <a href="https://travis-ci.org/sundowndev/leafeon"><img src="https://api.travis-ci.org/sundowndev/leafeon.svg?branch=master" alt="Build status"></a>
  <a href="https://github.com/sundowndev/leafeon/releases"><img src="https://img.shields.io/github/tag/Sundowndev/router.js.svg?style=flat-square" alt="Version"></a>
  <a href="#"><img src="https://img.shields.io/badge/size-10kb-brightgreen.svg?style=flat-square" alt="Size"></a>
  <a href="#"><img src="https://img.shields.io/badge/minified%20size-4kb-brightgreen.svg?style=flat-square" alt="Size minified"></a>
</p>

<p align="center">As light as a leaf, leafeon is a Javascript routing library that fits perfectly with client-side templating.</p>

## Features

- Static & dynamic routing
- Custom error handling
- Before and after router middleware
- Prefixed route paths
- URL generator

## Overview

A simple route

~~~js
router.add('default', '/', function () {
    /* do something */
});
~~~

A simple route using parameter

~~~js
router.add('single_category', '/category/:id', function (id) {
  console.log('You requested the category #' + id);
});
~~~

Register a callback when route is not found

~~~js
router.setErrorCallback(function () {
    throw new TypeError('I think there\'s a problem.');
});
~~~

Mapping routes using a route prefix

~~~js
// This will create two routes under /docs prefix
router.map('docs_', '/docs', [
    {
        name: 'intro', // will be registered as docs_intro
        path: '/',
        callback: () => { document.write('Hey! Welcome.') }
    },
    {
        name: 'get_started',
        path: '/get-started', // will be registered as /#/docs/get-started
        callback: getStartedAction()
    }
]);
~~~

### API

- #### `router.add(name: string, path: string, callback: function)`

  - Register a route. Use `:` in path to create a parameter.

- #### `router.map(prefixName: string, prefixPath: string, routes: Array)`

  - Register several routes using a prefix name and path. Routes must be an array of object that follows this format :

~~~
{
  name: string,
  path: string,
  callback: function
}
~~~

- #### `router.fetchRoute(name: string[, parameters: object])`

  - Fetch a registered route by name or path. For dynamic routes, It'll generate the path using given parameters.

~~~js
router.fetchRoute('home'); // or router.fetchRoute('/');

// with parameters
router.fetchRoute('/hello/:name', {name: 'Sundown'});
~~~

- #### `router.route: object`

  - Get the current route :

~~~
{
    name: string,
    path: string,
    callback: function,
    paramsEnabled: boolean,
    params: array
}
~~~

- #### `router.setErrorCallback(callback: function)`

  - Set the not found exception

Example :

~~~js
// overwrite the default not found exception
router.setErrorCallback(function () {
    document.write('Oh no! Page not found.');
});
~~~

- #### `router.notFoundException()`

  - Call the not found exception callback

- #### `router.before(path: string, callback: function)`

  - Register a middleware that will be executed before given path. Type **`*`** to target every routes.

- #### `router.run([callback: function])`

  - Run the router with registered routes. Optionally, register a middleware that will be executed after every routes callback.

## Installation (npm)

~~~bash
$ npm i leafeon
~~~

#### Usage

```js
const leafeon = require('../src/leafeon').router();

leafeon.add('home', '/', function () {
    document.write('hello world');
});

leafeon.run();
```

## Browser usage

1. Include router.js in **<head>** or at the end of the **<body>**

~~~html
<script src="leafeon.min.js"></script>

<!-- or via jsdelivr CDN -->
<script src="https://cdn.jsdelivr.net/gh/sundowndev/router.js@latest/dist/leafeon.min.js"></script>
~~~

2. Init the router

~~~html
<script>
    const leafeon = new leafeon.router();
</script>
~~~

3. Create some routes

~~~js
leafeon.add('home', '/', function () {
    document.write('Hello!');
});
~~~

4. Run the router

~~~js
leafeon.run();
~~~

## Browser support

- UMD (.js) supports IE 11+, Chrome 43+, Opera 29+, and Firefox 41+

## License

This repository is MIT licensed.

Icon made by [Good Ware](https://www.flaticon.com/authors/good-ware) from [Flaticon](https://www.flaticon.com) under CC 3.0 BY license.
