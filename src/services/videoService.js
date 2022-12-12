import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = "https://jupquzrprxlxzuvusaix.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1cHF1enJwcnhseHp1dnVzYWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAzNDQ5NDAsImV4cCI6MTk4NTkyMDk0MH0.mDO5abFfhKUBkQH5L8vKxyh_yKuGB6mLuGTkjLEjKqw"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*")
        }
    }
}