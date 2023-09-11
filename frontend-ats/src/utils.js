import jwt_decode from 'jwt-decode';

/**
 * Validates if the email format is correct.
 */
export const validateEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

/**
 * Returns token remaining time in minutes.
 */
export const tokenRemainingTime = (token) => {
  const decode = jwt_decode(token);

  const expirationTimestamp = decode.exp; // Given in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const timeRemainingInSeconds = expirationTimestamp - currentTimestamp;

  if (timeRemainingInSeconds > 0) {
    const timeRemainingInMinutes = Math.floor(timeRemainingInSeconds / 60);
    return timeRemainingInMinutes;
  }

  return 0;
};
