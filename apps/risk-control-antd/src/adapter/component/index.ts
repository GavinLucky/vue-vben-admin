/**
 * 通用组件共同的使用的基础组件，原先放在 adapter/form 内部，限制了使用范围，这里提取出来，方便其他地方使用
 * 可用于 vben-form、vben-modal、vben-drawer 等组件使用,
 */

import type { BaseFormComponentType } from '@vben/common-ui';

import type { App, Component, SetupContext } from 'vue';
import { h } from 'vue';

import { globalShareState } from '@vben/common-ui';
import { $t } from '@vben/locales';

import Antd, {
  AutoComplete,
  Button,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  InputPassword,
  Mentions,
  notification,
  Radio,
  RadioGroup,
  RangePicker,
  Rate,
  Select,
  Space,
  Switch,
  Textarea,
  TimePicker,
  TreeSelect,
  Upload,
} from 'ant-design-vue';

import { formInit } from '#/adapter/form';

const withDefaultPlaceholder = <T extends Component>(
  component: T,
  type: 'input' | 'select',
) => {
  return (props: any, { attrs, slots }: Omit<SetupContext, 'expose'>) => {
    const placeholder = props?.placeholder || $t(`ui.placeholder.${type}`);
    return h(component, { ...props, ...attrs, placeholder }, slots);
  };
};

// 这里需要自行根据业务组件库进行适配，需要用到的组件都需要在这里类型说明
export type ComponentType =
  | 'AAutoComplete'
  | 'AButton'
  | 'ACheckbox'
  | 'ACheckboxGroup'
  | 'ADatePicker'
  | 'ADefaultButton'
  | 'ADivider'
  | 'AInput'
  | 'AInputNumber'
  | 'AInputPassword'
  | 'AMentions'
  | 'APrimaryButton'
  | 'ARadio'
  | 'ARadioGroup'
  | 'ARangePicker'
  | 'ARate'
  | 'ASelect'
  | 'ASpace'
  | 'ASwitch'
  | 'ATextarea'
  | 'ATimePicker'
  | 'ATreeSelect'
  | 'AUpload'
  | BaseFormComponentType;

async function initComponentAdapter() {
  const components: Partial<Record<ComponentType, Component>> = {
    // 如果你的组件体积比较大，可以使用异步加载
    // Button: () =>
    // import('xxx').then((res) => res.Button),
    // 特殊定义-覆盖默认组件
    DefaultButton: (props, { attrs, slots }) => {
      return h(Button, { ...props, attrs, type: 'default' }, slots);
    },
    PrimaryButton: (props, { attrs, slots }) => {
      return h(Button, { ...props, attrs, type: 'primary' }, slots);
    },
    AAutoComplete: AutoComplete,
    AButton: Button,
    ACheckbox: Checkbox,
    ACheckboxGroup: CheckboxGroup,
    ADatePicker: DatePicker,
    // 自定义默认按钮
    ADefaultButton: (props, { attrs, slots }) => {
      return h(Button, { ...props, attrs, type: 'default' }, slots);
    },
    ADivider: Divider,
    AInput: withDefaultPlaceholder(Input, 'input'),
    AInputNumber: withDefaultPlaceholder(InputNumber, 'input'),
    AInputPassword: withDefaultPlaceholder(InputPassword, 'input'),
    AMentions: withDefaultPlaceholder(Mentions, 'input'),
    // 自定义主要按钮
    APrimaryButton: (props, { attrs, slots }) => {
      return h(Button, { ...props, attrs, type: 'primary' }, slots);
    },
    ARadio: Radio,
    ARadioGroup: RadioGroup,
    ARangePicker: RangePicker,
    ARate: Rate,
    ASelect: withDefaultPlaceholder(Select, 'select'),
    ASpace: Space,
    ASwitch: Switch,
    ATextarea: withDefaultPlaceholder(Textarea, 'input'),
    ATimePicker: TimePicker,
    ATreeSelect: withDefaultPlaceholder(TreeSelect, 'select'),
    AUpload: Upload,
  };

  // 将组件注册到全局共享状态中
  globalShareState.setComponents(components);

  // 定义全局共享状态中的消息提示
  globalShareState.defineMessage({
    // 复制成功消息提示
    copyPreferencesSuccess: (title, content) => {
      notification.success({
        description: content,
        message: title,
        placement: 'bottomRight',
      });
    },
  });
  formInit();
  // console.log(
  //   ' globalShareState register components',
  //   globalShareState.getComponents(),
  // );
}
const registerAntdComponent = (app: App) => {
  app.use(Antd);
};
export { initComponentAdapter, registerAntdComponent };
