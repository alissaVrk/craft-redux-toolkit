import { ThemeProvider } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Checkbox } from "components"
import { theme } from "../theme"

export default {
    title: 'Checkbox',
    component: Checkbox,
    argTypes: {
      checked: {control: "boolean"},
      disabled: {control: "boolean"}
    },
    parameters: {controls: {include: ['checked', 'disabled']}}
  } as ComponentMeta<typeof Checkbox>;

  const Template: ComponentStory<typeof Checkbox> = (args) => <ThemeProvider theme={theme}> <Checkbox {...args} /> </ThemeProvider>;

  export const Unchecked = Template.bind({});
  Unchecked.args = {checked: false}

  export const Checked = Template.bind({});
  Checked.args = {checked: true};

  export const Hover = Template.bind({});
  Hover.parameters = { pseudo: {hover: true} }