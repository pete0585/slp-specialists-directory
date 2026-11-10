import { z } from 'zod'
import { text, optional, email, state, website, phone, list, stableSlug, submissionRoute } from './submission-core'

export const schema=z.object({name:text(150).min(2),credentials:optional(100),city:text(100).min(1),state,email,phone,website,bio:optional(2000),specialties:optional(160),telehealth:z.boolean().default(false)}).strict()
export function buildRow(d:z.infer<typeof schema>){return {slug:stableSlug(d.name,d.email,d.city,d.state),full_name:d.name,credentials:d.credentials,city:d.city,state:d.state,email:d.email,phone:d.phone,website_url:d.website,bio:d.bio,specialties:d.specialties?[d.specialties]:[],telehealth_available:d.telehealth,listing_tier:'free',listing_tier_rank:0,is_active:true,is_approved:false,is_claimed:false,is_verified:false,do_not_email:true,email_source:'self_submission_pending'}}
export const POST=submissionRoute(schema,buildRow,{field:'email_source',value:'self_submission_pending'})
