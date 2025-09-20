import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/AntDesign';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {InputRange, InputText, Typography} from '../../components/atoms';
import {Button} from '../../components/atoms/Button';
import {SelectInput} from '../../components/atoms/SelectInput';
import FileUploader from './FileUploader';
import {useDispatch, useSelector} from 'react-redux';
import {
  disableLoader,
  enableLoader,
  updateAppStates,
} from '../../store/actions/AppActions';
import {updateUserStates} from '../../store/actions/UserActions';
import {selectAppState} from '../../store/selectors/appSelector';
import {InputDateTime} from '../../components/atoms/InputDateTime';
import {navigate, onBack} from '../../navigation/RootNavigation';
import moment from 'moment';
import {IMAGES, SERVICES} from '../../constants';
import BottomSheet from '../../components/atoms/BottomSheet';
import {imageCamera, imagePicker} from '../../utils/ImagePicker';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const CreateProfile = (props: any) => {
  const dispatch = useDispatch();
  const {user} = useSelector(selectAppState);
  const {update = false} = props.route?.params || {};

  const bottomSheet: any = useRef();
  const [fields, setFields] = React.useState<any>({
    ...(user.user_type == 2 && {
      attachments: (user.gallery || []).map((i: any) => ({
        ...i,
        uri: i.source_url,
      })),
      services: user.services ? user.services.map((i: any) => i.service) : [],
      min_rate: user.min_rate,
      max_rate: user.max_rate,
      portfolio: user.portfolio,
      city: user.city,
      country: user.country,
      about: user.about,
    }),
    image: user.image,
    name: user.name,
    email: user.email,
    phone: user.phone,
    dob: user.dob,
  });

  useEffect(() => {
    setFields({
      ...(user.user_type == 2 && {
        attachments: (user.gallery || []).map((i: any) => ({
          ...i,
          uri: i.source_url,
        })),
        services: user.services ? user.services.map((i: any) => i.service) : [],
        min_rate: user.min_rate,
        max_rate: user.max_rate,
        portfolio: user.portfolio,
        city: user.city,
        country: user.country,
        about: user.about,
      }),
      image: user.image,
      name: user.name,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
    });
  }, [user]);

  const onSubmit = () => {
    dispatch(enableLoader());

    const formData = new FormData();
    formData.append('_method', 'PATCH');
    Object.keys(fields).map(i => {
      if (['attachments', 'services'].includes(i)) {
        fields[i].forEach((subField: any, index: number) => {
          if (subField.id) {
            formData.append(`${i}[${index}]`, subField.id);
          } else {
            formData.append(`${i}[${index}]`, subField);
          }
        });
      } else {
        formData.append(i, fields[i] || '');
      }
    });

    axios
      .post(`users/${user.id}`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        dispatch(disableLoader());
        if (res && res.status < 300) {
          Toast.show({
            type: 'success',
            text1: res.data.response.messages[0],
          });

          dispatch(
            updateAppStates({
              user: {...user, ...res.data.response.data},
            }),
          );

          !update && navigate('AddressForm');
        }
      });
  };

  const _onSelectImage = (res: any) => {
    bottomSheet.current.close();
    setFields({...fields, image: res.uri});

    const formData = new FormData();
    formData.append('_method', 'PATCH');
    formData.append('image', res);
    axios
      .post(`users/${user.id}`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        dispatch(disableLoader());
        if (res && res.status < 300) {
          dispatch(
            updateAppStates({
              user: {...user, ...res.data.response.data},
            }),
          );
          Toast.show({
            type: 'success',
            text1: res.data.response.messages[0],
          });
          !update && navigate('AddressForm');
        }
      });
  };

  const _onUploadImage = () => {
    bottomSheet.current.show({
      options: ['Camera', 'Gallery'],
      onSelect: (i: any) => {
        switch (i) {
          case 0:
            imageCamera().then(_onSelectImage);
            break;
          case 1:
            imagePicker({mediaType: 'photo'}).then(_onSelectImage);
            break;
          default:
            break;
        }
      },
    });
  };

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      {/* <TransparentHeader color={'#000'} /> */}

      <ScrollView style={styles.container}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            gap: 10,
            padding: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            {update ? (
              <TouchableOpacity onPress={() => onBack()} style={{padding: 5}}>
                <FaIcon name={'arrow-left'} color={'#000'} size={16} />
              </TouchableOpacity>
            ) : (
              false
            )}
            <Typography
              children={update ? `Update Profile` : `Create Profile`}
              textType="semiBold"
              size={18}
              align="center"
              style={{flex: 1}}
            />
            {update ? <View style={{width: '8%'}} /> : false}
          </View>

          {update && (
            <View style={{gap: 20, paddingBottom: 20}}>
              <View style={styles.imagePickerCard}>
                <Image
                  source={user.image ? {uri: user.image_url} : IMAGES.avatar}
                  style={{width: 105, height: 105, borderRadius: 60}}
                />
                <TouchableOpacity
                  onPress={_onUploadImage}
                  style={styles.cameraIcon}>
                  <IonIcon name="camera" color={'#fff'} size={18} />
                </TouchableOpacity>
              </View>

              <InputText
                label={'Name'}
                leftIcon={<FeIcon name="mail" color={'#1D2733'} size={18} />}
                placeholder={'Enter you name'}
                value={fields.name}
                onChangeText={(txt: string) =>
                  setFields({...fields, name: txt})
                }
                // error={errors.name}
              />
              <InputText
                label={'Email'}
                editable={false}
                leftIcon={<FeIcon name="mail" color={'#1D2733'} size={18} />}
                placeholder={'Enter you email'}
                keyboardType={'email-address'}
                value={fields.email}
              />
              <InputText
                label={'Name'}
                leftIcon={<FeIcon name="phone" color={'#1D2733'} size={18} />}
                placeholder={'Enter you phone'}
                value={fields.phone}
                onChangeText={(txt: string) =>
                  setFields({...fields, phone: txt})
                }
                // error={errors.phone}
              />
              <InputDateTime
                label={'Date Of Birth'}
                leftIcon={<FeIcon name="lock" color={'#1D2733'} size={18} />}
                placeholder={'Select your date of birth'}
                value={fields.dob}
                onChange={(txt: string) => setFields({...fields, dob: txt})}
                maximumDate={
                  new Date(moment().subtract(1, 'years').format('ll'))
                }
                // error={errors.dob}
              />
            </View>
          )}

          {user.user_type == 2 && (
            <>
              <FileUploader
                values={fields.attachments}
                onChange={(e: any) => {
                  setFields({...fields, attachments: e});
                }}
              />

              <View style={{gap: 20, marginTop: 20}}>
                <SelectInput
                  label={'Services'}
                  leftIcon={
                    <FeIcon name="camera" color={'#1D2733'} size={18} />
                  }
                  options={SERVICES}
                  placeholder={'Select Services'}
                  onSelect={(e: any) => {
                    setFields({
                      ...fields,
                      services: [...new Set([...fields.services, SERVICES[e]])],
                    });
                  }}
                />
                <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
                  {fields.services.map((i: any, index: number) => (
                    <View style={styles.serviceBadge} key={`service_${index}`}>
                      <Typography children={i} size={12} />
                      <FaIcon
                        name={'times'}
                        size={12}
                        color={'#000'}
                        onPress={() => {
                          setFields({
                            ...fields,
                            services: [
                              ...fields.services.filter((e: any) => e != i),
                            ],
                          });
                        }}
                      />
                    </View>
                  ))}
                </View>

                {/* <InputRange
                  label={'Price Range'}
                  lowValue={fields.min_rate || 0}
                  highValue={fields.max_rate || 100}
                  onChange={(min: number, max: number) => {
                    setFields({
                      ...fields,
                      min_rate: min.toString(),
                      max_rate: max.toString(),
                    });
                  }}
                /> */}

                <InputRange
                  label={
                    'How far you are willing to travel without travel fee? (Miles)'
                  }
                  lowValue={fields.min_rate || 0}
                  highValue={fields.max_rate || 100}
                  onChange={(min: number) => {
                    setFields({
                      ...fields,
                      free_kms: min.toString(),
                    });
                  }}
                />

                <InputText
                  label={`Price per hour`}
                  leftIcon={
                    <FeIcon name="dollar-sign" color={'#1D2733'} size={18} />
                  }
                  placeholder={'Price per hour ($)'}
                  value={fields.min_rate || ''}
                  inputProps={{
                    keyboardType: 'number-pad',
                  }}
                  onChangeText={(text: string) => {
                    setFields({
                      ...fields,
                      min_rate: text.toString(),
                    });
                  }}
                />

                <InputText
                  label={`Your URL`}
                  leftIcon={<FeIcon name="link" color={'#1D2733'} size={18} />}
                  placeholder={'Portfolio URL'}
                  value={fields.portfolio || ''}
                  onChangeText={(text: string) => {
                    setFields({
                      ...fields,
                      portfolio: text,
                    });
                  }}
                />
                <InputText
                  label={`City, Country`}
                  placeholder={'Select your city, country'}
                  multiline={true}
                  value={fields.country}
                  onChangeText={(text: string) => {
                    setFields({
                      ...fields,
                      country: text,
                    });
                  }}
                />
                <InputText
                  label={`About`}
                  placeholder={'About'}
                  multiline={true}
                  inputProps={{
                    paddingVertical: 10,
                    numberOfLines: 5,
                    textAlignVertical: 'top',
                  }}
                  value={fields.about}
                  onChangeText={(text: string) => {
                    setFields({
                      ...fields,
                      about: text,
                    });
                  }}
                />
              </View>
            </>
          )}
          <Button label={'Submit'} onPress={onSubmit} />
        </View>
      </ScrollView>
      <BottomSheet ref={bottomSheet} />
    </SafeAreaContainer>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  serviceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F9F9FC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
  },
  imagePickerCard: {
    width: 110,
    height: 110,
    borderRadius: 70,
    marginBottom: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // ...commonStyles.boxShadow,
  },
  cameraIcon: {
    position: 'absolute',
    backgroundColor: '#3C91F1',
    padding: 5,
    borderRadius: 25,
    bottom: 0,
    right: 0,
  },
});
