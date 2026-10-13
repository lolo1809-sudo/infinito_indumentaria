//Conectar la aplicación de React con la base de datos de Supabase

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wvlnzbwwvqyniujgsibq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Zf3figqKssvdnDA7Ps4QvQ_Xd5zdNEN";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
