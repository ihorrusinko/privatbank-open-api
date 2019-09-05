"use strict";
const Api = require("./Api");

class MerchantAPI extends Api {
  constructor(params) {
    super(params);
  }

  _getStatementParams(card, from, to) {
    return [
      "<oper>cmt</oper>",
      "<wait>1</wait>",
      "<test>0</test>",
      '<payment id="">',
      [
        `<prop name="sd" value="${from}"/>`,
        `<prop name="ed" value="${to}"/>`,
        `<prop name="card" value="${card}"/>`
      ].join(""),
      "</payment>"
    ].join("");
  }

  _getBalanceParams(card) {
    return [
      "<oper>cmt</oper>",
      "<wait>1</wait>",
      "<test>0</test>",
      '<payment id="">',
      [`<prop name="cardnum" value="${card}"/>`].join(""),
      "</payment>"
    ].join("");
  }

  /**
   * Get statement for period by card
   * @param card
   * @param from
   * @param to
   * @returns {Promise<Object>}
   */
  getStatementForPeriod(card, from, to) {
    return this._makeRequest(
      "https://api.privatbank.ua/p24api/rest_fiz",
      this._getStatementParams(card, from, to)
    ).then(({ data }) => this._requestResponseAsJSON(data));
  }

  /**
   * Get balance by card
   * @param card
   * @param from
   * @param to
   * @returns {Promise<Object>}
   */
  getBalanceByCard(card, from, to) {
    return this._makeRequest(
      "https://api.privatbank.ua/p24api/balance",
      this._getBalanceParams(card, from, to)
    ).then(({ data }) => this._requestResponseAsJSON(data));
  }
}

module.exports = MerchantAPI;
