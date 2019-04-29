var appRouter = (app) => {
    app.get('/temp', (req, res) => {
        let value = Math.floor(Math.random() * 6) + 1
        res.sendStatus(value.toString())
        console.log(value)
    })
    app.get('/', (req, res) => {
        res.sendStatus("Hello world!")
        console.log("Hello World")
    })
}

module.exports = appRouter