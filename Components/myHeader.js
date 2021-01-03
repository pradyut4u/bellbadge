import React from 'react'
import {View, TouchableOpaacity, Text, TextInput} from 'react-navigation'
import {Header, Icon, Badge} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'
import Bellbadge from './bellBadge'

export default class MyHeader extends React.Component{
	constructor(props){
		super(props)
		this.state={
			notificationHolder:0
		}
	   }
   
	   getNotification = ()=>{
		   db.collection('allNotifications').where('notificationStatus','==','unread')
		   .onSnapshot(snapshot=>{
			   var notification= snapshot.docs.map(doc=>doc.data())
			   console.log(notification.length)
			   this.setState({
				   notificationHolder:notification.length
			   })
		   })
	   }
   
	   componentDidMount(){
		   this.getNotification()
	   }

/*	   Bellbadge = ()=>{
		   return(
			   <View>
				   <Icon name="bell" type='font-awesome' color='cyan' onPress = {()=>{this.props.navigation.navigate("Notification")}}/>
			   </View>
		   )
	   }*/
	
	render(){
	return(
	<Header 
	leftComponent={<Icon name='bars' type='font-awesome' color='cyan' onPress = {()=>{
	this.props.navigation.toggleDrawer()}}/>}
	centerComponent={{text:this.props.title, style:{fontSize:20, fontWeight:'bold', color:'green'}}}
	rightComponent={<Bellbadge />}
	backgroundColor="blue"
	/>
	)
	}
}