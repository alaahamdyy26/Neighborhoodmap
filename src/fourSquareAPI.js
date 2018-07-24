// import venueDetailsResponse from './mock-foursquare-responses'

const api = "https://api.foursquare.com"

const params = {
  'client_id': "TLXX1MJE0CEM3XECADE2LQOXVROT1QOSE1WVWARSQTMHKOGT",
  'client_secret': "I2SU3EVB0TXUAYRTE4E3ZZO4XYRKNYEYPCNS5XMWXZJM2B1H",
  'v': "20160201",
  'm': 'foursquare'
}

const query = Object.keys(params)
  .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
  .join('&');
export const getVenueDetails = (id) =>
  fetch(`${api}/v2/venues/${id}?${query}`)
    .then(response => {
      if (!response.ok) {
        throw response
      }
      return response.json()  //we only get here if there is no error
    })
    .then(date => date.response.venue)
    .catch((e) => {
      //gracefully handling the errors by informing the user that things did not go well
      alert('Sorry we are having a technical issue, Try again later')
      throw e;
    })


// work arround as Usage of the API is subject to an hourly rate limit and a daily call quota.
// export const getVenueDetails = (id) => {
//   const promise = new Promise(((resolve, reject) => {
//     resolve(venueDetailsResponse)
//   }));
//   return promise
//     .then(date => date.response.venue)
//     .catch(() => {
//       console.log(
//         'Unfortunately, fetch request not completed successfully!'
//       );
//     });
// }
