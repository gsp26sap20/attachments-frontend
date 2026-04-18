# Demo Workflow Full App

Tài liệu này đề xuất một kịch bản quay demo đầy đủ cho app theo đúng các chức năng đang có trong code hiện tại.

## 1. Mục tiêu

- Quay được toàn bộ flow chính của app trên một mạch thống nhất.
- Dùng chính dữ liệu tạo ra ở bước trước để làm nguyên liệu cho bước sau.
- Cover đủ 2 nhóm chức năng:
  - `Business flow`: Attachments, Business Objects, preview, versioning, link/unlink.
  - `Admin flow`: Dashboard, Administrators, Configuration Files, Deleted Attachments.

## 2. Khuyến nghị trước khi quay

1. Dùng tài khoản `ADMIN`.
   - Không dùng user thường nếu muốn quay full, vì:
   - `Dashboard`, `Users`, `Configuration Files`, `Deleted Attachments` là luồng admin.
   - User thường chỉ thấy attachment đang active.
2. Chuẩn bị sẵn các file demo:
   - `demo-contract-v1.pdf`
   - `demo-contract-v2.pdf`
   - `demo-image.png`
   - `demo-note.txt`
3. Nếu muốn quay Google Drive picker:
   - `.env` đã có `VITE_GOOGLE_APP_ID` và `VITE_GOOGLE_CLIENT_ID`
   - Trình duyệt cho phép popup
   - Google account có sẵn file phù hợp rule upload
4. Kiểm tra trước trong `Configuration Files` là các đuôi file định dùng đang `Active`.
5. Nên đặt tên dữ liệu demo theo prefix cố định để dễ lọc:
   - BO: `DEMO_PO_001`
   - Attachment title: `Demo Contract April`
   - User tạm: `DEMO_ADMIN_TEMP`

## 3. Bản đồ màn hình hiện có

| Module | Route hash | Ghi chú |
| --- | --- | --- |
| Launchpad | `#/launchpad` | Màn hình điều hướng chính |
| Dashboard | `#/dashboard` | Admin only |
| Users | `#/dashboard/users` | Admin only, hiện đang quản lý admin users |
| Configuration Files | `#/dashboard/configurations` | Admin only |
| Deleted Attachments | `#/dashboard/deleted-attachments` | Admin only |
| Attachments List | `#/attachments` | Danh sách attachment |
| Attachment Detail | `#/attachments/:id` | Chi tiết attachment |
| Version Detail | `#/attachments/:id/versions/:versionNo` | Chi tiết version |
| Business Objects List | `#/business-objects` | Danh sách BO |
| Business Object Detail | `#/business-objects/:id` | Chi tiết BO |

## 4. Workflow quay đề xuất

### Bước 1. Mở Launchpad và giới thiệu phạm vi app

- Vào `#/launchpad`.
- Quay nhanh phần header:
  - logo SAP
  - tên user ở avatar menu
  - nút back sẽ xuất hiện khi rời launchpad
- Giới thiệu 2 nhóm tile:
  - `Manage File Attachments`
  - `Manage Business Objects`
  - `System Administration` chỉ hiện với admin

Lời dẫn gợi ý:
`Đây là launchpad trung tâm. Người dùng nghiệp vụ đi vào Attachments và Business Objects, còn quản trị viên có thêm dashboard, quản lý administrator, cấu hình file và deleted attachments.`

### Bước 2. Mở Dashboard để chụp baseline hệ thống

- Vào `#/dashboard`.
- Quay các khối:
  - `Attachments`
  - `Business Objects`
  - `Links`
  - `Users`
  - `Configurations`
  - `Attention Items`
- Kéo xuống hoặc focus thêm các section:
  - `Operational Pulse`
  - `System Composition`
  - `Configuration Coverage`
  - `Recent Audit Logs`
- Bấm `Refresh` một lần.

Mục đích:
- Lấy trạng thái đầu kỳ để cuối demo quay lại và so sánh.

### Bước 3. Vào Configuration Files để giải thích rule upload

- Vào `#/dashboard/configurations`.
- Quay filter bar:
  - search
  - filter theo `File Ext`, `Mime Type`, `Type`, `Active`, `Description`
- Mở `View` một rule đang active để giải thích:
  - extension
  - MIME types
  - max size
  - active/inactive
- Quay `Create`:
  - tạo một rule tạm nếu cần
  - ví dụ một extension chưa dùng trong demo để không ảnh hưởng flow upload chính
- Quay `Edit` một rule có sẵn.
- Quay `Disable` rồi `Enable` lại một rule phụ để chứng minh bật/tắt rule hoạt động.

