export class UpdateError extends Error{
  constructor(message: string = "Error in update item") {
    super(message); 
    this.name = 'UpdateError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UpdateError);
    }
  }
}