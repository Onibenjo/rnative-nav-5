import React, {useState} from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {ScreenContainer} from '../Screens';
import Button from './../components/Button';

const Home = ({navigation}) => {
  const [avatar, setAvatar] = useState(null);

  const addAvatar = () => {
    ImagePicker.showImagePicker({}, res => {
      if (res.didCancel) {
        console.warn('Cancelled!');
      } else if (res.error) {
        console.warn(res.error);
      } else {
        setAvatar(res.uri);
      }
    });
  };
  return (
    <ScreenContainer>
      <Text>Master List Screen</Text>
      <Image source={{uri: avatar}} style={styles.avatar} />
      <Button onPress={addAvatar} title="Add an avatar" />
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
