const config = require('./config');

config.client.getEntry(config.endpoints.restaurants)
    .then(restaurants =>
        config.fs.writeFile('src/_data/restaurants.json', JSON.stringify(restaurants.fields), err => {
        if (err) throw err;
        console.info('Restaurants fetch success: content injected into restaurants.json');
    }))
    .catch(error => console.error('Contentful fetch error:', error));
