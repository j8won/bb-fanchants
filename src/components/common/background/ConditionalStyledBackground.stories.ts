import { Meta, StoryObj } from '@storybook/react';
import ConditionalStyledBackground from '@/components/common/background/ConditionalStyledBackground';

const meta: Meta<typeof ConditionalStyledBackground> = {
  title: 'Common/ConditionalStyledBackground',
  component: ConditionalStyledBackground,
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be rendered inside the backgroud component',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const RootPath: Story = {
  args: {
    children: 'This is the root path',
  },
};

export const OtherPath: Story = {
  args: {
    children: 'This is another path',
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/about-us',
      },
    },
  },
};
