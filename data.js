const request = require('request-promise');
const woeid = require('woeid');
const cache = require('./cache');

async function getTwitterData(country){
    var countryName;
    if(!country){
        country = '1';
        countryName = 'World'
    }
    else{
        let countryWoeid = woeid.getWoeid(country);
        country = countryWoeid.woeid;
        countryName = countryWoeid.country;
    }
    try{
        var token = cache.get('TOKEN');
        if(!token){
            var tokenResponse = await getToken();
            token = JSON.parse(tokenResponse).access_token;

            cache.put('TOKEN', token, 55 * 60 * 1000); //token life is 1hr. But caching it for 55mins.
        }

        var data = cache.get('TWITTER_TREND_'+country);
        if(!data){
            var twitterTrendResponse = await getTwitterTrend(country, token);
            var timestamp = new Date().getTime();
            var trends = JSON.parse(twitterTrendResponse)[0].trends;
            var result = [];
            for(var i = 0; i <= 4; i++){
                result.push({name:trends[i].name, url:trends[i].url, count:trends[i].tweet_volume});
            }
            data = {result:result, timestamp:timestamp};
            console.debug(data);
            console.log('As of ', JSON.parse(twitterTrendResponse)[0].as_of);
            console.log('Created at ', JSON.parse(twitterTrendResponse)[0].created_at);

            cache.put('TWITTER_TREND_'+country, data, 15 * 60 * 1000);
        }
        return {status:200, body:{country:countryName, data: data.result, lastUpdated:data.timestamp}};
    }
    catch(e){
        console.error(e);
        throw e;
    }
};

function getToken(){
    console.log("Getting token");
    var credBasic = process.env.TWITTER_API_KEY + ':' + process.env.TWITTER_API_SECRET;
    
    var tokenRequest = {
        uri : 'https://api.twitter.com/oauth2/token?grant_type=client_credentials',
        method : 'POST',
        headers : {
            'Authorization' : 'Basic ' + new Buffer(credBasic).toString('base64')
        }
    }

    return request(tokenRequest);
}

function getTwitterTrend(country, token){
    console.log("Calling twitter API");
    var trendRequest = {
        uri : 'https://api.twitter.com/1.1/trends/place.json',
        qs : {
            id : country
        },
        method : 'GET',
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    }

    return request(trendRequest);
}

module.exports.getTwitterData = getTwitterData;