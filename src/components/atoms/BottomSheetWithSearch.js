import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {COLORS, FONTS, FONTSIZE, screenHeight} from '../../constants';
import {Typography} from './Typography';

const BottomSheetWithSearch = forwardRef((props, ref) => {

  const [ search, setSearch ] = useState("");
  const [item, setItem] = useState({
    title: '',
    options: [],
    onSelect: () => {},
    cancelButtonIndex: null,
    visibility: false,
    wrap: false,
  });

  useImperativeHandle(ref, () => ({
    show: ({title, options, onSelect, cancelButtonIndex, wrap = false}) => {
      setItem({
        title,
        options,
        onSelect,
        cancelButtonIndex,
        visibility: true,
        wrap,
      });
    },
    close: () => {
      setItem({...item, visibility: false});
    },
  }));

  return (
    <Modal animationType="slide" transparent={true} visible={item.visibility} statusBarTranslucent={true}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onPress={() => {
          setSearch('');
          setItem({...item, visibility: false});
        }}
      />
      <KeyboardAvoidingView
        behavior='padding'
        style={[
          styles.modalView,
          {backgroundColor: COLORS.white},
        ]}>
        { item.title && <Typography
          size={FONTSIZE.L}
          color={COLORS.secondary}
          align={'center'}
          style={{marginBottom: 10}}>
          {item.title}
        </Typography>}

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder='Search here...'
          style={{
            borderWidth: 1,
            borderColor: COLORS.darkGray,
            borderRadius: 10,
            padding: 10,
            fontSize: 16,
            fontFamily: FONTS.PoppinsRegular
          }}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={item.options.filter( i => search.trim().length > 0 ? i.search( search ) != -1 : true )}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={ () => {
            return ( <Typography
            style={{ paddingVertical: 20 }}
              textType='light'
              align="center"
              children={"No record found"}
            />)
          }}
          renderItem={ ({item: option, index}) => <TouchableOpacity
            style={ styles.listOption }
            onPress={() => {
              setSearch('')
              if (item.cancelButtonIndex === index) {
                setItem({...option, visibility: false});
              } else {
                item.onSelect( option );
              }
            }}
            key={index}>
            <Typography
              align="center"
              children={option}
              color={ item.cancelButtonIndex === index ? 'red' : COLORS.black }
            />
          </TouchableOpacity> }
        />
      </KeyboardAvoidingView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalView: {
    bottom: 0,
    padding: 20,
    paddingBottom: 60,
    width: '100%',
    maxHeight: screenHeight(90),
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    zIndex: 1,
  },
  contantWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  listOption: {
    padding: 10,
    marginVertical: 5,
  }
});

export default BottomSheetWithSearch;