Lời dẫn gợi ý:
`Upload của app không hardcode whitelist ở UI; màn hình này điều khiển extension, MIME type và dung lượng tối đa mà người dùng được phép upload.`

### Bước 4. Vào Business Objects List và tạo BO demo

- Vào `#/business-objects`.
- Quay:
  - filter bar
  - search
  - chuyển `table` sang `grid` rồi quay lại `table`
  - nút `More` nếu có
- Bấm `Create`.
- Tạo một BO mới:
  - Title: `DEMO_PO_001`
  - Type: `Purchase Order`
  - Status: `New`
- Sau khi tạo xong, app sẽ tự vào màn hình detail của BO.

Lời dẫn gợi ý:
`Business Object là thực thể nghiệp vụ gốc, attachment có thể được liên kết 1-n với các BO này.`

### Bước 5. Ở BO Detail, quay khả năng cập nhật BO

- Tại `#/business-objects/:id` vừa tạo:
  - quay `Basic Data`
  - quay `Audit Information`
  - quay section `Attachments`
- Bấm `Edit`.
- Đổi:
  - Title thành `DEMO_PO_001 - Updated`
  - Status thành `In Progress`
- `Save`.

Chưa xóa BO ở bước này để dùng nó cho flow link attachment ngay sau đó.

### Bước 6. Vào Attachments List và giới thiệu màn hình danh sách

- Vào `#/attachments`.
- Quay:
  - filter bar
  - search
  - filter nâng cao theo `File ID`, `File Title`, `Active`, `Created By`
  - chuyển `table` sang `grid` rồi quay lại
  - `More` nếu có
- Nếu đang dùng tài khoản admin, nói thêm:
  - admin thấy cả active và inactive
  - user thường chỉ thấy active

### Bước 7. Tạo attachment mới từ local file

- Tại Attachments List, bấm `Create`.
- Chọn local file `demo-contract-v1.pdf`.
- Trong dialog tiếp theo:
  - File Title: `Demo Contract April`
  - File Name: `demo-contract-v1`
  - có thể để `Edit Lock = Off` để demo thuận hơn
- `Save`.
- Sau khi tạo xong, app tự vào attachment detail.

Nếu muốn quay full hơn, có thể quay thêm nhánh phụ:
- mở `Create` lần nữa
- chọn `Google Drive`
- pick file từ Drive
- không cần save thật nếu muốn chỉ chứng minh tích hợp picker

### Bước 8. Ở Attachment Detail, quay toàn bộ phần xem và cập nhật metadata

- Tại `#/attachments/:id` vừa tạo:
  - quay `General Information`
  - quay `Preview`
  - quay `Version History`
  - quay `Linked Objects`
  - quay `Audit Log`
- Bấm `Edit`.
- Đổi title thành `Demo Contract April - Final Draft`.
- Có thể bật `Edit Lock` nếu muốn giải thích lock.
- `Save`.
- Bấm `Download` để chứng minh tải current version.
- Bấm `Refresh` nếu cần.

Lưu ý khi lời dẫn:
- `Edit Lock` hiện cho phép chủ sở hữu tiếp tục sửa, nhưng chặn người khác.

### Bước 9. Upload version mới

- Trong section `Version History`, bấm `Upload`.
- Chọn `demo-contract-v2.pdf`.
- Đổi file name nếu muốn.
- `Save`.
- Sau khi upload xong, version list sẽ có thêm version mới.

Khuyến nghị:
- Dùng cùng extension để demo ổn định nhất.

### Bước 10. Mở Version Detail và quay set current version

- Trong `Version History`, mở version vừa upload.
- Quay:
  - metadata version
  - preview
  - download
- Nếu version này chưa là current version:
  - bấm `Set as Current Version`
- Quay lại attachment detail để thấy `Current Version` thay đổi.

### Bước 11. Link attachment với business object

- Ở attachment detail, section `Linked Objects`, bấm `Add new Link`.
- Tìm BO vừa tạo ở bước 4.
- Chọn BO đó và bấm `Add`.
- Sau khi link xong:
  - quay table linked objects
  - nói rõ attachment đã được gắn vào BO nghiệp vụ

### Bước 12. Quay Audit Log để chứng minh lịch sử thao tác

- Ngay tại attachment detail, xuống `Audit Log`.
- Chỉ vào các event vừa phát sinh:
  - `Create`
  - `Update Title`
  - `Upload New Version`
  - `Set Current Version` nếu có
  - `Link to Business Object`

Đây là đoạn rất tốt để chốt tính truy vết của hệ thống.

