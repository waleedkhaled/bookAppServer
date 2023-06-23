import { getSingleBook, getBooksList, createBook, updateBook, deleteBook } from '../src/services';
import { getBookSchema, createBookSchema, updateBookSchema, deleteBookSchema } from '../src/schemas';
import { ErrorsCodes } from '../constants';

export const resolvers = {
  Query: {
    // get a single book
    async getSingleBook(arg: any, { id }: Record<string, any>) {
      try {
        //data validation
        await getBookSchema.validate({ id });
        //get the book
        const book = await getSingleBook({ id: id });
        if (!book) {
          return {
            success: false,
            error: {
              code: ErrorsCodes.notFound,
              message: 'empty',
            },
            book: null,
          };
        }
        return {
          success: true,
          book: book,
          error: null,
        };
      } catch (error: any) {
        if (error.name === 'ValidationError') {
          return {
            success: false,
            error: {
              code: ErrorsCodes.invalidData,
              message: error.errors.join(', '),
            },
            book: null,
          };
        }
        console.log('error:', error);
        throw new Error('error in getting books list');
      }
    },
    //get all the list
    async getBooksList(arg: any) {
      try {
        const books = await getBooksList();
        if (!books) {
          return {
            success: false,
            error: {
              code: ErrorsCodes.notFound,
              message: 'empty',
            },
            book: null,
          };
        }
        return {
          success: true,
          books: books,
          error: null,
        };
      } catch (error) {
        console.log('error:', error);
        throw new Error('error in getting books list');
      }
    },
  },
  Mutation: {
    //add a book
    async createBook(arg: any, { input }: Record<string, any>) {
      try {
        // data validation
        await createBookSchema.validate(input);
        //add the book
        const createdBook = await createBook({
          title: input.title,
          author: input.author,
          publicationYear: input.publicationYear,
        });
        console.log("created book is : ", createdBook)
        //error handling
        if (!createdBook) {
          return {
            success: false,
            error: {
              code: ErrorsCodes.add,
              message: 'error in creating book',
            },
            book: null,
          };
        }
        return {
          success: true,
          book: createdBook,
          error: null,
        };
      } catch (error: any) {
        if (error.name === 'ValidationError') {
          console.log(error);
          return {
            success: false,
            error: {
              code: ErrorsCodes.invalidData,
              message: error.errors.join(', '),
            },
            book: null,
          };
        }
        console.log('error:', error);
        throw new Error('error in creating book');
      }
    },
    //update book
    async updateBook(arg: any, { input }: Record<string, any>) {
      try {
        // data validating
        await updateBookSchema.validate(input);
        //update book
        const updated = await updateBook({
          id: input.id,
          updatedFields: {
            title: input.title,
            author: input.author,
            publicationYear: input.publicationYear,
          },
        });
        if (!updated) {
          return {
            success: false,
            error: {
              code: ErrorsCodes.update,
              message: 'error in updating book',
            },
            book: null,
          };
        }
        return {
          success: true,
          book: updated,
          error: null,
        };
      } catch (error: any) {
        if (error.name === 'ValidationError') {
          console.log(error);
          return {
            success: false,
            error: {
              code: ErrorsCodes.invalidData,
              message: error.errors.join(', '),
            },
            book: null,
          };
        }
        console.log('error:', error);
        throw new Error('error in updating book');
      }
    },
    //delete book
    async deleteBook(arg: any, { id }: Record<string, any>) {
      try {
        //data validating
        await deleteBookSchema.validate({ id });
        //delete book
        const deletedBook = await deleteBook({
          id: id,
        });
        if (!deletedBook) {
          return {
            success: false,
            error: {
              code: ErrorsCodes.delete,
              message: 'error in deleting book',
            },
            book: null,
          };
        }
        return {
          success: true,
          book: deletedBook,
          error: null,
        };
      } catch (error: any) {
        if (error.name === 'ValidationError') {
          return {
            success: false,
            error: {
              code: ErrorsCodes.invalidData,
              message: error.errors.join(', '),
            },
            book: null,
          };
        }
        console.log('error:', error);
        throw new Error('error in deleting book');
      }
    },
  },
};
