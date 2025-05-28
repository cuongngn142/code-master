-- Script import dữ liệu từ SQLite sang PostgreSQL Supabase
-- Chạy từng phần một cách cẩn thận

-- 1. Insert dữ liệu vào bảng NguoiDung
INSERT INTO NguoiDung (MaNguoiDung, HoTen, Email, matKhau, VaiTro, NgayTao) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$2CHw7v5NXCUHQ7guJmmtI.K8j.kaWsEq27dgFyrvVejGin2NbsB9O', 'Admin', '2025-04-23 08:49:30'),
(15, 'admin8', 'admin8@gmail.com', '$2b$10$.4Ftt9AncuNUHVcnRDaNVeGcUN/X8dg7r9Urbwe/d1FvVIXMnWSna', 'Admin', '2025-05-24 09:41:45'),
(16, 'user9', 'user9@gmail.com', '$2b$10$FZRVQ.jPH8r.HZQUyH4g9ORxWLLpMVQIGdxvE6VoCEpLbIztJSb42', 'User', '2025-05-24 09:42:16');

-- Cập nhật sequence cho NguoiDung
SELECT setval(pg_get_serial_sequence('NguoiDung', 'MaNguoiDung'), 16);

-- 2. Insert dữ liệu vào bảng ChuDe
INSERT INTO ChuDe (MaChuDe, TenChuDe, MoTa) VALUES
(2, 'Mảng', 'Các bài tập về mảng'),
(4, 'Số', 'Các bài tập cơ bản về số'),
(5, 'Chuỗi', 'Các bài tập với chuỗi');

-- Cập nhật sequence cho ChuDe
SELECT setval(pg_get_serial_sequence('ChuDe', 'MaChuDe'), 6);

-- 3. Insert dữ liệu vào bảng NgonNguLapTrinh
INSERT INTO NgonNguLapTrinh (MaNgonNgu, TenNgonNgu) VALUES
(1, 'javascript'),
(2, 'python'),
(3, 'java');

-- Cập nhật sequence cho NgonNguLapTrinh
SELECT setval(pg_get_serial_sequence('NgonNguLapTrinh', 'MaNgonNgu'), 3);

-- 4. Insert dữ liệu vào bảng BaiTap
INSERT INTO BaiTap (MaBaiTap, TieuDe, MoTa, MucDoKho, MaChuDe, NgayTao, NguoiTao) VALUES
(34, 'In ra các số từ 1 đến 10', 'Yêu cầu:' || E'\n' || 'Viết một chương trình sử dụng vòng lặp for để in ra các số từ 1 đến 10, mỗi số trên một dòng.' || E'\n' || 'Gợi ý:' || E'\n' || 'Sử dụng vòng lặp for để lặp qua các số từ 1 đến 10.' || E'\n' || 'Dùng lệnh print hoặc tương đương trong ngôn ngữ bạn chọn để hiển thị từng số.', 'Dễ', 4, '2025-05-22T03:26:53.936Z', 1),
(37, 'Sắp xếp mảng số tăng dần', 'Viết một chương trình nhận vào một mảng các số nguyên, sau đó sắp xếp mảng đó theo thứ tự tăng dần theo yêu cầu.' || E'\n\n' || 'Yêu cầu:' || E'\n' || 'Chương trình có thể nhận đầu vào là một mảng số nguyên: [5, 3, 9, 1, 7]' || E'\n' || 'Người dùng hoặc hàm sẽ chỉ định kiểu sắp xếp:' || E'\n' || 'Tăng dần: các phần tử được sắp xếp từ nhỏ đến lớn.' || E'\n' || 'Trả về mảng đã được sắp xếp theo yêu cầu.' || E'\n' || 'Có thể thực hiện sắp xếp bằng cách sử dụng hàm sort() có truyền vào hàm so sánh, hoặc tự cài đặt thuật toán sắp xếp (như bubble sort, selection sort, insertion sort).', 'Dễ', 2, '2025-05-25T00:36:25.219Z', 15),
(38, 'Đảo ngược chuỗi', 'Mô tả: Cho một chuỗi "hello world", hãy đảo ngược chuỗi đó.', 'Dễ', 5, '2025-05-25T01:14:24.057Z', 15),
(39, 'Tính tổng dãy số', 'Viết hàm tính tổng các số từ 1 đến 50', 'Dễ', 4, '2025-05-25T01:47:05.664Z', 15),
(40, 'Tìm chữ số lớn nhất', 'Mô tả:' || E'\r\n' || 'Viết chương trình nhập vào một số nguyên dương N và in ra chữ số lớn nhất trong số đó.' || E'\r\n' || 'N = 53897', 'Trung Bình', 4, '2025-05-25T02:13:02.314Z', 15);

