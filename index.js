const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`
        <h1>Vulnerable Node.js App</h1>
        <form method="POST" action="/eval">
            <label>Enter JavaScript code:</label><br>
            <input type="text" name="code" style="width:400px" />
            <button type="submit">Execute</button>
        </form>
    `);
});

app.post('/eval', (req, res) => {
    const code = req.body.code;
    try {
        const result = eval(code); // Vulnerable to RCE
        res.send(`<pre>Result: \${result}</pre>`);
    } catch (err) {
        res.send(`<pre>Error: \${err.message}</pre>`);
    }
});

app.listen(port, () => {
    console.log(`Vulnerable app listening at http://localhost:\${port}`);
});
