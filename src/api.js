/*
  API Wrapper
  The intent of this module is to have a single place in the app where all API calls are located
  The syntax for a new API call can be inferred from the existing exported clases, it supports the http methods GET, POST, PUT and DELETE
  All four methods call the request function that parses and prepares the data before making the actual request, the url params are converted to a query string and headers / auth are added in this step
  The response is a promise that must be resolved from the place it was called
*/
import 'whatwg-fetch'
import queryString from 'query-string'

const DEBUG = false

// Make the actual request
function request (method, endpoint, queryArray, body) {
  let query = ''
  if (typeof endpoint === 'undefined') {
    console.error('FATAL ERROR: endpoint not defined')
    return
  }
  if (typeof queryArray !== 'undefined' && queryArray !== null) {
    query = '?' + queryString.stringify(queryArray)
  }

  // Delete ? sign if the query string is empty
  if (query === '?') query = ''

  let url = 'https://protected-eyrie-39142.herokuapp.com/api/v1' + endpoint + query

  let fetchParams = {
    method: method,
    headers: {
      'content-type': 'application/json'
      // 'Authorization': AppStorage.getAuthToken()
    }
  }

  if (body) fetchParams['body'] = JSON.stringify(body)

  if (DEBUG) console.log('myRequest', url, fetchParams)
  // Call the API and return a json response
  return window.fetch(url, fetchParams)
    .then(response => {
      if (DEBUG) console.log('apiResponse', response)
      if (!response.ok) return response.json().then(r => { throw r.error })
      if (response.status === 204) return
      return response.json()
        .then(r => {
          if (DEBUG) {
            console.info(`${method}: ${endpoint}${query}`)
            console.info('resolvedRes', r)
          }
          return r
        })
    })
    .catch(e => {
      throw e
    })
}

// HTTP GET
function Get (route, params = {}) {
  return request('GET', route, params, null)
}
// HTTP POST
function Post (route, data = null) {
  return request('POST', route, {}, data)
}
// HTTP PUT
function Put (route, data = null) {
  return request('PUT', route, {}, data)
}
// HTTP DELETE
function Delete (route, params = {}) {
  return request('DELETE', route, params, null)
}

// Exported functions
class People {
  // Gets personas
  static GetList (params) {
    return Get('/personas', params)
  }
  // New persona
  static SendNewds (data) {
    return Post('/personas/', data)
  }
  // New persona
  static Update (id, data) {
    return Put('/personas/' + id, data)
  }
}

class Buildings {
  // Gets edificios
  static GetList (params) {
    return Get('/edificios', params)
  }
  // New edificio
  static SendNewds (data) {
    return Post('/edificios', data)
  }
  // New edificio
  static Update (id, data) {
    return Put('/edificios/' + id, data)
  }
}

class Shelters {
  // Gets personas
  static GetList (params) {
    return Get('/albergues', params)
  }
  // New edificio
  static SendNewds (data) {
    return Post('/albergues', data)
  }
  // New edificio
  static Update (id, data) {
    return Put('/albergues/' + id, data)
  }
}

export default {
  People,
  Buildings,
  Shelters
}
