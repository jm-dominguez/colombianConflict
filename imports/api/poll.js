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

    "poll.addNewAnswer"(pNum, resp){
        check(pNum, Number);
        check(resp, String);

        let idQ = Poll.findOne({question : pNum})._id;

        if( resp === "si"){
            Poll.update({question : pNum},{$inc: {yes : 1}});
            let nombre = Meteor.user().profile.name;
            let q1Antiguo = Meteor.user().profile.q1;
            let q2Antiguo = Meteor.user().profile.q2;
            let q3Antiguo = Meteor.user().profile.q3;
            if(pNum === 1){
                Meteor.users.update({_id:Meteor.userId()}, { $set: {profile : {name : nombre, q1: "yes/Sí", q2 : q2Antiguo ,  q3 : q3Antiguo}}});
            }
            else if(pNum === 2){
                Meteor.users.update({_id:Meteor.userId()}, { $set: {profile : {name : nombre, q1: q1Antiguo, q2 : "yes/Sí" ,  q3 : q3Antiguo}}});
            }
            else if(pNum === 3){
                Meteor.users.update({_id:Meteor.userId()}, { $set: {profile : {name : nombre, q1: q1Antiguo, q2 : q2Antiguo ,  q3 : "yes/Sí"}}});
            }      
            
        }
        else if( resp === "no"){
            Poll.update({question : pNum},{$inc: {no : 1}});
            let nombre = Meteor.user().profile.name;
            let q1Antiguo = Meteor.user().profile.q1;
            let q2Antiguo = Meteor.user().profile.q2;
            let q3Antiguo = Meteor.user().profile.q3;
            if(pNum === 1){
                Meteor.users.update({_id:Meteor.userId()}, { $set: {profile : {name : nombre, q1: "yes/No", q2 : q2Antiguo ,  q3 : q3Antiguo}}});
            }
            else if(pNum === 2){
                Meteor.users.update({_id:Meteor.userId()}, { $set: {profile : {name : nombre, q1: q1Antiguo, q2 : "yes/No" ,  q3 : q3Antiguo}}});
            }
            else if(pNum === 3){
                Meteor.users.update({_id:Meteor.userId()}, { $set: {profile : {name : nombre, q1: q1Antiguo, q2 : q2Antiguo ,  q3 : "yes/No"}}});
            }      
        }
        
    }
});