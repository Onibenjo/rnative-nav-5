import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {AuthContext} from './context';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});

const ScreenContainer = ({children}) => (
  <View style={styles.container}>{children}</View>
);

export const Home = ({navigation}) => (
  <ScreenContainer>
    <Text>Master List Screen</Text>
    <Button
      title="RN Example"
      onPress={() => {
        navigation.push('Details', {
          name: 'RN Example',
        });
      }}
      style={styles.button}
    />
    <Button
      title="RN School"
      onPress={() => {
        navigation.push('Details', {
          name: 'RN School',
        });
      }}
    />
    <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
  </ScreenContainer>
);
export const Details = ({route}) => (
  <ScreenContainer>
    <Text>Details Sccreen</Text>
    {route.params.name && <Text>{route.params.name}</Text>}
  </ScreenContainer>
);

export const Search = ({navigation}) => (
  <ScreenContainer>
    <Text>Search Screen</Text>
    <Button
      title="Search 2"
      onPress={() => {
        navigation.push('Search2');
      }}
    />
    <Button
      title="RN School"
      onPress={() =>
        navigation.navigate('Home', {
          screen: 'Details',
          params: {name: 'RN School'},
        })
      }
    />
    <Button title="Drawer" onPress={() => {}} />
  </ScreenContainer>
);
export const Search2 = ({navigation}) => (
  <ScreenContainer>
    <Text>Second Search Screen</Text>
    <Button title="RN Example" onPress={() => {}} />
    <Button title="RN School" onPress={() => {}} />
    <Button title="Drawer" onPress={() => {}} />
  </ScreenContainer>
);

export const Profile = ({navigation}) => (
  <ScreenContainer>
    <Text>Profile Screen</Text>
    <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    <Button title="Signout" onPress={() => {}} />
  </ScreenContainer>
);

export const Splash = () => (
  <ScreenContainer>
    <Text>Loading...</Text>
  </ScreenContainer>
);

export const SignIn = ({navigation}) => {
  const auth = useContext(AuthContext);
  return (
    <ScreenContainer>
      <Text>SignIn Screen</Text>
      <Button
        title="Sign In"
        onPress={() => auth.signIn()}
        style={styles.button}
      />
      <Button
        title="Create Account"
        onPress={() => navigation.push('CreateAccount')}
      />
    </ScreenContainer>
  );
};
export const CreateAccount = () => (
  <ScreenContainer>
    <Text>Create Account Screen</Text>
    <Button title="Sign Up" onPress={() => {}} />
  </ScreenContainer>
);
