import { createClient } from '@supabase/supabase-js';
import { env } from '~/env.mjs';

const supabaseUrl = 'https://qapykcdprhrersuvogia.supabase.co';
export const serverbase = createClient(supabaseUrl, env.PRIVATE_SUPABASE);