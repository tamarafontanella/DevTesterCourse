import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/profile/profile.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/links/links.js'
import '../../ui/pages/login/login.js'
import '../../ui/pages/signup/signup.js'
// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

var loggerdRoutes = FlowRouter.group({
  prefix: '',
  name: 'home',
  triggersEnter: [function (context, redirect) {
    if (!Meteor.userId()) { FlowRouter.go('/login') }
  }]
})

loggerdRoutes.route('/profile', {
  name: 'App.profile',
  action() {
    BlazeLayout.render('App_body', { main: 'App_profile' });
  },
});

FlowRouter.route('/links', {
  name: 'App.links',
  action() {
    BlazeLayout.render('App_body', { main: 'links_Page' });
  },
});

FlowRouter.route('/login', {
  name: 'App.login',
  action() {
    BlazeLayout.render('App_body', { main: 'login_Page' });
  },
});

FlowRouter.route('/logout', {
  name: 'logout',
  action() {
    Meteor.logout(() => {
      FlowRouter.go('/login');
    })
  },
});

FlowRouter.route('/signup', {
  name: 'App.signup',
  action() {
    BlazeLayout.render('App_body', { main: 'signup_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
