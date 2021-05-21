module.exports = {
  plugins: [
    require('postcss-preset-env')({
      overrideBrowserslist: ['> 1%', 'last 2 version']
    })

    // require('postcss-pxtorem')({
    //   propWhiteList: [
    //     'margin',
    //     'margin-bottom',
    //     'margin-top',
    //     'font-size',
    //     'font',
    //     'padding',
    //     'padding-left',
    //     'padding-right',
    //     'padding-bottom',
    //     'padding-top',
    //     'max-width',
    //     'max-height',
    //     'width',
    //     'height',
    //     'min-width',
    //     'min-height'
    //   ]
    // })
  ]
};
