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
    width: 30,
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
      style={styles.button}
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
    <Button
      title="Drawer"
      onPress={() => {
        navigation.toggleDrawer();
      }}
    />
  </ScreenContainer>
);
//Search 2
export const Search2 = ({navigation}) => (
  <ScreenContainer>
    <Text>Second Search Screen</Text>
  </ScreenContainer>
);
//Profile
export const Profile = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  return (
    <ScreenContainer>
      <Text>Profile Screen</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Signout" onPress={() => signOut()} />
    </ScreenContainer>
  );
};
//Splash
export const Splash = () => (
  <ScreenContainer>
    <Text>Loading...</Text>
  </ScreenContainer>
);

export const SignIn = ({navigation}) => {
  const {signIn} = useContext(AuthContext);
  return (
    <ScreenContainer>
      <Text>SignIn Screen</Text>
      <Button title="Sign In" onPress={() => signIn()} style={styles.button} />
      <Button
        title="Create Account"
        onPress={() => navigation.push('CreateAccount')}
      />
    </ScreenContainer>
  );
};
export const CreateAccount = () => {
  const {signUp} = useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Create Account Screen</Text>
      <Button title="Sign Up" onPress={() => signUp()} />
    </ScreenContainer>
  );
};
