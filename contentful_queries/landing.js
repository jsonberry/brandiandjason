const config = require('./config');

config.client.getEntry(config.args.landing)
    .then(landing =>
        config.fs.writeFile('src/_data/landing.json', JSON.stringify(landing.fields), err => {
        if (err) throw err;
        console.info('Landing fetch success: content injected into landing.json');
    }))
    .catch(error => console.error('Contentful fetch error:', error));
