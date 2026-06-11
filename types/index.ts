export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

export interface kategori {
    id_kategori:number;
    nama_kategori:string;
}

export interface Makanan {
  id_makanan: number;         
  kategori_id: number;       
  no: number | null;          
  nama_makanan: string;      
  kadar: string;              
  satuan: string;             
  kelompok: string;           
  keterangan: string | null;  
  senyawa: string | null;     
}

export interface RincianLemak {
  id_rincian_lemak: number;
  makanan_id: number;
  lemak_total: string;
  lemak_jenuh: string;
  lemak_tak_jenuh_tunggal: string;
  lemak_tak_jenuh_ganda: string;
  keterangan_omega: string | null;
}
