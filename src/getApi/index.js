import fetchJsonp from 'fetch-jsonp'

export const getInstagrammApi = (callback) => {
    fetchJsonp('https://api.instagram.com/v1/users/6754934649/media/recent?access_token=6754934649.31da046.93eeeaa2a4da43a5957477729c1d8cae&count=69&callback=odyCache684db1b925d275a5.parse')
        .then(function (response) {
            return response.json()
        }).then(function (json) {
       callback(json.data)
    }).catch(function (ex) {
        alert('Ошибка', ex)
    })
}
