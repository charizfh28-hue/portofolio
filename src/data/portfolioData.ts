import { ProfileData, Skill, Project, Experience } from '../types';

import charizCvPhoto from '../assets/images/chariz_photo_cv_1784691065523.jpg';
import dashboardImg from '../assets/images/project_dashboard_1784689295999.jpg';
import ecommerceImg from '../assets/images/project_ecommerce_1784689307039.jpg';

export const initialProfileData: ProfileData = {
  name: 'CHARIZ FAGHRUN N',
  nickname: 'Chariz',
  title: 'Lulusan Baru / Procurement & Business Enthusiast',
  subtitles: [
    'Lulusan SMK Krian 1 Sidoarjo',
    'Pengalaman Magang Procurement',
    'Pebisnis Muda & Entrepreneurial Mindset',
    'Web & Technology Development'
  ],
  bio: 'Saya ingin menjadi seorang pebisnis yang sukses karena tertarik membangun usaha sendiri dan menciptakan peluang yang bermanfaat bagi banyak orang. Dengan disiplin dan kerja keras, saya siap memberikan kontribusi terbaik.',
  aboutText: [
    'Saya ingin menjadi seorang pebisnis yang sukses karena saya tertarik untuk membangun usaha sendiri dan menciptakan peluang yang bermanfaat bagi banyak orang.',
    'Saya percaya bahwa dengan kerja keras, disiplin, terus belajar, dan tidak mudah menyerah, saya dapat mengembangkan bisnis yang terus berkembang serta mencapai tujuan dan impian saya di masa depan.',
    'Memiliki pengalaman magang profesional di PT Arwana Citramulia Tbk di bidang Procurement, mengelola pengadaan barang dan jasa, mencari supplier terbaik, membandingkan harga & kualitas, serta melakukan negosiasi dengan cermat.'
  ],
  avatarUrl: charizCvPhoto,
  location: 'Wringinanom RT 2 RW 1, Gresik, Jawa Timur',
  email: 'Charizfh28@gmail.com',
  phone: '0819-4644-1712',
  whatsapp: 'https://wa.me/6281946441712',
  availableForHire: true,
  socials: [
    { name: 'Instagram', url: 'https://instagram.com/chrissssjh', icon: 'Instagram' },
    { name: 'TikTok', url: 'https://tiktok.com/@chriz_1228', icon: 'Twitter' },
    { name: 'WhatsApp', url: 'https://wa.me/6281946441712', icon: 'Phone' },
    { name: 'Email', url: 'mailto:Charizfh28@gmail.com', icon: 'Mail' }
  ],
  stats: [
    { label: 'Pendidikan', value: 'SMK', subtext: 'SMK Krian 1 Sidoarjo' },
    { label: 'Pengalaman Magang', value: 'PT Arwana', subtext: 'Procurement Dept.' },
    { label: 'Lokasi Usaha', value: 'Gresik', subtext: 'Jawa Timur, Indonesia' },
    { label: 'Dedikasi Kerja', value: '100%', subtext: 'Disiplin & Teliti' }
  ],
  interests: [
    'Bisnis & Kewirausahaan',
    'Procurement & Pengadaan Barang',
    'Negosiasi & Komunikasi Usaha',
    'Pengelolaan Dokumen & Data',
    'Microsoft Office (Word, Excel, PPT)',
    'Pemrograman Web & React'
  ],
  // Data Diri Details from CV Image
  birthPlaceDate: 'Gresik, 28 Desember 2008',
  gender: 'Laki-Laki',
  maritalStatus: 'Belum Menikah',
  nationality: 'Indonesia',
  instagram: '@chrissssjh',
  tiktok: '@chriz_1228',
  cvDriveUrl: 'https://drive.google.com/file/d/1ExampleDriveLinkCharizCV/view?usp=sharing'
};

export const skillsData: Skill[] = [
  // Kemampuan CV Utama
  { id: '1', name: 'Komunikasi & Negosiasi', category: 'tools', level: 92, iconName: 'Layers', experienceYears: 'Aktif', color: 'text-cyan-400' },
  { id: '2', name: 'Ketelitian & Disiplin Kerja', category: 'tools', level: 95, iconName: 'CheckCircle', experienceYears: 'Aktif', color: 'text-emerald-400' },
  { id: '3', name: 'Kerja Sama Tim & Individu', category: 'tools', level: 90, iconName: 'Box', experienceYears: 'Aktif', color: 'text-blue-400' },
  { id: '4', name: 'Microsoft Office (Word, Excel, PPT)', category: 'tools', level: 92, iconName: 'FileCode2', experienceYears: '3+ thn', color: 'text-indigo-400' },
  { id: '5', name: 'Pengelolaan Dokumen & Data', category: 'tools', level: 88, iconName: 'HardDrive', experienceYears: 'Magang', color: 'text-purple-400' },
  { id: '6', name: 'Adaptasi & Berkerja Dibawah Tekanan', category: 'tools', level: 92, iconName: 'Zap', experienceYears: 'Aktif', color: 'text-amber-400' },

  // Pemrograman & Web Dev
  { id: '7', name: 'HTML5 & CSS3', category: 'frontend', level: 88, iconName: 'Layout', experienceYears: '2 thn', color: 'text-orange-400' },
  { id: '8', name: 'JavaScript & React.js', category: 'frontend', level: 82, iconName: 'Code2', experienceYears: '1.5 thn', color: 'text-cyan-400' },
  { id: '9', name: 'Tailwind CSS', category: 'frontend', level: 85, iconName: 'Palette', experienceYears: '1.5 thn', color: 'text-teal-400' },
  { id: '10', name: 'Git & Manajemen Kode', category: 'tools', level: 80, iconName: 'GitBranch', experienceYears: '1 thn', color: 'text-orange-500' }
];

