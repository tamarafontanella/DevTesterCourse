import { Meteor } from 'meteor/meteor'
import './signup.html';

Template.signup_Page.onCreated(function () {
    this.alertMessage = new ReactiveVar(null);
})

Template.signup_Page.helpers({
    alertMessage() {
        return Template.instance().alertMessage.get();
    }
})

Template.signup_Page.events({
    'submit #signupForm'(event, instance) {
        event.preventDefault();

        const form = event.target;
        let user = {
            email: form.email.value,
            password: form.password.value,
            profile: {
                name: form.fullName.value.trim(),
                terms: form.terms.checked,
                avatar: '/uploads/avatars/default.jpg'
            }
        }
        if (user.email.length == 0) {
            instance.alertMessage.set({ value: 'Email não foi informado.', color: 'blue' });
            form.email.focus();
            return false;
        }
        if (user.profile.name.length == 0) {
            instance.alertMessage.set({ value: 'Nome não informado.', color: 'blue' });
            form.fullName.focus();
            return false;
        }

        let isFullName = /[A-z][ ][A-z]/.test(user.profile.name);

        if (!isFullName) {
            instance.alertMessage.set({ value: 'Informe o nome completo.', color: 'orange' });
            form.fullName.focus();
            return false;
        }
        if (user.password.length == 0) {
            instance.alertMessage.set({ value: 'Senha não informada.', color: 'yellow' });
            form.password.focus();
            return false;
        }
        if (user.password.length < 6) {
            instance.alertMessage.set({ value: 'Senha deve possuir mínimo de seis caracteres.', color: 'yellow' });
            form.password.focus();
            return false;
        }
        if (user.profile.terms == false) {
            instance.alertMessage.set({ value: 'Você precisa aceitar os termos de uso.', color: 'blue' });
            return false;
        }

        Accounts.createUser(user, function (err) {
            if (err) {
                instance.alertMessage.set({
                    value: err.reason,
                    color: 'red'
                })
                return false;
            }
            instance.alertMessage.set(null);
            FlowRouter.go('/');
           
        })
    }
})