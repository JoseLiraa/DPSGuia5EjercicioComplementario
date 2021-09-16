import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight, ScrollView } from "react-native";

const Cita = ({ item, eliminarPaciente }) => {

  const dialogoEliminar = id => {
    console.log("eliminando...", id);
    eliminarPaciente(id);
  }

 return (
  <ScrollView>
    <View style={styles.cita}>
     <View>
        <Text style={styles.label}>Cliente:</Text>
        <Text style={styles.texto}>{item.paciente}</Text>
      </View>
      <View>
        <Text style={styles.label}>Mesa para:</Text>
        <Text style={styles.texto}>{item.telefono} personas</Text>
      </View>
      <View>
        <Text style={styles.label}>Tipo de sección:</Text>
        <Text style={styles.texto}>{item.seccion}</Text>
      </View>
      <View>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.texto}>{item.fecha}</Text>
      </View>
      <View>
        <Text style={styles.label}>Hora:</Text>
        <Text style={styles.texto}>{item.hora}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(item.id)}
          style={styles.btnEliminar}
        >
          <Text style={styles.textoEliminar}>Eliminar &times; </Text>
        </TouchableHighlight>
      </View>
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    cita:{
        backgroundColor:'#FFF',
        borderBottomColor:'#e1e1e1',
        borderStyle:'solid',
        borderBottomWidth:1,
        paddingVertical:20,
        paddingHorizontal:10
    },
    label:{
        fontWeight:'bold',
        fontSize:18,
        marginTop:20
    },
    texto:{
        fontSize:18,
    },
    btnEliminar:{
        padding:10,
        backgroundColor:'#82E0AA',
        marginVertical:10
    },
    textoEliminar:{
        color:'#FFF',
        fontWeight:'bold',
        textAlign:'center'
    }
})
export default Cita;