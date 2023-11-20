import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [areaSkills, setAreaSkills] = useState([]);

  //console.log(selectedLanguages);

  const toggleLanguage = language => {
    // Toggle the selection state of the language
    const isSelected = selectedLanguages.includes(language);
    if (isSelected) {
      // If already selected, remove it
      setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
    } else {
      // If not selected, add it
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const toggleAreaSkill = areaSkill => {
    const isSelected = areaSkills.includes(areaSkill);
    if (isSelected) {
      setAreaSkills(areaSkills.filter(skill => skill !== areaSkill));
    } else {
      setAreaSkills([...areaSkills, areaSkill]);
    }
  };

  const toggleSoftSkill = softSkill => {
    const isSelected = softSkills.includes(softSkill);
    if (isSelected) {
      setSoftSkills(softSkills.filter(skill => skill !== softSkill));
    } else {
      setSoftSkills([...softSkills, softSkill]);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{flex: 1}}></View>
        <View style={styles.container}>
          <Text
            style={{
              color: 'black',
              fontSize: 24,
              textAlign: 'center',
              marginTop: 60,
            }}>
            Regístrate en SocialDEV{'\n'}y únete a nuestra comunidad.
          </Text>
          <View>
            <TextInput
              placeholder="Nombre"
              placeholderTextColor={'grey'}
              value={name}
              onChangeText={setName}
              keyboardType="default"
              style={styles.inputs}
            />
          </View>
          <View>
            <TextInput
              placeholder="Apellido"
              placeholderTextColor={'grey'}
              value={lastName}
              onChangeText={setLastName}
              keyboardType="default"
              style={styles.inputs}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.inputs}
              onPress={() => setOpen(true)}>
              <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              placeholder="Correo"
              placeholderTextColor={'grey'}
              value={user}
              onChangeText={setUser}
              keyboardType="email-address"
              style={styles.inputs}
            />
          </View>
          <View>
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor={'grey'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.inputs}
            />
          </View>
          {/* Lista de checkboxes para seleccionar los lenguajes de programación */}
          <View style={{marginTop: 15, alignItems: 'flex-start', width: 250}}>
            <Text>Lenguajes de Programación que dominas:</Text>
            <View>
              {['php', 'java', 'javascript', 'C++', 'c#', 'python', 'css'].map(
                language => (
                  <View
                    key={language}
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={styles.checkbox}
                      onPress={() => toggleLanguage(language)}>
                      <Text
                        style={{
                          color: selectedLanguages.includes(language)
                            ? 'black'
                            : 'white',
                        }}>
                        ✓
                      </Text>
                    </TouchableOpacity>
                    <Text>{language}</Text>
                  </View>
                ),
              )}
            </View>
          </View>
          {/* Lista de checkboxes para seleccionar las areaSkills */}
          <View style={{marginTop: 15, alignItems: 'flex-start', width: 250}}>
            <Text>Habilidades en tu area:</Text>
            <View>
              {[
                'Desarrollo web',
                'Desarrollo móvil',
                'Desarrollo de software',
              ].map(areaSkill => (
                <View
                  key={areaSkill}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => toggleAreaSkill(areaSkill)}>
                    <Text
                      style={{
                        color: areaSkills.includes(areaSkill)
                          ? 'black'
                          : 'white',
                      }}>
                      ✓
                    </Text>
                  </TouchableOpacity>
                  <Text>{areaSkill}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Lista de checkboxes para seleccionar las softSkills */}
          <View style={{marginTop: 15, alignItems: 'flex-start', width: 250}}>
            <Text>Habilidades blandas:</Text>
            <View>
              {[
                'Comunicación',
                'Liderazgo',
                'Trabajo en equipo',
                'Creatividad',
                'Gestión de proyectos',
              ].map(softSkill => (
                <View
                  key={softSkill}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => toggleSoftSkill(softSkill)}>
                    <Text
                      style={{
                        color: softSkills.includes(softSkill)
                          ? 'black'
                          : 'white',
                      }}>
                      ✓
                    </Text>
                  </TouchableOpacity>
                  <Text>{softSkill}</Text>
                </View>
              ))}
            </View>
          </View>
          {/* Botón de registro */}
          <TouchableOpacity style={styles.button}>
            <Text>Registrarte</Text>
          </TouchableOpacity>
          <View style={{marginTop: 10}}></View>
        </View>
        <View style={{flex: 1}}></View>
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={selectedDate => {
            setOpen(false);
            setDate(selectedDate);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    marginTop: 30,
    width: 250,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    marginTop: 15,
    width: 200,
    alignItems: 'center',
  },
  dateText: {
    color: 'black',
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 5,
    backgroundColor: 'white',
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
