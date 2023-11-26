const taildwindcss = require('tailwindcss'); 

module.exports = { 

    plugins:[ 

        taildwindcss('./tailwind.config.js'), 

        require('autoprefixer') 

    ] 

} 