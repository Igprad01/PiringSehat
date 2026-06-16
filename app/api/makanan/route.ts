import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    try {
        const body = await request.json();
        const { nama_makanan, kategori_id, porsi, kadar_gizi, satuan_gizi, ...lemakData } = body;

        // 3. Insert Utama
        const { data: makananData, error: makananError } = await supabase
            .from("makanan")
            .insert({
                nama_makanan,
                kategori_id,
                porsi,
                kadar_gizi,
                satuan_gizi
            })
            .select("id")
            .single();

        if (makananError) {
            return NextResponse.json({ error: makananError.message }, { status: 500 });
        }

        const id_makanan = makananData.id;

        // 5. Cek Kategori Form
        if (kategori_id === 2) {
            // Ya - Kategori Lemak
            const { error: lemakError } = await supabase
                .from("rincian_lemak")
                .insert({
                    id_makanan,
                    lemak_jenuh: lemakData.lemak_jenuh || 0,
                    lemak_tak_jenuh_ganda: lemakData.lemak_tak_jenuh_ganda || 0,
                    lemak_tak_jenuh_tunggal: lemakData.lemak_tak_jenuh_tunggal || 0,
                    lemak_trans: lemakData.lemak_trans || 0,
                    kolesterol: lemakData.kolesterol || 0
                });

            if (lemakError) {
                // Should we rollback or just return error? For simple flow return error.
                return NextResponse.json({ error: lemakError.message }, { status: 500 });
            }
        }

        return NextResponse.json({ message: "Created", id_makanan }, { status: 201 });
    } catch (e: unknown) {
        if (e instanceof Error) {
            return NextResponse.json({ error: e.message }, { status: 500 });
        }
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const url = new URL(request.url);
    const kategori_id = url.searchParams.get("kategori_id");

    let query = supabase.from("makanan").select("*, rincian_lemak(*)");

    if (kategori_id) {
        query = query.eq("kategori_id", kategori_id);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("makanan").delete().eq("id", request.nextUrl.searchParams.get("id"));
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}
