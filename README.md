<a href="http://pluscitizen.com">![Citizen](citizen-logo.png)</a>
# [Hephaestus](https://en.wikipedia.org/wiki/Hephaestus)
This is an **opinionated** though **flexible** [static site generator](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/) starter kit built by [Citizen](http://pluscitizen.com).

It aims to provide:
*   Scaffolding
*   Examples
*   Automated Workflows
*   Support for future proof syntax (CSS/JS)

The **Hephaestus** release focuses on leverging Jekyll and extending it's functionality with a Gulp ecosystem for resource management and task automation.

## Prerequisites

*   Linux, Unix, or Mac OS X
*   [Ruby](https://www.ruby-lang.org/en/downloads/)
*   [RubyGems](https://rubygems.org/pages/download)
*   [Bundler](http://bundler.io/#getting-started)
*   [NodeJS](https://nodejs.org/en/)
*   [Python 2.7+](https://www.python.org/downloads/)
*   [Jekyll](https://jekyllrb.com/docs/installation/#install-with-rubygems)

## Installation + Dev Server Start

    npm i && bower i && gulp

## Dev Server

    gulp

## Build Distribution

    gulp build

## Tech Stack
<table>
    <tr>
        <td><a href="https://jekyllrb.com/"> Jekyll</a></td><td>blog-like functionality, partials, html templating, etc..</td>
    </tr>
    <tr>
        <td><a href="https://www.browsersync.io/">BrowserSync</a></td><td>local dev server, style and script injections with live reloading</td>
    </tr>
    <tr>
        <td><a href="https://webpack.github.io/">WebPack<a></td><td>takes modules with dependencies and generates static assets</td>
    </tr>
    <tr>
        <td><a href="https://babeljs.io/">Babel<a></td><td>JavaScript compiler (supporting ES6+ functionality)</td>
    </tr>
    <tr>
        <td><a href="http://postcss.org/">PostCSS<a></td><td>A tool for transforming CSS with JavaScript</td>
    </tr>
    <tr>
        <td><a href="http://gulpjs.com/">Gulp<a></td><td>A tool for automating and enhancing your dev workflow</td>
    </tr>
    <tr>
        <td><a href="https://bower.io">Bower<a></td><td>A package manager for front-end dependencies</td>
    </tr>
</table>


## Gulp Workflow
Many Gulp tasks cover items like:
*   Error notifications
*   Sass & JS compilation
*   Vendor resource consolidation*
*   Resource minification
*   Sass & JS streaming updates in dev server

## Vendor resource consolidation
Use Bower to install front-end resources when possible.


### To do
*   Create 'reset' gulp task to clean out samples
*   Write instructions for how to use Bower inside this project
*   Write notes about what to put in the assets_unprocessed folder
*   Create variable build tasks instead of separate build tasks
*   Replace webpack-stream with webpack and move configuration to external webpack config
