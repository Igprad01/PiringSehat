import { createClient } from "@supabase/supabase-js"
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

async function test() {
    console.log("🔍 Mengetes koneksi ke Supabase...");
    const { data, error } = await supabase
        .from("makanan")
        .select("*")
        .limit(5);

    if (error) {
        console.error("❌ Error Supabase:", error.message);
    } else {
        console.log("✅ Koneksi Berhasil!");
        console.log("📊 Data ditemukan:", data?.length || 0, "baris");
        console.log("📝 Contoh Data:", JSON.stringify(data, null, 2));
    }
}

test();
