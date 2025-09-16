import { SubscriptionFrequency, SubscriptionPlanSlug } from '@side-kit/db';
import { z, type TypeOf } from 'zod';

export const subscriptionFrequencyEnum = z.nativeEnum(SubscriptionFrequency);
export type SubscriptionFrequencyEnumType = TypeOf<typeof subscriptionFrequencyEnum>;

export const subscriptionPlanSlugEnum = z.nativeEnum(SubscriptionPlanSlug);
export type SubscriptionPlanSlugEnumType = TypeOf<typeof subscriptionPlanSlugEnum>;
