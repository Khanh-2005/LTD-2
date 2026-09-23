# Quy tắc dự án ApiLab (dành cho AI agent)

## Công nghệ

- React Native với Expo, JavaScript (không dùng TypeScript).
- Gọi API bằng axios. Không cài thêm thư viện nếu chưa được sinh viên đồng ý.

## Kiến trúc

- Mọi lời gọi API nằm trong thư mục src/api/. Màn hình không gọi axios trực tiếp.
- Địa chỉ gốc của API lấy từ biến môi trường EXPO_PUBLIC_API_URL.
- Mỗi màn hình phải xử lý đủ: đang tải, lỗi, rỗng, có dữ liệu.

## Bảo mật

- Không viết cứng token, mật khẩu, khóa API vào mã nguồn.
- Không đọc hoặc sửa file .env nếu không được yêu cầu.

## Cách làm việc

- Luôn lập kế hoạch và chờ sinh viên duyệt trước khi sửa code.
- Mỗi lần chỉ làm một lát cắt nhỏ theo yêu cầu.
- Giải thích thay đổi bằng tiếng Việt ngắn gọn, nêu rõ file nào đã sửa.
- Không nói "đã chạy được" nếu chưa chạy kiểm tra thật. Nêu rõ điều gì chưa kiểm chứng.
- Nếu phát hiện thư viện đã cài không dùng tới, phải hỏi trước khi xoá.
