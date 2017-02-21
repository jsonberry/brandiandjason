const api = {
    formatKey: formatKey,
    sortItems: sortItems
};

function formatKey(string) {
    return string.toLowerCase().replace(/ /g, '_').replace(/\+/g, '');
}

function sortItems(items, ...order) {
    let sortOrder = [...order];
    return sortOrder.map(v => items.find(e => e.id === v));
}

module.exports = api;
