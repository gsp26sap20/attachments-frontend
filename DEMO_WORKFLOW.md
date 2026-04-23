# Demo Workflow Full App

Tài liệu này là kịch bản demo liền mạch cho SAP Attachment Portal với 2 account và 4 file đã chuẩn bị sẵn: 2 file thuộc nhóm `DOCUMENT`, 2 file thuộc nhóm `IMAGE`.

Mục tiêu của flow là đi từ góc nhìn admin, cấu hình hệ thống, bật role cho user thứ hai, để user đó thực hiện nghiệp vụ upload, versioning, preview, link business object, audit, delete/restore, rồi cuối cùng tắt role để chứng minh phân quyền.

## 1. Dữ liệu demo nên chuẩn bị

Đổi tên bên dưới theo file thật của bạn nếu cần, nhưng nên giữ prefix `DEMO_` để filter nhanh.

| Mã | File đề xuất | Type | Dùng để demo |
| --- | --- | --- | --- |
| DOC-1 | `DEMO_PO_001_contract_v1.pdf` | DOCUMENT | Tạo attachment tài liệu ban đầu |
| DOC-2 | `DEMO_PO_001_contract_v2.pdf` | DOCUMENT | Upload version mới cho tài liệu |
| IMG-1 | `DEMO_PO_001_delivery_photo.jpg` | IMAGE | Tạo attachment hình ảnh |
| IMG-2 | `DEMO_PO_001_receipt_scan.png` | IMAGE | Upload version mới cho attachment hình ảnh |

Tài khoản:

| Vai trò trong demo | Username ghi trong script | Ý nghĩa |
| --- | --- | --- |
| Admin chính | `<ADMIN_ACCOUNT>` | Account đang có quyền admin từ đầu |
| User nghiệp vụ | `<USER_ACCOUNT>` | Account thứ hai để demo bật/tắt admin role |

Tên dữ liệu nên dùng:

| Loại dữ liệu | Tên demo |
| --- | --- |
| Business Object | `DEMO_PO_001 - Laptop Purchase` |
| Business Object sau khi edit | `DEMO_PO_001 - Laptop Purchase - In Progress` |
| Attachment document | `DEMO_PO_001 - Purchase Contract` |
| Attachment image | `DEMO_PO_001 - Delivery Evidence` |

## 2. Ý tưởng câu chuyện

Một purchase order cần lưu hợp đồng và bằng chứng giao hàng. Admin kiểm tra hệ thống, đảm bảo rule upload cho `DOCUMENT` và `IMAGE` đang active, cấp quyền admin tạm cho user nghiệp vụ. User nghiệp vụ tạo business object, upload hợp đồng, upload version mới, gắn file vào business object, upload ảnh giao hàng, xem audit trail, xóa/khôi phục attachment, rồi admin thu hồi role.

Điểm nhấn khi thuyết trình:

- Dashboard cho thấy trạng thái tổng quan trước và sau thao tác.
- Configuration Files quyết định extension, MIME type, max size và trạng thái active của upload.
- Manage Administrators chính là nơi bật/tắt quyền admin: tạo record là bật role `ADMIN`, xóa record là tắt role.
- Attachments có đủ list, filter, table/grid, view settings, create, preview, download, edit lock, versioning, link/unlink, audit, delete/restore.
- Business Objects có đủ create, edit, filter, view settings và link attachment từ cả hai phía.

## 3. Flow quay chính

### Cảnh 1. Login admin và mở Launchpad

Account: `<ADMIN_ACCOUNT>`

Thao tác:

1. Mở app ở `#/launchpad`.
2. Quay header: SAP logo, avatar/current user, menu user.
3. Quay nhóm business tile:
   - `Manage File Attachments`
   - `Manage Business Objects`
4. Quay nhóm `System Administration`:
   - `Dashboard`
   - `Manage Administrators`
   - `Manage Configuration Files`
   - `Deleted Attachments`

Lời thoại gợi ý:

