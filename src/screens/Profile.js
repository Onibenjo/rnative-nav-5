import React, {useState, useContext} from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import Button from './../components/Button';
import ImagePicker from 'react-native-image-picker';
import {AuthContext} from './../context';
import {ScreenContainer} from './../Screens';

const Profile = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);

  const addAvatar = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Select a cool avatar',
        takePhotoButtonTitle: 'Take a pretty one!',
        chooseFromLibraryButtonTitle: 'Pick from gallery...',
      },
      (res) => {
        if (res.didCancel) {
          console.warn('Cancelled!');
        } else if (res.error) {
          console.warn(res.error);
        } else {
          setAvatar(res.uri);
        }
      },
    );
  };

  return (
    <ScreenContainer>
      <Text>Profile Screen</Text>
      <Image source={{uri: avatar}} style={styles.avatar} />
      <Button onPress={addAvatar} title="Add an avatar" />

      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Contacts" onPress={() => navigation.push('Contact')} />
      <Button title="Signout" onPress={() => signOut()} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});

export default Profile;
