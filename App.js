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
  Search,
  Details,
  Search2,
} from './src/Screens';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Contact from './src/screens/Contact';

// Creating screen stacks
//home screens
const HomeStack = createStackNavigator();
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
//search screens
const SearchStack = createStackNavigator();
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator initialRouteName="Profile">
    <ProfileStack.Screen name="Profile" component={Profile} />
    <ProfileStack.Screen name="Contact" component={Contact} />
  </ProfileStack.Navigator>
);

//Tabs screens
const Tabs = createBottomTabNavigator();
const Tab = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Search" component={SearchStackScreen} />
  </Tabs.Navigator>
);
//Drawer screen
const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={Tab} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
);
//Auth screens
const AuthStack = createStackNavigator();
const AuthScreen = () => (
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
);

//Optional -- Signin out, the signin screen slides in
//Incase u dont want that, u can do this
//disabling animation creates an
//instant jump between auth stack
const RootStack = createStackNavigator();
const RootStackScreen = ({userToken}) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

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
    }, 900);
  }, []);

  return isLoading ? (
    <Splash />
  ) : (
    <AuthContext.Provider value={authContext}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <RootStackScreen userToken={userToken} />
          {/* {userToken ? (
            <DrawerScreen/>
          ) : (
            <AuthScreen/>
          )} */}
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
