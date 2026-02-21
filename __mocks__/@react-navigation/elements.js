/**
 * Mock for @react-navigation/elements.
 * Use in tests with: jest.mock('@react-navigation/elements');
 */
const React = require('react');
const { Pressable, Text, View } = require('react-native');

function Button({ children, onPress, disabled, ...rest }) {
  return React.createElement(
    Pressable,
    { onPress, disabled, ...rest },
    typeof children === 'string' ? React.createElement(Text, null, children) : children
  );
}

function Background() {
  return React.createElement(View, null);
}

function Badge() {
  return React.createElement(View, null);
}

function Header() {
  return React.createElement(View, null);
}

function HeaderBackButton() {
  return React.createElement(View, null);
}

function HeaderButton() {
  return React.createElement(View, null);
}

function HeaderTitle() {
  return React.createElement(View, null);
}

function Label() {
  return React.createElement(View, null);
}

function Screen({ children }) {
  return React.createElement(View, null, children);
}

function NavText({ children }) {
  return React.createElement(Text, null, children);
}

const getDefaultHeaderHeight = () => 0;
const getDefaultSidebarWidth = () => 0;
const getHeaderTitle = () => '';
const getLabel = () => '';

module.exports = {
  Background,
  Badge,
  Button,
  getDefaultSidebarWidth,
  getDefaultHeaderHeight,
  getHeaderTitle,
  Header,
  HeaderBackButton,
  HeaderBackground: Background,
  HeaderButton,
  HeaderBackContext: { Provider: ({ children }) => children },
  HeaderHeightContext: { Provider: ({ children }) => children },
  HeaderShownContext: { Provider: ({ children }) => children },
  HeaderTitle,
  useHeaderHeight: () => 0,
  getLabel,
  Label,
  Lazy: ({ children }) => children,
  MissingIcon: View,
  PlatformPressable: Pressable,
  ResourceSavingView: View,
  SafeAreaProviderCompat: ({ children }) => children,
  Screen,
  Text: NavText,
  useFrameSize: () => ({ width: 0, height: 0 }),
  Assets: [],
};
