/**
 * Format seconds to mm:ss format.
 * https://stackoverflow.com/a/1322771/173630
 */
// eslint-disable-next-line no-unused-vars
const formatTime = function(seconds) {
    return new Date(seconds * 1000).toISOString().substring(14, 19);
};
