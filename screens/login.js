
import React from 'react';
import { StyleSheet,KeyboardAvoidingView,Text,Button, View,Image,ImageBackground,ActivityIndicator,PermissionsAndroid} from 'react-native';
import Modal from 'react-native-modalbox';
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { Login_android} from '../constants/liens';
export default class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username:null,
        pass:null, 
        status:0,
        error:'',
     }
    };
    componentDidMount(){
      this.focusListener=this.props.navigation.addListener('focus', () => {

      })
    }

    login(){
      this.refs.modal1.open();
      var formdata = new FormData();
        formdata.append("data[User][username]",this.state.username);
        formdata.append("data[User][password]",this.state.pass);
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
          fetch(Login_android,requestOptions)
          .then(response => response.text())
          .then((text) =>{
            try {
               console.log(text);
                if(text=="0"){
                  // var user = text.split('||');
                  this.props.navigation.navigate("Add")
                }
                else{
                  this.refs.modal1.close();
                  this.setState({error:"E-mail ou Mot de passe non valide"});
                  this.refs.error.open();
                }
            } catch(err) {
              this.refs.modal1.close();
              this.setState({error:err});
              this.refs.error.open();
            }
          })
          .catch(error =>
          { 
              this.refs.modal1.close();
              this.setState({error:error});
              this.refs.error.open()
          });
          
    }
 
    render(){
        return(
          <ImageBackground
            source={require('../assets/background_dot.png')}
            resizeMode="repeat"
            style={styles.background}
          >
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image  style={styles.image} />
            <Text style={styles.header}>Damage Voiture</Text>
            <TextInput
              label="Email"
              returnKeyType="next"
              value={this.state.username}
              onChangeText={(text) =>this.setState({ username: text})}
              autoCapitalize="none"
            />
            <TextInput
              label="Password"
              returnKeyType="done"
              value={this.state.pass}
              onChangeText={(text) =>this.setState({ pass: text})}
              secureTextEntry
            />
            <View style={styles.forgotPassword}>
         
            </View>
            <Text style={styles.btnid} onPress={() =>{this.refs.modal1.open();this.login()}}>S'identifier</Text>
          </KeyboardAvoidingView>
          <Modal
            style={[styles.modal]}
            backdropPressToClose={false}
            swipeToClose={false}
            backdropOpacity={0.5}
            ref={"modal1"}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Chargement...</Text>
          </Modal>
          <Modal
            style={[styles.modal]}
            backdropPressToClose={false}
            swipeToClose={false}
            backdropOpacity={0.5}
            ref={"error"}>
              <Text onPress={()=>this.refs.error.close()} style={{position:"absolute",top:"2%",right:"3%",height:100}} ><Image source={require('../assets/icons/cancel.png')} /></Text> 
              <Image style={{position:"absolute",top:"30%"}} source={require('../assets/icons/error.png')} />
              <Text style={{position:"absolute",top:"60%",fontSize:17}}>{this.state.error}</Text>
          </Modal>
          </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height:"100%",
    width:"100%"
  },
  btnid:
  {
     backgroundColor:"#4959e9",
     borderRadius:15,
     padding:15,
     marginTop:15,
     color:"#FFF",
     fontSize:17,
     fontWeight:"bold",
     textAlign:"center"

  }

});