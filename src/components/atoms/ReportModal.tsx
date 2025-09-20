import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {COLORS, screenHeight} from '../../constants';
import {Typography} from './Typography';
import {Button} from './Button';
import {InputText} from './InputText';
import {post} from '../../store/services/Http';
import {onBack} from '../../navigation/RootNavigation';
import {useDispatch} from 'react-redux';
import {showToast} from '../../store/actions/AppActions';
import {errorHandler} from '../../utils/utils';
import {validate} from '../../utils/Validator';

const ReportModal = forwardRef((props: any, ref) => {
  const dispatch = useDispatch();
  const {data}: any = props;

  const [reason, setReason]: any = useState('');
  const [errors, setErrors]: any = useState({});

  const [item, setItem]: any = useState({
    title: '',
    body: '',
    visibility: false,
  });

  useImperativeHandle(ref, () => ({
    open: ({title, body}: any) => {
      setItem({
        title,
        body,
      });
    },
    close: () => {
      setItem({...item, visibility: false});
    },
  }));

  const onReport = () => {
    validate({reason}).then(err => {
      if (err) {
        setErrors(err);
        return;
      }

      post(
        `report`,
        JSON.stringify({
          reportable_type: 'user',
          reportable_id: data.id,
          reason: reason,
        }),
      ).then(res => {
        if ('response' in res && res.response.code === 200) {
          dispatch(showToast(res.response?.messages[0]));
          onBack();
        } else {
          errorHandler(res);
        }
      });
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={item.visibility}
      statusBarTranslucent={true}
      onRequestClose={() => setItem({...item, visibility: false})}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        <View style={[styles.modalView, {backgroundColor: COLORS.white}]}>
          <Typography size={18} align={'center'} textType="semiBold">
            Report
          </Typography>

          <Typography
            size={14}
            color={COLORS.darkGray}
            align={'center'}
            textType="light">
            Please enter a reason to report this user
          </Typography>

          <InputText
            placeholder={'Type here...'}
            multiline={true}
            value={reason}
            onChangeText={setReason}
            error={errors.reason}
            inputProps={{
              numberOfLines: 8,
              textAlignVertical: 'top',
              verticalAlign: 'top',
            }}
          />

          <Button
            label={`Report`}
            backgroundColor={'#FF6961'}
            isGradient={false}
            onPress={onReport}
          />

          <TouchableOpacity
            onPress={() => setItem({...item, visibility: false})}>
            <Typography align="center">Close</Typography>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalView: {
    bottom: 0,
    padding: 30,
    width: '100%',
    maxHeight: screenHeight(90),
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    zIndex: 1,
    gap: 20,
  },
});

export default ReportModal;
