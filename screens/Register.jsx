import React, { useContext } from 'react';
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
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { AuthContext } from '../context/AuthContext';
import {
  Formik,
  Form,
  Field,
  yupToFormErrors,
  useFormik,
  FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import { languageOptions } from '../helpers/languages';

export const Register = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const softSkillsOptions = [
    { id: 1, name: 'Comunicación' },
    { id: 2, name: 'Liderazgo' },
    { id: 3, name: 'Trabajo en equipo' },
    { id: 4, name: 'Creatividad' },
    { id: 5, name: 'Gestión de proyectos' },
  ];
  const [areaSkills, setAreaSkills] = useState([]);
  const areaSkillsOptions = [
    { id: 1, name: 'Desarrollo web' },
    { id: 2, name: 'Desarrollo móvil' },
    { id: 3, name: 'Desarrollo de software' },
  ];

  console.log(selectedLanguages);
  console.log(softSkills);
  console.log(areaSkills);

  const { signUp } = useContext(AuthContext);

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required('El campo nombre es requerido'),
    lastName: Yup.string().required('El campo apellido es requerido'),
    // date: Yup.date().required('El campo fecha es requerido'),
    user: Yup.string()
      .email('Ingrese un correo valido')
      .required('El campo correo es requerido'),
    username: Yup.string().required('El campo username es requerido'),
    password: Yup.string().required('El campo contraseña es requerido'),
    //softSkills: Yup.array().min(1, 'Seleccione al menos una habilidad blanda'),
  });

  const register = (values, formikHelpers) => {
    Keyboard.dismiss();
    signUp(
      values.name,
      values.lastName,
      date,
      values.user,
      values.username,
      values.password,
      selectedLanguages,
      softSkills,
      areaSkills,
    );
    formikHelpers.setSubmitting(false);
  };

  const toggleLanguage = language => {
    const selectedLanguage = languageOptions.find(
      option => option.name === language,
    );
    if (!selectedLanguage) {
      return; // Opción no encontrada, manejar según sea necesario
    }

    const isSelected = selectedLanguages.includes(selectedLanguage.id);
    if (isSelected) {
      setSelectedLanguages(
        selectedLanguages.filter(langId => langId !== selectedLanguage.id),
      );
    } else {
      setSelectedLanguages([...selectedLanguages, selectedLanguage.id]);
    }
  };

  const toggleAreaSkill = areaSkill => {
    const selectedAreaSkill = areaSkillsOptions.find(
      option => option.name === areaSkill,
    );
    if (!selectedAreaSkill) {
      return; // Opción no encontrada, manejar según sea necesario
    }

    const isSelected = areaSkills.includes(selectedAreaSkill.id);
    if (isSelected) {
      setAreaSkills(
        areaSkills.filter(skillId => skillId !== selectedAreaSkill.id),
      );
    } else {
      setAreaSkills([...areaSkills, selectedAreaSkill.id]);
    }
  };

  const toggleSoftSkill = softSkill => {
    const selectedSoftSkill = softSkillsOptions.find(
      option => option.name === softSkill,
    );
    if (!selectedSoftSkill) {
      return; // Opción no encontrada, manejar según sea necesario
    }

    const isSelected = softSkills.includes(selectedSoftSkill.id);
    if (isSelected) {
      setSoftSkills(
        softSkills.filter(skillId => skillId !== selectedSoftSkill.id),
      );
    } else {
      setSoftSkills([...softSkills, selectedSoftSkill.id]);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          date: new Date(),
          user: '',
          username: '',
          password: '',
          //softSkills: [],
        }}
        onSubmit={(values, formikHelpers) => register(values, formikHelpers)}
        validationSchema={registerValidationSchema}>
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAvoidingView>
              <ScrollView>
                <View style={{ flex: 1 }}></View>
                <View style={styles.container}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 24,
                      textAlign: 'center',
                      marginTop: 60,
                      fontFamily: 'LobsterTwo-Regular',
                    }}>
                    Regístrate en SocialDEV{'\n'}y únete a nuestra comunidad.
                  </Text>
                  <View>
                    <TextInput
                      placeholder="Nombre"
                      placeholderTextColor={'grey'}
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      keyboardType="default"
                      style={styles.inputs}
                    />
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.name}
                    </Text>
                  </View>
                  <View>
                    <TextInput
                      placeholder="Apellido"
                      placeholderTextColor={'grey'}
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      keyboardType="default"
                      style={styles.inputs}
                    />
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.lastName}
                    </Text>
                  </View>
                  <View>
                    <TextInput
                      placeholder="Username"
                      placeholderTextColor={'grey'}
                      value={values.username}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      keyboardType="default"
                      style={styles.inputs}
                    />
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.username}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      value={values.date}
                      style={styles.inputs}
                      onChangeText={handleChange('date')}
                      onBlur={handleBlur('date')}
                      onPress={() => setOpen(true)}>
                      <Text style={styles.dateText}>
                        {date.toLocaleDateString()}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TextInput
                      placeholder="Correo"
                      placeholderTextColor={'grey'}
                      value={values.user}
                      onChangeText={handleChange('user')}
                      onBlur={handleBlur('user')}
                      keyboardType="email-address"
                      style={styles.inputs}
                    />
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.user}
                    </Text>
                  </View>
                  <View>
                    <TextInput
                      placeholder="Contraseña"
                      placeholderTextColor={'grey'}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={true}
                      style={styles.inputs}
                    />
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.password}
                    </Text>
                  </View>
                  {/* Lista de checkboxes para seleccionar los lenguajes de programación */}
                  {
                    <View
                      style={{
                        marginTop: 15,
                        alignItems: 'flex-start',
                        width: 250,
                      }}>
                      <Text style={{
                        color: 'black',
                        fontSize: 22,
                        textAlign: 'center',
                        marginTop: 60,
                        fontFamily: 'LobsterTwo-Regular',
                      }}>Lenguajes Dominados:</Text>
                      <View>
                        {languageOptions.map(language => (
                          <View
                            key={language.id}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity
                              style={styles.checkbox}
                              onPress={() => toggleLanguage(language.name)}>
                              <Text
                                style={{
                                  color: selectedLanguages.includes(language.id)
                                    ? 'black'
                                    : 'white',
                                }}>
                                ✓
                              </Text>
                            </TouchableOpacity>
                            <Text style={styles.dateText}>{language.name}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  }
                  {/* Lista de checkboxes para seleccionar las areaSkills */}
                  {
                    <View
                      style={{
                        marginTop: 15,
                        alignItems: 'flex-start',
                        width: 250,
                      }}>
                      <Text style={{
                        color: 'black',
                        fontSize: 24,
                        textAlign: 'center',
                        marginTop: 60,
                        fontFamily: 'LobsterTwo-Regular',
                      }}>Habilidades en tu area:</Text>
                      <View>
                        {areaSkillsOptions.map(areaSkill => (
                          <View
                            key={areaSkill.id}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity
                              style={styles.checkbox}
                              onPress={() => toggleAreaSkill(areaSkill.name)}>
                              <Text
                                style={{
                                  color: areaSkills.includes(areaSkill.id)
                                    ? 'black'
                                    : 'white',
                                }}>
                                ✓
                              </Text>
                            </TouchableOpacity>
                            <Text style={styles.dateText}>{areaSkill.name}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  }

                  {/* Lista de checkboxes para seleccionar las softSkills */}
                  {
                    <View
                      style={{
                        marginTop: 15,
                        alignItems: 'flex-start',
                        width: 250,
                      }}>
                      <Text style={{
                        color: 'black',
                        fontSize: 24,
                        textAlign: 'center',
                        marginTop: 60,
                        fontFamily: 'LobsterTwo-Regular',
                      }}>Habilidades blandas:</Text>
                      <View>
                        {softSkillsOptions.map(softSkill => (
                          <View
                            softSkill={softSkill}
                            key={softSkill.id}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity
                              style={styles.checkbox}
                              onPress={() => toggleSoftSkill(softSkill.name)}>
                              <Text
                                style={{
                                  color: softSkills.includes(softSkill.id)
                                    ? 'black'
                                    : 'white',
                                }}>
                                ✓
                              </Text>
                            </TouchableOpacity>
                            <Text style={styles.dateText}>{softSkill.name}</Text>
                          </View>
                        ))}
                        <Text style={{ fontSize: 10, color: 'red' }}>
                          {errors.softSkills}
                        </Text>
                      </View>
                    </View>
                  }
                  {/* Botón de registro */}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}>
                    <Text>Registrarte</Text>
                  </TouchableOpacity>
                  <View style={{ marginTop: 10 }}></View>
                </View>
                <View style={{ flex: 1 }}></View>
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
            </KeyboardAvoidingView>
          </SafeAreaView>
        )}
      </Formik>
    </>
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
    marginTop: 15,
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
