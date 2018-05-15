import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {HTTP} from "meteor/http";

Meteor.methods({
    "getTweets"(text){
        check(text, String);
        let query = "https://api.twitter.com/1.1/search/tweets.json?q=";
        query += text;

        let bearer = "Bearer " + process.env.TWITTER_TOKEN;

        let result = HTTP.call("GET", query,{headers:{
            Authorization: bearer
        }});

        return result;
    }
});