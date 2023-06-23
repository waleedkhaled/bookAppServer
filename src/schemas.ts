import * as yup from 'yup';


//validating schemas
const getBookSchema = yup.object().shape({
  id: yup.string().uuid().required(),
});

const publicationYear = yup
  .number()
  .typeError('invalid input')
  .positive('invalid data')
  .max(new Date().getFullYear(), 'this data cannot be in the present');
  
  const createBookSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    publicationYear: publicationYear.required('Year is required'),
  });
  
  const updateBookSchema = yup.object().shape({
    id: yup.string().uuid().required('ID is required'),
    title: yup.string(),
    author: yup.string(),
    publicationYear: publicationYear,
  });

  const deleteBookSchema = yup.object().shape({
   id: yup.string().required('ID is required'),
  });

export { getBookSchema, createBookSchema, updateBookSchema, deleteBookSchema };
