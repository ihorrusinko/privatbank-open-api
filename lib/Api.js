"use strict";
const axios = require("axios");
const xml2json = require("xml2json");

class Api {
  constructor({ merchantId, password, requestConfig = {} }) {
    this._merchantId = merchantId;
    this._password = password;
    this.requestConfig = requestConfig;
    this.axios = axios;
  }

  _getSignature(dataString) {
    const md5Hash = crypto
      .createHash("md5")
      .update([dataString, this._password].join(""))
      .digest("hex");
    return crypto
      .createHash("sha1")
      .update(md5Hash)
      .digest("hex");
  }

  _makeRequest(url, dataString) {
    const requestPayload = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<request version="1.0">',
      "<merchant>",
      `<id>${this._merchantId}</id>`,
      `<signature>${this._getSignature(dataString)}</signature>`,
      "</merchant>",
      "<data>",
      dataString,
      "</data>",
      "</request>"
    ].join("");
    return this.axios.post(url, requestPayload, this.requestConfig);
  }

  _requestResponseAsJSON(data) {
    return JSON.parse(xml2json.toJson(data));
  }
}

module.exports = Api;
