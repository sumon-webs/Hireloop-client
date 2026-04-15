import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID= {
    'seeker_pro':'price_1TgMSxJIcN68seDXcNkqRsUH',
    'seeker_premium':'price_1TgN2IJIcN68seDXst9JJIzC',
    'recruiter_growth':'price_1TgN5wJIcN68seDXVWyJRdo4',
    'recruiter_enterprise':'price_1TgN6eJIcN68seDXrgn3Z6tj'
}