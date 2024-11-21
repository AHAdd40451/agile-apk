import React, {useContext, useEffect, useState} from 'react'
import {View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native'
import styles from './index.style'
import {Context as AuthContext} from '../../context/AuthContext'
import {Button, InputField, Text} from '../../components'
import Header from '../../components/Header'
import StarRating from 'react-native-star-rating-widget'
import images from '../../assets/images'
import {
  useAddFeedbackMutation,
  useGetFeedbackQuery,
} from '../../services/feedback'
import {useNavigation} from '@react-navigation/native'

const Feedback = () => {
  const navigation = useNavigation()
  const [formData, setFormData] = useState({
    ratings: {
      overAll: 0,
      presentation: 0,
      relevance: 0,
      speakerQuality: 0,
      audienceQuality: 0,
      venueQuality: 0,
      foodQuality: 0,
      networking: 0,
      meetingStatndar: 0,
    },
    attennd: '',
    recommend: '',
    instrestedIn: [],
    additionalComments: '',
    otherIntrested: '',
  })

  const [addFeedback, {isLoading}] = useAddFeedbackMutation()

  const {state, signout} = useContext(AuthContext)
  const user = state?.user
  const event = state?.event

  const resetField = () => {
    setFormData({
      ratings: {
        overAll: 0,
        presentation: 0,
        relevance: 0,
        speakerQuality: 0,
        audienceQuality: 0,
        venueQuality: 0,
        foodQuality: 0,
        networking: 0,
        meetingStatndar: 0,
      },
      attennd: '',
      recommend: '',
      instrestedIn: [],
      additionalComments: '',
      otherIntrested: '',
    })
  }

  const RatingRow = ({title, formDataKey}) => {
    return (
      <View style={styles.starRow}>
        <Text style={styles.starRowTitle}>{title}</Text>
        <StarRating
          rating={formData.ratings[formDataKey]}
          onChange={rat => {
            const rating = formData.ratings
            rating[formDataKey] = rat
            setFormData({...formData})
          }}
          starStyle={{marginHorizontal: 0}}
          starSize={30}
        />
      </View>
    )
  }

  const handleOnClickInterested = key => {
    const interested = formData.instrestedIn
    const ind = interested.findIndex(data => data === key)
    if (ind !== -1) {
      interested.splice(ind, 1)
    } else {
      interested.push(key)
    }
    setFormData({...formData, instrestedIn: [...interested]})
  }

  const CheckBox = ({title}) => {
    const {instrestedIn} = formData
    return (
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={() => handleOnClickInterested(title)}
        style={{flexDirection: 'row', paddingVertical: 8}}
      >
        <Image
          source={
            instrestedIn.includes(title) ? images.checkbox : images.unChecked
          }
          style={{height: 25, resizeMode: 'contain', width: 25}}
        />
        <Text style={{fontSize: 15, paddingLeft: 6}}>{title}</Text>
      </TouchableOpacity>
    )
  }

  const handleOnSubmitFeedback = async () => {
    const obj = {
      event: event?._id,
      user: user?._id,
      ratings: formData?.ratings,
      instrestedIn: formData?.instrestedIn,
      attennd: formData?.attennd,
      recommend: formData?.recommend,
      additionalComments: formData?.additionalComments,
      otherIntrested: formData?.otherIntrested,
    }

    const adding = await addFeedback(obj)
    if (!adding?.error) {
      Alert.alert('Feedback Submitted Successfully')
      resetField()
      navigation.goBack()
    } else {
      Alert.alert('Something Went Wrong')
    }
  }

  return (
    <View style={styles.mainView}>
      <Header back heading={'Feedback Form'} />
      <ScrollView style={{paddingHorizontal: 12}}>
        <Text style={styles.dear}>Dear Attendee</Text>
        <Text style={styles.desc}>
          Thank you for attending the {event?.name}. We hope you found the event
          informative, engaging and value adding. Your feedback is highly
          valuable to us, as it helps us to improve our service quality to serve
          you better in the future. We would appreciate it if you could take a
          few moments to complete this review form, and share your thoughts on
          the summit. Thank you in advance for your time and input.
        </Text>
        <Text style={styles.questionTitle}>
          Q1 {')'} Please rate your satisfaction with the {event?.name} by
          rating the following statements out of five stars:
        </Text>

        <RatingRow formDataKey={'overAll'} title={'Overall Satisfaction'} />
        <RatingRow
          formDataKey={'presentation'}
          title={'Quality of the Presentations'}
        />
        <RatingRow
          formDataKey={'relevance'}
          title={'Relevance of the Topics Discussed'}
        />
        <RatingRow
          formDataKey={'speakerQuality'}
          title={'Quality of the Speakers'}
        />
        <RatingRow
          formDataKey={'audienceQuality'}
          title={'Quality of the Audience'}
        />
        <RatingRow
          formDataKey={'venueQuality'}
          title={'Quality of the Venue'}
        />
        <RatingRow
          formDataKey={'foodQuality'}
          title={'Quality of the food served/ Dietary requirements met'}
        />
        <RatingRow
          formDataKey={'networking'}
          title={'Networking Opportunities'}
        />
        <RatingRow
          formDataKey={'meetingStatndar'}
          title={'Standard of the Meetings'}
        />

        <Text style={styles.questionTitle}>
          Q2 {')'} Would you attend the Clinical Trials Strategic Summit again?
        </Text>
        <InputField
          onChangeText={txt =>
            setFormData({
              ...formData,
              attennd: txt,
            })
          }
        />
        <Text style={styles.questionTitle}>
          Q3 {')'} Would you recommend the Clinical Trials Strategic Summit to
          colleagues and peers?
        </Text>
        <InputField
          onChangeText={txt =>
            setFormData({
              ...formData,
              recommend: txt,
            })
          }
        />
        <Text style={styles.questionTitle}>
          Q4 {')'}Please indicate if you are interested in any of the following
          services:
        </Text>
        {['PMP training', 'IT services', 'Business Development'].map(
          (data, index) => (
            <CheckBox key={index} title={data} />
          ),
        )}
        <Text
          style={[styles.questionTitle, {fontFamily: 'Montserrat-Regular'}]}
        >
          Other (please specify)
        </Text>
        <InputField
          onChangeText={txt =>
            setFormData({
              ...formData,
              otherIntrested: txt,
            })
          }
        />
        <Text style={styles.questionTitle}>
          Additional comments or suggestions to improve future Clinical Trials
          Strategic Summits:
        </Text>

        <InputField
          numberOfLines={6}
          containerStyle={{height: 120, textAlignVertical: 'top'}}
          textAlignVertical={'top'}
          placeholder={'Additional Comments'}
          onChangeText={txt =>
            setFormData({
              ...formData,
              additionalComments: txt,
            })
          }
        />

        <Text style={styles.questionTitle}>
          Thank you for taking the time to complete this review form. Your
          feedback is greatly appreciated.
        </Text>

        <Button
          title={'Submit Feedback'}
          onPress={handleOnSubmitFeedback}
          isLoading={isLoading}
          style={{marginHorizontal: 0, width: '100%', marginVertical: 12}}
          titleStyle={{color: '#fff'}}
        />
      </ScrollView>
    </View>
  )
}
export default Feedback
