const helpers = require('./helpers');
const endpoints = require('./endpoints');
const contentful = require('contentful');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.load();
const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENETFUL_TOKEN
});


const config = {
    helpers: helpers,
    contentful: contentful,
    endpoints: endpoints,
    fs: fs,
    client: client
}

module.exports = config;
