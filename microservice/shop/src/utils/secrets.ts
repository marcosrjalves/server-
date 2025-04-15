import { getSecretValue } from '@src/services/secretsManager';
const cachedJWTSecret: { value?: string } = {}

export async function JWTSecret () {
  if(!cachedJWTSecret.value) {
    const secret = await getSecretValue(process.env.JWT_SECRET as string);
    cachedJWTSecret.value = secret;
  }
  return cachedJWTSecret.value;
}
