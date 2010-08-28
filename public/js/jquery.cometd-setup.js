var cometURL = document.location.protocol + '//' + document.location.hostname + ':' + document.location.port + '/listen';
$.cometd.init(cometURL);
