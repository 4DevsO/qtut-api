export const success = (res, result) => res.status(200).send(result);
export const internalError = (res, err) => res.status(500).send(err);
export const badRequest = (res, errorMessage = 'Bad Request') =>
  res.status(400).send({ message: errorMessage });
