import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Typography} from '../../components/atoms';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import {TransparentHeader} from '../../components/headers/TransparentHeader';

const StaticContent = (props: any) => {
  const {title} = props.route?.params || {};

  return (
    <SafeAreaContainer
      mode="light"
      safeArea={false}
      backgroundColor={'#E7F6F8'}>
      <TransparentHeader title={title} color={'#000'} />
      <Typography style={{padding: 20}} textType='light'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem nam atque animi iure in itaque, dolore eius quam tenetur. Ea earum totam vel laudantium quaerat dolore suscipit aspernatur eos amet.{"\n\n"}
        
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem nam atque animi iure in itaque, dolore eius quam tenetur. Ea earum totam vel laudantium quaerat dolore suscipit aspernatur eos amet.{"\n\n"}
        
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem nam atque animi iure in itaque, dolore eius quam tenetur. Ea earum totam vel laudantium quaerat dolore suscipit aspernatur eos amet.
      </Typography>
      
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default StaticContent;