> Đây là launchpad trung tâm. User nghiệp vụ dùng các tile Attachments và Business Objects. Admin có thêm nhóm System Administration để xem dashboard, quản lý admin users, configuration files và deleted attachments.

### Cảnh 2. Dashboard baseline

Route: `#/dashboard`

Thao tác:

1. Vào `Dashboard`.
2. Bấm `Refresh`.
3. Quay nhanh các phần:
   - Overview cards
   - `Operational Pulse`
   - `System Composition`
   - `Configuration Coverage`
   - `Recent Audit Logs`

Lời thoại gợi ý:

> Trước khi thao tác nghiệp vụ, mình lấy baseline từ dashboard. Cuối demo quay lại đây để thấy hệ thống phản ánh các thay đổi như attachment, version, link và audit log.

### Cảnh 3. Kiểm tra Configuration Files trước khi upload

Route: `#/dashboard/configurations`

Thao tác:

1. Vào `Manage Configuration Files`.
2. Dùng search/filter:
   - Filter `Type = Document`
   - Filter `Active = Yes`
   - Search hoặc filter `File Ext = pdf`
3. Bấm `View` rule `pdf`.
4. Chỉ các field:
   - `File Extension`
   - `Type`
   - `Max Size`
   - `Is Active`
   - `Mime Types`
5. Bỏ filter, lọc `Type = Image`, kiểm tra rule cho `jpg`, `jpeg` hoặc `png` theo file thật.
6. Mở `View Settings`, bỏ bớt một cột không cần, thêm lại `Max Size` hoặc `Is Active`, bấm `OK`.
7. Chọn một rule image phụ, ví dụ `png`, bấm `Disable`, sau đó bấm `Enable` lại ngay.
8. Nếu cần cover create config: bấm `Create`, tạo một rule demo không dùng trong flow chính:
   - `File Extension`: `md`
   - `Type`: `Document`
   - `Max Bytes`: `1048576`
   - `Mime Types`: `text/markdown`
   - `Description`: `Demo markdown rule`
   - `Save`

Lưu ý khi quay:

- Nếu `md` đã tồn tại, không tạo lại để tránh lỗi duplicate. Chỉ mở `Create`, giải thích form rồi `Cancel`.
- Không để rule `pdf`, `jpg`, `jpeg`, `png` ở trạng thái disabled trước khi sang phần upload.

Lời thoại gợi ý:

> Upload không hardcode extension ở màn hình create attachment. Rule nằm ở Configuration Files. Khi rule inactive, extension đó sẽ không còn hợp lệ cho upload. Vì vậy admin có thể kiểm soát loại file, MIME type và dung lượng tối đa mà không phải sửa UI.

### Cảnh 4. Bật admin role cho account thứ hai

Route: `#/dashboard/users`

Thao tác:

1. Vào `Manage Administrators`.
2. Search `<USER_ACCOUNT>`.
3. Nếu chưa có record, bấm `Create`.
4. Nhập `<USER_ACCOUNT>`.
5. Quan sát field `Role` hiển thị `ADMIN`.
6. Bấm `Save`.
7. Bấm `Refresh`.
8. Mở `View Settings`, đảm bảo có các cột `User Name`, `Role`, `Created On`, `Created By`.

Lời thoại gợi ý:

> App hiện tại không có nút Edit Role riêng. Cách bật admin role là tạo user trong Manage Administrators. Khi username xuất hiện ở đây với role ADMIN, user đó sẽ thấy nhóm System Administration sau khi login lại.

### Cảnh 5. Login bằng user thứ hai để chứng minh role vừa bật

Account: `<USER_ACCOUNT>`

Thao tác:

1. Logout khỏi `<ADMIN_ACCOUNT>`.
2. Login bằng `<USER_ACCOUNT>`.
3. Vào `#/launchpad`.
4. Quay việc nhóm `System Administration` đã xuất hiện.
5. Mở `Dashboard` ngắn, bấm `Refresh`.

