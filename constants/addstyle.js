import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  dmgtxt:{
    textAlign:'center',
    fontSize: 17,
    fontWeight:"900"
  },
  dmoui:{
     backgroundColor:"green",
     padding:10,
     borderRadius:5,
     margin:10,
     width:100
  },
  dmno:{
   backgroundColor:"red",
   padding:10,
   borderRadius:5,
   margin:10,
  width:100
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    height:"100%",
    width:"100%",
    position:'relative'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding:10,
    width:"100%"
  },
  btntext:{
    width:180,
    marginRight:15,
    height:200,
    padding:10,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
    backgroundColor:"#eee"
  },
  btnimg:{
    width:180,
    marginRight:15,
    height:200,
    borderRadius:10,
    backgroundColor:"#eee",
    borderColor: 'green',
    borderWidth:5
  },
  row:{
    flexDirection: 'row',
    marginBottom:10

  },
  layer:{
    position:'absolute',
    left:0,
    width: '100%', 
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  img:{width:"100%",height:"100%",borderRadius:10},
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
