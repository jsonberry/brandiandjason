const helpers = require('./helpers');
const args = require('./contentfulArgs');
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
    args: args,
    fs: fs,
    client: client
}

module.exports = config;
