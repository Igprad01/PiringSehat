import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("makanan").select("*");
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("makanan").select("*");
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





