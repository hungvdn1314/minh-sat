import { CaseData } from '../../../types/case';

export const CASE_001_MVS: CaseData = {
  id: 'case-001',
  docketNumber: '#507/CSHS-ĐT',
  title: 'Vụ Án Căn Hộ 507',
  subtitle: 'Cái chết bí ẩn sau cánh cửa khóa kín',
  difficulty: 2,
  estimatedTime: 15,
  victim: {
    name: 'Trần Minh Đức',
    age: 38,
    role: 'Giám đốc Xí nghiệp Viễn thông SaigonTech'
  },
  briefing: `Đêm 18 tháng 9, mưa nhiệt đới rả rích trút xuống sông Sài Gòn. Trần Minh Đức (38 tuổi), Giám đốc SaigonTech (tiền thân là Xí nghiệp Kỹ thuật Viễn thông), được tìm thấy tử vong trong tư thế treo cổ tại căn hộ 507 chung cư Riviera Residence. Cửa căn hộ khóa chốt xoay từ bên trong. Kết luận sơ bộ ban đầu: tự sát do bế tắc nợ nần kinh doanh.

Tuy nhiên, Trần Minh Ngọc (em gái nạn nhân) tìm đến văn phòng thám tử tư của bạn trong đêm mưa, khẳng định anh trai mình không bao giờ tự vẫn khi vừa hứa đưa con gái đi Đà Lạt cuối tuần và đang nắm giữ chứng cứ về một đường dây biển thủ tài sản. Bạn nhận lời bước vào căn phòng 507 để giải mã sự thật đằng sau cánh cửa khóa kín.`,
  locations: [
    {
      id: 'loc-apt507',
      name: 'Căn Hộ 507',
      subtitle: 'Hiện Trường Tử Vong',
      description: 'Căn hộ tầng 5 bừa bộn sau khi phong tỏa. Rèm cửa hé mở nhìn ra dòng sông Sài Gòn mờ ảo trong mưa đêm.',
      type: 'crime_scene',
      mapPosition: { x: 380, y: 260 },
      has3DScene: true,
      isUnlocked: true,
      interactions: [
        {
          id: 'act-coffee',
          title: 'Kiểm tra ly cà phê trên bàn',
          description: 'Một tách gốm đen đã uống cạn phân nửa. Đáy tách đọng lớp cặn trắng lạ lùng.',
          evidenceId: 'EVD-01',
          hotspot: { x: 0.38, y: 0.58, radius: 40 }
        },
        {
          id: 'act-rope',
          title: 'Khám nghiệm sợi dây thừng',
          description: 'Sợi dây dù bện màu xanh quân đội treo lơ lửng trên xà gồ thép chịu lực.',
          evidenceId: 'EVD-07',
          hotspot: { x: 0.52, y: 0.28, radius: 45 }
        },
        {
          id: 'act-balcony',
          title: 'Xem xét cửa ban công',
          description: 'Khung cửa nhôm kính kéo có vết cạy xước mới toanh phía ngoài mép ron cao su.',
          evidenceId: 'EVD-03',
          hotspot: { x: 0.72, y: 0.42, radius: 40 }
        },
        {
          id: 'act-cipher-paper',
          title: 'Mảnh giấy vo tròn rơi góc thảm',
          description: 'Mảnh giấy nhăn nhúm rơi dưới gầm bàn với chuỗi mật ký kỳ lạ: NJOI QIBU.',
          evidenceId: 'EVD-12',
          hasPuzzle: true,
          hotspot: { x: 0.25, y: 0.75, radius: 35 }
        }
      ]
    },
    {
      id: 'loc-lobby',
      name: 'Sảnh & Phòng An Ninh',
      subtitle: 'Trạm Giám Sát Tòa Nhà',
      description: 'Hệ thống màn hình giám sát đặt trong phòng kỹ thuật cạnh quầy lễ tân tầng trệt sặc mùi khói thuốc.',
      type: 'public',
      mapPosition: { x: 620, y: 440 },
      has3DScene: false,
      isUnlocked: true,
      interactions: [
        {
          id: 'act-talk-huy',
          title: 'Thẩm vấn Đỗ Quang Huy (Bảo vệ ca đêm)',
          description: 'Người bảo vệ chừng ngoài 40 tuổi với vẻ mặt căng thẳng, bồn chồn đảo mắt.',
          characterId: 'char-huy'
        },
        {
          id: 'act-cctv',
          title: 'Truy xuất băng ghi hình CCTV Tầng 5',
          description: 'Xem lại dòng thời gian ghi hình đêm xảy ra án mạng.',
          evidenceId: 'EVD-05'
        },
        {
          id: 'act-talk-son',
          title: 'Gặp ông Vũ Thanh Sơn (Hàng xóm 508)',
          description: 'Cựu sĩ quan quân đội nghỉ hưu đang xuống sảnh nhận bưu phẩm.',
          characterId: 'char-son'
        }
      ]
    }
  ],
  characters: [
    {
      id: 'char-son',
      name: 'Vũ Thanh Sơn',
      role: 'Hàng xóm Căn Hộ 508',
      age: 62,
      avatar: '/assets/images/characters/son_neutral.jpg',
      description: 'Cựu sĩ quan cứu nạn đường sông quân đội nghỉ hưu, trầm tính, sắc sảo, tôn trọng sự thật và danh dự người lính.',
      secret: 'Từng nghe thấy tiếng cãi vã về "rút ruột hợp đồng" lúc 20h30 và tiếng rơi 22h15. Ban đầu cảnh giác vì không muốn bị liên lụy phiền hà.',
      alibi: 'Ở nhà đọc sách và nghiên cứu sơ đồ máy thu thanh từ 20h00 đến 23h00 đêm án mạng.',
      isUnlocked: true,
      testimonies: [
        {
          level: 1,
          title: 'Tiếng tranh cãi lúc tối',
          content: 'Khoảng 20h30 tôi có nghe tiếng tranh cãi rất lớn từ phòng khách 507. Tiếng quát tháo về chuyện "rút ruột hợp đồng" với "sổ sách giả", đến tầm 21h00 thì căn hộ im bặt.',
          isUnlocked: true
        },
        {
          level: 2,
          title: 'Tiếng động lạ lúc 22h15',
          content: 'Tầm 22h15, khi tôi đang châm ấm trà thì nghe tiếng "BỊCH" rất nặng dội qua vách tường 507, như một vật nặng rơi thẳng xuống sàn gỗ. Sau đó tuyệt nhiên không có tiếng động hay kêu cứu nào cả.',
          unlockCondition: 'EVD-05',
          isUnlocked: false
        },
        {
          level: 3,
          title: 'Nút thắt dây cứu hộ quân đội',
          content: 'Đây là nút thắt kéo trượt (slip-knot) của đội cứu nạn đường sông quân đội! Nút này chỉ có thể bện đôi và kéo siết từ đầu dây bên ngoài. Một người sắp tự vẫn hay đang ngấm thuốc an thần tuyệt đối không thể tự buộc được nút thắt này! Chú Đức đã bị sát hại!',
          unlockCondition: 'EVD-07',
          isUnlocked: false
        }
      ]
    },
    {
      id: 'char-huy',
      name: 'Đỗ Quang Huy',
      role: 'Bảo Vệ Ca Đêm',
      age: 45,
      avatar: '/assets/images/characters/huy_neutral.jpg',
      description: 'Bảo vệ phụ trách ca 18h00 - 06h00 sáng. Đôi mắt thâm quầng, ngón tay ám khói thuốc lào và luôn run rẩy lo sợ.',
      secret: 'Nợ cờ bạc cá độ Chợ Lớn 200 triệu đồng. Nhận 50 triệu tiền mặt từ kẻ mang giày da đen để ngắt camera tầng 5 trong 15 phút và mở chốt cửa hành lang kỹ thuật.',
      alibi: 'Khai luôn có mặt tại phòng kiểm soát trung tâm dưới sảnh.',
      isUnlocked: true,
      testimonies: [
        {
          level: 1,
          title: 'Báo cáo ca trực thông thường',
          content: 'Tối đó yên tĩnh lắm thám tử ơi. Khách khứa ra vào đều quét thẻ sảnh. Tôi ngồi trực màn hình suốt đêm không rời nửa bước.',
          isUnlocked: true
        },
        {
          level: 2,
          title: 'Sự cố mất tín hiệu 15 phút',
          content: 'À... cái đoạn camera tầng 5 mất tín hiệu từ 22h05 đến 22h20 là do đầu ghi cáp quang cũ quá bị nóng nguồn nên sập thôi, tôi có ghi chú trong sổ giao ca mà!',
          unlockCondition: 'EVD-05',
          isUnlocked: false
        },
        {
          level: 3,
          title: 'Thú nhận khoản hối lộ 50 triệu',
          content: 'Tôi van anh! Tôi nợ cá độ bóng đá sắp bị xã hội đen siết nhà... Có một người đàn ông đi giày da đen đưa tôi 50 triệu cọc, bảo rút dây cam tầng 5 trong 15 phút và mở chốt cửa hành lang kỹ thuật để lấy đồ cá nhân giùm sếp! Tôi không ngờ ông ta giết người!',
          unlockCondition: 'EVD-03',
          isUnlocked: false
        }
      ]
    }
  ],
  evidence: [
    {
      id: 'EVD-01',
      name: 'Tách Cà Phê Có Cặn Zolpidem',
      type: 'forensic',
      description: 'Ly cà phê đen còn dở trên bàn làm việc của nạn nhân.',
      detail: 'Kết quả test nhanh que thử độc chất: Phát hiện nồng độ cực cao Zolpidem (thuốc an thần gây ngủ sâu cấp tốc). Nạn nhân không có tiền sử mất ngủ và không có đơn thuốc an thần nào.',
      foundAt: 'loc-apt507',
      relatedTo: ['char-huy'],
      isKey: true
    },
    {
      id: 'EVD-03',
      name: 'Vết Cạy Khung Cửa Ban Công',
      type: 'object',
      description: 'Vết trầy xước kim loại mới tại lẫy khóa cửa kính hướng ra hành lang kỹ thuật.',
      detail: 'Dấu vết ma sát kim loại chứng minh có kẻ dùng thiết bị nạy bung chốt cài cửa kính từ phía hành lang ngoài ban công.',
      foundAt: 'loc-apt507',
      relatedTo: ['char-huy'],
      isKey: true
    },
    {
      id: 'EVD-05',
      name: 'Khoảng Trống Băng Ghi Hình CCTV',
      type: 'digital',
      description: 'Nhật ký hệ thống camera tầng 5 bị ngắt đột ngột 15 phút.',
      detail: 'Camera hành lang tầng 5 bị ngắt điện chính xác từ 22:05 đến 22:20 đêm án mạng. Các camera tầng khác vẫn ghi nhận tín hiệu bình thường.',
      foundAt: 'loc-lobby',
      relatedTo: ['char-huy', 'char-son'],
      isKey: true
    },
    {
      id: 'EVD-07',
      name: 'Nút Thắt Dây Dù Cứu Hộ',
      type: 'forensic',
      description: 'Mối buộc trên sợi dây thừng hiện trường.',
      detail: 'Nút thắt kỹ thuật trượt (rescue slip-knot) chỉ siết chặt khi có tải trọng kéo từ bên ngoài. Nút thắt này không thể thực hiện bằng một tay hay từ người đang trong trạng thái mê man.',
      foundAt: 'loc-apt507',
      relatedTo: ['char-son'],
      isKey: true
    },
    {
      id: 'EVD-12',
      name: 'Mẩu Giấy Mật Ký (NJOI QIBU)',
      type: 'document',
      description: 'Tờ giấy nhỏ rách mép rơi dưới chân bàn làm việc.',
      detail: 'Chứa 8 ký tự viết hoa bằng bút dạ đen: "NJOI QIBU". Cần giải mã dịch lùi chữ cái (Caesar Cipher) để khám phá nội dung.',
      foundAt: 'loc-apt507',
      relatedTo: [],
      isKey: false
    }
  ],
  timeline: [
    {
      id: 'time-1',
      time: '20:30',
      event: 'Tiếng tranh cãi dữ dội từ căn hộ 507',
      source: 'Lời khai ông Sơn (508)',
      verified: true
    },
    {
      id: 'time-2',
      time: '21:00',
      event: 'Tiếng cãi vã chấm dứt, căn hộ 507 rơi vào im lặng',
      source: 'Lời khai ông Sơn',
      verified: true
    },
    {
      id: 'time-3',
      time: '22:05',
      event: 'Camera giám sát hành lang tầng 5 mất tín hiệu',
      source: 'Hệ thống CCTV tòa nhà',
      verified: true
    },
    {
      id: 'time-4',
      time: '22:15',
      event: 'Tiếng "bịch" nặng vang lên từ sàn phòng khách 507',
      source: 'Lời khai ông Sơn',
      verified: true
    },
    {
      id: 'time-5',
      time: '22:20',
      event: 'Camera tầng 5 có tín hiệu trở lại',
      source: 'Hệ thống CCTV tòa nhà',
      verified: true
    }
  ],
  solution: {
    culpritId: 'vu-trong-bang',
    motive: 'Thủ tiêu nạn nhân theo chỉ đạo của tổ chức Người Giữ Sổ để bịt đầu mối vụ sao chép chứng từ rửa tiền qua công ty bình phong Minh Phát Holdings',
    method: 'Bỏ thuốc an thần Zolpidem vào cà phê, đột nhập qua ban công kỹ thuật và dùng nút thắt dây dù cứu nạn đường sông kéo treo cổ dàn cảnh tự sát',
    keyEvidenceIds: ['EVD-01', 'EVD-03', 'EVD-05', 'EVD-07'],
    questions: [
      {
        id: 'q1',
        question: 'Bản chất thực sự của cái chết tại căn hộ 507 là gì?',
        points: 30,
        options: [
          { id: 'q1-a', text: 'Tự sát do áp lực nợ nần và hợp đồng công nghệ', isCorrect: false },
          { id: 'q1-b', text: 'Mưu sát được dàn dựng hiện trường tinh vi thành vụ tự vẫn', isCorrect: true },
          { id: 'q1-c', text: 'Tai nạn ngạt thở do trượt chân trong lúc sửa chữa xà gồ', isCorrect: false }
        ]
      },
      {
        id: 'q2',
        question: 'Thủ phạm đã xâm nhập vào căn phòng khóa kín bằng con đường nào?',
        points: 35,
        options: [
          { id: 'q2-a', text: 'Dùng chìa khóa vạn năng mở chốt cửa chính', isCorrect: false },
          { id: 'q2-b', text: 'Đi qua hành lang kỹ thuật phía sau và cạy cửa kính ban công trong 15 phút camera bị tắt', isCorrect: true },
          { id: 'q2-c', text: 'Được nạn nhân đích thân mở cửa đón tiếp lúc 22h00', isCorrect: false }
        ]
      },
      {
        id: 'q3',
        question: 'Ai là kẻ đã tiếp tay vô hiệu hóa hệ thống giám sát tạo thời cơ cho án mạng?',
        points: 35,
        options: [
          { id: 'q3-a', text: 'Ông Vũ Thanh Sơn vì muốn trả thù tiếng ồn', isCorrect: false },
          { id: 'q3-b', text: 'Bảo vệ Đỗ Quang Huy vì nhận hối lộ 50 triệu đồng để tắt camera', isCorrect: true },
          { id: 'q3-c', text: 'Lỗi kỹ thuật chập nguồn hoàn toàn ngẫu nhiên của tòa nhà', isCorrect: false }
        ]
      }
    ]
  },
  hiddenObjective: {
    id: 'hidden-minh-phat',
    title: 'Giải Mã Vỏ Bọc Rửa Tiền Minh Phát',
    description: 'Giải mã bức mật thư NJOI QIBU để phát hiện tập đoàn bình phong tiếp nhận dòng tiền ngầm',
    requiredClues: ['EVD-12'],
    unlockedStory: `Chuỗi ký tự "NJOI QIBU" khi dịch lùi 1 vị trí (Caesar Shift -1):
N → M, J → I, O → N, I → H | Q → P, I → H, B → A, U → T
=> "MINH PHAT" (Công ty TNHH Minh Phát Holdings).

Đây chính là pháp nhân ma được dùng để hợp thức hóa các dòng tiền rút ruột từ SaigonTech! 
Kẻ thủ ác đi giày da đen (Vũ Trọng Bằng) là tay sai phục vụ cho tổ chức ngầm do "Người Giữ Sổ" điều hành.
Manh mối tiếp theo: Chiếc sà lan số hiệu SG-0419 của công ty Minh Phát hiện đang neo đậu bất thường tại Bến Bạch Đằng giữa đêm mưa...`
  }
};
