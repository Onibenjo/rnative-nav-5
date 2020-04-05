import React, {useState} from 'react';
import {
  Platform,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
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

  const getContacts = () => {
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

  const addContact = () => {
    requestContactPermission().then((granted) => {
      if (granted) {
        const newContact = {};

        Contacts.addContact(newContact, (err) => {
          if (err) {
            throw err;
          } else {
            // contacts returned in Array
            getContacts();
          }
        });
      } else {
        alert('no permission!');
      }
    });
  };

  const openForm = () => {
    requestContactPermission().then((granted) => {
      if (granted) {
        Contacts.openContactForm({}, (err) => {
          if (err) {
            throw err;
          } else {
            // contacts returned in Array
            //   getContacts();
          }
        });
      } else {
        alert('no permission!');
      }
    });
  };

  return (
    <ScreenContainer>
      <FlatList
        data={allContacts}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => alert(item)}>
            <Text style={styles.item}>
              {item.givenName} {item.familyName}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
      />
      <Button onPress={getContacts} title="Loads Contact" />
      <Button onPress={addContact} title="Add a Contact" />
      <Button onPress={openForm} title="Open Form" />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default Contact;
