import { Meteor } from 'meteor/meteor';

var fs = Npm.require('fs');
var path = Npm.require('path');

Meteor.methods({
    'users.update'(user) {
        var publicPath = path.resolve('.').split('.meteor')[0] + 'public';
        var relativePath = '/uploads/avatars/' + user.id + '.jpg';
        var targetPath = publicPath + relativePath;
        fs.writeFileSync(targetPath, user.binaryAvatar, 'binary');

        Meteor.users.update({_id: user_id}, { $set: {"profile.avatar": relativePath} })
    }

})