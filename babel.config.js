module.exports = function (api) {
    api.cache(true);

    const presets = [];
    const plugins = [ "macros" ];

    return {
        presets,
        plugins
    };
}