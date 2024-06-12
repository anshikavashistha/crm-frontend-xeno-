export const BASE_URL = 'http://localhost:3001';


function checkResponse(res) {
    return res.ok 
    ? res.json() 
    : Promise.reject(`Ошибка...: ${res.status}`);
  }
  
  export function createEvent (event) {
      return fetch(`${BASE_URL}/events`, {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(event)
      })
      .then(checkResponse)
    };

       export function updateEvent(event) {
      return fetch(`${BASE_URL}/events/${event.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(event)
      })
      .then(checkResponse)
    };

        export function deleteEvent(event) { 
      return fetch(`${BASE_URL}/events/${event.id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include'
      })
      .then(checkResponse)
    };

    export function createAudience(audience) {
      return fetch(`${BASE_URL}/audiences`, {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(audience)
      })
      .then(checkResponse)
    };

    export function deleteAudience(audience) { 
      return fetch(`${BASE_URL}/audiences/${audience.id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',
      })
      .then(checkResponse)
    };

    export function createCurrentReport (id, date) {
      return fetch(`${BASE_URL}/currentreport`, {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({id, date})
      })
      .then(checkResponse)
    };


    export function sendSend (id, date) {
      return fetch(`${BASE_URL}/send`, {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({id, date})
      })
      .then(checkResponse)
    };

    export function stopSend (id, date) {
      return fetch(`${BASE_URL}/stop`, {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({id, date})
      })
      .then(checkResponse)
    };

    export function sendTest (event, contact) {
      return fetch(`${BASE_URL}/test`, {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({event, contact})
      })
      .then(checkResponse)
    };

 

  
