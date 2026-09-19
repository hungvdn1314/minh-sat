import { CaseData } from '../../../types/case';

export const CASE_004_DATA: CaseData = {
  id: 'case-004',
  docketNumber: '#804/CSHS-ĐT',
  title: 'Đêm Phán Quyết Tại Biệt Thự Chợ Lớn',
  subtitle: 'Cuộc đối đầu tối hậu với "Người Giữ Sổ"',
  difficulty: 5,
  estimatedTime: 30,
  victim: {
    name: 'Trịnh Khải',
    age: 46,
    role: 'Luật sư cố vấn trưởng Hội đồng Liên hiệp Ngoại thương'
  },
  briefing: `Đêm ngày 12 tháng 10, bóng tối bao trùm Biệt Thự Bạch Hoa — dinh thự cổ kính thời Pháp tại số 88 đường Châu Văn Liêm, trung tâm Chợ Lớn. Giữa tiếng nhạc giao hưởng và ly sâm banh của buổi dạ tiệc gây quỹ thương mại, một án mạng bất ngờ xảy ra: Luật sư Trịnh Khải, cố vấn pháp lý thân cận của tập đoàn, ngã gục tử vong trong phòng đọc sách vì ngấm chất độc Kali Xyanua.

Chủ nhân dinh thự — Lý Gia Khang, Chủ tịch Hội đồng Liên hiệp Ngoại thương kiêm kẻ đứng sau biệt danh "Người Giữ Sổ" — lập tức hô hào cận vệ phong tỏa hiện trường, tìm cách vu cáo tội giết người cho bạn khi bạn vừa đột nhập tìm Quyển Sổ Cái. Không còn đường lui, bạn phải sử dụng mọi chứng cứ tích lũy từ 3 vụ án trước để bóc trần chân tướng kẻ thù truyền kiếp ngay trước mặt cơ quan điều tra và toàn thể hội đồng ngoại thương.`,
  locations: [
    {
      id: 'loc-mansion-hall',
      name: 'Đại Sảnh Dạ Tiệc Biệt Thự Bạch Hoa',
      subtitle: 'Trung Tâm Quyền Lực Chợ Lớn',
      description: 'Căn phòng khiêu vũ nguy nga đèn chùm pha lê lộng lẫy. Giới thương nhân tài chính và các phái đoàn quốc tế đang đứng ngồi không yên sau án mạng vừa xảy ra.',
      type: 'crime_scene',
      mapPosition: { x: 500, y: 380 },
      has3DScene: false,
      isUnlocked: true,
      interactions: [
        {
          id: 'act-talk-khang',
          title: 'Đối chất trực diện Lý Gia Khang (Người Giữ Sổ)',
          description: 'Người đàn ông quyền lực 58 tuổi trên tay đeo nhẫn ngọc bích lớn, ánh mắt thâm trầm bất biến.',
          characterId: 'char-khang'
        },
        {
          id: 'act-talk-khai-corpse',
          title: 'Khám nghiệm tử thi luật sư Trịnh Khải',
          description: 'Nạn nhân nằm gục trên bàn cờ ngọc bích phòng đọc sách, khóe môi có bọt sùi và mùi hạnh nhân đắng nồng nặc.',
          evidenceId: 'EVD-401'
        },
        {
          id: 'act-wine-glass',
          title: 'Thu giữ ly rượu Cognac có cặn chất độc',
          description: 'Chiếc ly pha lê mạ vàng tinh xảo còn đọng chút rượu màu hổ phách dưới đáy.',
          evidenceId: 'EVD-405'
        }
      ]
    },
    {
      id: 'loc-vault-cellar',
      name: 'Hầm Rượu & Két Sắt Bí Mật',
      subtitle: 'Hang Ổ Lưu Trữ Sổ Cái Đen',
      description: 'Lối đi bí mật sau giá sách phòng đọc sách dẫn xuống căn hầm rượu kiên cố xây từ thời Pháp thuộc.',
      type: 'restricted',
      mapPosition: { x: 300, y: 180 },
      has3DScene: false,
      isUnlocked: true,
      interactions: [
        {
          id: 'act-safe',
          title: 'Mở két sắt ngầm sau bức tranh sơn mài',
          description: 'Két sắt thép dày cộp chứa tài liệu bí mật của mạng lưới ngầm.',
          evidenceId: 'EVD-402',
          hasPuzzle: true
        },
        {
          id: 'act-contract',
          title: 'Thu giữ hợp đồng thuê sát thủ Bằng',
          description: 'Văn bản ủy nhiệm chi tiền mặt có chữ ký nháy đặc trưng của Lý Gia Khang.',
          evidenceId: 'EVD-403'
        },
        {
          id: 'act-zippo',
          title: 'Kỷ vật của Thượng úy Nguyễn Hùng năm xưa',
          description: 'Chiếc bật lửa Zippo khắc hình con mắt — tang chứng rơi tại hiện trường vụ án 3 năm trước.',
          evidenceId: 'EVD-404'
        },
        {
          id: 'act-rescue-trinh',
          title: 'Giải cứu Hoàng Thục Trinh đang bị trói',
          description: 'Nữ kế toán trưởng bị giam giữ trong căn phòng nhỏ dưới đáy hầm rượu.',
          evidenceId: 'EVD-406'
        }
      ]
    }
  ],
  characters: [
    {
      id: 'char-khang',
      name: 'Lý Gia Khang',
      role: 'Chủ Tịch Hội Đồng Ngoại Thương / "Người Giữ Sổ"',
      age: 58,
      avatar: '/assets/images/characters/khang_neutral.jpg',
      description: 'Nhân vật quyền lực bậc nhất giới kinh tế Sài Gòn, kẻ điều hành đường dây rửa tiền xuyên quốc gia và đã ra lệnh thủ tiêu bạn bè, đồng đội của bạn.',
      secret: 'Chính là Người Giữ Sổ. Đã dùng nhẫn ngọc bích tẩm Kali Xyanua vào rượu để sát hại Trịnh Khải, đồng thời là kẻ ra lệnh cho Bằng và Nam trong các vụ án trước.',
      alibi: 'Tuyên bố luôn ở giữa sảnh tiệc tiếp đãi các phái đoàn ngoại giao.',
      isUnlocked: true,
      testimonies: [
        {
          level: 1,
          title: 'Tuyên bố cao ngạo của kẻ quyền lực',
          content: 'Thám tử Phong, cậu đột nhập tư gia bất hợp pháp và dám bôi nhọ danh dự của tôi sao? Cậu nghĩ một kẻ bị tước quân tịch như cậu có thể làm lung lay được vị trí của Lý Gia Khang này?',
          isUnlocked: true
        },
        {
          level: 2,
          title: 'Bác bỏ chứng cứ nhẫn ngọc bích xyanua',
          content: 'Một chiếc nhẫn ngọc bích gia bảo thì chứng minh được gì? Luật sư Khải đột tử vì bệnh tim tái phát, rượu độc là do kẻ thù bên ngoài ám toán!',
          unlockCondition: 'EVD-401',
          isUnlocked: false
        },
        {
          level: 3,
          title: 'Sụp đổ hoàn toàn trước Quyển Sổ Cái và chiếc Zippo',
          content: 'Cậu... làm sao cậu mở được két sắt hầm rượu... (Khang lảo đảo bám vào chân đèn chùm, ánh mắt hoảng loạn tột cùng nhìn chiếc Zippo của Hùng)... Thằng Hùng năm đó cũng kiên quyết như cậu... Tại sao các người không chịu hiểu: Tiền bạc và quyền lực mới là kẻ cai trị Sài Gòn này!',
          unlockCondition: 'EVD-402',
          isUnlocked: false
        }
      ]
    },
    {
      id: 'char-khai',
      name: 'Trịnh Khải (Đã Tử Vong)',
      role: 'Cố Vấn Pháp Lý Tập Đoàn',
      age: 46,
      avatar: '/assets/images/characters/khai_neutral.jpg',
      description: 'Luật sư riêng của Lý Gia Khang, người nắm giữ các hợp đồng chuyển giao tài sản ngầm. Bị sát hại ngay trước giờ công bố di chúc tập đoàn.',
      secret: 'Đã chuẩn bị hồ sơ tố cáo Khang để chuộc tội và cứu Hoàng Thục Trinh nhưng bị Khang phát hiện ra tay trước.',
      alibi: 'Tử vong lúc 21h35 tại phòng đọc sách.',
      isUnlocked: true,
      testimonies: [
        {
          level: 1,
          title: 'Lời nhắn tuyệt mệnh trong cuốn sổ tay',
          content: 'Dòng chữ viết vội bằng máu của Khải trên tờ lịch bàn trước khi gục ngã: "Chất độc ở trong nhẫn... Hãy cứu Trinh... Sổ cái ở sau bức tranh sơn mài..."',
          isUnlocked: true
        }
      ]
    }
  ],
  evidence: [
    {
      id: 'EVD-401',
      name: 'Chiếc Nhẫn Ngọc Bích Có Hộc Xoay Chứa Xyanua',
      type: 'object',
      description: 'Chiếc nhẫn ngọc bích mặt vuông bản lớn trên ngón tay trỏ của Lý Gia Khang.',
      detail: 'Mặt đá ngọc bích có chốt xoay cơ học bí mật mở ra một khoang rỗng siêu nhỏ. Kết quả xét nghiệm nhanh que thử: Có cặn bột tinh thể Kali Xyanua trùng khớp với độc chất trong dạ dày luật sư Khải.',
      foundAt: 'loc-mansion-hall',
      relatedTo: ['char-khang'],
      isKey: true
    },
    {
      id: 'EVD-402',
      name: 'Quyển Sổ Cái Đen (The Black Ledger)',
      type: 'document',
      description: 'Cuốn sổ da cừu màu đen khóa mật mã thu giữ trong két sắt ngầm dưới hầm rượu.',
      detail: 'Ghi chép toàn bộ danh sách 14 công ty bình phong (bao gồm Minh Phát), 8 tài khoản bí mật tại Thụy Sĩ và danh sách các quan chức nhận hối lộ suốt 10 năm qua do chính tay Lý Gia Khang ký duyệt.',
      foundAt: 'loc-vault-cellar',
      relatedTo: ['char-khang'],
      isKey: true
    },
    {
      id: 'EVD-403',
      name: 'Hợp Đồng Thuê Sát Thủ Bằng Có Chữ Ký Nháy Của Khang',
      type: 'document',
      description: 'Văn bản ủy nhiệm thanh toán chi phí ngầm cho Vũ Trọng Bằng.',
      detail: 'Ghi rõ chi phí 50 triệu thanh toán vụ Căn hộ 507 và lệnh diệt khẩu tài công Lê Văn Tài ở Bến Bạch Đằng. Nét chữ ký nháy bằng mực xanh và con dấu niêm phong riêng của Khang.',
      foundAt: 'loc-vault-cellar',
      relatedTo: ['char-khang'],
      isKey: true
    },
    {
      id: 'EVD-404',
      name: 'Chiếc Bật Lửa Zippo Của Thượng Úy Nguyễn Hùng',
      type: 'object',
      description: 'Chiếc bật lửa Zippo bằng đồng khắc hình con mắt của người bạn thân quá cố của Phong.',
      detail: 'Vật chứng bỏ quên tại hiện trường vụ án giết đồng đội Hùng 3 năm trước trên sà lan. Mặt dưới bật lửa có vết cào khắc số seri cá nhân của Lý Gia Khang chứng minh hắn có mặt tại hiện trường năm xưa.',
      foundAt: 'loc-vault-cellar',
      relatedTo: ['char-khang'],
      isKey: true
    },
    {
      id: 'EVD-405',
      name: 'Ly Rượu Pha Lê Cognac Đọng Cặn Xyanua',
      type: 'forensic',
      description: 'Ly rượu Cognac nạn nhân uống dở trên bàn cờ ngọc bích.',
      detail: 'Hàm lượng Kali Xyanua cực độc bám ở miệng ly phía ngoài mép ngậm. Nạn nhân ngạt thở co giật tử vong chỉ sau 30 giây tiếp xúc.',
      foundAt: 'loc-mansion-hall',
      relatedTo: ['char-khang'],
      isKey: false
    },
    {
      id: 'EVD-406',
      name: 'Lời Khai Của Hoàng Thục Trinh Sau Khi Được Cứu',
      type: 'testimony',
      description: 'Lời khai của nữ kế toán trưởng sau khi được tháo xiềng xích dưới đáy hầm rượu.',
      detail: 'Xác nhận toàn bộ quy trình Lý Gia Khang chỉ đạo Jean-Pierre Nam bắt cóc cô tại khách sạn Majestic và ép mở mật mã tài khoản ngân hàng Thụy Sĩ.',
      foundAt: 'loc-vault-cellar',
      relatedTo: ['char-khang'],
      isKey: false
    }
  ],
  timeline: [
    {
      id: 't4-1',
      time: '20:00',
      event: 'Khai mạc dạ tiệc gây quỹ thương mại tại Biệt Thự Bạch Hoa',
      source: 'Thiệp mời dạ tiệc',
      verified: true
    },
    {
      id: 't4-2',
      time: '21:15',
      event: 'Luật sư Trịnh Khải hẹn gặp Khang trong phòng đọc sách đòi thả Trinh',
      source: 'Sổ nhật ký của Khải',
      verified: true
    },
    {
      id: 't4-3',
      time: '21:30',
      event: 'Khang mời rượu Khải có tẩm xyanua từ hộc nhẫn ngọc bích',
      source: 'Giám định ly rượu EVD-405',
      verified: true
    },
    {
      id: 't4-4',
      time: '21:35',
      event: 'Luật sư Khải tử vong; Khang khóa cửa ngoài đổ tội cho thám tử Phong',
      source: 'Khám nghiệm tử thi EVD-401',
      verified: true
    },
    {
      id: 't4-5',
      time: '22:00',
      event: 'Thám tử Phong phá cửa hầm rượu, thu giữ Sổ Cái và bước ra đại sảnh',
      source: 'Biên bản bắt giữ hiện trường',
      verified: true
    }
  ],
  solution: {
    culpritId: 'char-khang',
    motive: 'Thủ tiêu luật sư Khải để bịt miệng, đổ tội giết người cho Thám tử Phong và che giấu toàn bộ mạng lưới rửa tiền xuyên quốc gia của Người Giữ Sổ',
    method: 'Dùng nhẫn ngọc bích cơ học rắc Kali Xyanua vào miệng ly rượu Cognac mời Khải uống trong phòng đọc sách',
    keyEvidenceIds: ['EVD-401', 'EVD-402', 'EVD-403', 'EVD-404'],
    questions: [
      {
        id: 'q4-1',
        question: 'Danh tính thực sự của kẻ mang biệt danh "Người Giữ Sổ" đứng sau toàn bộ 4 vụ án là ai?',
        points: 35,
        options: [
          { id: 'q4-1-a', text: 'Chủ tịch Hội đồng Ngoại thương Lý Gia Khang', isCorrect: true },
          { id: 'q4-1-b', text: 'Luật sư cố vấn Trịnh Khải', isCorrect: false },
          { id: 'q4-1-c', text: 'Quản lý khách sạn Jean-Pierre Nam', isCorrect: false }
        ]
      },
      {
        id: 'q4-2',
        question: 'Lý Gia Khang đã dùng thủ đoạn tinh vi nào để hạ sát luật sư Khải ngay giữa buổi dạ tiệc?',
        points: 35,
        options: [
          { id: 'q4-2-a', text: 'Dùng dao găm đặc nhiệm đâm từ phía sau giống vụ sà lan', isCorrect: false },
          { id: 'q4-2-b', text: 'Bật chốt xoay trên nhẫn ngọc bích để rắc Kali Xyanua vào miệng ly rượu Cognac', isCorrect: true },
          { id: 'q4-2-c', text: 'Bắn súng giảm thanh từ cửa sổ hầm rượu', isCorrect: false }
        ]
      },
      {
        id: 'q4-3',
        question: 'Vật chứng lịch sử nào gắn kết trực tiếp Lý Gia Khang với cái chết của Thượng úy Nguyễn Hùng 3 năm trước?',
        points: 30,
        options: [
          { id: 'q4-3-a', text: 'Chiếc bật lửa Zippo khắc hình con mắt có số seri riêng của Khang thu giữ dưới hầm rượu', isCorrect: true },
          { id: 'q4-3-b', text: 'Đôi giày da sĩ quan rãnh kim cương của Vũ Trọng Bằng', isCorrect: false },
          { id: 'q4-3-c', text: 'Tờ giấy than giải mã tài khoản Thụy Sĩ', isCorrect: false }
        ]
      }
    ]
  },
  hiddenObjective: {
    id: 'hidden-final-verdict',
    title: 'Đêm Phán Quyết Tối Thượng (Dual Endings)',
    description: 'Quyết định số phận của Lý Gia Khang và định đoạt con đường công lý của Thám tử Trần Phong',
    requiredClues: ['EVD-402', 'EVD-404'],
    unlockedStory: `Toàn bộ sự thật đã được phơi bày ra ánh sáng:
Quyển Sổ Cái Đen đã nằm trong tay bạn. Tên trùm Lý Gia Khang bị dồn vào góc tường trong hầm rượu.
Khẩu súng K54 trên tay bạn đã lên đạn...
- Nếu bạn chọn CÔNG LÝ PHÁP LUẬT: Tra tay Khang vào còng số 8, giao nộp Sổ Cái cho Viện Kiểm sát (Đạt Rank S - Huyền Thoại).
- Nếu bạn chọn PHÁN QUYẾT BÓNG ĐÊM: Bóp cò kết liễu kẻ thù trả nợ máu cho đồng đội, biến mình thành bóng ma cô độc trong đêm Noir Sài Gòn (Đạt Rank A - Kẻ Báo Thù).`
  }
};
