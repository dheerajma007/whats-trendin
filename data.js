const request = require('request-promise');
const woeid = require('woeid');

async function getTwitterData(country){
    if(!country){
        country = '1';
    }
    else{
        country = woeid.getWoeid(country).woeid;
    }
    try{
        var tokenResponse = await getToken();
        var token = JSON.parse(tokenResponse).access_token;

        var twitterTrendResponse = await getTwitterTrend(country, token);
        var trends = JSON.parse(twitterTrendResponse)[0].trends;
        var result = [];
        for(var i = 0; i <= 4; i++){
            result.push({name:trends[i].name, url:trends[i].url, count:trends[i].tweet_volume});
        }

        console.log(result);
        return {status:200, body:result};
    }
    catch(e){
        console.error(e);
        throw e;
    }
};

function getToken(){
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