-- Cập nhật sequence cho BaiTap
SELECT setval(pg_get_serial_sequence('BaiTap', 'MaBaiTap'), 44);

-- 5. Insert dữ liệu vào bảng BoTest
INSERT INTO BoTest (MaTest, MaBaiTap, DuLieuDauVao, DauRaMongDoi, LaCongKhai, KieuDuLieu) VALUES
(4, 34, '0', '1' || E'\n' || '2' || E'\n' || '3' || E'\n' || '4' || E'\n' || '5' || E'\n' || '6' || E'\n' || '7' || E'\n' || '8' || E'\n' || '9' || E'\n' || '10', 0, 'string'),
(6, 37, '[5, 3, 8, 1, 9]', '[1, 3, 5, 8, 9]', 1, 'array'),
(7, 38, 'hello world', 'dlrow olleh', 1, 'string'),
(8, 39, '1', '1275', 1, 'number'),
(9, 40, '53897', '9', 1, 'number');

-- Cập nhật sequence cho BoTest
SELECT setval(pg_get_serial_sequence('BoTest', 'MaTest'), 13);

-- 6. Insert dữ liệu vào bảng KetQuaBaiNop
INSERT INTO KetQuaBaiNop (MaKetQua, MaBaiTap, MaNguoiDung, MaNgonNgu, MaTest, DauRaThucTe, DatYeuCau, Diem, ThoiGianNop) VALUES
(8, 34, 1, 1, 4, '1' || E'\n' || '2' || E'\n' || '3' || E'\n' || '4' || E'\n' || '5' || E'\n' || '6' || E'\n' || '7' || E'\n' || '8' || E'\n' || '9' || E'\n' || '10', 1, 10, '2025-05-24 02:45:38'),
(9, 34, 1, 1, 4, '1' || E'\n' || '2' || E'\n' || '3' || E'\n' || '4' || E'\n' || '5' || E'\n' || '6' || E'\n' || '7' || E'\n' || '8' || E'\n' || '9' || E'\n' || '10', 1, 10, '2025-05-24 02:46:02'),
(10, 37, 15, 1, 6, '[ 1, 3, 5, 8, 9 ]', 1, 10, '2025-05-25 00:53:52'),
(11, 38, 15, 1, 7, 'dlrow olleh', 1, 10, '2025-05-25 01:31:52'),
(12, 38, 15, 1, 7, 'dlrow olleh', 1, 10, '2025-05-25 01:36:18'),
(13, 34, 15, 1, 4, '1' || E'\n' || '2' || E'\n' || '3' || E'\n' || '4' || E'\n' || '5' || E'\n' || '6' || E'\n' || '7' || E'\n' || '8' || E'\n' || '9' || E'\n' || '10', 1, 10, '2025-05-25 01:42:34'),
(14, 39, 15, 1, 8, '1275', 1, 10, '2025-05-25 01:48:48'),
(15, 39, 16, 1, 8, '1275', 1, 10, '2025-05-25 01:57:39'),
(16, 40, 15, 1, 9, '9', 1, 10, '2025-05-25 02:16:44');

-- Cập nhật sequence cho KetQuaBaiNop
SELECT setval(pg_get_serial_sequence('KetQuaBaiNop', 'MaKetQua'), 17);
