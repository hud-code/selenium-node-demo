var browsers;

if(process.env.BROWSER) {
  browsers = [process.env.BROWSER];
} else {
  browsers = ['chrome', 'firefox'];
}

module.exports.browsers = browsers;