Lời thoại gợi ý:

> Sau khi được thêm vào Manage Administrators, user nghiệp vụ có quyền admin. Mình sẽ dùng chính account này để tạo dữ liệu nghiệp vụ, sau đó cuối demo thu hồi role để thấy khác biệt.

### Cảnh 6. Tạo Business Object demo

Route: `#/business-objects`

Thao tác:

1. Vào `Manage Business Objects`.
2. Dùng search `DEMO_PO_001` để cho thấy hiện chưa có hoặc để tìm dữ liệu demo.
3. Dùng filter:
   - `Type = Purchase Order`
   - `Status = New`
4. Chuyển `table` sang `grid`, quay nhanh card view.
5. Chuyển lại `table`.
6. Mở `View Settings`, thêm/bớt cột `Created By`, `Changed On`, bấm `OK`.
7. Bấm `Create`.
8. Nhập:
   - `Title`: `DEMO_PO_001 - Laptop Purchase`
   - `Type`: `Purchase Order`
   - `Status`: `New`
9. Bấm `OK`.
10. App vào Business Object detail.

Lời thoại gợi ý:

> Business Object là thực thể nghiệp vụ gốc. Attachment sẽ được gắn vào đây để tài liệu không chỉ nằm độc lập mà có quan hệ trực tiếp với nghiệp vụ.

### Cảnh 7. Edit Business Object

Route: Business Object detail vừa tạo

Thao tác:

1. Quay `Basic Data` và `Audit Information`.
2. Quay section `Attachments`, lúc này chưa có attachment nào.
3. Bấm `Edit`.
4. Đổi:
   - `Title`: `DEMO_PO_001 - Laptop Purchase - In Progress`
   - `Status`: `In Progress`
5. Bấm `Save`.
6. Bấm `Refresh` nếu cần.

Lời thoại gợi ý:

> Business Object có thể được cập nhật trong suốt vòng đời nghiệp vụ. Sau bước này mình sẽ tạo tài liệu và link vào PO này.

### Cảnh 8. Mở Attachments List, filter và đổi field

Route: `#/attachments`

Thao tác:

1. Vào `Manage File Attachments`.
2. Search `DEMO_PO_001`.
3. Mở filter:
   - `File Title` contains `DEMO_PO_001`
   - `Edit Lock = Disabled`
   - `Created By = <USER_ACCOUNT>` nếu muốn filter theo user
4. Bấm `Go`.
5. Chuyển `table` sang `grid`, quay preview card nếu có dữ liệu.
6. Chuyển lại `table`.
7. Mở `View Settings`:
   - Bỏ `Created At`
   - Thêm `Edit Lock`
   - Bấm `OK`
8. Bấm `Reset` hoặc clear filter trước khi tạo mới.

Lời thoại gợi ý:

> List hỗ trợ search nhanh, filter nâng cao, chuyển table/grid và cấu hình cột hiển thị. Phần này giúp user xử lý danh sách lớn mà không cần rời màn hình.

### Cảnh 9. Tạo attachment DOCUMENT từ local file

Route: `#/attachments`

File dùng: `DEMO_PO_001_contract_v1.pdf`

Thao tác:

1. Bấm `Create`.
2. Chọn local file `DEMO_PO_001_contract_v1.pdf`.
3. Trong dialog metadata:
   - `Title`: `DEMO_PO_001 - Purchase Contract`
   - `Edit Lock`: tắt ở bước đầu để flow version/link mượt
4. Bấm `Save`.
5. App vào Attachment detail.

Lời thoại gợi ý:

> Khi tạo attachment, app tạo metadata trước và upload file version đầu tiên ngay trong cùng flow. File được validate theo Configuration Files vừa kiểm tra.

### Cảnh 10. Xem detail, preview, edit lock và download

Route: Attachment detail của `DEMO_PO_001 - Purchase Contract`

Thao tác:

