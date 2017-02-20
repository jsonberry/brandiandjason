const config = require('./config');

config.client.getEntries(config.args.journey)
    .then(journey => {
        let entries = journey.items.reduce((obj, v) => {
            let key = config.helpers.formatKey(v.fields.heading);
            obj[key] = v.fields;
            return obj;
        }, {});

        config.fs.writeFile('src/_data/journey.json', JSON.stringify(entries), err => {
            if (err) throw err;
            console.info('Journey fetch success: content injected into journey.json');
        })
    })
    .catch(error => console.error('Contentful fetch error:', error));
