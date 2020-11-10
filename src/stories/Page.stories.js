import React from 'react';

import { Page } from './Page';
import * as HeaderStories from './Header.stories';
import {action} from "@storybook/addon-actions";

export default {
  title: 'Example/Page',
  component: Page,
};

const actions = {
  onLogin: action('onLogin'),
  onLogout: action('onLogout'),
  onCreateAccount: action('onLogout'),
}

const Template = (args) => <Page {...args} {...actions} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
