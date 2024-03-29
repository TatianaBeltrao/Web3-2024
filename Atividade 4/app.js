// importando o Módulo do Express
const express = require('express')
const app =express();
const port = 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Simulando banco de dados
let books = [
    {id: 1, title: "Livro 1"},
    {id: 2, title: "Livro 2"},
    {id: 3, title: "Livro 3"},
];

// Rota para obter dados dos livros
app.get('/books', (req, res) => {
    res.json(books);
}); 

// Rota para adicionar novo Livro
app.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.json(newBook);
});

app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const newTitle = req.body.title;

    const bookToUpdate = books.find(book => book.id === bookId);

    if (bookToUpdate) {
        bookToUpdate.title = newTitle;
        res.json(bookToUpdate);
    } else {
        res.status(404).send("Livro não encontrado!")
    }
});

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const indexToRemove = books.findIndex(book => book.id === bookId);

    if (indexToRemove !== -1) {
        const removedBook = books.splice(indexToRemove, 1);
        res.json(removedBook[0]);
    } else {
        res.status(404).send("Livro não encontrado!")
    }
});


app.listen(port, () => {
    console.log('Servidor rodando na porta ${port}')
})