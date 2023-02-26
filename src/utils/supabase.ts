import { createClient } from '@supabase/supabase-js';
import { env } from '~/env.mjs';

const supabaseUrl = 'https://qapykcdprhrersuvogia.supabase.co';
export const supabase = createClient(supabaseUrl, env.NEXT_PUBLIC_PUBLIC_SUPABASE);