1. Quay `Basic Data`:
   - `Title`
   - `Edit Lock`
   - `Current Version`
   - `Current Version Size`
   - `Is Active`
2. Quay `Preview` PDF.
3. Bấm `Download`.
4. Bấm `Edit`.
5. Đổi title thành `DEMO_PO_001 - Purchase Contract - Draft`.
6. Bật `Edit Lock` nếu muốn demo quyền sửa sau này.
7. Bấm `Save`.

Lời thoại gợi ý:

> Detail page gom metadata, preview, version history, linked objects và audit log. Edit Lock dùng để hạn chế người khác chỉnh sửa, trong khi owner hoặc admin vẫn có quyền thao tác.

### Cảnh 11. Upload version mới cho DOCUMENT

Route: Attachment detail, section `Version History`

File dùng: `DEMO_PO_001_contract_v2.pdf`

Thao tác:

1. Trong `Version History`, bấm `Upload`.
2. Chọn `DEMO_PO_001_contract_v2.pdf`.
3. Giữ hoặc sửa `File Name` thành `DEMO_PO_001_contract_v2`.
4. Bấm `Save`.
5. Quay version list có version mới.
6. Mở version mới bằng link version hoặc nút mũi tên.
7. Ở Version Detail:
   - Quay metadata version
   - Quay preview
   - Bấm `Download` nếu cần
8. Nếu thấy nút `Set as Current Version`, bấm nút đó.
9. Nếu không thấy nút, nói ngắn rằng version mới đã là current version.
10. Quay lại Attachment detail, kiểm tra `Current Version`.

Lời thoại gợi ý:

> Versioning giúp giữ lịch sử file. User có thể xem từng version riêng, tải xuống, và chọn version nào là current để nghiệp vụ sử dụng.

### Cảnh 12. Link DOCUMENT attachment vào Business Object từ phía Attachment

Route: Attachment detail, section `Linked Objects`

Thao tác:

1. Trong `Linked Objects`, bấm `Add new Link`.
2. Search `DEMO_PO_001`.
3. Chọn business object `DEMO_PO_001 - Laptop Purchase - In Progress`.
4. Bấm `Add`.
5. Quay bảng `Objects` sau khi link:
   - `BO ID`
   - `BO Title`
   - `BO Type`
   - `BO Status`
   - `Linked By`

Lời thoại gợi ý:

> Link có thể tạo từ phía attachment. Khi link thành công, attachment này trở thành bằng chứng hoặc tài liệu liên quan trực tiếp đến business object.

### Cảnh 13. Audit Log sau các thao tác chính

Route: Attachment detail, section `Audit Log`

Thao tác:

1. Kéo xuống `Audit Log`.
2. Chỉ các event vừa phát sinh:
   - Create attachment
   - Update title/edit lock
   - Upload new version
   - Set current version nếu có
   - Link to Business Object

Lời thoại gợi ý:

> Audit log là phần chứng minh tính truy vết. Mỗi thao tác nghiệp vụ quan trọng đều có lịch sử, thời điểm và người thực hiện.

### Cảnh 14. Tạo attachment IMAGE và preview ảnh

Route: `#/attachments`

File dùng: `DEMO_PO_001_delivery_photo.jpg`

Thao tác:

1. Quay lại Attachments List.
2. Bấm `Create`.
3. Chọn `DEMO_PO_001_delivery_photo.jpg`.
4. Nhập:
   - `Title`: `DEMO_PO_001 - Delivery Evidence`
   - `Edit Lock`: tắt
5. Bấm `Save`.
6. Ở detail, quay `Preview` để thấy ảnh render trực tiếp.

Lời thoại gợi ý:

> Không chỉ document, app cũng preview được image. Cùng một Attachment module xử lý nhiều loại file dựa trên rule cấu hình.

### Cảnh 15. Upload version mới cho IMAGE

Route: Image attachment detail, section `Version History`

File dùng: `DEMO_PO_001_receipt_scan.png`

