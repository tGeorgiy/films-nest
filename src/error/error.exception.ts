import { HttpException } from '@nestjs/common';

export class UserArleadyExistException extends HttpException {
  constructor() {
    super('User with this email already exist', 409);
  }
}

export class PageNotFoundException extends HttpException {
  constructor() {
    super('Page not found', 404);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super('The user with the requested identifier does not exist', 404);
  }
}

export class WrongCredentialsException extends HttpException {
  constructor() {
    super('Wrong credentials provided', 404);
  }
}

export class MovieNotFoundException extends HttpException {
  constructor() {
    super('The movie with the requested identifier does not exist', 404);
  }
}

export class MovieArleadyExistException extends HttpException {
  constructor() {
    super('The movie already exist', 409);
  }
}

export class ListNotFoundException extends HttpException {
  constructor() {
    super('The list with the requested identifier does not exist', 404);
  }
}
