import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const Rooms = new Mongo.Collection('rooms');

// cannot be performed by the cliend
Rooms.allow({
    insert() { return false; },
    update() { return false; },
    remove() { return false; },
});

Rooms.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});
// end client restrictions

const RoomSchema = new SimpleSchema({
    roomNumber: { type: Number},
    checkIn: { type: Date },
    checkOut: { type: Date },
    tenantID: { 
        type: String,
        autoform: {
            type: 'select',
            options: function() {
                return Members.find().map(function(p) {
                    return {label: `${p.firstName} ${p.lastName}`, value: p._id};
                });
            }
        }
    },
    available: { 
        type: Boolean,
        autoform: {
            type: 'boolean-select',
        },
    },
    needCleaning: { 
        type: Boolean,
        autoform: {
            type: 'boolean-select',
        },
    },
    createdAt: { 
        type: Date,
        autoform: {
            type: 'hidden',
            label: false
        },
        defaultValue: new Date(),
    },
});

Rooms.attachSchema(RoomSchema);