Thao tác:

1. Trong `Version History`, bấm `Upload`.
2. Chọn `DEMO_PO_001_receipt_scan.png`.
3. Nếu app cho phép khác extension trong cùng type `IMAGE`, bấm `Save`.
4. Nếu backend yêu cầu cùng extension, thay bằng image version cùng extension với IMG-1.
5. Mở version mới hoặc quay list version.
6. Nếu có `Set as Current Version`, bấm để set current.
7. Quay lại preview để thấy image current version mới.

Lời thoại gợi ý:

> Với image, flow versioning giống document. Rule upload vẫn đảm bảo file thuộc nhóm IMAGE và có MIME type hợp lệ.

### Cảnh 16. Link IMAGE từ phía Business Object

Route: Business Object detail của `DEMO_PO_001`

Thao tác:

1. Mở lại Business Object detail.
2. Trong section `Attachments`, bấm `Add new Link`.
3. Filter/Search `Delivery Evidence`.
4. Chọn attachment image `DEMO_PO_001 - Delivery Evidence`.
5. Bấm `Add`.
6. Quay bảng `Attachments` đang có cả document và image.
7. Bấm vào link file để đi ngược về Attachment detail nếu muốn.

Lời thoại gợi ý:

> Link cũng có thể tạo từ phía Business Object. Đây là flow tự nhiên khi user đang xử lý PO và muốn gắn thêm tài liệu hoặc hình ảnh liên quan.

### Cảnh 17. Demo unlink và rule chặn delete khi còn link

Route: Attachment detail của document `DEMO_PO_001 - Purchase Contract - Draft`

Thao tác:

1. Mở lại document attachment.
2. Bấm `Delete` khi attachment vẫn đang link với BO.
3. Nếu app báo không thể delete khi còn linked business objects, dừng lại 2 giây để quay message.
4. Trong `Linked Objects`, bấm `Delete` ở dòng BO để unlink.
5. Confirm `OK`.
6. Quay linked objects trở về empty hoặc giảm count.

Lời thoại gợi ý:

> Hệ thống không cho xóa attachment khi vẫn còn quan hệ nghiệp vụ. User phải unlink trước, tránh mất tài liệu đang được business object tham chiếu.

### Cảnh 18. Delete attachment và Restore từ Deleted Attachments

Route: Attachment detail và `#/dashboard/deleted-attachments`

Thao tác:

1. Sau khi unlink document attachment, bấm `Delete`.
2. Confirm `OK`.
3. App quay về Attachments List.
4. Vào `Deleted Attachments`.
5. Search `Purchase Contract`.
6. Mở `View Settings` nếu muốn thêm cột `Edit Lock`, `Created By`.
7. Bấm `Restore`.
8. Quay toast restore thành công.
9. Quay lại Attachments List, search `Purchase Contract` để thấy attachment active trở lại.

Lời thoại gợi ý:

> Delete ở đây là soft delete. Admin có màn Deleted Attachments để tìm lại và restore dữ liệu khi cần.

### Cảnh 19. Quay Dashboard sau nghiệp vụ

Route: `#/dashboard`

Thao tác:

1. Vào `Dashboard`.
2. Bấm `Refresh`.
3. Quay các phần thay đổi:
   - Attachment count
   - Business object count
   - Link count
   - Recent audit logs
   - Configuration coverage vẫn ổn định

Lời thoại gợi ý:

> Sau toàn bộ flow, dashboard phản ánh hoạt động vừa phát sinh. Đây là góc nhìn admin để kiểm soát vận hành sau khi user thao tác nghiệp vụ.

### Cảnh 20. Tắt admin role của user thứ hai

Account thao tác: `<ADMIN_ACCOUNT>`

Thao tác:

