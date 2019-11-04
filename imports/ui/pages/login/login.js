import { Meteor } from 'meteor/meteor'
import './login.html';

Template.login_Page.onCreated( function (){
    this.alertMessage = new ReactiveVar(null);
});

Template.login_Page.helpers({
    alertMessage() {
        return Template.instance().alertMessage.get();
    }
});

Template.login_Page.events({
    'submit #signinForm' (event, instance) {
        event.preventDefault();
        const form = event.target;
        const email = form.email;
        const password = form.password;

        Meteor.loginWithPassword(email.value, password.value, function (err) {
            if (err) {
                instance.alertMessage.set({value: err.reason, color: 'red' })
                return false
            } else {
                FlowRouter.go('/');
            }
        })
    }
})