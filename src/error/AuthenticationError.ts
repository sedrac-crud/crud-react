export class AuthenticationError extends Error{
  constructor(message: string = "Error in Authentication") {
    super(message); 
    this.name = 'AuthenticationError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthenticationError);
    }
  }
}