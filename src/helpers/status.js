export const success = (res, result) => res.send(result).status(200);
export const internalError = (res, err) => res.send(err).status(500);
export const badRequest = (res, err) => res.send(err).status(400);
