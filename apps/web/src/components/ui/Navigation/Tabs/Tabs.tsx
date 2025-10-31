import { Trigger } from './internals';
import { TriggerSize, TriggerVariant } from './types';
import { Content, List, Root, type TabsProps } from '@radix-ui/react-tabs';

/**
 * `Tabs` component for organizing content into multiple tabs. Supports tab
 * navigation and active state management.
 *
 * @see https://www.uiguideline.com/components/tabs
 */
export const Tabs = (props: TabsProps) => <Root {...props} />;
Tabs.List = List;
Tabs.Content = Content;
Tabs.Trigger = Trigger;

Tabs.displayName = 'Tabs';

export { TriggerSize, TriggerVariant };

/**
 * Reference: https://www.radix-ui.com/primitives/docs/components/tabs.
 */
