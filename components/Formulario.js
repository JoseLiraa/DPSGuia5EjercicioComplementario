import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';
import Colors from '../src/utils/Colors';
import RNPickerSelect from 'react-native-picker-select';

const Formulario = ({citas, setCitas, guardarMostrarForm, guardarCitasStorage}) => {
    //variables para el formulario
    const [paciente, guardarPaciente] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    const [seccion, guardarSeccion] = useState(''); //tipo de seccion (fumadores/no fumadores)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    //Muestra u oculta el Time Picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = hora => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false};
        guardarHora(hora.toLocaleString('es-ES', opciones));
        hideDatePicker();
    };

    //Crear nueva cita
    const crearNuevaCita = () => {
        //Validar
        if(paciente.trim() === '' ||
            telefono.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ||
            seccion.trim() === '')
            {
                //Falla la validación
                mostrarAlerta();
                return;
            }

            //Crear una nueva cita
            const cita = { paciente, telefono, fecha, hora, seccion };
            cita.id = shortid.generate();

            //Agregar al state
            const citasNuevo = [...citas, cita];
            setCitas(citasNuevo);

            //Pasar las nuevas citas a storage
            guardarCitasStorage(JSON.stringify(citasNuevo));

            //Ocultar el formulario
            guardarMostrarForm(false);

            //Resetear el formulario
            guardarPaciente('');
            guardarHora('');
            guardarFecha('');
            guardarTelefono('');
            guardarSeccion('');
        };

        //Muestra la alerta si falla la validación
        const mostrarAlerta = () =>{
            Alert.alert(
                'Error', //Titulo
                'Todos los campos son obligatorios', //mensaje
                [{
                    text: 'OK' //Arreglo de botones
                }]
            )
        }

        return (
            <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Cliente:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={ texto => guardarPaciente(texto) }
                    />
                </View>

                <View>
                    <Text style={styles.label}>Cantidad de personas:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={ texto => guardarTelefono(texto) }
                        keyboardType='numeric'
                    />
                </View>

                <View>
                    <RNPickerSelect
                    style={pickerSelect}
                    onValueChange={(value) => guardarSeccion(value)}
                    placeholder={{ label: "Selecciona área de mesa: ", value: ""}}
                    items={[
                        { label: "Para fumadores", value: "Fumadores" },
                        { label: "Para no fumadores", value: "No fumadores" },
                    ]}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button color="#566573" title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                        headerTextIOS="Elige la fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{fecha}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button color="#566573" title="Seleccionar Hora" onPress={showTimePicker}/>
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                        headerTextIOS="Elige una Hora"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{hora}</Text>
                </View>

                <View>
                    <TouchableHighlight onPress={ () => crearNuevaCita() }
                        style={styles.btnSubmit}>
                            <Text style={styles.textoSubmit}>Hacer reservación</Text>
                        </TouchableHighlight>
                </View>
            </ScrollView>
            </>
        );
        }

        const styles = StyleSheet.create({
            formulario: {
                backgroundColor: '#FFF',
                paddingHorizontal: 20,
                paddingVertical: 10,
                flex: 1
            },
            label: {
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 20
            },
            input:{
                marginTop:10,
                height:50,
                borderColor: '#e1e1e1',
                borderWidth:1,
                borderStyle:'solid'
            },
            btnSubmit:{
                padding:10,
                backgroundColor:Colors.BUTTON_COLOR,
                marginVertical:10
            },
            textoSubmit:{
                color: '#FFF',
                fontWeight: 'bold',
                textAlign: 'center'
            },
        });

        const pickerSelect = StyleSheet.create({
            inputIOS: {
                marginTop: 20,
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 4,
                color: "black",
                paddingRight: 30,
                backgroundColor:'#566573',
                marginLeft: -5,
                marginRight: -5,
        },
        inputAndroid: {
                marginTop: 20,
                fontSize: 16,
                height:30,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: "#fff",
                borderRadius: 8,
                color: "#fff",
                paddingRight: 30,
                backgroundColor:'#566573',
                borderStyle:'solid',
                height:40
        },
    });

        export default Formulario;