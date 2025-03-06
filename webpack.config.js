const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/firebaseauth.js',
    output: {
        path: path.resolve(__dirname, 'pages'),
        filename: 'bundle.js'
    },
    watch: true
}