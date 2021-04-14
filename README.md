## What?

This is a Shopfiy fork of the [open-source Splainer app](https://github.com/o19s/splainer). We forked it so it can work seamlessly with Shopify's Elasticsearch infrastructure. Read below for details about what this app does.

## Why?

You're a search developer trying to tune search results with Elasticsearch. You're engaged in [search relevancy](http://opensourceconnections.com/blog/2014/06/10/what-is-search-relevancy/) work.

You're probably stuck with the question of *why*? Why do search results come back in the order that they do? Elasticsearch exposes an explain syntax for you to try to explain search scoring. Unfortunately outside the simplest tasks, its a nightmare to read through. There are parsers require a lot of manual copy/pasting of explain information to the tool.

Splainer is different by being a *sandbox*. Paste in your Elasticsearch URL, query parameters and all. As you work with your query, changing parameters, Splainer shows you parsed and summarized explain information alongside your documents. Continue working and see how the search results change.

Read the blog post introducing Splainer [here](http://opensourceconnections.com/blog/2014/08/18/introducing-splainer-the-open-source-search-sandbox-that-tells-you-why/)

## Developing Splainer

### Npm/Yarn Dev Environment

Splainer is written using AngularJS project. It requires npm, grunt, and yarn.

Be sure you've installed npm, yarn, and grunt on your machine.

* On a Mac [follow these instructions](http://thechangelog.com/install-node-js-with-homebrew-on-os-x/)
* On Ubuntu [follow these instructions](https://rtcamp.com/tutorials/nodejs/node-js-npm-install-ubuntu/)
* Use npm to install Grunt globally on your system (may require sudo)

```
npm install -g grunt-cli
```

* Install yarn [follow these instructions](https://yarnpkg.com/en/docs/install)

### With Npm/Yarn installed

From the root of the project, you should be able to run the following:

```
yarn
grunt test
grunt serve
```

Now browse to http://localhost:9000.

To build the project, simply run `grunt dist` to build the static artifacts in the dist/ folder.

```
grunt dist
```

You can test out the static artifacts via `ruby -run -e httpd -- -p 5000 ./dist` and going to http://localhost:5000.

### Testing Notes

* Unit tests are written using Karma.

* The `./tests/splainer_test_links.html` file is a list of links that invoke Splainer, both the local version and the deployed version against Elasticsearch, and is a great test to make sure the behavior hasn't reverted.  Use this to make sure existing links still work!

## License

Released under [Apache 2](LICENSE.txt)
