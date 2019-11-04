import { Meteor } from 'meteor/meteor';
import { Posts } from './posts.js';

var fs = Npm.require('fs');
var path = Npm.require('path');

Meteor.methods({
    'posts.insert'(photo){

        var publicPath = path.resolve('.').split('.meteor')[0] + 'public';
        var relativePath = '/uploads/photos/' + photo.name;
        var targetPath = publicPath + relativePath;
        fs.writeFileSync(targetPath, photo.binary, 'binary');
        let user = Meteor.user();

        let newPost = {
            photo: photo.name,
            createdAt: new Date(), 
            user: user.profile.name,
            avatar: user.profile.avatar,
            userId: user._id,
            likes: []
        }
        Posts.insert(newPost)
    },
    'posts.like'(postId){
        let post = Posts.findOne({_id: postId})
        let loggerdUser = Meteor.userId();
        let dupLike = post.likes.find(l => l === loggerdUser);

        if(dupLike) {
            throw new Meteor.Error(409,'Você já curtiu essa foto.')

        }

        post.likes.push(loggerdUser)
        Posts.update({_id: postId}, {$set: post })
    },

    'posts.remove'(postId) {
        let pos = Posts.findOne({_id: postId});

        if (post.userId != Meteor.userId()){
            throw new Meteor.Error(409, "Opps. Está foto não é sua!")
        }
        Posts.remove({_id: postId})
    }
})