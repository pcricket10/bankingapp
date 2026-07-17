import jwt from "jsonwebtoken";

function appError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(appError(401, "Missing or invalid authorization header"));
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return next(appError(500, "JWT_SECRET is not configured"));
  }

  try {
    req.auth = jwt.verify(token, secret);
    next();
  } catch {
    next(appError(401, "Invalid or expired token"));
  }
}

export function requireAccountAccess(req, res, next) {
  const routeAcctNumber = Number(req.params.acctNumber);

  if (!Number.isFinite(routeAcctNumber)) {
    return next(appError(400, "Invalid account number"));
  }

  if (!req.auth || Number(req.auth.acctNumber) !== routeAcctNumber) {
    return next(appError(403, "Forbidden: token does not match account"));
  }

  next();
}
