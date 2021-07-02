import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


let timer = null;
let sec = 0;
let min = 0;
let hrs = 0;

export default function App() {

  const [countdown, setCountdown] = useState('00:00:00');
  const [stop, setStop] = useState('Iniciar');
  const [historic, setHistoric] = useState(null);


  function start(){
    //setInterval vai girar infinitamente o relógio
    if(timer !== null){
      //Aqui vai parar o timer
      clearInterval(timer);
      timer = null; //quando pausou o timer
      setStop('Retomar')
    }else{
      //Começar a girar o timer
      timer = setInterval(() => {
        sec++; //contando de 1 em 1 segundos
        if(sec == 60){ //quando chegar nos 60 segundos
          sec = 0; //zera o segundos
          min++; //começa a contar os minutos
        }
        if(min == 60){
          min = 0;
          hrs++;
        }
        let format = //sempre q for menor do que 10 vai mostrar um 0 na frente
        (hrs < 10 ? '0' + hrs : hrs) + ':'
      + (min < 10 ? '0' + min : min) + ':'
      + (sec < 10 ? '0' + sec : sec);

      setCountdown(format);
      },1000); //quantos milissegundos vai ficar chamando essa função
      setStop('Parar')
    }
  }

  function reset(){
    if(timer !== null){
      //parar o timer
      clearInterval(timer);
      timer = null;
    }

    setHistoric(countdown);//passando o último valor 
    setCountdown('00:00:00');
    sec = 0;
    min = 0;
    hrs = 0;
    setStop('Iniciar');
  }

  return (
    <View style={styles.container}>
      <Image 
        source={require('./src/img/crono.png')}
      />

      <Text style={styles.timer}>{countdown}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={start}>
          <Text style={styles.btnTxt}>{stop}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={reset}>
          <Text style={styles.btnTxt}>Zerar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.historicArea}>
        <Text style={styles.historicTxt}>
          {/** renderização para mostrar o histórico */}
          {historic ? 'Último tempo: ' + historic : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#051960'
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#051960'
  },
  historicArea: {
    marginTop: 60,
  },
  historicTxt: {
    fontSize: 25,
    color: '#FFFFFF',
    fontStyle: 'italic',
    fontWeight: '500'
  }
});