export const projectsData: Project[] = [
  {
    id: 'p1',
    title: 'Sistem Administrasi & Pengadaan Barang (Procurement)',
    description: 'Aplikasi manajemen data supplier, perbandingan harga produk, dan pencatatan transaksi pembelian barang perusahaan.',
    longDescription: 'Proyek sistem manajemen pengadaan barang yang dirancang untuk efisiensi pemilihan supplier terbaik, kalkulasi anggaran pembelian, serta pelaporan inventaris stok secara otomatis dan terorganisir.',
    category: 'web',
    image: dashboardImg,
    tags: ['Procurement', 'Excel', 'React', 'Tailwind CSS', 'Data Analytics'],
    liveUrl: 'https://example.com/procurement-app',
    githubUrl: 'https://github.com/example/procurement-system',
    featured: true,
    completionDate: '2026',
    highlights: [
      'Pencatatan data supplier & perbandingan harga terbaik secara otomatis',
      'Manajemen dokumen pembelian & tagihan yang rapi',
      'Antarmuka bersih, responsif, dan mudah digunakan'
    ]
  },
  {
    id: 'p2',
    title: 'Website Portofolio Interactive - Chariz Faghrun N',
    description: 'Situs web portofolio pribadi modern dengan animasi interaktif, mode gelap/terang, dan panel admin terautentikasi.',
    longDescription: 'Situs web interaktif yang menampilkan profil lengkap Chariz Faghrun N, riwayat pendidikan, pengalaman magang di PT Arwana Citramulia Tbk, serta daftar skill utama.',
    category: 'fullstack',
    image: ecommerceImg,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Admin Panel', 'Motion'],
    liveUrl: 'https://example.com/chariz-portfolio',
    githubUrl: 'https://github.com/example/chariz-portfolio',
    featured: true,
    completionDate: '2026',
    highlights: [
      'Panel Admin terproteksi kata sandi untuk kustomisasi konten real-time',
      'Fitur pencetakan CV resmi format PDF',
      'Tampilan ultra responsif di semua ukuran layar mobile & desktop'
    ]
  },
  {
    id: 'p3',
    title: 'Aplikasi Kasir & Inventaris Toko UMKM',
    description: 'Sistem kasir dan pencatatan stok barang sederhana untuk membantu bisnis lokal mengelola penjualan harian.',
    longDescription: 'Aplikasi pembukuan bisnis ritel UMKM yang memudahkan pencatatan transaksi masuk-keluar, cetak nota, dan pemantauan keuntungan bulanan.',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1556742049-0a670f4a45a7?q=80&w=1000&auto=format&fit=crop',
    tags: ['React', 'Tailwind CSS', 'Local State', 'Financial Analytics'],
    liveUrl: 'https://example.com/umkm-pos',
    githubUrl: 'https://github.com/example/umkm-pos',
    featured: true,
    completionDate: '2025',
    highlights: [
      'Pencatatan transaksi jual beli instan',
      'Laporan keuntungan dan stok barang secara real-time',
      'Fitur ekspor data transaksi ke Excel'
    ]
  }
];

export const experiencesData: Experience[] = [
  {
    id: 'exp1',
    role: 'Procurement Intern (Magang Pengadaan)',
    company: 'PT ARWANA CITRAMULIA TBK',
    period: '2024',
    description: 'Mengelola proses pengadaan barang dan jasa yang dibutuhkan oleh perusahaan. Bertugas mencari supplier terbaik, membandingkan harga dan kualitas, melakukan negosiasi, serta memastikan proses pembelian berjalan dengan lancar.',
    achievements: [
      'Mencari supplier terbaik dan membandingkan harga serta kualitas barang secara cermat',
      'Melakukan negosiasi harga dan persyaratan pembelian dengan pihak penyedia',
      'Memastikan proses pengadaan barang berjalan tepat waktu dan sesuai standar perusahaan',
      'Mengelola serta merapikan dokumen administrasi dan data pengadaan barang'
    ],
    type: 'work'
  },
  {
    id: 'edu1',
    role: 'Siswa / Peserta Didik',
    company: 'SMK KRIAN 1 SIDOARJO',
    period: '2024 – 2027',
    description: 'Pendidikan Menengah Kejuruan. Aktif mempelajari teori dan praktik kejuruan, disiplin organisasi, serta teknologi informasi.',
    achievements: [
      'Menyelesaikan program magang industri di PT Arwana Citramulia Tbk',
      'Aktif dalam kegiatan pembelajaran praktik dan pengembangan potensi diri'
    ],
    type: 'education'
  },
  {
    id: 'edu2',
    role: 'Siswa / Peserta Didik',
    company: 'SMP 1 WRINGINANOM',
    period: '2021 – 2024',
    description: 'Pendidikan Menengah Pertama. Mengembangkan fondasi akademik, karakter disiplin, serta kemampuan bersosialisasi.',
    achievements: [
      'Lulus dengan nilai akademik yang baik dan aktif dalam kegiatan sekolah'
    ],
    type: 'education'
  },
  {
    id: 'edu3',
    role: 'Siswa / Peserta Didik',
    company: 'SDIT YAA BUNAYYA',
    period: '2015 – 2021',
    description: 'Pendidikan Dasar. Membentuk karakter, kedisiplinan dasar, serta minat awal terhadap teknologi dan wirausaha.',
    achievements: [
      'Menyelesaikan pendidikan dasar 6 tahun dengan predikat baik'
    ],
    type: 'education'
  }
];

