import { createClient } from "@/utils/supabase/server";

export async function getMakanan() {
    // 'use cache'; // Commented out to fix build error: cookies() cannot be used inside 'use cache'

    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from("makanan")
        .select(`
            id_makanan, 
            kategori_id, 
            nama_makanan, 
            kadar, 
            satuan,
            kelompok,
            rincian_lemak (
                id_rincian_lemak,
                lemak_total,
                lemak_jenuh,
                lemak_tak_jenuh_tunggal,
                lemak_tak_jenuh_ganda,
                keterangan_omega
            )
        `)
        .order('nama_makanan', { ascending: true });

    if (error) {
        console.error("Error fetching makanan:", error);
        return [];
    }

    return data;
}
export async function getStats() {
    const supabase = await createClient();

    // Mengambil total makanan
    const { count: totalMakanan, error: totalError } = await supabase
        .from("makanan")
        .select("*", { count: "exact", head: true });

    // Mengambil jumlah kategori lemak (id: 2)
    const { count: totalLemak, error: lemakError } = await supabase
        .from("makanan")
        .select("*", { count: "exact", head: true })
        .eq("kategori_id", 2);

    if (totalError || lemakError) {
        console.error("Error fetching stats:", totalError || lemakError);
        return { totalMakanan: 0, totalLemak: 0 };
    }

    return {
        totalMakanan: totalMakanan || 0,
        totalLemak: totalLemak || 0
    };
}
