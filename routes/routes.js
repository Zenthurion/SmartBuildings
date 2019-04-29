var appRouter = (app) => {
    app.get('/temp', (req, res) => {
        let value = Math.floor(Math.random() * 60) - 20
        res.send(value.toString())
    })
    app.get('/', (req, res) => {
        res.send("Hello world!")
    })
}

module.exports = appRouter