1. Logout khỏi `<USER_ACCOUNT>`.
2. Login lại bằng `<ADMIN_ACCOUNT>`.
3. Vào `#/dashboard/users`.
4. Search `<USER_ACCOUNT>`.
5. Bấm `Delete` ở dòng user đó.
6. Confirm `OK`.
7. Logout `<ADMIN_ACCOUNT>`.
8. Login lại bằng `<USER_ACCOUNT>`.
9. Mở `#/launchpad`.
10. Quay việc nhóm `System Administration` không còn hiển thị.
11. Thử nhập `#/dashboard`, app sẽ redirect về `#/launchpad` nếu PrivateRoute hoạt động đúng.

Lời thoại gợi ý:

> Thu hồi role được thực hiện bằng cách xóa user khỏi Manage Administrators. Sau khi login lại, user chỉ còn nhóm nghiệp vụ và không truy cập được dashboard/admin routes.

## 4. Checklist tính năng đã cover

- Launchpad navigation
- Header, avatar/current user, logout
- Admin-only tiles
- Dashboard overview
- Dashboard refresh
- Dashboard recent audit
- Configuration files search/filter
- Configuration files view
- Configuration files view settings
- Configuration files create
- Configuration files edit nếu cần
- Configuration files disable/enable
- Admin user search/filter
- Bật admin role bằng Create user
- Tắt admin role bằng Delete user
- Role-based launchpad
- Private admin route redirect
- Business objects search/filter
- Business objects table/grid
- Business objects view settings
- Business object create
- Business object edit
- Business object detail
- Link attachment từ phía BO
- Unlink attachment từ phía BO hoặc attachment
- Attachments search/filter
- Attachments table/grid
- Attachments view settings
- Create attachment local file
- DOCUMENT upload
- IMAGE upload
- Preview PDF
- Preview image
- Download current version
- Edit attachment title
- Edit Lock
- Upload new version
- Version detail
- Set current version
- Link BO từ phía attachment
- Audit trail
- Delete attachment
- Delete blocked when linked
- Deleted Attachments search/filter
- Restore attachment

## 5. Các điểm cần tránh khi quay

- Không disable rule của file sắp upload rồi quên enable lại.
- Không xóa Business Object khi vẫn còn attachment linked, vì app sẽ chặn.
- Không xóa attachment khi vẫn còn linked object nếu mục tiêu là demo restore. Hãy unlink trước.
- Nếu dùng Google Drive picker, test popup và Google credentials trước. Flow chính nên dùng local upload để ổn định.
- Nếu version IMAGE khác extension bị backend chặn, dùng IMG-2 cùng extension với IMG-1. Phần quan trọng là type `IMAGE`, không phải bắt buộc phải khác extension.
- Nếu nút `Set as Current Version` không hiện, nghĩa là version đang mở đã là current hoặc backend đã set current tự động.
- Nếu `More` không xuất hiện ở list, dữ liệu chưa đủ nhiều. Không cần cố tạo thêm dữ liệu chỉ để quay nút này.

## 6. Cleanup sau demo

Nếu cần trả hệ thống về trạng thái gọn:

1. Đảm bảo `<USER_ACCOUNT>` đã bị xóa khỏi `Manage Administrators` nếu chỉ cấp quyền tạm.
2. Với attachment image còn linked vào BO, unlink nếu muốn xóa BO.
3. Xóa hoặc giữ các attachment demo tùy mục tiêu thuyết trình.
4. Nếu đã tạo config rule `md`, có thể `Disable` rule đó để nó không ảnh hưởng whitelist upload chính.
5. Bấm `Refresh` ở Dashboard để xác nhận trạng thái cuối.

## 7. Script chốt cuối demo

> Flow này đi qua toàn bộ vòng đời: admin kiểm tra hệ thống, cấu hình upload, cấp quyền tạm, user tạo business object, upload document và image, quản lý version, preview, download, link vào nghiệp vụ, theo dõi audit, delete/restore và cuối cùng thu hồi role. Điểm chính là attachment không còn là file rời rạc, mà được quản trị bằng rule, phân quyền, version history, audit trail và quan hệ trực tiếp với business object.
