// import ReactDom from 'react-dom'
// ===
// externals: {
//  "react-dom": "ReactDom"
// }

module.exports = {
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "primeflex": "primeflex",
    "primeicons": "primeicons",
    "primereact": "primereact",
    "react-markdown": "ReactMarkdown",
    "classnames": "classNames",
    "react-redux": "ReactRedux",
    "redux": "Redux"
  },
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ]
      }
    }
  };