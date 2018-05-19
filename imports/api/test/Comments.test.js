import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Comments } from "../Comments.js";

if (Meteor.isServer) {
    describe("Comments", () => {
        describe("methods", () => {
            const userMail = "test@colombianconflict.com"
            let commetToAdd = "This is a test";
            beforeEach(() => {
                Comments.remove({});
                commentsId = Comments.insert({
                    name: "Comments test",
                    comment: commetToAdd,
                    dateCreated: new Date(),
                    user: userId
                });
            });
        });
    });
}