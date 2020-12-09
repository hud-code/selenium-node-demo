if(process.env.CIRCLECI) {
  let browsers = [process.argv[10]];
} else {
  let browsers = ['chrome', 'firefox'];
}

module.exports.browsers = browsers;