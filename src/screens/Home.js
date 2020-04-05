import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {ScreenContainer} from '../Screens';
import Button from './../components/Button';

const Home = ({navigation}) => {
  return (
    <ScreenContainer>
      <Text>Master List Screen</Text>

      <Button
        onPress={() =>
          navigation.navigate('Profile', {
            screen: 'Contact',
          })
        }>
        Contacts
      </Button>
      <Button
        onPress={() =>
          navigation.push('Details', {
            name: 'RN Example',
          })
        }>
        RN Example
      </Button>
      <Button
        title="RN School"
        onPress={() =>
          navigation.push('Details', {
            name: 'RN School',
          })
        }
      />
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: 400,
  },
});

export default Home;
