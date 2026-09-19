# 📋 Game Design Document (GDD): MINH SÁT (明察)

## 1. High Concept & Hook (5-Second Pitch)
**Minh Sát** là web game trinh thám suy luận điều tra (point-and-click / 2.5D diorama) bối cảnh Sài Gòn hiện đại. Người chơi vào vai thám tử tư giải mã cái chết trong phòng kín của một CEO công nghệ, lật tẩy mạng lưới rửa tiền ngầm xuyên suốt các tập đoàn đô thị.

## 2. Three Unbreakable Pillars
1. **Deduction First (Suy Luận Thuần Túy):** Không có yếu tố may rủi, không có combat. Mọi kết luận đều bắt nguồn từ việc đối chiếu lời khai, kiểm tra hiện trường và phân tích chứng cứ vật lý.
2. **Hybrid Immersion (Trải Nghiệm Điện Ảnh Lai):** Game world kết hợp 2D point-and-click và 2.5D Three.js parallax lighting, trong khi toàn bộ hồ sơ, nhật ký, lời khai render bằng DOM sắc nét 100%.
3. **Episodic But Connected (Hồ Sơ Nối Mạng Lưới):** Mỗi vụ án là một câu chuyện trọn vẹn độc lập, nhưng chứa các manh mối ẩn (Hidden Objectives) dần phơi bày âm mưu vĩ mô "Người Giữ Sổ".

## 3. Core Loop
```
[Khám Phá Hiện Trường & Thu Thập Chứng Cứ]
       ↓
[Thẩm Vấn Nhân Chứng / Giải Mã Mật Mã (Ink / Cipher)]
       ↓
[Đối Chiếu Dữ Kiện & Ghi Sổ Nhật Ký (Case Notebook)]
       ↓
[Đưa Ra Cáo Buộc & Chấm Điểm Thám Tử (S/A/B/C/F)]
       ↓
[Mở Khóa Mảnh Ghép Âm Mưu Mạng Lưới (Hidden Arc)]
```

## 4. Scope: Micro-Vertical Slice (MVS)
- **Vụ án:** Case 001 — "Vụ Án Căn Hộ 507" (Phiên bản MVS)
- **Địa điểm playable:** 02 locations (Căn hộ 507 - 2.5D Parallax Scene; Sảnh & Phòng An Ninh).
- **Nhân vật:** 02 suspects/witnesses (Vũ Thanh Sơn - hàng xóm; Đỗ Quang Huy - bảo vệ).
- **Bằng chứng:** 04 items (Ly cà phê nhiễm độc, Lời khai hàng xóm, Lỗ hổng CCTV, Sợi dây thừng leo núi).
- **Mini-puzzle:** 01 Cipher Puzzle (Mẩu giấy mã hóa `NJOI QIBU` → Caesar Shift -1 → "MINH PHÁT").
- **Thời lượng trải nghiệm MVS:** 10 - 15 phút.

## 5. Technical Budgets & Target Metrics
- **Initial Download:** < 10 MB.
- **Framerate Target:** 60 FPS ổn định trên cả desktop và thiết bị di động tầm trung.
- **Draw Calls:** < 30 cho 2D/2.5D canvas layers.
- **Memory & Storage:** IndexedDB via `localforage` cho đa slot save game; Không rò rỉ WebGL contexts.
- **Accessibility:** Text contrast ratio $\ge 4.5:1$ (WCAG AA), Touch target size $\ge 44 \times 44\text{ px}$.
