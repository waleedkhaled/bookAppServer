import { PrismaClient } from '@prisma/client';
import { ErrorsCodes } from '../constants';
import { getBookParams, addBookParams, BookParams, updateBookParams, deleteBookParams } from '../src/interfaces';

const prisma = new PrismaClient();

/**
 * function to get all books
 * @returns {Promise<Book[]>} - return books list
 */
 export const getBooksList = async (): Promise<BookParams[]> => {
  try {
    const books = await prisma.book.findMany();

    return books;
  } catch (err) {
    console.error('error in getting books list ', err);

    throw new Error(ErrorsCodes.connection);
  }
};


/**
 * function to add new book
 * @param {addBookParams} createBookData - book input
 * @returns {Promise<BookParams>} - returns book
 */
 export const createBook = async ({ title, author, publicationYear }: addBookParams): Promise<BookParams> => {
  try {
    const createdBook = await prisma.book.create({
      data: {
        title,
        author,
        publicationYear,
      },
    });

    return createdBook;
  } catch (err) {
    console.error('error in add book ', err);
    throw new Error(ErrorsCodes.connection);
  }
};

/**
 * function to Update book
 * @param {updateBookParams} updateBookData - book input.
 * @param {string} updateBookData.id - book id.
 * @param {object} updateBookData.updatedFields - new book data.
 * @returns {Promise<BookParams|null>} - return book if found null otherwise
 */
export const updateBook = async ({ id, updatedFields }: updateBookParams): Promise<BookParams | undefined> => {
  try {
    const updatedBook = await prisma.book.update({
      where: { id: id },
      data: updatedFields,
    });

    return updatedBook;
  } catch (err) {
    console.error('error in update book ', err);
  }
};

/**
 * function to get book
 * @param {string} id - book id
 * @returns {Promise<Book|null>} - return the book if found null otherwise
 */
export const getSingleBook = async ({ id }: getBookParams): Promise<BookParams | null> => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: id },
    });

    return book;
  } catch (err) {
    console.error('error in get book ', err);
    throw new Error(ErrorsCodes.connection);
  }
};


/**
 * function to delete a book
 * @param {string} id - book id
 * @returns {Promise<boolean>} - return book if deleted null otherwise
 */
export const deleteBook = async ({ id }: deleteBookParams): Promise<BookParams | undefined> => {
  try {
    const deletedBook = await prisma.book.delete({
      where: { id: id },
    });

    return deletedBook;
  } catch (err) {
    console.error('error in delete book ', err);
  }
};
