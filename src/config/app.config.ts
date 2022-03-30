type Config = {
  environment: Environment
}

export type Environment = {
  BACK_END_API: {
    BASE_URL: string
  }
}

const config: Config = {
  environment: {
    BACK_END_API: {
      BASE_URL: process.env.REACT_APP_API_BACKEND_BASE_URL || '',
    },
  },
}

export default config
