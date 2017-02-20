const api = {
    formatKey: formatKey
};

function formatKey(string) {
    return string.toLowerCase().replace(/ /g,"_");
}

module.exports = api;
