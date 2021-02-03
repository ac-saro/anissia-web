/**
 * ajax Util
 */
export default class Ajax {

  static get session(): any { return { credentials: 'same-origin' }; }
  static get json(): any { return { headers: {'Content-Type': 'application/json'} }; }
  static get get(): any { return { method: 'GET' }; }
  static get post(): any { return { method: 'POST' }; }
  static get delete(): any { return { method: 'delete' }; }
  static get put(): any { return { method: 'put' }; }

}
