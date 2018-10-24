# router.js

<p>
  <a href="#"><img src="https://api.travis-ci.org/sundowndev/router.js.svg" alt="Build status"></a>
  <a href="#"><img src="https://img.shields.io/github/tag/Sundowndev/router.js.svg?style=flat-square" alt="Version"></a>
  <a href="#"><img src="https://img.shields.io/badge/size-9.9kb-brightgreen.svg?style=flat-square" alt="Size"></a>
  <a href="#"><img src="https://img.shields.io/badge/minified%20size-3.7kb-brightgreen.svg?style=flat-square" alt="Size minified"></a>
</p>

Client sided Javascript routing library for static websites such as documentation or personal website. It fits perfectly with client-side templating !

See it in action [here](https://sundowndev.github.io/router.js/demo)

## Features

- Static & dynamic routing
- Custom 404 error handling
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
        route: '/',
        callback: () => { document.write('Hey! Welcome.') }
    },
    {
        name: 'get_started',
        route: '/get-started', // will be registered as /#/docs/get-started
        callback: getStartedAction()
    }
]);
~~~

### API

- #### `router.add(name: string, path: string, callback: function)`

  - Register a route. Use the keyword **`:`** in path to create a parameter.

- #### `router.map(prefixName: string, prefixPath: string, routes: array)`

  - Register several routes using a prefix name and path. Routes must be an array of object that follows this format :
  
~~~
{
  name: string,
  route: string,
  callback: function
}
~~~

- #### `router.fetchRoute(name: string[, parameters: object])`

  - Fetch a registered route by name or path. For dynamic routes, It'll generate the path using given parameters.

~~~js
router.fetchRoute('home'); // or router.fetchRoute('/');

// with parameters
router.fetchRoute('hello', {name: 'Sundown'});
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

- #### `router.notFoundException()`

  - Call the not found exception callback

Example :

~~~js
var projects = [{title: 'routerjs', description: 'routing library'}];

// overwrite the default not found exception
router.setErrorCallback(function () {
    document.write('Oh no! Page not found.');
});

router.add('project', '/projects/:title', function (projectTitle) {
    // search for the object in array
    let project = projects.find((p) => { projectTitle === p.title });

    // if the project does not exist
    if (!project) {
        router.notFoundException();
    }
});
~~~

- #### `router.before(path: string, callback: function)`

  - Register a middleware that will be executed before given path. Type **`*`** to target every routes.

- #### `router.run([callback: function])`

  - Run the router with registered routes. Optionnaly, register a middleware that will be executed after every routes callback.

## Installation (npm)

~~~bash
$ npm i @sundowndev/router.js
~~~

#### Usage

```js
var Router = require('@sundowndev/router.js');

var router = Router();

router.add('home', '/', function () {
    document.write('hello world');
});

router.run();
```

## Usage (browser)

1. Include router.js in **<head>** or at the end of the **<body>**

~~~html
<script src="router.min.js"></script>

<!-- or via jsdelivr CDN -->
<script src="https://cdn.jsdelivr.net/gh/sundowndev/router.js@latest/dist/router.min.js"></script>
~~~

2. Init the router

~~~html
<script>
    var router = new router();
</script>

~~~

3. Create some routes

~~~js
router.add('home', '/', function () {
    document.write('Hello!');
});
~~~

4. Run the router

~~~js
router.run();
~~~

## Development : build process

*Sources files --> ESlint --> Typescript runtime --> Plain Javascript --> Minified Javascript*

## License

This repository is MIT licensed.
