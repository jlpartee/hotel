import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const Members = new Mongo.Collection('members');

Members.allow({
    insert() { return false; },
    update() { return false; },
    remove() { return false; },
});

Members.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

const MemberSchema = new SimpleSchema({
    firstName: { type: String},
    lastName: { type: String},
    member: { type: String},
    street: { type: String},
    city: { type: String},
    state: { type: String},
    zip: { type: String},
    lastCheckout: { type: Date },
    numberOfNights: { type: Number},
    preferences: { type: String},
    createdAt: { 
        type: Date,
        autoform: {
            type: 'hidden',
            label: false
        },
        defaultValue: new Date(),
    },
});

Members.attachSchema(MemberSchema);

