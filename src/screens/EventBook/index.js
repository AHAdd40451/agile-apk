import React, {useContext} from 'react'
import {ActivityIndicator, ImageBackground, Linking, View} from 'react-native'
import styles from './index.style'
import {Context as AuthContext} from '../../context/AuthContext'
import {Button, Text} from '../../components'
import Header from '../../components/Header'
import {useGetEventBookQuery} from '../../services/book'
import {colors} from '../../theme'

const EventBook = ({route}) => {
  const {state} = useContext(AuthContext)
  const event = state?.event
  const {data: eventBook, isLoading} = useGetEventBookQuery({
    eventID: event?._id,
  })
  console.log('eventBook?.book->', eventBook?.book)

  return (
    <View style={styles.mainView}>
      <Header back heading={'EventBook'} />
      {!isLoading && !eventBook?.book?.thumbnail ? (
        <View style={styles.container}>
          <Text>Event Booklet Will be Upload Soon </Text>
        </View>
      ) : null}

      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : null}
      {!isLoading ? (
        <ImageBackground
          style={{flex: 1}}
          resizeMode={'contain'}
          source={{uri: eventBook?.book?.thumbnail}}
        >
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Button
              disabled={!eventBook?.book?.pdf}
              style={styles.btnStyle}
              titleStyle={{color: '#fff'}}
              title={'Download Booklet'}
              onPress={() => Linking.openURL(eventBook?.book?.pdf)}
            />
          </View>
        </ImageBackground>
      ) : null}
    </View>
  )
}
export default EventBook
