import { Links } from '/imports/api/links/links.js';
import { Meteor } from 'meteor/meteor';
import './links.html';

Template.links_Page.onCreated(function () {
  Meteor.subscribe('links.all');
});

Template.links_Page.helpers({
  links() {
    return Links.find({});
  },
});

Template.links_Page.events({
  'click #newLinkButton'(event) {
    event.preventDefault();

  // Com JS meteor / submit event
  //  const target = event.target;
  //  const title = target.title;
  //  const url = target.url;
  //  const group = target.group;

  //  let newLink = {title: title.value, url: url.value, group: group.value}
 // Com jquery e evento de click
    const title = $('input[name=title]');
    const url = $('input[name=url]');
    const group = $('select[name=group]');

    let newLink = { title: title.val(), url: url.val(), group: group.val() }


    Meteor.call('links.insert', newLink, (error) => {
      if (error) {
        alert(error.error);
      } else {
        title.value = '';
        url.value = '';
        group.value = '';
      }
    });
  },
});
