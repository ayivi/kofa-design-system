import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';

export type TabsActivationMode = 'automatic' | 'manual';

interface TabsContextValue {
  activationMode: TabsActivationMode;
  baseId: string;
  registerTab: (value: string) => () => void;
  selectValue: (value: string) => void;
  selectedValue?: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`${componentName} must be used within Tabs.`);
  }
  return context;
}

function toIdPart(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
}

export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  /** Controlled active tab value. */
  value?: string;
  /** Initial active tab value for uncontrolled usage. Defaults to the first tab. */
  defaultValue?: string;
  /** Called whenever a tab becomes active. */
  onValueChange?: (value: string) => void;
  /** Automatic follows keyboard focus; manual requires Enter or Space. */
  activationMode?: TabsActivationMode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      activationMode = 'automatic',
      className = '',
      defaultValue,
      onValueChange,
      value,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const [registeredValues, setRegisteredValues] = useState<string[]>([]);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = value !== undefined;
    const selectedValue =
      (isControlled ? value : internalValue) ?? registeredValues[0];

    const registerTab = useCallback((tabValue: string) => {
      setRegisteredValues((current) =>
        current.includes(tabValue) ? current : [...current, tabValue],
      );
      return () => {
        setRegisteredValues((current) =>
          current.filter((registered) => registered !== tabValue),
        );
      };
    }, []);

    const selectValue = useCallback(
      (nextValue: string) => {
        if (!isControlled) setInternalValue(nextValue);
        if (nextValue !== selectedValue) onValueChange?.(nextValue);
      },
      [isControlled, onValueChange, selectedValue],
    );

    const contextValue = useMemo<TabsContextValue>(
      () => ({
        activationMode,
        baseId: `kofa-tabs-${generatedId.replace(/:/g, '')}`,
        registerTab,
        selectValue,
        selectedValue,
      }),
      [activationMode, generatedId, registerTab, selectValue, selectedValue],
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={['kofa-tabs', className].filter(Boolean).join(' ')}
          {...props}
        />
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = 'Tabs';

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible name describing the set of tabs. */
  'aria-label'?: string;
}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className = '', onKeyDown, ...props }, ref) => {
    const { activationMode, selectValue } = useTabsContext('TabList');

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      const tabs = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]:not(:disabled)',
        ),
      );
      if (tabs.length === 0) return;

      const currentIndex = tabs.indexOf(
        document.activeElement as HTMLButtonElement,
      );
      let nextIndex: number | undefined;

      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (event.key === 'ArrowRight') {
        nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % tabs.length;
      }
      if (event.key === 'ArrowLeft') {
        nextIndex =
          currentIndex < 0
            ? tabs.length - 1
            : (currentIndex - 1 + tabs.length) % tabs.length;
      }

      if (nextIndex === undefined) return;
      event.preventDefault();
      const nextTab = tabs[nextIndex];
      nextTab?.focus();
      const nextValue = nextTab?.dataset.value;
      if (activationMode === 'automatic' && nextValue) selectValue(nextValue);
    }

    return (
      <div
        ref={ref}
        className={['kofa-tabs__list', className].filter(Boolean).join(' ')}
        role="tablist"
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  },
);

TabList.displayName = 'TabList';

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Stable value shared with its TabPanel. */
  value: string;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      children,
      className = '',
      disabled = false,
      onClick,
      type = 'button',
      value,
      ...props
    },
    ref,
  ) => {
    const { baseId, registerTab, selectValue, selectedValue } =
      useTabsContext('Tab');
    const selected = value === selectedValue;
    const idPart = toIdPart(value);

    useEffect(() => registerTab(value), [registerTab, value]);

    return (
      <button
        ref={ref}
        className={['kofa-tabs__tab', className].filter(Boolean).join(' ')}
        id={`${baseId}-tab-${idPart}`}
        type={type}
        role="tab"
        data-value={value}
        aria-controls={`${baseId}-panel-${idPart}`}
        aria-selected={selected}
        disabled={disabled}
        tabIndex={selected ? 0 : -1}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) selectValue(value);
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Tab.displayName = 'Tab';

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Stable value shared with its Tab. */
  value: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className = '', value, ...props }, ref) => {
    const { baseId, selectedValue } = useTabsContext('TabPanel');
    const idPart = toIdPart(value);
    const selected = value === selectedValue;

    return (
      <div
        ref={ref}
        className={['kofa-tabs__panel', className].filter(Boolean).join(' ')}
        id={`${baseId}-panel-${idPart}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${idPart}`}
        hidden={!selected}
        tabIndex={0}
        {...props}
      />
    );
  },
);

TabPanel.displayName = 'TabPanel';
