
-- ENUM types
CREATE TYPE vai_tro_enum AS ENUM ('Admin', 'User');
CREATE TYPE muc_do_kho_enum AS ENUM ('Dễ', 'Trung Bình', 'Khó');
CREATE TYPE trang_thai_enum AS ENUM ('Đang chấm', 'Đúng', 'Sai', 'Lỗi biên dịch', 'Lỗi runtime', 'Quá thời gian');

-- Tables
CREATE TABLE NguoiDung (
    MaNguoiDung SERIAL PRIMARY KEY,
    HoTen TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    matKhau TEXT NOT NULL,
    VaiTro vai_tro_enum NOT NULL,
    NgayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ChuDe (
    MaChuDe SERIAL PRIMARY KEY,
    TenChuDe TEXT NOT NULL UNIQUE,
    MoTa TEXT
);

CREATE TABLE BaiTap (
    MaBaiTap SERIAL PRIMARY KEY,
    TieuDe TEXT NOT NULL,
    MoTa TEXT NOT NULL,
    MucDoKho muc_do_kho_enum NOT NULL,
    MaChuDe INTEGER REFERENCES ChuDe(MaChuDe) ON DELETE SET NULL,
    NgayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    NguoiTao INTEGER REFERENCES NguoiDung(MaNguoiDung) ON DELETE SET NULL
);

INSERT INTO BaiTap VALUES(34,'In ra các số từ 1 đến 10',replace('Yêu cầu:
Viết một chương trình sử dụng vòng lặp for để in ra các số từ 1 đến 10, mỗi số trên một dòng.
Gợi ý:
Sử dụng vòng lặp for để lặp qua các số từ 1 đến 10.
Dùng lệnh print hoặc tương đương trong ngôn ngữ bạn chọn để hiển thị từng số.','
',char(10)),'Dễ',4,'2025-05-22T03:26:53.936Z',1);
INSERT INTO BaiTap VALUES(37,'Sắp xếp mảng số tăng dần',replace('Viết một chương trình nhận vào một mảng các số nguyên, sau đó sắp xếp mảng đó theo thứ tự tăng dần theo yêu cầu.

Yêu cầu:
Chương trình có thể nhận đầu vào là một mảng số nguyên: [5, 3, 9, 1, 7]
Người dùng hoặc hàm sẽ chỉ định kiểu sắp xếp:
Tăng dần: các phần tử được sắp xếp từ nhỏ đến lớn.
Trả về mảng đã được sắp xếp theo yêu cầu.
Có thể thực hiện sắp xếp bằng cách sử dụng hàm sort() có truyền vào hàm so sánh, hoặc tự cài đặt thuật toán sắp xếp (như bubble sort, selection sort, insertion sort).','
',char(10)),'Dễ',2,'2025-05-25T00:36:25.219Z',15);
INSERT INTO BaiTap VALUES(38,'Đảo ngược chuỗi','Mô tả: Cho một chuỗi "hello world", hãy đảo ngược chuỗi đó.','Dễ',5,'2025-05-25T01:14:24.057Z',15);
INSERT INTO BaiTap VALUES(39,'Tính tổng dãy số','Viết hàm tính tổng các số từ 1 đến 50','Dễ',4,'2025-05-25T01:47:05.664Z',15);
INSERT INTO BaiTap VALUES(40,'Tìm chữ số lớn nhất',replace(replace('Mô tả:
Viết chương trình nhập vào một số nguyên dương N và in ra chữ số lớn nhất trong số đó.
N = 53897','
',char(13)),'
',char(10)),'Trung Bình',4,'2025-05-25T02:13:02.314Z',15);


CREATE TABLE NgonNguLapTrinh (
    MaNgonNgu SERIAL PRIMARY KEY,
    TenNgonNgu TEXT NOT NULL UNIQUE
);

INSERT INTO NgonNguLapTrinh VALUES(1,'javascript');
INSERT INTO NgonNguLapTrinh VALUES(2,'python');
INSERT INTO NgonNguLapTrinh VALUES(3,'java');


CREATE TABLE BoTest (
    MaTest SERIAL PRIMARY KEY,
    MaBaiTap INTEGER REFERENCES BaiTap(MaBaiTap) ON DELETE CASCADE,
    DuLieuDauVao TEXT NOT NULL,
    DauRaMongDoi TEXT NOT NULL,
    LaCongKhai BOOLEAN DEFAULT FALSE,
    KieuDuLieu VARCHAR(50)
);

INSERT INTO BoTest VALUES(4,34,'0',replace('1
2
3
4
5
6
7
8
9
10','
',char(10)),0,'string');
INSERT INTO BoTest VALUES(6,37,'[5, 3, 8, 1, 9]','[1, 3, 5, 8, 9]',1,'array');
INSERT INTO BoTest VALUES(7,38,'hello world','dlrow olleh',1,'string');
INSERT INTO BoTest VALUES(8,39,'1','1275',1,'number');
INSERT INTO BoTest VALUES(9,40,'53897','9',1,'number');


CREATE TABLE KetQuaBaiNop (
    MaKetQua SERIAL PRIMARY KEY,
    MaBaiTap INTEGER REFERENCES BaiTap(MaBaiTap) ON DELETE CASCADE,
    MaNguoiDung INTEGER REFERENCES NguoiDung(MaNguoiDung) ON DELETE CASCADE,
    MaNgonNgu INTEGER REFERENCES NgonNguLapTrinh(MaNgonNgu) ON DELETE CASCADE,
    MaTest INTEGER REFERENCES BoTest(MaTest),
    DauRaThucTe TEXT,
    DatYeuCau BOOLEAN NOT NULL,
    Diem INTEGER DEFAULT 0,
    ThoiGianNop TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO KetQuaBaiNop VALUES(8,34,1,1,4,replace('1
2
3
4
5
6
7
8
9
10','
',char(10)),1,10,'2025-05-24 02:45:38');
INSERT INTO KetQuaBaiNop VALUES(9,34,1,1,4,replace('1
2
3
4
5
6
7
8
9
10','
',char(10)),1,10,'2025-05-24 02:46:02');
INSERT INTO KetQuaBaiNop VALUES(10,37,15,1,6,'[ 1, 3, 5, 8, 9 ]',1,10,'2025-05-25 00:53:52');
INSERT INTO KetQuaBaiNop VALUES(11,38,15,1,7,'dlrow olleh',1,10,'2025-05-25 01:31:52');
INSERT INTO KetQuaBaiNop VALUES(12,38,15,1,7,'dlrow olleh',1,10,'2025-05-25 01:36:18');
INSERT INTO KetQuaBaiNop VALUES(13,34,15,1,4,replace('1
2
3
4
5
6
7
8
9
10','
',char(10)),1,10,'2025-05-25 01:42:34');
INSERT INTO KetQuaBaiNop VALUES(14,39,15,1,8,'1275',1,10,'2025-05-25 01:48:48');
INSERT INTO KetQuaBaiNop VALUES(15,39,16,1,8,'1275',1,10,'2025-05-25 01:57:39');
INSERT INTO KetQuaBaiNop VALUES(16,40,15,1,9,'9',1,10,'2025-05-25 02:16:44');


CREATE TABLE BaiNop (
    MaBaiNop SERIAL PRIMARY KEY,
    MaNguoiDung INTEGER REFERENCES NguoiDung(MaNguoiDung) ON DELETE CASCADE,
    MaBaiTap INTEGER REFERENCES BaiTap(MaBaiTap) ON DELETE CASCADE,
    MaNgonNgu INTEGER REFERENCES NgonNguLapTrinh(MaNgonNgu) ON DELETE CASCADE,
    MaNguon TEXT NOT NULL,
    ThoiGianNop TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    TrangThai trang_thai_enum,
    ThoiGianChay REAL,
    BoNhoSuDung REAL
);

CREATE TABLE DanhSachBaiTap (
    MaDanhSach SERIAL PRIMARY KEY,
    TenDanhSach TEXT NOT NULL,
    MoTa TEXT,
    MaNguoiTao INTEGER REFERENCES NguoiDung(MaNguoiDung) ON DELETE SET NULL,
    NgayTao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LaCongKhai BOOLEAN DEFAULT FALSE
);

CREATE TABLE ChiTietDanhSachBaiTap (
    MaChiTiet SERIAL PRIMARY KEY,
    MaDanhSach INTEGER REFERENCES DanhSachBaiTap(MaDanhSach) ON DELETE CASCADE,
    MaBaiTap INTEGER REFERENCES BaiTap(MaBaiTap) ON DELETE CASCADE,
    ThuTu INTEGER,
    UNIQUE (MaDanhSach, MaBaiTap)
);

CREATE TABLE LichSuHoatDong (
    MaHoatDong SERIAL PRIMARY KEY,
    MaNguoiDung INTEGER REFERENCES NguoiDung(MaNguoiDung) ON DELETE CASCADE,
    MoTaHoatDong TEXT,
    ThoiGianHoatDong TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE XepHang (
    MaXepHang SERIAL PRIMARY KEY,
    MaNguoiDung INTEGER REFERENCES NguoiDung(MaNguoiDung) ON DELETE CASCADE,
    DiemSo INTEGER DEFAULT 0,
    HuyHieu TEXT
);

-- Sample data inserts (excerpt)matKhau
INSERT INTO NguoiDung (HoTen, Email, matKhau, VaiTro, NgayTao) VALUES
('admin','admin@gmail.com','$2b$10$2CHw7v5NXCUHQ7guJmmtI.K8j.kaWsEq27dgFyrvVejGin2NbsB9O','Admin','2025-04-23 08:49:30'),
('admin8','admin8@gmail.com','$2b$10$.4Ftt9AncuNUHVcnRDaNVeGcUN/X8dg7r9Urbwe/d1FvVIXMnWSna','Admin','2025-05-24 09:41:45'),
('user9','user9@gmail.com','$2b$10$FZRVQ.jPH8r.HZQUyH4g9ORxWLLpMVQIGdxvE6VoCEpLbIztJSb42','User','2025-05-24 09:42:16');

INSERT INTO ChuDe (TenChuDe, MoTa) VALUES
('Mảng','Các bài tập về mảng'),
('Số','Các bài tập cơ bản về số'),
('Chuỗi','Các bài tập với chuỗi');

INSERT INTO NgonNguLapTrinh (TenNgonNgu) VALUES
('javascript'), ('python'), ('java');
