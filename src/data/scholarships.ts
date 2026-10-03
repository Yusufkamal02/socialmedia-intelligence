// Scholarship Pathway data. This file is the single source of truth for /scholarships.
// Edit entries here; the page recomputes each status from the dates on every request.
// Only use official sources for dates. See docs/scholarship-verification-report.md.

import type { Scholarship } from "@/lib/scholarships";

export const scholarships: Scholarship[] = [
  {
    "slug": "chevening",
    "name": "Chevening",
    "country": "United Kingdom",
    "levels": [
      "master"
    ],
    "funding": "Biaya kuliah, tunjangan bulanan, tiket, 1x visa, tunjangan kedatangan dan kepulangan",
    "pngEligibility": "PNG punya halaman khusus. Kerja minimal 2 tahun (sekitar 2.800 jam), wajib kembali ke PNG minimal 2 tahun, memilih 3 program S2 di Inggris. PNG pernah mendapat 10 tempat pada 2023 (data lama).",
    "officialUrl": "https://www.chevening.org/scholarship/papua-new-guinea/",
    "extraUrls": [
      {
        "label": "More information",
        "url": "https://www.chevening.org/scholarships/application-timeline/"
      }
    ],
    "opensAt": null,
    "closesAt": null,
    "deadlineNote": "Tutup 6 Okt 2026 pukul 11:00 UTC (18:00 WIB / 21:00 waktu PNG)",
    "nextRound": {
      "text": "Estimasi: buka sekitar Agu-Sep 2027, tutup sekitar Okt 2027",
      "confirmed": false
    },
    "sourceType": "official",
    "lastVerified": "2026-10-03",
    "verifiedBy": "https://www.chevening.org/scholarship/papua-new-guinea/"
  },
  {
    "slug": "australia-awards",
    "name": "Australia Awards",
    "country": "Australia",
    "levels": [
      "bachelor",
      "master",
      "phd"
    ],
    "funding": "Beasiswa pemerintah Australia (tunjangan dan biaya studi sesuai kebijakan program)",
    "pngEligibility": "Warga PNG tanpa kewarganegaraan ganda, tinggal dan bekerja di PNG saat mendaftar. Pendaftar dari perempuan, penyandang disabilitas, dan daerah pedesaan sangat didorong.",
    "officialUrl": "https://www.australiaawardspng.org/scholarships/australia-awards-png-scholarships",
    "extraUrls": [
      {
        "label": "More information",
        "url": "https://www.dfat.gov.au/people-to-people/australia-awards/australia-awards-scholarships-opening-and-closing-dates"
      }
    ],
    "opensAt": null,
    "closesAt": null,
    "deadlineNote": "Intake 2027: 1 Feb - 30 Apr 2026",
    "nextRound": {
      "text": "Estimasi: intake 2028 buka sekitar Feb 2027 (belum resmi)",
      "confirmed": false
    },
    "sourceType": "third-party",
    "lastVerified": "2026-10-03",
    "verifiedBy": "https://www.australiaawardspng.org/scholarships/australia-awards-png-scholarships"
  },
  {
    "slug": "manaaki-new-zealand-scholarships",
    "name": "Manaaki New Zealand Scholarships",
    "country": "New Zealand",
    "levels": [
      "bachelor",
      "master",
      "phd"
    ],
    "funding": "Beasiswa penuh pemerintah Selandia Baru",
    "pngEligibility": "PNG masuk daftar negara Pasifik yang eligible. Rencana mulai studi: semester 1 tahun setelah mendaftar. Portal dapat tutup lebih awal bila pendaftar banyak.",
    "officialUrl": "https://www.nzscholarships.govt.nz/check-eligible-countries/",
    "extraUrls": [
      {
        "label": "More information",
        "url": "https://mnzspapplicantportal.powerappsportals.com/"
      }
    ],
    "opensAt": null,
    "closesAt": null,
    "deadlineNote": "Aplikasi tertiary saat ini ditutup (tanggal persis tidak tercantum di halaman)",
    "nextRound": {
      "text": "Belum diumumkan. Putaran 2026 (pihak ketiga): 1 Mar - 10 Apr",
      "confirmed": false
    },
    "sourceType": "third-party",
    "lastVerified": "2026-10-03",
    "verifiedBy": "https://www.nzscholarships.govt.nz/check-eligible-countries/"
  },
  {
    "slug": "commonwealth-scholarships",
    "name": "Commonwealth Scholarships (Master, PhD, Shared, Distance Learning)",
    "country": "United Kingdom",
    "levels": [
      "master",
      "phd"
    ],
    "funding": "Biaya kuliah, tiket, tunjangan hidup (varian Distance Learning: keringanan biaya kuliah)",
    "pngEligibility": "PNG ada di daftar negara berkembang Commonwealth yang eligible. Shared Scholarship mensyaratkan bukti tidak mampu membiayai sendiri dan harus mendaftar program yang eligible.",
    "officialUrl": "https://cscuk.fcdo.gov.uk",
    "extraUrls": [
      {
        "label": "More information",
        "url": "https://www.southampton.ac.uk/study/fees-funding/scholarships/partnerships-commonwealth-shared"
      }
    ],
    "opensAt": null,
    "closesAt": null,
    "deadlineNote": "Putaran 2026/27 sudah tutup (Shared Scholarship: sekitar 9 Des 2025 menurut sumber pihak ketiga)",
    "nextRound": {
      "text": "Siklus 2027/28: cek langsung ke CSC UK",
      "confirmed": false
    },
    "sourceType": "third-party",
    "lastVerified": "2026-10-03",
    "verifiedBy": "https://cscuk.fcdo.gov.uk"
  },
  {
    "slug": "fulbright-foreign-student-program",
    "name": "Fulbright Foreign Student Program",
    "country": "United States",
    "levels": [
      "master"
    ],
    "funding": "Studi pascasarjana yang didanai pemerintah AS",
    "pngEligibility": "Khusus warga PNG. Tanpa tanggungan (dependents). Wajib pulang minimal 2 tahun (syarat visa J). Tidak wajib tes standar saat mendaftar.",
    "officialUrl": "https://pg.usembassy.gov/fulbright-graduate-student-program/",
    "extraUrls": [],
    "opensAt": null,
    "closesAt": null,
    "deadlineNote": "Putaran terakhir: 30 Apr 2026",
    "nextRound": {
      "text": "Belum diumumkan",
      "confirmed": false
    },
    "sourceType": "official",
    "lastVerified": "2026-10-03",
    "verifiedBy": "https://pg.usembassy.gov/fulbright-graduate-student-program/"
  },
  {
    "slug": "u-s-south-pacific-scholarship-program",
    "name": "U.S. South Pacific Scholarship Program (USSP)",
    "country": "United States",
    "levels": [
      "bachelor",
      "master"
    ],
    "funding": "Biaya kuliah, buku, perumahan, asuransi, tunjangan, tiket",
    "pngEligibility": "PNG termasuk negara eligible. Bidang studi diarahkan pada kebutuhan pembangunan negara kepulauan Pasifik.",
    "officialUrl": "https://pg.usembassy.gov/ussp-scholarship-program/",
    "extraUrls": [],
    "opensAt": null,
    "closesAt": null,
    "deadlineNote": "Halaman resmi menyatakan aplikasi tertutup (halaman tidak mencantumkan tanggal terbaru)",
    "nextRound": {
      "text": "Belum diumumkan",
      "confirmed": false
    },
    "sourceType": "official",
    "lastVerified": "2026-10-03",
    "verifiedBy": "https://pg.usembassy.gov/ussp-scholarship-program/"
  },
  {
    "slug": "humphrey-fellowship-dan-global-ugrad",
    "name": "Humphrey Fellowship dan Global UGRAD",
    "country": "United States",
    "levels": [
      "exchange"
    ],
    "funding": "Didanai pemerintah AS",
    "pngEligibility": "Humphrey: khusus warga PNG yang tinggal di PNG, gelar sarjana 4 tahun, tanpa tanggungan. UGRAD: untuk mahasiswa dari latar belakang kurang terwakili.",
    "officialUrl": "https://pg.usembassy.gov/hubert-h-humphrey-fellowship-program/",
    "extraUrls": [
      {
        "label": "More information",
        "url": "https://pg.usembassy.gov/education/exchange-programs/"
      }
    ],
    "opensAt": null,
    "closesAt": null,
    "deadlineNote": "Humphrey: halaman resmi menyatakan tertutup",
    "nextRound": {
      "text": "Belum diumumkan",
      "confirmed": false
    },
    "sourceType": "official",
    "lastVerified": "2026-10-03",
    "verifiedBy": "https://pg.usembassy.gov/hubert-h-humphrey-fellowship-program/"
  },
  {
    "slug": "mext",
    "name": "MEXT (Japanese Government Scholarship, rekomendasi Kedubes)",
    "country": "Japan",
    "levels": [
      "bachelor",
      "master",
      "diploma",
      "other"
    ],
    "funding": "Beasiswa pemerintah Jepang",
    "pngEligibility": "Melalui Kedubes Jepang di PNG. Aplikasi dikirim dalam amplop tertutup, tidak diterima lewat fax atau email. Tiga tahap seleksi: dokumen, ujian dan wawancara di PNG, seleksi akhir di MEXT.",
    "officialUrl": "https://www.png.emb-japan.go.jp/itpr_en/b_000090_00180.html",
    "extraUrls": [
      {
        "label": "More information",
        "url": "https://www.studyinjapan.go.jp/en/smap-stopj-applications-research.html"
      }
    ],
    "opensAt": null,
    "closesAt": null,
    "deadlineNote": "Specialized Training College: 28 Mei 2026. Research Students: 4 Jun 2026",
    "nextRound": {
      "text": "Estimasi: sekitar Apr-Jun 2027 (pola tahunan, belum resmi)",
      "confirmed": false
    },
    "sourceType": "official",
    "lastVerified": "2026-10-03",
    "verifiedBy": "https://www.png.emb-japan.go.jp/itpr_en/b_000090_00180.html"
  },
  {
    "slug": "mofa-taiwan-scholarship",
    "name": "MOFA Taiwan Scholarship",
    "country": "Taiwan",
    "levels": [
      "bachelor",
      "master",
      "phd",
      "other"
    ],
    "funding": "Tiket pulang-pergi kelas ekonomi dan tunjangan bulanan (program persiapan Mandarin: NT$28.000/bulan hingga 1 tahun)",
    "pngEligibility": "KUOTA EKSPLISIT: 1 beasiswa untuk warga PNG (putaran 2026). Orang tua tidak boleh pernah berkewarganegaraan Taiwan. Daftar langsung (in person) di Taipei Economic Office di PNG.",
    "officialUrl": "https://www.roc-taiwan.org/pg_en/post/1942.html",
    "extraUrls": [],
    "opensAt": null,
    "closesAt": null,
    "deadlineNote": "Putaran 2026: kuliah dimulai paling lambat Agu 2026",
    "nextRound": {
      "text": "Belum terlihat untuk 2027",
      "confirmed": false
    },
    "sourceType": "official",
    "lastVerified": "2026-10-03",
    "verifiedBy": "https://www.roc-taiwan.org/pg_en/post/1942.html"
  },
  {
    "slug": "taiwanicdf-international-higher-education-scholarship",
    "name": "TaiwanICDF International Higher Education Scholarship",
    "country": "Taiwan",
    "levels": [
      "master",
      "phd"
    ],
    "funding": "Biaya kuliah, perumahan, asuransi, buku, tiket, tunjangan bulanan (S2 NT$18.000, S3 NT$20.000)",
    "pngEligibility": "PNG ada di daftar negara eligible. Tidak boleh sedang memegang beasiswa pemerintah Taiwan lain pada tahun akademik yang sama.",
    "officialUrl": "https://www.icdf.org.tw",
    "extraUrls": [
      {
        "label": "More information",
        "url": "https://www.estudiarentaiwan.org/userfiles/files/TaiwanICDF%202026%20Higher%20Education%20Application%20Guidebook%20(1).pdf"
      }
    ],
    "opensAt": null,
    "closesAt": null,
    "deadlineNote": "Deadline tahunan 15 Maret",
    "nextRound": {
      "text": "Estimasi: 15 Mar 2027 (sumber pihak ketiga)",
      "confirmed": false
    },
    "sourceType": "third-party",
    "lastVerified": "2026-10-03",
    "verifiedBy": "https://www.icdf.org.tw"
  },
  {
    "slug": "knb",
    "name": "KNB (Kemitraan Negara Berkembang)",
    "country": "Indonesia",
    "levels": [
      "bachelor",
      "master",
      "phd"
    ],
    "funding": "Beasiswa pemerintah Indonesia untuk mahasiswa dari negara berkembang",
    "pngEligibility": "Mahasiswa PNG sudah berpartisipasi (3 orang pada 2024, menurut pemerintah RI). Daftar negara eligible per tahun perlu dicek di panduan.",
    "officialUrl": "https://knb.kemdiktisaintek.go.id/",
    "extraUrls": [
      {
        "label": "More information",
        "url": "https://balaibahasapapua.kemdikbud.go.id/portal/public/informasi/detail-berita/259"
      }
    ],
    "opensAt": null,
    "closesAt": null,
    "deadlineNote": "Pendaftaran 2025: 3-21 Mar 2025",
    "nextRound": {
      "text": "Estimasi: sekitar Maret 2027 (belum resmi)",
      "confirmed": false
    },
    "sourceType": "official",
    "lastVerified": "2026-10-03",
    "verifiedBy": "https://knb.kemdiktisaintek.go.id/"
  },
  {
    "slug": "tias",
    "name": "TIAS (The Indonesian AID Scholarship)",
    "country": "Indonesia",
    "levels": [
      "bachelor",
      "master",
      "phd",
      "diploma"
    ],
    "funding": "Beasiswa penuh pemerintah Indonesia",
    "pngEligibility": "PNG tercantum sebagai negara prioritas. Terutama untuk PNS atau kandidat yang dinominasikan pemerintah. Akun aplikasi diminta lewat KBRI Port Moresby (portmoresby.kbri@kemlu.go.id).",
    "officialUrl": "https://tias.kemenkeu.go.id/landing/",
    "extraUrls": [
      {
        "label": "More information",
        "url": "https://tias.kemenkeu.go.id/Files/Documents/Booklet-TIAS-intake-2026.pdf"
      }
    ],
    "opensAt": null,
    "closesAt": null,
    "deadlineNote": "Intake 2026: pendaftaran 16 Feb - 17 Apr 2026",
    "nextRound": {
      "text": "Estimasi: sekitar Feb-Apr 2027 (pola tahunan)",
      "confirmed": false
    },
    "sourceType": "official",
    "lastVerified": "2026-10-03",
    "verifiedBy": "https://tias.kemenkeu.go.id/landing/"
  }
];
