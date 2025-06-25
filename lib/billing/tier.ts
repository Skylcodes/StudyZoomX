export enum Tier {
  Free = 'free',
  Pro = 'pro',
  ProPendingCancel = 'pro-pending-cancel'
}

export const displayNames = {
  [Tier.Free]: 'Free',
  [Tier.Pro]: 'Pro',
  [Tier.ProPendingCancel]: 'Pro'
};
