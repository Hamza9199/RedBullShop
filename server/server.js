const express = require('express');
const app = express();


const PORT = 3000;

app.use(express.static(path.join(__dirname)));


app.get('/', (req, res) => {
    res.send('priprema');
});


app.listen(PORT, () => {
    console.log(`Server pokrenut na http://localhost:${PORT}`);
});
