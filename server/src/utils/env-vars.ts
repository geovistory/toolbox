const missingEnvVars: string[] = []

export const env = {
  COMMUNITY_PROJECT_ID: '',
  CLIENT_URL: '',
  SERVER_URL: ''
}

// read environment and assign values to env
for (const key in env) {
  const k = key as keyof typeof env;
  const value = process.env[k];
  if (value === undefined) missingEnvVars.push(key);
  else env[k] = value;
}

// throw error if variables are missing
if (missingEnvVars.length > 0) {
  throw new Error('The following ENV VARS are required: ' + missingEnvVars.join(', '))
}
