const isBeta = window.location.hostname == "pjsk-tools.bluemangoo.net";
const isProduction = window.location.hostname == "sekaitools.exmeaning.com";
export const version = {
    isBeta,
    isProduction
};