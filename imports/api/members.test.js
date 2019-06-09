import { Meteor } from 'meteor/meteor';
import faker from 'faker';
import { Members } from '../imports/api/members';

if (Meteor.isServer) {
  describe('Add member', () => {
    it('can add a new member', () => {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const member = faker.internet.userName();
        const street = faker.address.streetAddress();
        const city = faker.address.city();
        const state = faker.address.state();
        const zip = faker.address.zipCode();
        const lastCheckout = faker.date.past();
        const numberOfNights = faker.random.number(40);
        const preferences = faker.random.words();

        Members.insert({
          firstName,
          lastName,
          member,
          street,
          city,
          state,
          zip,
          lastCheckout,
          numberOfNights,
          preferences,
          createdAt: new Date(),
        });
    });
  });
}
