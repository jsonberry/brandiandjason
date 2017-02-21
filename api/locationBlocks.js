const config = require('./config');

config.client.getEntries(config.endpoints.location_blocks)
    .then(locationBlocks => {
        let entries = locationBlocks.items.map(v => {
            let path = v.fields;
            return {
                    id: path.locationBlockId,
                    heading: path.heading,
                    copy: path.copy
                }
        });

        let sorted = config.helpers.sortItems(entries, 'venue', 'ceremony', 'parking');

        config.fs.writeFile('src/_data/location_blocks.json', JSON.stringify(sorted), err => {
            if (err) throw err;
            console.info('Location blocks fetch success: content injected into location_blocks.json');
        })
    })
    .catch(error => console.error('Contentful fetch error:', error));
