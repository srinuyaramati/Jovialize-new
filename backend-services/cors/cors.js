var whiteList = ['http://localhost:3001', 'http://localhost:3000']

function CORSSetting() {
  return {
    origin: function (origin, callback) {
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
  }
}

module.exports = { CORSSetting: CORSSetting }