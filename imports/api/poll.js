import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

export const Poll = new Mongo.Collection("poll");

if(Meteor.isServer){
    Meteor.publish("poll", function publishNames(){
        return Poll.find();
    });
}

Meteor.methods({
    "poll.findByQuestion"(pNum){
        check(pNum, Number);
        return Poll.findOne({question: pNum});
    },

    "poll.addNewAnswer"(pNum){
        check(pNum, String);
        
    }
});