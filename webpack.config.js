module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bloodhound.min.js',
    library: 'Bloodhound'
  },
  devtool: "source-map"
};
