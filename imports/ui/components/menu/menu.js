import './menu.html'

Template.menu.helpers({
    userName() {
        var user = Meteor.user();
        if (user) {
            return user.profile.name;
        }
    }
})

Template.menu.events({
    'click #newPost': function() {
        event.preventDefault();
        $('.uploadPhoto').click();
    },
    'change #photoId': function(event) {
        event.preventDefault();

        var file = event.currentTarget.files[0];
        var reader = new FileReader();

        if(file) {
            reader.onload = function() {
                let photo = {binary: reader.result, name: file.name}
                Meteor.call('posts.insert', photo, (err, res) => {
                    if(err) {
                        alert(err.reason);
                    } else {
                        return true;
                    }
                })
            }

            reader.onloadend = function() {

            }
            reader.readAsBinaryString(file);
        }
    }
})