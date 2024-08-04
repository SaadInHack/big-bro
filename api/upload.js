const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/run', (req, res) => {
    const command = req.body.command;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.json({ output: `Error: ${stderr}` });
            return;
        }
        res.json({ output: stdout });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