### Bước 13. Quay chiều ngược lại ở BO Detail

- Mở lại BO detail của `DEMO_PO_001 - Updated`.
- Trong section `Attachments`:
  - chứng minh attachment vừa link xuất hiện ở đây
  - mở link để đi ngược sang attachment detail nếu muốn
- Quay `Add new Link` trong BO side để chứng minh link có thể tạo từ cả hai đầu.
- Quay `Delete` ở dòng linked attachment để `unlink`.

Khuyến nghị:
- Sau khi unlink ở BO side, link lại một lần nếu bạn muốn giữ dữ liệu cho bước xóa attachment ngay sau đó.

### Bước 14. Xóa attachment vừa tạo

- Mở lại attachment detail.
- Bấm `Delete`.
- Confirm.
- App sẽ quay về attachments list.

Mục tiêu:
- Tạo dữ liệu thật cho màn `Deleted Attachments`.

### Bước 15. Vào Deleted Attachments và restore

- Vào `#/dashboard/deleted-attachments`.
- Dùng search/filter để tìm attachment vừa xóa.
- Bấm `Restore`.
- Nếu muốn quay sâu hơn:
  - mở detail của attachment vừa restore
  - chỉ ra nút `Restore` cũng có thể xuất hiện ở detail khi attachment inactive

### Bước 16. Quản lý administrator users

- Vào `#/dashboard/users`.
- Quay:
  - search
  - filter theo `User Name`, `Created By`
- Bấm `Create`.
- Tạo user tạm: `DEMO_ADMIN_TEMP`.
- Quay lại danh sách và xóa user vừa tạo.

Lưu ý:
- UI hiện tại tạo user với role mặc định là `ADMIN`.
- Không thể xóa chính tài khoản đang đăng nhập.

### Bước 17. Cleanup BO demo

- Quay về BO detail đã tạo ở bước 4.
- Đảm bảo attachment đã được unlink trước đó.
- Bấm `Delete`.
- Confirm.

Nếu backend không cho xóa vì còn ràng buộc, có thể bỏ qua bước này và giữ lại BO làm dữ liệu mẫu.

### Bước 18. Quay lại Dashboard để chốt demo

- Vào lại `#/dashboard`.
- Bấm `Refresh`.
- Chỉ vào các thay đổi sau demo:
  - attachment count
  - links
  - recent audit logs
  - deleted/reactivated metrics
  - business object stats

Đây là đoạn kết tốt vì dashboard phản ánh toàn bộ thao tác vừa làm.

## 5. Checklist chức năng đã cover

- Launchpad navigation
- Header, avatar menu, back navigation
- Dashboard overview + refresh
- Dashboard recent audit
- Dashboard configuration coverage
- Attachments search/filter
- Attachments table/grid
- Attachments create
- Attachments preview
- Attachment edit title
- Attachment edit lock
- Attachment download current version
- Upload new version
- Version detail
- Version download
- Set current version
- Link BO từ attachment
- Unlink BO
- Attachment audit trail
- Attachment delete
- Deleted attachment restore
- Business objects search/filter
- Business objects table/grid
- Business object create
- Business object edit
- Link attachment từ BO
- Unlink attachment từ BO
- Business object delete
- Admin user create
- Admin user delete
- Configuration file view
- Configuration file create
- Configuration file edit
- Configuration file disable/enable

## 6. Lưu ý quan trọng khi quay

- State `table/grid` hiện đang dùng chung trong store app. Nếu bạn đổi mode ở `Attachments`, sang `Business Objects` có thể thấy mode đó được giữ lại.
- Upload bị chặn nếu extension hoặc MIME type không khớp rule active trong `Configuration Files`.
- Google Drive picker cần popup và cấu hình env đầy đủ; nếu không chắc chắn, hãy quay local upload là luồng chính.
- `Edit Lock` dễ làm flow demo bị chặn nếu đăng nhập user khác; tốt nhất quay toàn bộ bằng cùng một user tạo dữ liệu.
- Khi muốn demo delete/restore, chỉ nên thao tác trên dữ liệu demo mới tạo.
- Nếu dữ liệu ít, các nút `More` có thể không xuất hiện; đó không phải lỗi.
- Route của app dùng `HashRouter`, nên khi quay trực tiếp URL sẽ có dạng `#/attachments`, `#/dashboard`, ...

## 7. Shot phụ nếu còn thời lượng

- Mở Google Drive picker nhưng không cần lưu thật.
- Vào một route sai để quay màn `Not Found`.
- Mở avatar menu để giới thiệu `sign out`, nhưng nên để cuối buổi quay.
