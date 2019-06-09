import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Members } from '../api/members';
import { Rooms } from '../api/rooms';
import { Router, RouteController } from 'meteor/iron:router';
import './members.html';
import './body.html';
import './rooms.html';
import './navigation.html';
import './emptyRooms.html';
import './main.html';
import './body.css';

AutoForm.setDefaultTemplate('materialize');

window.Members = Members;
window.Rooms = Rooms;

Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('members.allMembers');
    Meteor.subscribe('rooms.allRooms');
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MMM Do YYYY');
});

Template.members.helpers({
    members() {
        return Members.find({});
    },
});

Template.rooms.helpers({
    rooms() {
        return Rooms.find({});
    },
});

Template.emptyRooms.helpers({
    emptyRooms() {
        return Rooms.find({
            available: true
        });
    },
});

Template.room.helpers({
    makeUniqueID() {
        return this._id;
    },
    returnName(tenantID) {
        const member = Members.findOne({_id: tenantID });
        return `${member.firstName} ${member.lastName}`;
    },
});

Template.emptyRoom.helpers({
    makeUniqueID() {
        return this._id;
    },
    returnName(tenantID) {
        const member = Members.findOne({_id: tenantID });
        return `${member.firstName} ${member.lastName}`;
    },
});

Template.members.onRendered(function() {
    $('#modal1').modal();
});

Template.rooms.onRendered(function() {
    $('.collapsible').collapsible();
});
 
Router.route('/', function() {
    this.layout('layout');
    this.render('main');
});

Router.route('/emptyRooms', function() {
    this.layout('layout');
    this.render('emptyRooms');
});