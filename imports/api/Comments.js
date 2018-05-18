import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Comments = new Mongo.Collection("comments");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("comments", function tasksPublication() {
        return Comments.find();
    });
}

Meteor.methods({
    "comments.add"(commetToAdd, userId,pName) {
        check(commetToAdd, String);
        check(pName, String);
        check(userId, String);
        Comments.insert({
            comment :  commetToAdd,
            dateCreated: new Date(),
            user: userId,
            name : pName
        }
        );
    },

    "comments.getUser"(id){
        let comm = Comments.findOne(id)
        let user = comm.user;
        return user;
      }
});