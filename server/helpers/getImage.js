const https = require('https')
const randomizer = require('./randomizer')
module.exports = (movieId) => {
    return new Promise((resolve, reject) => {
        var options = {
            "method": "GET",
            "hostname": "api.themoviedb.org",
            "port": null,
            "path": `/3/movie/${movieId}/images?include_image_language=null&language=en-US&api_key=8a7e752cebf6ca5ac0da696ca29c36fa`,
            "headers": {}
          };
          
        var req = https.request(options, (resp) => {
            let data = ''
            resp.on('data', (chunk) => {
                data += chunk
            })
                      
            resp.on('end', () => {
                let resData = JSON.parse(data)
                // console.dir(resData)
                let url = "https://image.tmdb.org/t/p/w500" + resData.backdrops[randomizer(resData.backdrops.length)].file_path
                console.log(url)
                resolve(url)
                // return url
            })
     
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        })
        req.write("{}");
        req.end();
    })
}
