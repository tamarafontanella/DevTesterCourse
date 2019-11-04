import { Posts } from '/imports/api/posts/posts.js'
import { Meteor } from 'meteor/meteor'
import './posts.html'
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

Template.posts.onCreated(function () {
    Meteor.subscribe('posts.all');
});

Template.posts.helpers({
    posts() {
        return Posts.find({}, { sort: { 'createdAt': -1 } });
    },
    totalLikes(likes) {
        return likes.length;
    },
    myPost(userId) {
        if (userId == Meteor.userId()) {
            return true;
        } else {
            return false;
        }
    }
});

Template.posts.events({
    'click .heart': function (event) {
        event.preventDefault();

        Meteor.call('post.like', this_id, (err, res) => {
            if (err) {
                swal({ type: 'info', title: 'Oopss..', text: err.reason })
            } else {
                return true;
            }
        });
    },
    'click.trash': function (event) {
        event.preventDefault();

        Meteor.call('post.like', this_id, (err, res) => {
            if (err) {
                swal({ type: 'error', title: err.reason });
                return false;
            }
        })
    }
})

