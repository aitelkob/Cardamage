import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet,Image,ImageBackground } from 'react-native'
import * as Progress from 'react-native-progress';
import { RNCamera } from 'react-native-camera';
import Modal from 'react-native-modalbox';
import {styles} from '../constants/addstyle'
import back from '../assets/6.png'
import front from '../assets/5.png'
import backleft from '../assets/2.png'
import backright from '../assets/4.png'
import frontleft from '../assets/1.png'
import frontright from '../assets/3.png'
export default class Add extends React.Component {
  // variable
  constructor(props) {
    super(props);
    this.state = {
      images:[],
      layer:null,
      damages:[],
      username:null,
      pass:null, 
      progressload:0,
      status:0,
      backuri:null,
      backlefturi:null,
      backrighturi:null,
      fronturi:null,
      frontrighturi:null,
      frontlefturi:null,
      localisation:null,
      isuri:null,
      error:'',
   }
  };
  /*upload images*/
  upload(){
    var data ={
     Images:this.state.images,
    }
    var formdata = new FormData();
    formdata.append("data",JSON.stringify(data));
    var oReq = new XMLHttpRequest();
    oReq.upload.addEventListener("progress",this.updateProgress);
    oReq.addEventListener("load", this.transferComplete);
    oReq.addEventListener("error",this.transferFailed);
    oReq.addEventListener("abort",this.transferCanceled);
    oReq.open('POST','http://damage.annonce.pub/api/get_data',true);
    oReq.setRequestHeader('X-Requested-With','XMLHttpRequest');
    oReq.send(formdata);

  }
  // progress on transfers from the server to the client (downloads)
  updateProgress (oEvent) {
    if (oEvent.lengthComputable) {
      var pro=Math.round((oEvent.loaded * 100)/oEvent.total)
      this.setState({progressload:pro})
    }
  }

  transferComplete(evt) {
    console.log("The transfer is complete."+JSON.stringify(evt));
  }

  transferFailed(evt) {
    console.log("An error occurred while transferring the file."+JSON.stringify(evt));
  }

