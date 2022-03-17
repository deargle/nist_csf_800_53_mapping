module.exports = {
  publicPath: process.env.NODE_ENV == 'production'
    ? '/nist_csf_800_53_mapping/'
    : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'NIST Cybersecurity Framework &#11108;&nbsp;&nbsp;800&#8209;53 Controls Mapping'
    }
  }
}
