const {SupabaseClient} = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const moment = require("moment");
// const {createClient} = require("@supabase/supabase-js");

dotenv.config();
moment.locale("en-gb");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const sendgridKey = process.env.SENDGRID_API_KEY;
const postmarkClientKey = process.env.POSTMARK_CLIENT;
const paypalBaseUrl = process.env.PAYPAL_BASE_URL;
const paypalClientId = process.env.PAYPAL_CLIENT_ID;
const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET;
const smsAccSID = process.env.TWILLIO_ACCOUNT_SID;
const smsAuthToken = process.env.TWILLIO_AUTH_TOKEN;
const supabaseAdminClient = new SupabaseClient(supabaseUrl, supabaseKey,
    {
      auth: {
        persistSession: false,
        detectSessionInUrl: false,
        autoRefreshToken: false,
      },
    });


module.exports = {
  supabaseAdminClient, sendgridKey, postmarkClientKey, paypalBaseUrl, paypalClientId, paypalClientSecret, smsAccSID, smsAuthToken,
};