  transferCanceled(evt) {
    console.log("The transfer has been canceled by the user."+JSON.stringify(evt));
  }
  /*fin upload images*/
  // prender photo is camera active
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      if(this.state.localisation=="back")
        this.setState({backuri:data.base64})
      if(this.state.localisation=="backleft")
        this.setState({backlefturi:data.base64})
      if(this.state.localisation=="backright")
        this.setState({backrighturi:data.base64})
      if(this.state.localisation=="front")
        this.setState({fronturi:data.base64})
      if(this.state.localisation=="frontright")
        this.setState({frontrighturi:data.base64})
      if(this.state.localisation=="backleft")
         this.setState({backlefturi:data.base64})
      this.setState({isuri:data.base64}, function () {
           
      });
      // remplire array images by path et localistion
      this.addimage();
    }
  };
  // fun add object data to array images
  addimage(){
    const obj=
    {
      filepath: "data:image/jpg;base64,"+this.state.isuri,
      localisation:this.state.localisation
    }
   this.setState({
     images: [...this.state.images, obj]},function () {});
  }
  // click button save  localisation in variable and change layer image by loc
  localisation(loc){
    if(loc=="back")
      this.setState({layer:back})
    if(loc=="backleft")
      this.setState({layer:backleft})
    if(loc=="backright")
      this.setState({layer:backright})
    if(loc=="front")
      this.setState({layer:front})
    if(loc=="frontright")
      this.setState({layer:frontright})
    if(loc=="frontleft")
       this.setState({layer:frontleft})
    this.setState({localisation:loc}, function () {
      console.log(this.state.localisation);
    });
    // open modal camera
    this.refs.modal1.open();
  }
  render() {
    return (
      <View style={styles.content}>
        <View style={styles.row}>
            <TouchableOpacity onPress={()=>this.localisation("back")} style={this.state.backuri==null?styles.btntext:styles.btnimg}>
              {
                this.state.backuri!=null?
                (<ImageBackground resizeMode="cover" style={styles.img} source={{uri:"data:image/jpg;base64,"+this.state.backuri}}/>):
                (<Text>Back</Text>)
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.localisation("front")} style={this.state.fronturi==null?styles.btntext:styles.btnimg}>
              {
                this.state.fronturi!=null?
                (<ImageBackground style={styles.img} source={{uri:"data:image/jpg;base64,"+this.state.fronturi}}/>):
                (<Text>Front</Text>)
              }
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity onPress={()=>this.localisation("backleft")} style={this.state.backlefturi==null?styles.btntext:styles.btnimg}>
              {
                this.state.backlefturi!=null?
                (<ImageBackground style={styles.img} source={{uri:"data:image/jpg;base64,"+this.state.backlefturi}}/>):
                (<Text>Back left side</Text>)
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.localisation("backright")} style={this.state.backrighturi==null?styles.btntext:styles.btnimg}>
              {
                this.state.backrighturi!=null?
                (<ImageBackground style={styles.img} source={{uri:"data:image/jpg;base64,"+this.state.backrighturi}}/>):
                (<Text>Back right side</Text>)
              }
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
            <TouchableOpacity onPress={()=>this.localisation("frontleft")} style={this.state.frontlefturi==null?styles.btntext:styles.btnimg}>
              {
                this.state.frontlefturi!=null?
                (<ImageBackground style={styles.img} source={{uri:"data:image/jpg;base64,"+this.state.frontlefturi}}/>):
                (<Text>Front left side</Text>)
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.localisation("frontright")} style={this.state.frontrighturi==null?styles.btntext:styles.btnimg}>
              {
                this.state.frontrighturi!=null?
                (<ImageBackground style={styles.img} source={{uri:"data:image/jpg;base64,"+this.state.frontrighturi}}/>):
                (<Text>Front right side</Text>)
              }
            </TouchableOpacity>
        </View>
        {/* modal camera with layer */}
        <Modal
            style={[styles.modal]}
            backdropPressToClose={false}
            swipeToClose={false}
            backdropOpacity={0.5}
            ref={"modal1"}>
            <Text onPress={()=>this.refs.modal1.close()} style={{position:"absolute",top:"2%",right:"3%",height:100,zIndex: 1}} ><Image source={require('../assets/icons/cancel.png')} /></Text> 
            {this.state.isuri==null?
              (
                <View style={styles.container}>
                  {/* debut camera */}
                  <RNCamera
                    ref={ref => {
                      this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                      title: 'Permission to use camera',
                      message: 'We need your permission to use your camera',
                      buttonPositive: 'Ok',
                      buttonNegative: 'Cancel',
                    }}
                  />
                   {/* fin camera */}
                   {/*debut image layer */}
                  <Image style={styles.layer} source={this.state.layer}/>
                    {/*fin image layer */}
                  <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                      <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ):
              (
                // check image is contains damage
                <View style={{flex:1,flexDirection:"column",justifyContent:"space-between"}}>
                  <Image style={{width:"100%",height:600}} source={{uri:"data:image/jpg;base64,"+this.state.isuri}}/>
                  <Text style={styles.dmgtxt}>Damage</Text>
                  <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={()=>{this.refs.damage.open();this.refs.modal1.close()}} style={styles.dmoui}>
                       <Text style={{ fontSize: 15,color: "white", textAlign:'center', }}> OUI </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.refs.modal1.close();this.setState({isuri:null})}} style={styles.dmno}>
                       <Text style={{ fontSize: 15,color: "white", textAlign:'center', }}> NO </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }
        </Modal>
        {/* modal damage (add camera ici) */}
        <Modal
            style={[styles.modal]}
            backdropPressToClose={false}
            swipeToClose={false}
            backdropOpacity={0.5}
            ref={"damage"}>
            <Text onPress={()=>this.refs.damage.close()} style={{position:"absolute",top:"2%",right:"3%",height:100,zIndex: 1}} ><Image source={require('../assets/icons/cancel.png')} /></Text> 
            <View style={{flex:1,flexDirection:"column",justifyContent:"space-between"}}>
              <Image style={{width:"100%",height:600}} source={{uri:"data:image/jpg;base64,"+this.state.isuri}}/>
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              </View>
            </View>
        </Modal>
        {/* button ajouter */}
        <TouchableOpacity style={styles.btnid} onPress={()=>this.upload()} ><Text>Ajouter</Text></TouchableOpacity>
        {/* if clicker ajouter show this */}
        <Progress.Bar progress={this.state.progressload} width={200} />
      </View>
    )
  }
}
