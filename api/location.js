const config = require('./config');

config.client.getEntry(config.endpoints.location)
    .then(location =>
        config.fs.writeFile('src/_data/location.json', JSON.stringify(location.fields), err => {
        if (err) throw err;
        console.info('Location fetch success: content injected into location.json');
    }))
    .catch(error => console.error('Contentful fetch error:', error));
