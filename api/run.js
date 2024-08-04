import { exec } from 'child_process';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { command } = req.body;

        // Security Note: Allowing arbitrary command execution is dangerous!
        exec(command, (error, stdout, stderr) => {
            if (error) {
                res.status(500).json({ output: `Error: ${stderr}` });
                return;
            }
            res.status(200).json({ output: stdout });
        });
    } else {
        res.status(405).json({ output: 'Method not allowed' });
    }
}

export const config = {
    api: {
        bodyParser: true
    }
};
