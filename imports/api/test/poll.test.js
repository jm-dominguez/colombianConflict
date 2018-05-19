import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Comments } from "../poll.js";

if (Meteor.isServer) {
    describe("poll", () => {
        describe("methods", () => {
            const numQuestion = 5 + Random.fraction()*5;

            beforeEach(() => {
                Poll.remove({});
                commentsId = Comments.insert({
                    _id: questionId,
                    question : numQuestion,
                    yes : 0,
                    no : 0
                });
            });
        });
    });
}