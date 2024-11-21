import React, {useContext} from 'react'
import {DrawerItem, DrawerItemList} from '@react-navigation/drawer'
import {SafeAreaView, StyleSheet, ScrollView, View} from 'react-native'
import Avatar from '../../components/Avatar'
import {Context as AuthContext} from '../../context/AuthContext'
import {Text} from '../../components'
import { deleteKeyFromStorage } from '../../helpers/asyncStorage'

const CustomDrawerContentComponent = props => {
  const {state, signout} = useContext(AuthContext)
  const user = state?.user

  const handleLogout = async () => {
    await deleteKeyFromStorage('token')
    signout()
    // await deleteKeyFromStorage('userInfo')
  }
  return (
    <SafeAreaView
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}
    >
      <ScrollView>
        <View style={styles.profileView}>
          <Avatar
            style={[styles.avatar, {borderRadius: 200}]}
            img={user?.picture}
          />

          <View style={styles.textView}>
            <Text
              style={styles.title}
              text={`${user.first_name} ${user.last_name}`}
            />
            <Text style={{textAlign: 'center'}} text={`${user.email}`} />
          </View>
        </View>

        <DrawerItemList {...props} />
      </ScrollView>
      <DrawerItem
        label='Logout'
        labelStyle={styles.logout}
        onPress={handleLogout}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    height: 80,
    width: 80,
  },
  profileView: {height: 170, justifyContent: 'center', alignItems: 'center'},
  textView: {justifyContent: 'center', alignItems: 'center'},
  title: {
    fontFamily: 'Montserrat-Bold',
    marginTop: 8,
    fontSize: 18,
  },
  logout: {
    fontFamily: 'Montserrat-SemiBold',
  },
})

export default CustomDrawerContentComponent
