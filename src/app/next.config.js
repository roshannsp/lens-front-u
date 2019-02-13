require('dotenv').config()
const webpack = require('webpack')

const withSass = require('@zeit/next-sass')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const withCSS = require('@zeit/next-css')

module.exports = withCSS(
  withSass({
    webpack: config => {
      config.plugins = config.plugins || []
      config.plugins = [
        ...config.plugins
        // Read the .env file
      ]

      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]'
          }
        }
      })

      config.plugins.push(new webpack.EnvironmentPlugin(process.env))

      return config
    },
    distDir: '../../dist/functions/next'
  })
)
