-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 10, 2023 lúc 06:06 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `vextv`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_actor`
--

CREATE TABLE `tbl_actor` (
  `id` int(10) NOT NULL,
  `personID` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_actor`
--

INSERT INTO `tbl_actor` (`id`, `personID`, `created_at`, `updated_at`) VALUES
(1, 2, '2023-10-05 07:06:34', '2023-10-05 07:06:34'),
(2, 1, '2023-10-05 07:06:34', '2023-10-05 07:06:34');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_director`
--

CREATE TABLE `tbl_director` (
  `id` int(10) NOT NULL,
  `personID` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_director`
--

INSERT INTO `tbl_director` (`id`, `personID`, `created_at`, `updated_at`) VALUES
(1, 2, '2023-10-05 07:07:03', '2023-10-05 07:07:03'),
(2, 3, '2023-10-06 14:46:50', '2023-10-06 14:46:50');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_images`
--

CREATE TABLE `tbl_images` (
  `id` int(10) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `type` text NOT NULL,
  `path` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_images`
--

INSERT INTO `tbl_images` (`id`, `image`, `type`, `path`, `created_at`, `updated_at`) VALUES
(1, 'thenun2', 'jpg', 'default', '2023-10-07 06:14:49', '2023-10-07 06:14:49'),
(2, 'theloki2', 'jpg', 'default', '2023-10-07 06:14:58', '2023-10-07 06:14:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_movies`
--

CREATE TABLE `tbl_movies` (
  `id` int(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `director` int(10) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_movies`
--

INSERT INTO `tbl_movies` (`id`, `name`, `director`, `description`, `created_at`, `updated_at`) VALUES
(1, 'The Nun II', 2, 'In 1956 France, a priest is violently murdered, and Sister Irene begins to investigate. She once again comes face-to-face with a powerful evil.', '2023-10-05 07:09:10', '2023-10-05 07:09:10'),
(2, 'Loki: Thần Lừa Lọc', 3, 'Khi Steve Rogers, Tony Stark và Scott Lang quay trở về cột mốc 2012, ngay khi trận chiến ở New York kết thúc, để “mượn tạm” quyền trượng của Loki. Nhưng một tai nạn bất ngờ xảy đến, khiến Loki nhặt được khối lặp phương Tesseract và tiện thể tẩu thoát. Cuộc trốn thoát này đã dẫn đến dòng thời gian bị rối loạn. Cục TVA – tổ chức bảo vệ tính nguyên vẹn của dòng chảy thời gian, buộc phải can thiệp, đi gô cổ ông thần này về làm việc. Tại đây, Loki có hai lựa chọn, một là giúp TVA ổn định lại thời gian, không thì bị tiêu hủy. Dĩ nhiên Loki chọn lựa chọn thứ nhất. Nhưng đây là nước đi vô cùng mạo hiểm, vì ông thần này thường lọc lừa, “lươn lẹo”, chuyên đâm lén như bản tính tự nhiên của gã.', '2023-10-06 14:53:30', '2023-10-06 14:53:30');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_movie_actors`
--

CREATE TABLE `tbl_movie_actors` (
  `id` int(10) NOT NULL,
  `movieID` int(10) DEFAULT NULL,
  `actorID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_movie_actors`
--

INSERT INTO `tbl_movie_actors` (`id`, `movieID`, `actorID`) VALUES
(1, 1, 1),
(2, 1, 2),
(4, 2, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_movie_image`
--

CREATE TABLE `tbl_movie_image` (
  `id` int(10) NOT NULL,
  `movie_id` int(10) DEFAULT NULL,
  `image_id` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_movie_image`
--

INSERT INTO `tbl_movie_image` (`id`, `movie_id`, `image_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2023-10-06 14:07:39', '2023-10-06 14:07:39'),
(2, 2, 2, '2023-10-06 14:53:42', '2023-10-06 14:53:42');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_permission`
--

CREATE TABLE `tbl_permission` (
  `id` int(10) NOT NULL,
  `userID` int(10) DEFAULT NULL,
  `roleID` int(10) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_permission`
--

INSERT INTO `tbl_permission` (`id`, `userID`, `roleID`) VALUES
(9, 32, 1),
(12, 32, 2),
(10, 33, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_person`
--

CREATE TABLE `tbl_person` (
  `id` int(10) NOT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `place` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_person`
--

INSERT INTO `tbl_person` (`id`, `fname`, `lname`, `gender`, `birthday`, `place`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Akela', 'Cooper', 1, '1991-10-09', 'Hayti, Missouri', 'Hayti, Missouri', '2023-10-05 07:03:19', '2023-10-05 07:03:19'),
(2, 'Michael', 'Chaves', 0, NULL, 'USA', 'USA', '2023-10-05 07:03:19', '2023-10-05 07:03:19'),
(3, 'Michael', 'Waldron', 0, '1987-04-23', 'West Orange, New Jersey, USA', 'West Orange, New Jersey, USA', '2023-10-06 14:43:33', '2023-10-06 14:43:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_person_image`
--

CREATE TABLE `tbl_person_image` (
  `id` int(10) NOT NULL,
  `person_id` int(10) DEFAULT NULL,
  `image_id` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_role`
--

CREATE TABLE `tbl_role` (
  `id` int(10) NOT NULL,
  `role` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_role`
--

INSERT INTO `tbl_role` (`id`, `role`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` int(10) NOT NULL,
  `fname` varchar(55) DEFAULT NULL,
  `lname` varchar(55) DEFAULT NULL,
  `gender` int(1) NOT NULL,
  `birthday` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` int(10) DEFAULT NULL,
  `email` tinytext DEFAULT NULL,
  `username` varchar(46) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `fname`, `lname`, `gender`, `birthday`, `address`, `phone`, `email`, `username`, `password`, `status`) VALUES
(32, 'Nguyễn Tấn', 'Lộc', 0, '2200-11-03', 'Tra Vinh', 327688, 'locnguyentan1230@gmail.com', 'admin01', '$2a$12$HqkQU.hrtwadm1XtL.PZoOt1BL1j.QqBBtQ/YxZNFwY03co76FySG', 0),
(33, 'Nguyễn Tấn', 'Lộc', 1, '2002-11-01', 'Can Tho', 327688, 'locnguyentan1230@gmail.com', 'user01', '$2a$12$jCZI19AQDE7tncCWqYqXDeIocLjIVpb4gGhGwiyyiujAMDS/K46ZC', 0),
(34, 'Nguyễn Tấn', 'Lộc', 0, '2002-11-02', 'l', 1, 'locnguyentan1230@gmail.com', 'user02', '$2a$12$pu1/UnNhhEFUxwKZhCqJ9.Cj.eqEF.YeOYC0uza3awS2B.Xw4xQHO', 0),
(35, 'Nguyen Van', 'A C', 0, '2002-11-06', 'Can Tho', 1, 'loclocloc1230@gmail.com', 'user03', '$2a$12$D25WcpGoT7BDtuHpBZIutOmvRRPSOuZw9JBAZ4cva7GVLgO7CNtIO', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `tbl_actor`
--
ALTER TABLE `tbl_actor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`,`personID`),
  ADD KEY `fk_actor_person` (`personID`);

--
-- Chỉ mục cho bảng `tbl_director`
--
ALTER TABLE `tbl_director`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_director_person` (`personID`);

--
-- Chỉ mục cho bảng `tbl_images`
--
ALTER TABLE `tbl_images`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbl_movies`
--
ALTER TABLE `tbl_movies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`,`director`),
  ADD KEY `director` (`director`);

--
-- Chỉ mục cho bảng `tbl_movie_actors`
--
ALTER TABLE `tbl_movie_actors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `movieID` (`movieID`,`actorID`),
  ADD KEY `fk_movie_actor_actorID` (`actorID`);

--
-- Chỉ mục cho bảng `tbl_movie_image`
--
ALTER TABLE `tbl_movie_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_movie_image` (`image_id`),
  ADD KEY `fk_movie_image_movie` (`movie_id`);

--
-- Chỉ mục cho bảng `tbl_permission`
--
ALTER TABLE `tbl_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userID_2` (`userID`,`roleID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `roleID` (`roleID`),
  ADD KEY `userID_3` (`userID`,`roleID`);

--
-- Chỉ mục cho bảng `tbl_person`
--
ALTER TABLE `tbl_person`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbl_person_image`
--
ALTER TABLE `tbl_person_image`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbl_role`
--
ALTER TABLE `tbl_role`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `tbl_actor`
--
ALTER TABLE `tbl_actor`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `tbl_director`
--
ALTER TABLE `tbl_director`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `tbl_images`
--
ALTER TABLE `tbl_images`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `tbl_movies`
--
ALTER TABLE `tbl_movies`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `tbl_movie_actors`
--
ALTER TABLE `tbl_movie_actors`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT cho bảng `tbl_movie_image`
--
ALTER TABLE `tbl_movie_image`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `tbl_permission`
--
ALTER TABLE `tbl_permission`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `tbl_person`
--
ALTER TABLE `tbl_person`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `tbl_person_image`
--
ALTER TABLE `tbl_person_image`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tbl_role`
--
ALTER TABLE `tbl_role`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `tbl_actor`
--
ALTER TABLE `tbl_actor`
  ADD CONSTRAINT `fk_actor_person` FOREIGN KEY (`personID`) REFERENCES `tbl_person` (`id`);

--
-- Các ràng buộc cho bảng `tbl_director`
--
ALTER TABLE `tbl_director`
  ADD CONSTRAINT `fk_director_person` FOREIGN KEY (`personID`) REFERENCES `tbl_person` (`id`);

--
-- Các ràng buộc cho bảng `tbl_movies`
--
ALTER TABLE `tbl_movies`
  ADD CONSTRAINT `fk_movie_director` FOREIGN KEY (`director`) REFERENCES `tbl_director` (`personID`);

--
-- Các ràng buộc cho bảng `tbl_movie_actors`
--
ALTER TABLE `tbl_movie_actors`
  ADD CONSTRAINT `fk_movie_actor_actorID` FOREIGN KEY (`actorID`) REFERENCES `tbl_actor` (`id`),
  ADD CONSTRAINT `fk_movie_actor_movieID` FOREIGN KEY (`movieID`) REFERENCES `tbl_movies` (`id`);

--
-- Các ràng buộc cho bảng `tbl_movie_image`
--
ALTER TABLE `tbl_movie_image`
  ADD CONSTRAINT `fk_movie_image` FOREIGN KEY (`image_id`) REFERENCES `tbl_images` (`id`),
  ADD CONSTRAINT `fk_movie_image_movie` FOREIGN KEY (`movie_id`) REFERENCES `tbl_movies` (`id`);

--
-- Các ràng buộc cho bảng `tbl_permission`
--
ALTER TABLE `tbl_permission`
  ADD CONSTRAINT `fk_permission_role` FOREIGN KEY (`roleID`) REFERENCES `tbl_role` (`id`),
  ADD CONSTRAINT `fk_permission_user` FOREIGN KEY (`userID`) REFERENCES `tbl_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
