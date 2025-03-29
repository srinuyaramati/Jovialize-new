const envProps = {
    production: {
      API_URL: "/"
    },
    qua: {
      API_URL: "/"
    },
    development: {
      API_URL: "/"
    },
    local: {
      API_URL: "http://localhost:6001/"
    }
}

function getEnv() {
    return 'local'
}

export function getEnvProp(propName) {
    return envProps[getEnv()][propName]
}
  
export function getAPIURL() {
    return getEnvProp('API_URL')
}