# processing-ts

[Demo](http://edsilv.github.io/processing-ts-examples/natureofcode/)

This project is an attempt to reproduce the [natureofcode.com](http://natureofcode.com/book/) examples in TypeScript.

It's a very initial work in progress. The main drivers being to learn TypeScript, Processing, and the concepts outlined in the book.

## Setup

1. Install [Node.js](http://nodejs.org), if you haven't already
1. Install the Grunt command line interface (if you haven't already); on the command line, run `npm install -g grunt-cli`
1. Clone the 'processing-ts' repository
1. Run `git submodule init`
1. Run `git submodule update`
1. Run `npm install`

## Build

To compile only the core processing-ts files run:

`grunt`

To compile the core and example files run:

`grunt examples`

To compile and minify the natureofcode examples into a single file run:

`grunt natureofcode`


## Viewing Examples

To view the examples locally you can install node http-server:

`npm install http-server -g`

and run:

`http-server`

within the processing-ts directory, then browse to:

`http://localhost:8080/examples/natureofcode/`