import './profile.html'

Template.App_profile.events({
    'event #avatar': function (event) {
        event.preventDefault();

        var file = event.currentTarget.files[0];
        var reader = new FileReader();

        if (file) {
            reader.onload = function () {
                let user = {
                    id: Meteor.userId(),
                    binaryAvatar: reader.result
                }

                Meteor.call('users.update', user, (err, res) => {
                    if (err) {
                        alert(err.reason);
                    } else {
                        return true;
                    }
                })
            }

            reader.onloadend = function () {
                console.log('tudo certo, consegui ler o arquivo')

            }
            reader.readAsBinaryString(file);
        }
    }
})