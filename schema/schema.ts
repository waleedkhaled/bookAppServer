import * as yup from 'yup';

// validating schemas
const publicationYear = yup
  .number()
  .typeError('invalid input')
  .integer('invalid input')
  .positive('year should be greater than 0')
  .max(new Date().getFullYear(), 'this date cannot be in the future');

  const AddSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    publicationYear: publicationYear.required('Publication Year is required'),
  });

const getBookSchema = yup.object().shape({
  id: yup.string().required(),
});

const updateSchema = yup.object().shape({
  title: yup.string(),
  author: yup.string(),
  publicationYear: publicationYear,
  id: yup.string().required('required'),
});

const deleteSchema = yup.object().shape({
  id: yup.string().required('required'),
});

export { getBookSchema, AddSchema, updateSchema, deleteSchema };
