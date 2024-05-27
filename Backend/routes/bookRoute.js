//importing express
import express from 'express';
import { Book } from '../models/bookModel.js';
//express router
const router = express.Router();


//save book route
router.post('/', async (req, res) => {
    try {
        if (!req.body.title ||
            !req.body.author ||
            !req.body.publishyear
        ) {
            return res.status(400).send({
                message: 'Send all required fields:title,author,publishyear'
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishyear: req.body.publishyear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message })
    }
})

//get book route
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(201).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message })
    }
})

//get one book route
router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const book = await Book.findById(id);
        return res.status(201).send(book);

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message })
    }
})

//update book route
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title ||
            !req.body.author ||
            !req.body.publishyear
        ) {
            return res.status(400).send({
                message: 'Send all required fields:title,author,publishyear'
            })
        }
        let { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body);
        if (!updatedBook) {
            return res.status(404).send({
                message: 'Book not found!'
            })
        }
        return res.status(201).send({ message: 'Book Updated Successfully!' })


    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message })
    }
})

//delete book route
router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send({
                message: 'Book not found!'
            });
        }
        return res.status(200).send({ message: 'Book Deleted Successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
});

export default router;