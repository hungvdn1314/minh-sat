# Hướng Dẫn Sáng Tác Nội Dung Vụ Án Mới (Content Authoring Guide)

> **Mục tiêu:** Cho phép bất kỳ lập trình viên, biên kịch hoặc AI Agent nào trong tương lai thêm một vụ án mới (ví dụ: *Case 002: Bí Ẩn Bến Bạch Đằng*) hoặc một màn chơi mới mà **không cần phải can thiệp vào mã nguồn giao diện**, tự động đảm bảo tính nhất quán 100% về mặt mỹ thuật.

---

## 1. Kiến Trúc Tách Rời (Data-Driven Architecture)

Trò chơi được xây dựng theo mô hình **Model-View Decoupling**:
- **Giao diện (Views & Components):** Giữ vai trò khung hiển thị vật lý (Bàn làm việc, Hồ sơ Manila, Kính lúp, Ghim bản đồ, Bìa kẹp gỗ).
- **Dữ liệu (Cases & Inkle Scripts):** Chứa toàn bộ nội dung trinh thám (Địa điểm, Nhân vật, Tang vật, Lời khai, Bản cáo trạng).

```
src/
├── data/
│   └── cases/
│       ├── case-001/  --> Vụ Án Căn Hộ 507 Rivera Park
│       │   └── caseData.ts
│       └── case-002/  --> Vụ Án Mới (Thêm tại đây!)
│           └── caseData.ts
└── ink/
    ├── case-001/
    │   └── testimonies.ink
    └── case-002/
        └── testimonies.ink
```

---

## 2. Các Bước Thêm Vụ Án Mới (Case 002)

### Bước 1: Khai Báo Cấu Trúc Dữ Liệu (`caseData.ts`)
Tạo tệp `src/data/cases/case-002/caseData.ts` tuân theo interface `CaseData`:

```typescript
import { CaseData } from '../../../types/case';

export const case002Data: CaseData = {
  id: 'case-002',
  title: 'Bí Ẩn Bến Bạch Đằng',
  subtitle: 'Vụ án xác chết nổi trên sông Sài Gòn',
  docketNumber: '#602/CSHS-ĐT',
  briefing: {
    incidentReport: '...',
    dispatchAudioUrl: '/assets/audio/briefing_case002.mp3',
    victimName: 'Trần Văn Long',
    victimOccupation: 'Chủ xà lan bến cảng',
    timeOfIncident: '03:30 AM ngày 18/10',
    primaryLocation: 'Bến tàu Bạch Đằng, Quận 1',
  },
  locations: [
    {
      id: 'loc-wharf',
      name: 'Kho Hàng Số 3',
      subtitle: 'Hiện trường án mạng',
      type: 'crime_scene',
      has3DScene: true,
      mapPosition: { x: 520, y: 340 },
      // ...
    }
  ],
  suspects: [ ... ],
  evidence: [ ... ],
  timeline: [ ... ],
  solution: {
    culpritId: 'suspect-x',
    murderWeaponId: 'EVD-101',
    motive: '...',
    flawInAlibi: '...'
  }
};
```

### Bước 2: Viết Kịch Bản Thẩm Vấn Bằng Inkle Ink (`testimonies.ink`)
Tạo tệp `src/ink/case-002/testimonies.ink`:

```ink
=== interrogate_suspect ===
# emotion: BÌNH THẢN GIẢ TẠO # composureDelta: 0
Tôi chỉ là người làm công ở bến tàu, đêm qua trời mưa to tôi ngủ trong kho.

+ [Tra hỏi về chiếc chìa khóa kho bị mất]
    -> ask_key
+ [Chất vấn về vết trầy xước trên mu bàn tay]
    -> ask_scratch

=== ask_key ===
# emotion: DAO ĐỘNG # composureDelta: -25
Chiếc chìa khóa... tôi nhớ là đã giao lại cho quản kho lúc 5 giờ chiều mà!
-> END
```

### Bước 3: Đăng Ký Vụ Án Vào Store
Thêm vụ án vào danh sách các case trong `src/store/gameStore.ts`.
Toàn bộ giao diện bàn làm việc, hồ sơ, ảnh chụp, thẩm vấn, đối chất sẽ **tự động render chuẩn 100% phong cách Saigon Detective Neo-Noir**!

---

## 3. Quy Chuẩn Khi Viết Thêm Minigame / Puzzle Mới

Nếu bạn muốn tạo một minigame mới (ví dụ: *Giải mã điện đàm Radio, Ghép mảnh thư rách, Mở khóa két sắt*):
**BẮT BUỘC** sử dụng các component có sẵn trong `src/components/ui/diegetic/`:

```tsx
import { 
  DossierSheet, 
  RubberStamp, 
  PolaroidCard, 
  ForensicClipboard, 
  StickyNote,
  PoliceLetterhead,
  EvidenceTentMarker 
} from '@/components/ui/diegetic';

// Ví dụ: Tạo màn hình Phân Tích Mẫu Máu Pháp Y
export const BloodAnalysisModal = () => (
  <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4">
    <DossierSheet className="max-w-2xl w-full space-y-4">
      <PoliceLetterhead 
        title="PHIẾU GIÁM ĐỊNH MẪU SINH HÓA PHÁP Y" 
        docketNumber="#507/PY-SH" 
      />
      <div className="flex items-center justify-between">
        <RubberStamp variant="red">TUYỆT MẬT</RubberStamp>
        <span className="font-typewriter text-xs">Mẫu xét nghiệm: EVD-04</span>
      </div>
      {/* Nội dung tương tác minigame đặt trên nền giấy Manila */}
    </DossierSheet>
  </div>
);
```
Không bao giờ tự ý tạo các div nổi màu đen/tím hoặc viết class Tailwind tùy tiện!
