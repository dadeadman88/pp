import * as yup from 'yup';

export const validate = async (data: any, type = 'default') => {

  let schema: any = {}
  switch( type ){
    case 'review':
      schema = {
        rating: yup.string().required(),
        suggestion: yup.string().max(255),
        review: yup.string().required().max(255),
      };

      break;
      
    case 'reset':
      schema = {
        password: yup.string().required().min(8),
        confirm: yup.string().required().test(
          'passwords-match',
          'Password does not match',
          (value) => data.password === value),
      };
      break;
    
    default:
      schema = {
        name: yup.string().required().max(255),
        first_name: yup.string().required().max(255),
        last_name: yup.string().required().max(255),
        email: yup.string().email().required().max(255),
        password: yup.string().required(),
        dob: yup.string().required(),
        phone: yup.string().required(),

        country: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required(),

        reason: yup.string().required().max(255),
    
        old_password: yup.string().required().min(8),
        new_password: yup.string().required().min(8),
        confirm_new_password: yup.string().required().test(
          'passwords-match',
          'Password does not match',
          (value) => data.new_password === value),
      };
      break;
  }

  const errors: any = {};
  Object.keys(data).forEach((key: string) => {
    try {
      schema[key as any].validateSync(data[key as any]);
    } catch ({ errors: e }) {
      if (e) {
        errors[key as any] = e?.pop();
      }
    }
  });

  if (!Object.keys(errors).length) {
    return false;
  }

  return errors;
}
