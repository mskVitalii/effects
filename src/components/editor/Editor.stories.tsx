import type { Meta, StoryObj } from "@storybook/react";
import Editor from "./Editor";
import { mockPage } from "../../utils/mock";
import { fn } from "@storybook/test";
import styles from "../../../styles/Index.module.scss";
import classNames from "classnames";

const meta = {
  title: "Editor/Editor",
  component: Editor,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    page: mockPage,
    setContentPage: () => fn(),
  },
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EditorStory: Story = {
  render: (args) => (
    <div className={classNames(styles.editorContainer, styles.editorTime)}>
      <Editor {...args} />
    </div>
  ),
};