import React, {useContext, useEffect, useState} from 'react'
import {ScrollView, Text as T, View} from 'react-native'
import styles from './index.style'
import {Context as AuthContext} from '../../context/AuthContext'
import {Text} from '../../components'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import Avatar from '../../components/Avatar'
import {colors} from '../../theme'
import Header from '../../components/Header'

const Profile = ({route}) => {
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const event = state?.event
  const {state} = useContext(AuthContext)
  const user = state?.user

  const row = (name, value) => {
    return (
      <View style={styles.row}>
        <Text
          style={{fontFamily: 'Montserrat-SemiBold', width: 100}}
          text={name}
        />
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            flex: 1,
            color: colors.themeBlack,
          }}
          text={value}
        />
      </View>
    )
  }
  return (
    <View style={styles.mainView}>
      <Header back heading={'Profile'} />
      <ScrollView>
        <View style={{flex: 1, paddingBottom: 20, paddingHorizontal: 12}}>
          <View style={styles.topView}>
            <Avatar
              style={[styles.avatar, {borderRadius: 200}]}
              img={user?.picture}
            />

            <View style={styles.textView}>
              <Text
                style={{fontFamily: 'Montserrat-Bold', fontSize: 18}}
                text={`${user.first_name} ${user.last_name}`}
              />
              <Text style={{textAlign: 'center'}} text={`${user.email}`} />
            </View>
          </View>

          {row('Gender', user?.gender)}
          {row('Company', user?.metadata?.delegate_details?.company || '---')}
          {row('Position', user?.metadata?.delegate_details?.position || '---')}
          {row('Country', user?.metadata?.delegate_details?.country || '---')}
          {row(
            'Post Code',
            user?.metadata?.delegate_details?.post_code || '---',
          )}
          {row('Fax', user?.metadata?.delegate_details?.fax || '---')}
          {row(
            'Telephone',
            user?.metadata?.delegate_details?.telephone || '---',
          )}
          {row('Mobile', user?.metadata?.delegate_details?.mobile || '---')}

          <View>
            <Text style={styles.title} text={'Address'} />
            <Text
              style={styles.detail}
              text={user?.metadata?.delegate_details?.address || '---'}
            />
          </View>
          <View>
            <Text style={styles.title} text={'Personal Profile'} />
            <Text
              style={styles.detail}
              text={user?.metadata?.delegate_details?.address || '---'}
            />
          </View>

          {user.user_type === 'sponsor' && (
            <View>
              <Text style={styles.title} text={'Company Profile'} />
              <Text
                style={styles.detail}
                text={
                  user?.metadata?.delegate_details?.company_profile || '---'
                }
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
export default Profile
