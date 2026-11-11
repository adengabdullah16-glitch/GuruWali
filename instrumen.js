// Instrumen Guru Wali: dipakai bersama oleh index.html (guru) dan murid.html (portal murid).
// Jawaban murid disimpan mentah, skor dihitung di sini. Mengubah KUNCI di file ini
// langsung memperbarui semua skor tanpa murid mengisi ulang.
(function () {
  "use strict";

  // ---------- RIASEC 1: 42 pernyataan "Aku suka ..." ----------
  const RIASEC1 = [
    "Aku suka mengulik peralatan",
    "Aku suka mengerjakan puzzle",
    "Aku suka bekerja mandiri",
    "Aku suka bekerja dalam kelompok",
    "Aku suka membuat target untuk diriku sendiri",
    "Aku suka merapikan barang-barang (buku, alat tulis, kamar)",
    "Aku suka menyusun balok (LEGO)",
    "Aku suka membaca buku tentang seni dan musik",
    "Aku suka mengerjakan hal-hal dengan instruksi yang jelas",
    "Aku suka meyakinkan teman untuk mengikuti caraku",
    "Aku suka melakukan percobaan/eksperimen",
    "Aku suka menjelaskan sesuatu kepada teman",
    "Aku suka membantu orang lain memecahkan persoalan",
    "Aku suka memelihara binatang",
    "Aku tidak berkeberatan bekerja melebihi waktu yang ditentukan",
    "Aku suka menjual sesuatu",
    "Aku suka membuat karya berbentuk tulisan",
    "Aku suka sains/ilmu pasti",
    "Aku suka mendapatkan tantangan baru",
    "Aku suka menghibur teman",
    "Aku suka mencari tahu cara kerja sebuah alat",
    "Aku suka merangkaikan atau merakit benda",
    "Aku adalah orang yang kreatif",
    "Aku suka memperhatikan detail",
    "Aku suka merapikan catatan atau LKS",
    "Aku suka mencari tahu penyebab suatu kejadian",
    "Aku suka memainkan alat musik atau bernyanyi",
    "Aku suka mempelajari budaya berbagai daerah",
    "Aku ingin membuka usaha sendiri suatu saat nanti",
    "Aku suka memasak",
    "Aku suka bermain peran/drama",
    "Aku suka mempraktikkan hal-hal yang aku pelajari",
    "Aku suka mengerjakan soal matematika atau grafik",
    "Aku suka mendiskusikan hal-hal yang terjadi di sekitarku",
    "Aku suka merapikan kamarku",
    "Aku suka memimpin kelompok atau kelas",
    "Aku suka berkegiatan di luar ruangan",
    "Aku suka berkegiatan di dalam ruangan dengan meja kursi",
    "Aku suka menghitung",
    "Aku suka menolong orang",
    "Aku suka menggambar",
    "Aku suka berbicara di depan umum",
  ];
  // KUNCI SEMENTARA. Urutan 42 butir sama dengan RIASEC Inventory 42 butir (Missouri Career Interest),
  // jadi kunci ini mengikuti pola instrumen itu. Tetap minta guru BK memeriksanya.
  const KUNCI1 = {
    R: [1, 7, 14, 22, 30, 32, 37],
    I: [2, 11, 18, 21, 26, 33, 39],
    A: [3, 8, 17, 23, 27, 31, 41],
    S: [4, 12, 13, 20, 28, 34, 40],
    E: [5, 10, 16, 19, 29, 36, 42],
    C: [6, 9, 15, 24, 25, 35, 38],
  };

  // ---------- RIASEC 2: pilih 8 dari 24 kegiatan ----------
  const RIASEC2 = [
    "Memperbaiki barang", "Mencari solusi", "Memberi saran", "Mengutak-atik barang",
    "Menari", "Mengelola acara", "Memahami orang lain", "Menulis cerita",
    "Menganalisis masalah", "Bermusik", "Membongkar pasang barang", "Membereskan barang",
    "Mengajar", "Mengurutkan", "Memimpin kelompok", "Membantu",
    "Menjual benda", "Menghitung", "Berpikir logis", "Membujuk orang",
    "Mengikuti aturan", "Merakit benda", "Menggambar", "Menjalankan rutin",
  ];
  // KUNCI SEMENTARA, disusun dari isi kegiatan (4 kegiatan per kode). Perlu diperiksa guru BK.
  const KUNCI2 = {
    R: [1, 4, 11, 22],
    I: [2, 9, 18, 19],
    A: [5, 8, 10, 23],
    S: [3, 7, 13, 16],
    E: [6, 15, 17, 20],
    C: [12, 14, 21, 24],
  };

  const TIPE = {
    R: { nama: "Realistic", profesi: "Pertanian, asisten kesehatan, komputer, konstruksi, mekanik, pariwisata", jalur: "Sumber daya alam, layanan kesehatan, teknik industri, rekayasa teknologi, seni pertunjukan" },
    I: { nama: "Investigative", profesi: "Kelautan, teknik kimia, kedokteran hewan, peternakan, kedokteran, ekonomi, psikologi, fisika, matematika, biologi, hukum", jalur: "Layanan kesehatan, bisnis, pekerja sosial, teknik industri, rekayasa teknologi" },
    A: { nama: "Artistic", profesi: "Komunikasi, kecantikan, seni, sastra, fotografi, penyiaran, desain interior, arsitektur, desain komunikasi visual", jalur: "Pekerja sosial, seni, komunikasi" },
    S: { nama: "Social", profesi: "Konseling, keperawatan, terapi fisik, layanan wisata, periklanan, public relation, pendidikan", jalur: "Layanan kesehatan, pekerja sosial" },
    E: { nama: "Enterprising", profesi: "Bisnis, real estate, pemasaran, hukum, sosial politik, perdagangan internasional, finansial/perbankan", jalur: "Bisnis, pekerja sosial, seni, komunikasi" },
    C: { nama: "Conventional", profesi: "Akuntansi, asuransi, administrasi, perbankan, pengolahan data", jalur: "Layanan kesehatan, bisnis, teknik industri, teknologi informasi" },
  };

  // ---------- Kuesioner 8 dimensi profil lulusan ----------
  const DIMENSI = [
    ["Keimanan dan Ketakwaan terhadap Tuhan YME", [
      "Saya melaksanakan ibadah sesuai keyakinan saya dengan penuh kesadaran.",
      "Saya menunjukkan akhlak mulia, seperti jujur dan sopan, dalam kehidupan sehari-hari."]],
    ["Kewargaan", [
      "Saya memahami dan menghormati hak serta kewajiban sebagai warga negara Indonesia.",
      "Saya berpartisipasi dalam kegiatan sosial atau lingkungan di sekolah/komunitas."]],
    ["Penalaran Kritis", [
      "Saya mampu menganalisis informasi atau masalah sebelum mengambil keputusan.",
      "Saya sering bertanya atau mencari solusi logis saat menghadapi tantangan belajar."]],
    ["Kreativitas", [
      "Saya menghasilkan ide atau karya baru dalam tugas sekolah atau kegiatan kreatif.",
      "Saya berani mencoba pendekatan baru untuk menyelesaikan masalah."]],
    ["Kolaborasi", [
      "Saya bekerja sama dengan teman dalam kelompok untuk mencapai tujuan bersama.",
      "Saya menghargai pendapat dan kontribusi anggota kelompok lain."]],
    ["Kemandirian", [
      "Saya mampu menyelesaikan tugas tanpa selalu bergantung pada bantuan orang lain.",
      "Saya mengatur waktu dan tugas saya sendiri dengan baik."]],
    ["Komunikasi", [
      "Saya menyampaikan ide atau pendapat dengan jelas dan sopan dalam diskusi.",
      "Saya mendengarkan dengan penuh perhatian saat orang lain berbicara."]],
    ["Kesehatan", [
      "Saya menjaga kesehatan fisik dengan rutin berolahraga atau makan sehat.",
      "Saya mengelola stres atau emosi dengan cara yang sehat (misalnya meditasi, berbicara dengan orang terpercaya)."]],
  ];
  const SKALA = [[4, "SB", "Sangat baik"], [3, "B", "Baik"], [2, "C", "Cukup"], [1, "K", "Kurang"]];
  const ID_KOMPETENSI = DIMENSI.flatMap((d, i) => d[1].map((_, j) => `${i + 1}.${j + 1}`));

  // ---------- Refleksi karakter ----------
  const REFLEKSI = [
    "Saya berkata jujur dalam setiap tindakan dan perkataan saya (misalnya, tidak menyontek atau berbohong).",
    "Saya disiplin dalam mengerjakan tugas sekolah dan datang tepat waktu.",
    "Saya menghargai perbedaan pendapat, budaya, atau latar belakang teman saya.",
    "Saya bekerja keras untuk menyelesaikan tugas atau mencapai tujuan saya tanpa menyerah.",
    "Saya tidak melakukan bullying, baik secara fisik, verbal, maupun sosial terhadap teman saya.",
    "Saya tidak menggunakan kata-kata kotor atau kasar saat berbicara dengan orang lain.",
  ];
  const NILAI_REFLEKSI = ["Jujur", "Disiplin", "Menghargai perbedaan", "Kerja keras", "Tidak membully", "Bertutur kata sopan"];

  const PERTANYAAN = {
    kompetensi: [
      "Dimensi kompetensi apa yang sudah saya kuasai dengan baik? Mengapa?",
      "Dimensi kompetensi apa yang perlu saya tingkatkan? Bagaimana caranya?",
      "Apa langkah konkret yang akan saya ambil untuk mengembangkan kompetensi saya?"],
    refleksi: [
      "Nilai karakter apa yang sudah saya lakukan dengan baik bulan ini? Mengapa?",
      "Nilai karakter apa yang perlu saya tingkatkan? Bagaimana caranya?",
      "Apa yang saya pelajari dari refleksi ini untuk menjadi pribadi yang lebih baik?"],
  };

  const INFO = {
    riasec1: { judul: "Minat (RIASEC 1)", singkat: "Centang hal-hal yang kamu SUKA", periode: "tahun" },
    riasec2: { judul: "Kemampuan (RIASEC 2)", singkat: "Pilih 8 hal yang paling BISA kamu lakukan", periode: "tahun" },
    kompetensi: { judul: "Kuesioner 8 dimensi", singkat: "Nilai dirimu dalam 8 dimensi profil lulusan", periode: "bulan" },
    refleksi: { judul: "Refleksi karakter", singkat: "Refleksi nilai karakter satu bulan terakhir", periode: "bulan" },
  };
  const URUT = ["R", "I", "A", "S", "E", "C"];

  // ---------- penilaian ----------
  function skorRiasec(jenis, jawaban) {
    const kunci = jenis === "riasec1" ? KUNCI1 : KUNCI2;
    const pilih = new Set((jawaban && jawaban.pilih) || []);
    const skor = {};
    URUT.forEach((t) => (skor[t] = kunci[t].filter((n) => pilih.has(n)).length));
    // 3 tertinggi; seri dipecah dengan urutan R-I-A-S-E-C
    const kode = [...URUT].sort((a, b) => skor[b] - skor[a] || URUT.indexOf(a) - URUT.indexOf(b))
      .filter((t) => skor[t] > 0).slice(0, 3).join("");
    return { skor, kode, maks: kunci.R.length };
  }
  function skorKompetensi(jawaban) {
    const n = (jawaban && jawaban.nilai) || {};
    return DIMENSI.map(([nama, butir], i) => {
      const v = butir.map((_, j) => +n[`${i + 1}.${j + 1}`] || 0).filter(Boolean);
      const rata = v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0;
      return { nama, rata, label: rata >= 3.5 ? "Sangat baik" : rata >= 2.5 ? "Baik" : rata >= 1.5 ? "Cukup" : rata ? "Kurang" : "-" };
    });
  }
  function skorRefleksi(jawaban) {
    const j = (jawaban && jawaban.jawab) || {};
    const ya = NILAI_REFLEKSI.filter((_, i) => j[i + 1] === true);
    const belum = NILAI_REFLEKSI.filter((_, i) => j[i + 1] === false);
    return { ya, belum };
  }

  window.INSTRUMEN = {
    RIASEC1, RIASEC2, KUNCI1, KUNCI2, TIPE, DIMENSI, SKALA, ID_KOMPETENSI, REFLEKSI, NILAI_REFLEKSI,
    PERTANYAAN, INFO, URUT, KUNCI_SEMENTARA: true,
    skorRiasec, skorKompetensi, skorRefleksi,
  };
})();
