export enum AuthErrorCode {
  NewEmailConflict = 'new_email_conflict',
  UnverifiedEmail = 'unverified_email',
  IncorrectEmailOrPassword = 'incorrect_email_or_password',
  TotpCodeRequired = 'totp_code_required',
  IncorrectTotpCode = 'incorrect_totp_code',
  MissingRecoveryCodes = 'missing_recovery_codes',
  IncorrectRecoveryCode = 'incorrect_recovery_code',
  RequestExpired = 'request_expired',
  RateLimitExceeded = 'rate_limit_exceeded',
  IllegalOAuthProvider = 'illegal_oauth_provider',
  InternalServerError = 'internal_server_error',
  MissingOAuthEmail = 'missing_oauth_email',
  AlreadyLinked = 'already_linked',
  RequiresExplicitLinking = 'requires_explicit_linking',
  UnknownError = 'unknown_error'
}

export const authErrorMessages: Record<AuthErrorCode, string> = {
  [AuthErrorCode.NewEmailConflict]: 'Email already exists.',
  [AuthErrorCode.UnverifiedEmail]: 'Email is not verified.',
  [AuthErrorCode.IncorrectEmailOrPassword]: 'Email or password is not correct.',
  [AuthErrorCode.TotpCodeRequired]: 'TOTP code is required.',
  [AuthErrorCode.IncorrectTotpCode]: 'The TOTP code is not correct.',
  [AuthErrorCode.MissingRecoveryCodes]: 'Missing recovery codes.',
  [AuthErrorCode.IncorrectRecoveryCode]: 'The recovery code is not correct.',
  [AuthErrorCode.RequestExpired]: 'Request has expired.',
  [AuthErrorCode.RateLimitExceeded]: 'Rate limit exceeded.',
  [AuthErrorCode.IllegalOAuthProvider]: 'Illegal OAuth provider.',
  [AuthErrorCode.InternalServerError]:
    'Something went wrong. Please try again later.',
  [AuthErrorCode.MissingOAuthEmail]: 'Missing OAuth email.',
  [AuthErrorCode.AlreadyLinked]: 'OAuth account has been already linked.',
  [AuthErrorCode.RequiresExplicitLinking]:
    'Please sign in first to link this account',
  [AuthErrorCode.UnknownError]: 'Unknown error.'
};
