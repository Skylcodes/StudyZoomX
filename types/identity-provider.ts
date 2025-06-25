export enum IdentityProvider {
  Credentials = 'credentials',
  TotpCode = 'totp-code',
  RecoveryCode = 'recovery-code',
  Google = 'google',
  MicrosoftEntraId = 'microsoft-entra-id'
}

export enum OAuthIdentityProvider {
  Google = IdentityProvider.Google,
  MicrosoftEntraId = IdentityProvider.MicrosoftEntraId
}

export const identityProviderFriendlyNames = {
  [IdentityProvider.Credentials]: 'Credentials',
  [IdentityProvider.TotpCode]: 'TOTP code',
  [IdentityProvider.RecoveryCode]: 'Recovery code',
  [IdentityProvider.Google]: 'Google',
  [IdentityProvider.MicrosoftEntraId]: 'Microsoft'
} as const;
