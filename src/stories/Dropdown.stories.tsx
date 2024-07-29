import {useState} from "react";
import Dropdown from '../components/Dropdown.tsx'; // Assuming your component is in './Dropdown' folder
import { withKnobs, boolean  } from '@storybook/addon-knobs';
import type {Meta} from "@storybook/react";
import {options} from "../App.tsx";

const stories = {
  title: 'Example/Dropdown',
  component: Dropdown,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [withKnobs],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Dropdown>;

export const BasicExample = () => {
  // Use knobs to control props
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const onChange = (value: string[]) => console.log(value);
  const isMultiple = boolean('isMultiple', true);
  const isDisabled = boolean('isDisabled', false);

  return (
    <Dropdown
      options={options}
      onChange={onChange}
      isMultiple={isMultiple}
      isDisabled={isDisabled}
    />
  );
};

stories.BasicExample = BasicExample;

export default stories;

// export const Primary: Story = {
//   args: {
//     primary: true,
//     label: 'Button',
//   },
// };