-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2025 at 11:36 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `organisasi_x`
--

-- --------------------------------------------------------

--
-- Table structure for table `anggota`
--

CREATE TABLE `anggota` (
  `id` int(11) NOT NULL,
  `no_ktp` varchar(16) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `no_hp` varchar(15) NOT NULL,
  `provinsi` varchar(100) NOT NULL,
  `kabupaten` varchar(100) NOT NULL,
  `kecamatan` varchar(100) NOT NULL,
  `kelurahan` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `anggota`
--

INSERT INTO `anggota` (`id`, `no_ktp`, `nama`, `no_hp`, `provinsi`, `kabupaten`, `kecamatan`, `kelurahan`, `created_at`) VALUES
(39, '1000000000000001', 'Anggota A1', '081100000001', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 04:55:52'),
(40, '1000000000000002', 'Anggota B1', '081100000002', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:05:52'),
(41, '1000000000000003', 'Anggota B2', '081100000003', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:18:52'),
(42, '1000000000000004', 'Anggota B3', '081100000004', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 04:54:52'),
(43, '1000000000000005', 'Anggota B4', '081100000005', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:17:52'),
(44, '1000000000000006', 'Anggota B5', '081100000006', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:18:52'),
(45, '1000000000000007', 'Anggota C1', '081100000007', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:19:52'),
(46, '1000000000000008', 'Anggota C2', '081100000008', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:21:52'),
(47, '1000000000000009', 'Anggota D1', '081100000009', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 04:57:52'),
(48, '1000000000000010', 'Anggota D2', '081100000010', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:19:52'),
(49, '1000000000000011', 'Anggota D3', '081100000011', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 04:53:52'),
(50, '1000000000000012', 'Anggota D4', '081100000012', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:04:52'),
(51, '1000000000000013', 'Anggota D5', '081100000013', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 04:52:52'),
(52, '1000000000000014', 'Anggota D6', '081100000014', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:16:52'),
(53, '1000000000000015', 'Anggota E1', '081100000015', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 04:54:52'),
(54, '1000000000000016', 'Anggota E2', '081100000016', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:20:52'),
(55, '1000000000000017', 'Anggota E3', '081100000017', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:08:52'),
(56, '1000000000000018', 'Anggota F1', '081100000018', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:15:52'),
(57, '1000000000000019', 'Anggota F2', '081100000019', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:02:52'),
(58, '1000000000000020', 'Anggota F3', '081100000020', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:05:52'),
(59, '1000000000000021', 'Anggota F4', '081100000021', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 04:55:52'),
(60, '1000000000000022', 'Anggota F5', '081100000022', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 04:57:52'),
(61, '1000000000000023', 'Anggota F6', '081100000023', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:11:52'),
(62, '1000000000000024', 'Anggota F7', '081100000024', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:12:52'),
(63, '1000000000000025', 'Anggota F8', '081100000025', 'Jawa Tengah', 'Kab. Banyumas', 'Purwokerto Timur', 'Arcawinangun', '2025-07-05 05:05:52'),
(64, '1000000000000026', 'Anggota G1', '081100000026', 'Jawa Tengah', 'Kab. Semarang', 'Ungaran Barat', 'Lodoyong', '2025-07-05 04:57:52'),
(65, '1000000000000027', 'Anggota G2', '081100000027', 'Jawa Timur', 'Malang', 'Kepanjen', 'Talangagung', '2025-07-05 05:08:52'),
(66, '1000000000000028', 'Anggota G3', '081100000028', 'Jawa Barat', 'Kab. Bandung', 'Margahayu', 'Sulaiman', '2025-07-05 04:58:52'),
(67, '1000000000000029', 'Anggota G4', '081100000029', 'DKI Jakarta', 'Jakarta Selatan', 'Kebayoran Baru', 'Gunung', '2025-07-05 05:05:52'),
(68, '1000000000000030', 'Anggota G5', '081100000030', 'Jawa Tengah', 'Kab. Kudus', 'Jati', 'Pasuruhan Lor', '2025-07-05 05:10:52'),
(69, '1000000000000031', 'Anggota G6', '081100000031', 'Jawa Timur', 'Kab. Sidoarjo', 'Candi', 'Sugihwaras', '2025-07-05 05:14:52'),
(70, '1000000000000032', 'Anggota G7', '081100000032', 'Jawa Barat', 'Kab. Cirebon', 'Talun', 'Kemantren', '2025-07-05 05:18:52'),
(71, '1000000000000033', 'Anggota G8', '081100000033', 'DKI Jakarta', 'Jakarta Timur', 'Matraman', 'Pal Meriam', '2025-07-05 04:54:52'),
(72, '1000000000000034', 'Anggota G9', '081100000034', 'Jawa Tengah', 'Kab. Cilacap', 'Kroya', 'Gentasari', '2025-07-05 05:18:52'),
(73, '1000000000000035', 'Anggota G10', '081100000035', 'Jawa Timur', 'Kab. Jember', 'Sumbersari', 'Kebonsari', '2025-07-05 04:56:52'),
(74, '1000000000000036', 'Anggota H1', '081100000036', 'Jawa Tengah', 'Kab. Magelang', 'Mertoyudan', 'Danurejo', '2025-07-05 04:54:52'),
(75, '1000000000000037', 'Anggota H2', '081100000037', 'Jawa Timur', 'Kab. Gresik', 'Manyar', 'Roomo', '2025-07-05 05:18:52'),
(76, '1000000000000038', 'Anggota H3', '081100000038', 'Jawa Barat', 'Kab. Sukabumi', 'Cibadak', 'Karang Tengah', '2025-07-05 05:00:52'),
(77, '1000000000000039', 'Anggota H4', '081100000039', 'DKI Jakarta', 'Jakarta Pusat', 'Menteng', 'Pegangsaan', '2025-07-05 05:11:52'),
(78, '1000000000000040', 'Anggota H5', '081100000040', 'Jawa Tengah', 'Kab. Pati', 'Juwana', 'Bumirejo', '2025-07-05 05:07:52'),
(79, '1000000000000041', 'Anggota H6', '081100000041', 'Jawa Timur', 'Kab. Kediri', 'Pare', 'Gedangsewu', '2025-07-05 05:10:52'),
(80, '1000000000000042', 'Anggota H7', '081100000042', 'Jawa Barat', 'Kab. Karawang', 'Cikampek', 'Cikampek Barat', '2025-07-05 05:05:52'),
(81, '1000000000000043', 'Anggota H8', '081100000043', 'DKI Jakarta', 'Jakarta Utara', 'Pademangan', 'Pademangan Barat', '2025-07-05 05:05:52'),
(82, '1000000000000044', 'Anggota H9', '081100000044', 'Jawa Tengah', 'Kab. Kebumen', 'Karanganyar', 'Jatiluhur', '2025-07-05 05:18:52'),
(83, '1000000000000045', 'Anggota H10', '081100000045', 'Jawa Timur', 'Kab. Blitar', 'Srengat', 'Bendosewu', '2025-07-05 04:52:52'),
(84, '1000000000000046', 'Anggota I1', '081100000046', 'Jawa Timur', 'Malang', 'Kepanjen', 'Jatirejoyoso', '2025-07-05 05:07:52'),
(85, '1000000000000047', 'Anggota I2', '081100000047', 'Jawa Timur', 'Malang', 'Kepanjen', 'Ardirejo', '2025-07-05 05:06:52'),
(86, '1000000000000048', 'Anggota I3', '081100000048', 'DI Yogyakarta', 'Kab. Sleman', 'Depok', 'Condongcatur', '2025-07-05 05:17:52'),
(87, '1000000000000049', 'Anggota I4', '081100000049', 'DI Yogyakarta', 'Kab. Sleman', 'Gamping', 'Nogotirto', '2025-07-05 05:17:52'),
(88, '1000000000000050', 'Anggota I5', '081100000050', 'DI Yogyakarta', 'Kab. Sleman', 'Ngaglik', 'Sariharjo', '2025-07-05 05:11:52'),
(89, '1000000000000051', 'Anggota I6', '081100000051', 'Jawa Timur', 'Kab. Malang', 'Pakisaji', 'Pakisaji', '2025-07-05 05:12:52'),
(90, '1000000000000052', 'Anggota I7', '081100000052', 'Jawa Timur', 'Kab. Malang', 'Turen', 'Talok', '2025-07-05 05:08:52'),
(91, '1000000000000053', 'Anggota I8', '081100000053', 'DI Yogyakarta', 'Kab. Sleman', 'Mlati', 'Sinduadi', '2025-07-05 05:10:52'),
(92, '1000000000000054', 'Anggota I9', '081100000054', 'Jawa Timur', 'Kab. Malang', 'Wagir', 'Parangargo', '2025-07-05 05:04:52'),
(93, '1000000000000055', 'Anggota I10', '081100000055', 'Jawa Timur', 'Kab. Malang', 'Gondanglegi', 'Urek-urek', '2025-07-05 05:00:52'),
(94, '1000000000000100', 'Ahmad Setiawan', '081200001000', 'Jawa Tengah', 'Kab. Semarang', 'Bergas', 'Karangjati', '2025-07-05 09:02:17'),
(95, '1000000000000101', 'Putri Ayu', '081200001001', 'Jawa Tengah', 'Kab. Klaten', 'Trucuk', 'Sabranglor', '2025-07-05 08:51:17'),
(96, '1000000000000102', 'Fajar Nugroho', '081200001002', 'Jawa Tengah', 'Kab. Kudus', 'Jati', 'Tumpangkrasak', '2025-07-05 08:49:17'),
(97, '1000000000000103', 'Lestari Wulandari', '081200001003', 'Jawa Tengah', 'Kab. Magelang', 'Mertoyudan', 'Danurejo', '2025-07-05 09:14:17'),
(98, '1000000000000104', 'Budi Santoso', '081200001004', 'Jawa Timur', 'Kab. Mojokerto', 'Pungging', 'Randubener', '2025-07-05 08:55:17'),
(99, '1000000000000105', 'Rina Amelia', '081200001005', 'Jawa Timur', 'Kab. Jombang', 'Diwek', 'Balongsari', '2025-07-05 09:07:17'),
(100, '1000000000000106', 'Agus Hariyanto', '081200001006', 'Jawa Timur', 'Kab. Malang', 'Kepanjen', 'Ardirejo', '2025-07-05 09:03:17'),
(101, '1000000000000107', 'Dian Safitri', '081200001007', 'Jawa Timur', 'Kab. Sidoarjo', 'Taman', 'Ketegan', '2025-07-05 09:07:17'),
(102, '1000000000000108', 'Dewi Lestari', '081200001008', 'Jawa Barat', 'Kab. Bandung', 'Cimenyan', 'Mekarsaluyu', '2025-07-05 09:09:17'),
(103, '1000000000000109', 'Rudi Hartono', '081200001009', 'Jawa Barat', 'Kab. Bogor', 'Cibinong', 'Ciriung', '2025-07-05 09:07:17'),
(104, '1000000000000110', 'Sari Melati', '081200001010', 'Jawa Barat', 'Kab. Cianjur', 'Karangtengah', 'Sayang', '2025-07-05 08:48:17'),
(105, '1000000000000111', 'Teguh Prasetyo', '081200001011', 'Jawa Barat', 'Kab. Garut', 'Tarogong Kidul', 'Jayaraga', '2025-07-05 08:53:17'),
(106, '1000000000000112', 'Rizki Amelia', '081200001012', 'DI Yogyakarta', 'Kab. Sleman', 'Depok', 'Condongcatur', '2025-07-05 09:13:17'),
(107, '1000000000000113', 'Yusuf Kurniawan', '081200001013', 'DI Yogyakarta', 'Kab. Bantul', 'Kasihan', 'Tamantirto', '2025-07-05 09:11:17'),
(108, '1000000000000114', 'Intan Permata', '081200001014', 'DI Yogyakarta', 'Kab. Kulon Progo', 'Wates', 'Giripeni', '2025-07-05 08:55:17'),
(109, '1000000000000115', 'Bayu Saputra', '081200001015', 'DI Yogyakarta', 'Kab. Gunungkidul', 'Semanu', 'Pacarejo', '2025-07-05 09:17:17'),
(110, '1000000000000116', 'Siti Aminah', '081200001016', 'DKI Jakarta', 'Jakarta Selatan', 'Kebayoran Baru', 'Gandaria Utara', '2025-07-05 08:50:17'),
(111, '1000000000000117', 'Andi Prakoso', '081200001017', 'DKI Jakarta', 'Jakarta Timur', 'Cakung', 'Pulo Gebang', '2025-07-05 09:04:17'),
(112, '1000000000000118', 'Mega Lestari', '081200001018', 'DKI Jakarta', 'Jakarta Utara', 'Pademangan', 'Ancol', '2025-07-05 09:01:17'),
(113, '1000000000000119', 'Fauzan Hakim', '081200001019', 'DKI Jakarta', 'Jakarta Barat', 'Grogol Petamburan', 'Tomang', '2025-07-05 09:04:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nik` varchar(16) NOT NULL,
  `password` varchar(255) NOT NULL,
  `level` enum('pusat','provinsi','kabupaten','kecamatan','kelurahan') NOT NULL,
  `provinsi` varchar(100) DEFAULT NULL,
  `kabupaten` varchar(100) DEFAULT NULL,
  `kecamatan` varchar(100) DEFAULT NULL,
  `kelurahan` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nik`, `password`, `level`, `provinsi`, `kabupaten`, `kecamatan`, `kelurahan`, `created_at`) VALUES
(1, '3175098765432101', '1212', 'pusat', NULL, NULL, NULL, NULL, '2025-07-05 02:38:38'),
(2, '3175098765432102', '1212', 'provinsi', 'Jawa Barat', NULL, NULL, NULL, '2025-07-05 02:38:38'),
(3, '3175098765432103', '1212', 'provinsi', 'Jawa Tengah', 'Sleman', NULL, NULL, '2025-07-05 02:38:38'),
(4, '3175098765432104', '1212', 'kecamatan', 'Jawa Timur', 'Malang', 'Kepanjen', NULL, '2025-07-05 02:38:38'),
(5, '3175098765432105', '1212', 'kelurahan', 'DKI Jakarta', 'Jakarta Selatan', 'Tebet', 'Manggarai', '2025-07-05 02:38:38'),
(7, '098765', '$2b$10$4e/9wLWg6kgYms2sT4.iZ.1CY10JOo1B5xlNT1vmmIvlfxDGZ.Ywy', 'kabupaten', 'Jawa Barat', 'Sukabumi', 'Cibadak', 'Karangtengah', '2025-07-05 09:11:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anggota`
--
ALTER TABLE `anggota`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `no_ktp` (`no_ktp`),
  ADD UNIQUE KEY `no_hp` (`no_hp`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nik` (`nik`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anggota`
--
ALTER TABLE `anggota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
