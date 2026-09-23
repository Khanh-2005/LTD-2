# Kế hoạch triển khai ApiLab

## Nguyên tắc chung

- Tuân thủ React Native với Expo và JavaScript, không dùng TypeScript.
- Mọi lời gọi API nằm trong `src/api/`; màn hình không gọi `axios` trực tiếp.
- Lấy địa chỉ API từ `EXPO_PUBLIC_API_URL`.
- Không đọc hoặc sửa `.env`, không hardcode token, mật khẩu hoặc khóa API.
- Triển khai theo thứ tự A → B → C; mỗi lát cắt được kiểm tra trước khi chuyển sang lát cắt tiếp theo.

## Lát cắt A: Axios client, xử lý lỗi và service sản phẩm

### File tạo

- `src/api/client.js`
  - Tạo Axios instance.
  - Cấu hình `baseURL` từ `EXPO_PUBLIC_API_URL`.
  - Cấu hình `timeout: 10000` (10 giây) cố định để hỗ trợ kiểm tra trường hợp quá thời gian chờ.
  - Chuẩn hóa lỗi mạng, timeout và lỗi HTTP thành thông tin lỗi mà hook có thể hiển thị.
- `src/api/productsApi.js`
  - Service lấy danh sách từ `GET /products` với `limit`, `skip`.
  - Service tìm kiếm từ `GET /products/search` với `q`, `limit`, `skip`.
  - Nhận `signal` từ `AbortController` cho request tìm kiếm để có thể hủy request cũ.

### Cách kiểm tra

- Kiểm tra service truyền đúng đường dẫn và query parameters theo SPEC.
- Kiểm tra Axios client nhận đúng `EXPO_PUBLIC_API_URL` và có `timeout` là `10000` ms.
- Giả lập phản hồi chậm quá 10 giây để xác nhận lỗi timeout được chuẩn hóa.
- Giả lập lỗi mạng và lỗi HTTP để xác nhận thông báo lỗi phù hợp.
- Kiểm tra màn hình không import hoặc gọi `axios` trực tiếp.

## Lát cắt B: Hook tải dữ liệu, màn hình danh sách và phân trang

### File tạo

- `src/hooks/useProducts.js`
  - Quản lý danh sách sản phẩm, `total`, `skip` và `limit = 10`.
  - Tách rõ hai trạng thái loading:
    - `loading`: tải lần đầu hoặc tải lại từ đầu; màn hình dùng trạng thái này để hiển thị `ActivityIndicator` ở giữa và không hiển thị danh sách cũ.
    - `loadingMore`: tải trang tiếp theo khi cuộn; màn hình dùng trạng thái này để hiển thị `ActivityIndicator` ở cuối danh sách.
  - Quản lý lỗi, thử lại, làm mới và trạng thái rỗng.
  - Khi tải thêm thành công, nối sản phẩm mới vào danh sách hiện tại.
  - Chỉ tải thêm khi `skip + limit < total`; không gửi request khi đã hết dữ liệu.
- `src/screens/ProductListScreen.js`
  - Hiển thị `FlatList` với `thumbnail`, `title`, `price`.
  - Hiển thị loading giữa màn hình cho `loading`.
  - Hiển thị loading cuối danh sách cho `loadingMore`.
  - Hiển thị trạng thái lỗi kèm nút `Thử lại` và trạng thái rỗng theo SPEC.
  - Hỗ trợ pull-to-refresh.

### File sửa

- `App.js`: render `ProductListScreen`.

### Cách kiểm tra

- Dùng delay tạm thời 3000 ms để kiểm tra `loading` ở giữa màn hình khi tải lần đầu hoặc tải lại.
- Cuộn gần cuối để kiểm tra request trang tiếp theo, dữ liệu được nối thêm và `loadingMore` xuất hiện ở cuối danh sách.
- Khi `skip + limit >= total`, tiếp tục cuộn và xác nhận không có request mới.
- Kiểm tra sản phẩm hiển thị đúng `thumbnail`, `title`, `price`.
- Trả về `products: []` để kiểm tra thông báo rỗng.
- Mất kết nối hoặc gây lỗi server để kiểm tra thông báo lỗi và nút `Thử lại`.
- Dùng pull-to-refresh để kiểm tra tải lại từ đầu.

## Lát cắt C: Tìm kiếm debounce và hủy request cũ

### File sửa

- `src/hooks/useProducts.js`
  - Nhận từ khóa tìm kiếm từ màn hình.
  - Khi từ khóa thay đổi, hủy `AbortController` của request tìm kiếm trước đó ngay lập tức.
  - Xóa timer debounce cũ và tạo timer mới 500 ms.
  - Khi timer 500 ms hoàn tất:
    1. Reset `skip` về `0` trước khi gửi request.
    2. Xóa danh sách kết quả cũ và chuyển sang trạng thái `loading` cho lần tìm kiếm mới.
    3. Gửi request đầu tiên với `q` mới, `limit = 10`, `skip = 0`.
  - Với từ khóa rỗng, reset `skip` về `0` và tải lại danh sách sản phẩm thông thường.
  - Bỏ qua lỗi do request bị hủy, không hiển thị như lỗi mạng.
  - Không cho kết quả của request cũ ghi đè kết quả của từ khóa mới.
- `src/screens/ProductListScreen.js`
  - Thêm ô nhập từ khóa và truyền giá trị vào hook.
  - Kết nối trạng thái loading, lỗi, rỗng và dữ liệu cho kết quả tìm kiếm.

### Cách kiểm tra

- Gõ liên tục `laptop` và xác nhận chỉ gửi request sau 500 ms kể từ lần gõ cuối.
- Khi request `phone` còn chờ và người dùng đổi sang `laptop`, xác nhận request `phone` bị hủy bằng `AbortController`.
- Xác nhận request đầu tiên của từ khóa mới luôn dùng `skip = 0`, danh sách cũ bị reset trước khi hiển thị kết quả mới.
- Xác nhận kết quả cũ không ghi đè kết quả mới.
- Tìm `zzzzzz` để kiểm tra thông báo `Không tìm thấy sản phẩm phù hợp`.
- Xóa từ khóa để kiểm tra việc reset `skip = 0` và tải lại danh sách thường.

## Trình tự và tiêu chí hoàn thành

1. Hoàn thành A và kiểm tra client, timeout, service, xử lý lỗi.
2. Hoàn thành B và kiểm tra hai trạng thái loading, danh sách, phân trang, rỗng, lỗi.
3. Hoàn thành C và kiểm tra debounce, reset `skip`, hủy request cũ và kết quả tìm kiếm.

Chưa sửa hoặc tạo file mã nguồn; artifact này chỉ là kế hoạch triển khai.
