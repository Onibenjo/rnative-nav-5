import React, {useState, useEffect, useMemo} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {AuthContext} from './src/context';
import {
  SignIn,
  CreateAccount,
  Splash,
  Home,
  Profile,
  Search,
  Details,
  Search2,
} from './src/Screens';

// Creating screen stacks
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({route}) => ({
        title: route.params.name,
      })}
    />
  </HomeStack.Navigator>
);
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
    {/* <ProfileStack.Screen name="Search2" component={Search2} /> */}
  </ProfileStack.Navigator>
);

const Tab = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('ben');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('ben');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return isLoading ? (
    <Splash />
  ) : (
    <AuthContext.Provider value={authContext}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          {userToken ? (
            <Drawer.Navigator>
              <Drawer.Screen name="Home" component={Tab} />
              <Drawer.Screen name="Profile" component={ProfileStackScreen} />
            </Drawer.Navigator>
          ) : (
            <AuthStack.Navigator>
              <AuthStack.Screen
                name="SignIn"
                component={SignIn}
                options={{title: 'Sign In'}}
              />
              <AuthStack.Screen
                name="CreateAccount"
                component={CreateAccount}
                options={{title: 'Create Acct'}}
              />
            </AuthStack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaView>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaeaea',
    flex: 1,
  },
});

export default App;
