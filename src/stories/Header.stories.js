import React from 'react';

import { Header } from './Header';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Example/Header',
  component: Header,
};

const actions = {
  onLogin: action('onLogin'),
  onLogout: action('onLogout'),
  onCreateAccount: action('onLogout'),
}

const Template = (args) => <Header {...args} {...actions} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
