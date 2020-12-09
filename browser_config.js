if(process.env.BROWSER) {
  let browsers = [process.env.BROWSER];
} else {
  let browsers = ['chrome', 'firefox'];
}

module.exports.browsers = browsers;