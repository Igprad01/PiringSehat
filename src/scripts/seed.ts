import { createClient } from "@supabase/supabase-js"
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function main() {
    console.log("memulai data seeder");

    const { data, error } = await supabase.from("kategori").select("*");
    if (error) {
        console.error("Error fetching data:", error);
        return;
    }
    console.log(data);
}

main();

// nanti data seedernya disini nanti fokus ke seeder setalh itu baru crud dan UI nya serta flow nya.