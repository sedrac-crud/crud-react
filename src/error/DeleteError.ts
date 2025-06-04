export class DeleteError extends Error{
  constructor(message: string = "Error in remove item") {
    super(message); 
    this.name = 'DeleteError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DeleteError);
    }
  }
}