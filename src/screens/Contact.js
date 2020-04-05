import React, {useState} from 'react';
import {
  Platform,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {ScreenContainer} from './../Screens';
import Button from './../components/Button';

const Contact = () => {
  const [allContacts, setAllContacts] = useState([]);
  const requestContactPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    } else {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      ]);

      if (
        granted['android.permission.READ_CONTACTS'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_CONTACTS'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const getContact = () => {
    requestContactPermission().then((granted) => {
      if (granted) {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
            // error
            console.warn(err);
          } else {
            // contacts returned in Array
            setAllContacts(contacts);
          }
        });
      } else {
        alert('no permission!');
      }
    });
  };

  return (
    <ScreenContainer>
      <Button onPress={getContact} title="Get a contact" />
      {allContacts.map((item, i) => (
        <TouchableOpacity
          key={i}
          //   style={styles.container}
          onPress={() => alert(item)}>
          <Text
          //   style={styles.text}
          >
            {item.givenName} {item.familyName}
          </Text>
        </TouchableOpacity>
      ))}
    </ScreenContainer>
  );
};

export default Contact;
