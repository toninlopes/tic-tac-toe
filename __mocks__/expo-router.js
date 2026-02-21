/**
 * Mock for expo-router.
 * Use in tests with: jest.mock('expo-router');
 */
const React = require('react');
const { View } = require('react-native');

const mockNav = {
  setOptions: jest.fn(),
  navigate: jest.fn(),
  goBack: jest.fn(),
  replace: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(() => jest.fn()),
  removeListener: jest.fn(),
  canGoBack: jest.fn(() => true),
  getState: jest.fn(),
  dispatch: jest.fn(),
  isFocused: jest.fn(() => true),
};

function useNavigation() {
  return mockNav;
}

const router = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  canGoBack: jest.fn(() => true),
  canDismiss: jest.fn(() => true),
  dismiss: jest.fn(),
  dismissTo: jest.fn(),
  setParams: jest.fn(),
  navigate: jest.fn(),
};

function useRouter() {
  return router;
}

function usePathname() {
  return '/';
}

function useLocalSearchParams() {
  return {};
}

function useGlobalSearchParams() {
  return {};
}

function useSegments() {
  return [];
}

function useRootNavigation() {
  return mockNav;
}

function useRootNavigationState() {
  return { key: 'mock' };
}

function useNavigationContainerRef() {
  return { current: null };
}

function useUnstableGlobalHref() {
  return '/';
}

function Slot({ children }) {
  return React.createElement(View, null, children);
}

function Navigator({ children }) {
  return React.createElement(View, null, children);
}

function StackScreen() {
  return null;
}
StackScreen.displayName = 'Stack.Screen';

function Stack({ children }) {
  return React.createElement(View, null, children);
}
Stack.Screen = StackScreen;

function TabsScreen() {
  return null;
}
TabsScreen.displayName = 'Tabs.Screen';

function Tabs({ children }) {
  return React.createElement(View, null, children);
}
Tabs.Screen = TabsScreen;

function Link({ children, href, ...rest }) {
  return React.createElement(View, { ...rest }, children);
}

function useIsPreview() {
  return false;
}

function ErrorBoundary({ children }) {
  return React.createElement(View, null, children);
}

const Sitemap = View;
const Unmatched = View;
const ExpoRoot = ({ children }) => React.createElement(View, null, children);
const Prefetch = () => null;

const useSitemap = () => ({});

const SplashScreen = {
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
};

module.exports = {
  useNavigation,
  useRouter,
  usePathname,
  useLocalSearchParams,
  useGlobalSearchParams,
  useSegments,
  useRootNavigation,
  useRootNavigationState,
  useNavigationContainerRef,
  useUnstableGlobalHref,
  useIsPreview,
  useFocusEffect: (fn) => fn?.(),
  router,
  Stack,
  Tabs,
  Slot,
  Navigator,
  Link,
  ErrorBoundary,
  Sitemap,
  Unmatched,
  ExpoRoot,
  Prefetch,
  useSitemap,
  SplashScreen,
};
