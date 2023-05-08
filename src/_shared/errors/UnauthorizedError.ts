interface IError {
  msg: string;
  statusCode: number;
  module?: string;
}

export class UnauthorizedError extends Error {
  constructor(data: IError, message) {
    super(message);

    const inModule = `in ${data.module} module`;
    this.message = data.module
      ? `ERROR-${data.statusCode}: ${data.msg} ${inModule}`
      : `ERROR-${data.statusCode}: ${data.msg}`;
  }
}
