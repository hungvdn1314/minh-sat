import { CaseData } from '../../../types/case';

export const CASE_002_DATA: CaseData = {
  id: 'case-002',
  docketNumber: '#602/CSHS-ĐT',
  title: 'Bóng Đêm Bến Bạch Đằng',
  subtitle: 'Vụ án mạng trên sà lan neo đậu trái phép',
  difficulty: 3,
  estimatedTime: 20,
  victim: {
    name: 'Lê Văn Tài',
    age: 45,
    role: 'Tài công trưởng sà lan số hiệu SG-0419'
  },
  briefing: `Rạng sáng ngày 28 tháng 9, thi thể tài công Lê Văn Tài (45 tuổi) được đội tuần tra đường sông phát hiện trôi dạt vào bờ kè Bến Bạch Đằng trong cơn mưa giông. Chiếc sà lan SG-0419 do nạn nhân điều khiển neo đậu trái phép cách bờ 200m, buồng lái bị lục tung và sàn boong có vết máu bị lau chùi dở bằng dầu máy.

Khám xét sà lan, cảnh sát phát hiện các thùng gỗ chứa bo mạch viễn thông quân sự và ngoại tệ bẩn đóng dấu niêm phong của Công ty Minh Phát Holdings — pháp nhân vừa bị phát hiện trong vụ án Căn hộ 507. Bạn bước xuống bến tàu đêm để vạch trần kẻ sát nhân và tìm lại cuốn sổ hải trình bí mật.`,
  locations: [
    {
      id: 'loc-barge',
      name: 'Sà Lan SG-0419',
      subtitle: 'Hiện Trường Án Mạng Trên Sông',
      description: 'Chiếc sà lan chở hàng tải trọng 300 tấn chao đảo trên sóng nước bến Bạch Đằng. Mùi dầu diesel và tanh nồng của bùn sông phảng phất trong đêm mưa.',
      type: 'crime_scene',
      mapPosition: { x: 520, y: 340 },
      has3DScene: false,
      isUnlocked: true,
      interactions: [
        {
          id: 'act-blood',
          title: 'Khám nghiệm vết máu trên boong sà lan',
          description: 'Một vệt sẫm màu bị chùi dở bằng dầu nhớt cạnh mạn thuyền phía tả ngạn.',
          evidenceId: 'EVD-206'
        },
        {
          id: 'act-engine',
          title: 'Soi đèn vào khoang máy ngập nước',
          description: 'Dưới gầm trục láp máy thủy đọng nước cặn có một vật kim loại sáng lấp lánh.',
          evidenceId: 'EVD-204'
        },
        {
          id: 'act-watch',
          title: 'Kiểm tra tử thi và chiếc đồng hồ đeo tay',
          description: 'Chiếc đồng hồ Liên Xô Poljot của nạn nhân bị vỡ mặt kính, kim đứng lại ở một mốc thời gian chuẩn xác.',
          evidenceId: 'EVD-205'
        },
        {
          id: 'act-battery',
          title: 'Cạy nắp hộp bình ắc quy buồng lái',
          description: 'Hộp nhựa đen chứa bình điện của sà lan có dấu hiệu bị cạy mở gần đây.',
          evidenceId: 'EVD-202',
          hasPuzzle: true
        }
      ]
    },
    {
      id: 'loc-wharf',
      name: 'Kho Hàng Số 3 & Bến Tàu',
      subtitle: 'Trạm Tiếp Vận Cảng Đường Thủy',
      description: 'Dãy kho chứa hàng bằng tôn xi măng cạnh quán cà phê cóc ven sông mở thâu đêm phục vụ dân bến bãi.',
      type: 'public',
      mapPosition: { x: 420, y: 460 },
      has3DScene: false,
      isUnlocked: true,
      interactions: [
        {
          id: 'act-talk-mai',
          title: 'Thẩm vấn Bùi Thị Mai (Chủ quán nước ven cảng)',
          description: 'Người phụ nữ buôn bán sành sỏi ở bến tàu, luôn đảo mắt quan sát người ra vào.',
          characterId: 'char-mai'
        },
        {
          id: 'act-talk-bang',
          title: 'Thẩm vấn Vũ Trọng Bằng (Thanh tra vận tải Minh Phát)',
          description: 'Gã đàn ông ngoài 40 tuổi mặc áo khoác gió sẫm màu, đôi mắt sắc lạnh và đi đôi giày da sĩ quan đen bóng.',
          characterId: 'char-bang'
        },
        {
          id: 'act-talk-lam',
          title: 'Gặp Lâm "Chột" (Phụ máy sà lan)',
          description: 'Tay thợ máy đang lấm lét nấp sau đống thùng gỗ phế liệu của kho hàng.',
          characterId: 'char-lam'
        },
        {
          id: 'act-cigarette',
          title: 'Thu giữ bao thuốc lá dưới gầm bàn quán nước',
          description: 'Bao thuốc lá ba số 555 ngoại nhập lậu bị bóp méo vứt vội dưới chân ghế.',
          evidenceId: 'EVD-203'
        },
        {
          id: 'act-shoes',
          title: 'Kiểm tra dấu vết giày da bùn đất',
          description: 'Đôi giày da sĩ quan của Vũ Trọng Bằng bám đầy dầu máy và bùn đỏ đặc trưng của sà lan.',
          evidenceId: 'EVD-201'
        }
      ]
    }
  ],
  characters: [
    {
      id: 'char-bang',
      name: 'Vũ Trọng Bằng',
      role: 'Thanh Tra Vận Tải Minh Phát',
      age: 40,
      avatar: '/assets/images/characters/bang_neutral.jpg',
      description: 'Thanh tra kiểm định đường thủy của Minh Phát Holdings. Từng là lính đặc nhiệm cứu hộ đường sông giải ngũ, tác phong lạnh lùng, dứt khoát.',
      secret: 'Chính là sát thủ mang giày da đen ở Căn hộ 507 và kẻ hạ sát Lê Văn Tài trên sà lan. Bị Tài tống tiền nên ra tay thủ tiêu.',
      alibi: 'Khai ở nhà nghỉ công ty cách bến tàu 2km suốt đêm.',
      isUnlocked: true,
      testimonies: [
        {
          level: 1,
          title: 'Lời khai hành chính của thanh tra',
          content: 'Tôi xuống bến lúc 6h sáng để kiểm tra niêm phong lô hàng linh kiện viễn thông theo lịch. Sà lan là của công ty thuê ngoài, tôi không liên quan gì đến chuyện riêng của anh Tài.',
          isUnlocked: true
        },
        {
          level: 2,
          title: 'Đối chất về bao thuốc 555 dính máu',
          content: 'Thuốc lá ba số ở Sài Gòn thiếu gì người hút! Tôi ghé quán nước lúc nửa đêm uống ly cà phê rồi về ngủ, làm sao biết ai vứt bao thuốc đó!',
          unlockCondition: 'EVD-203',
          isUnlocked: false
        },
        {
          level: 3,
          title: 'Bị bẻ gãy bởi con dao găm và vết giày',
          content: 'Trời... con dao đó... (Bằng giật lùi lại, bàn tay nắm chặt mép bàn run rẩy)... Thằng Tài tham lam tống tiền Người Giữ Sổ một trăm cây vàng! Hắn dọa sẽ nộp sổ hải trình cho công an cảng. Tôi chỉ làm theo lệnh trên để bảo toàn đường dây thôi!',
          unlockCondition: 'EVD-204',
          isUnlocked: false
        }
      ]
    },
    {
      id: 'char-mai',
      name: 'Bùi Thị Mai',
      role: 'Chủ Quán Nước Bến Cảng',
      age: 36,
      avatar: '/assets/images/characters/mai_neutral.jpg',
      description: 'Chủ quán cà phê cóc mở thâu đêm bên mép bến cảng, biết rõ mọi ngõ ngách và những chuyến tàu cập bến lén lút.',
      secret: 'Bán thuốc lá lậu và ghi số đề cho dân thủy thủ. Thấy bóng người rời sà lan lúc 01h45 vào mua thuốc.',
      alibi: 'Luôn bán hàng ở quán nước từ 19h00 đến sáng.',
      isUnlocked: true,
      testimonies: [
        {
          level: 1,
          title: 'Báo cáo cảnh quan đêm mưa',
          content: 'Đêm mưa gió mịt mù sấm chớp ầm ầm thám tử ơi. Khách khứa vắng tanh, chỉ có mấy tay phu khuân vác trú mưa rồi về.',
          isUnlocked: true
        },
        {
          level: 2,
          title: 'Nhận dạng người khách mua thuốc lá lúc 01h40',
          content: 'Nhìn bao thuốc lá này tôi nhớ rồi! Tầm 01h40, có người đàn ông trùm áo mưa kín mít từ cầu tàu sà lan bước vào mua gói ba số 555. Hắn đưa tiền chẵn không lấy thối, tay áo dính vết dầu đen và đi đôi giày da sĩ quan láng bóng phát ra tiếng cồm cộp!',
          unlockCondition: 'EVD-203',
          isUnlocked: false
        }
      ]
    },
    {
      id: 'char-lam',
      name: 'Lâm "Chột"',
      role: 'Thợ Máy Phụ Sà Lan',
      age: 30,
      avatar: '/assets/images/characters/lam_neutral.jpg',
      description: 'Thợ máy phụ trên sà lan SG-0419, chột mắt trái, tính tình nhút nhát và hay ăn cắp vặt.',
      secret: 'Đã rút ruột 2 kiện hàng bo mạch đem bán chợ trời Huỳnh Thúc Kháng. Biết Tài giấu cuốn sổ hải trình trong hộc bình ắc quy.',
      alibi: 'Khai ngủ say trong kho hàng số 3.',
      isUnlocked: true,
      testimonies: [
        {
          level: 1,
          title: 'Thanh minh về việc trốn trong kho',
          content: 'Tôi không biết gì hết anh thám tử ơi! Tôi chỉ là thằng thợ phụ thay nhớt máy sà lan thôi! Thấy công an kéo tới tôi sợ quá nên nấp...',
          isUnlocked: true
        },
        {
          level: 2,
          title: 'Chỉ điểm nơi cất giấu cuốn sổ hải trình',
          content: 'Tôi khai! Tối đó tôi thấy anh Tài cãi nhau lớn tiếng trong điện thoại với bên Minh Phát. Sau đó anh ấy cầm cuốn sổ bìa da màu xanh nhét giấu vào ngăn bí mật dưới đáy bình ắc quy buồng lái buông lời dằn mặt: "Có cuốn sổ này thì tụi mày đừng hòng quỵt tiền tao"!',
          unlockCondition: 'EVD-206',
          isUnlocked: false
        }
      ]
    }
  ],
  evidence: [
    {
      id: 'EVD-201',
      name: 'Đôi Giày Da Sĩ Quan Rãnh Kim Cương',
      type: 'object',
      description: 'Đôi giày da đen của Vũ Trọng Bằng bám vết bùn sà lan.',
      detail: 'Họa tiết đế cao su đúc rãnh kim cương đặc chủng của lực lượng cứu nạn quân đội. Hoa văn đế giày trùng khớp 100% với dấu chân để lại trên gờ ban công Căn hộ 507 trong Vụ án 001!',
      foundAt: 'loc-wharf',
      relatedTo: ['char-bang'],
      isKey: true
    },
    {
      id: 'EVD-202',
      name: 'Cuốn Sổ Hải Trình SG-0419',
      type: 'document',
      description: 'Cuốn sổ ghi chép nhật trình các chuyến tàu đêm giấu trong hộp bình ắc quy.',
      detail: 'Ghi lại chi tiết 12 chuyến vận chuyển bo mạch viễn thông và ngoại tệ ngầm từ Vũng Tàu về Sài Gòn. Trang cuối ghi mã hợp đồng HĐ-MAJ-302 giao cho Hoàng Thục Trinh tại Khách sạn Majestic.',
      foundAt: 'loc-barge',
      relatedTo: ['char-lam'],
      isKey: true
    },
    {
      id: 'EVD-203',
      name: 'Bao Thuốc Lá 555 Ngoại Dính Máu',
      type: 'object',
      description: 'Gói thuốc lá ba số 555 bị vò nát dưới gầm bàn quán nước chị Mai.',
      detail: 'Mặt sau bao thuốc có vết máu khô nhóm O trùng khớp với nhóm máu của tài công Lê Văn Tài. Trên miệng bao thuốc thu thập được dấu vân tay của Vũ Trọng Bằng.',
      foundAt: 'loc-wharf',
      relatedTo: ['char-bang', 'char-mai'],
      isKey: true
    },
    {
      id: 'EVD-204',
      name: 'Dao Găm Đặc Nhiệm Mẻ Mũi',
      type: 'object',
      description: 'Con dao găm quân sự tìm thấy dưới khoang máy sà lan.',
      detail: 'Lưỡi dao dài 18cm bằng thép không gỉ, mũi dao bị mẻ một mảnh kim loại nhỏ chừng 2mm. Lưỡi dao dính vết mỡ bò và dấu máu nạn nhân.',
      foundAt: 'loc-barge',
      relatedTo: ['char-bang'],
      isKey: true
    },
    {
      id: 'EVD-205',
      name: 'Giám Định Pháp Y Vết Thương Cổ & Đồng Hồ Poljot',
      type: 'forensic',
      description: 'Biên bản khám nghiệm tử thi và chiếc đồng hồ vỡ kim của nạn nhân.',
      detail: 'Nạn nhân chết do nhát đâm sắc ngọt từ phía sau gáy làm đứt tủy sống cổ. Mảnh kim loại tìm thấy trong đốt sống cổ trùng khớp với vết mẻ trên dao găm EVD-204. Kim đồng hồ dừng lại ở 01:35.',
      foundAt: 'loc-barge',
      relatedTo: ['char-bang'],
      isKey: true
    },
    {
      id: 'EVD-206',
      name: 'Vết Máu Bị Lau Chùi Dở Trên Boong',
      type: 'forensic',
      description: 'Dấu vết phản ứng phát quang Luminol trên sàn boong sà lan.',
      detail: 'Hiện trường cho thấy thi thể bị kéo lê từ cửa buồng lái ra mép mạn thuyền trước khi bị hất xuống sông. Kẻ thủ ác đã dùng giẻ tẩm dầu diesel để xóa vết máu nhưng không kịp lau sạch hoàn toàn.',
      foundAt: 'loc-barge',
      relatedTo: ['char-lam'],
      isKey: false
    }
  ],
  timeline: [
    {
      id: 't2-1',
      time: '01:00',
      event: 'Sà lan SG-0419 cập cầu cảng bến Bạch Đằng giữa cơn mưa lớn',
      source: 'Sổ hải trình',
      verified: true
    },
    {
      id: 't2-2',
      time: '01:30',
      event: 'Tiếng động cơ máy nổ sà lan tắt đột ngột',
      source: 'Lời khai dân bến tàu',
      verified: true
    },
    {
      id: 't2-3',
      time: '01:35',
      event: 'Nạn nhân bị đâm tử vong, đồng hồ Poljot vỡ kim khi rơi xuống nước',
      source: 'Giám định pháp y EVD-205',
      verified: true
    },
    {
      id: 't2-4',
      time: '01:40',
      event: 'Gã đàn ông trùm áo mưa vào quán chị Mai mua bao thuốc 555',
      source: 'Lời khai chị Mai EVD-203',
      verified: true
    },
    {
      id: 't2-5',
      time: '05:30',
      event: 'Đội tuần tra đường sông phát hiện thi thể dạt vào bờ kè',
      source: 'Biên bản tin báo tội phạm',
      verified: true
    }
  ],
  solution: {
    culpritId: 'char-bang',
    motive: 'Thanh trừng tài công Lê Văn Tài để bịt đầu mối tống tiền về đường dây buôn lậu bo mạch và rửa tiền của Minh Phát Holdings',
    method: 'Dùng dao găm đặc nhiệm đâm đứt tủy sống cổ nạn nhân từ phía sau trên boong sà lan lúc 01:35, ném xác xuống sông và lau chùi dấu vết bằng dầu diesel',
    keyEvidenceIds: ['EVD-201', 'EVD-203', 'EVD-204', 'EVD-205'],
    questions: [
      {
        id: 'q2-1',
        question: 'Ai là thủ phạm đã hạ sát tài công Lê Văn Tài trên sà lan SG-0419?',
        points: 35,
        options: [
          { id: 'q2-1-a', text: 'Thợ máy Lâm Chột vì tranh chấp tiền bán linh kiện chợ trời', isCorrect: false },
          { id: 'q2-1-b', text: 'Vũ Trọng Bằng theo chỉ đạo thanh trừng bịt đầu mối của tổ chức', isCorrect: true },
          { id: 'q2-1-c', text: 'Chủ quán nước Bùi Thị Mai vì món nợ tiền mua số đề', isCorrect: false }
        ]
      },
      {
        id: 'q2-2',
        question: 'Vũ khí thực sự được hung thủ sử dụng gây án và phi tang ở đâu?',
        points: 35,
        options: [
          { id: 'q2-2-a', text: 'Dao găm đặc nhiệm bị mẻ mũi giấu dưới khoang máy sà lan', isCorrect: true },
          { id: 'q2-2-b', text: 'Đoạn xích sắt neo tàu vứt xuống đáy sông Sài Gòn', isCorrect: false },
          { id: 'q2-2-c', text: 'Cờ lê cơ khí của thợ máy trong tủ đồ nghề kho số 3', isCorrect: false }
        ]
      },
      {
        id: 'q2-3',
        question: 'Bằng chứng then chốt nào kết nối kẻ thủ ác ở Bến Bạch Đằng với Vụ án Căn hộ 507?',
        points: 30,
        options: [
          { id: 'q2-3-a', text: 'Đôi giày da sĩ quan rãnh kim cương trùng khớp vết chân ban công và dấu vân tay trên bao thuốc 555', isCorrect: true },
          { id: 'q2-3-b', text: 'Tờ giấy hẹn ăn trưa tại quán cà phê đường Pasteur', isCorrect: false },
          { id: 'q2-3-c', text: 'Cùng sử dụng loại thuốc ngủ Zolpidem để đầu độc', isCorrect: false }
        ]
      }
    ]
  },
  hiddenObjective: {
    id: 'hidden-majestic-lead',
    title: 'Manh Mối Mật HĐ-MAJ-302',
    description: 'Khám phá trang cuối cuốn sổ hải trình để tìm ra đầu mối tài chính tiếp theo của mạng lưới ngầm',
    requiredClues: ['EVD-202'],
    unlockedStory: `Dòng ghi chú bút dạ trên trang cuối cuốn sổ hải trình của Lê Văn Tài:
"Lô hàng mật SG-0419 thanh toán qua TK Ngoại Thương. Liên hệ Hoàng Thục Trinh - HĐ-MAJ-302".

Hoàng Thục Trinh — Kế toán trưởng Ngân hàng Ngoại thương, người nắm toàn bộ chứng từ chuyển tiền ủy thác của Minh Phát Holdings! Hiện cô đang thuê phòng 302 tại Khách sạn Majestic ven sông Sài Gòn...`
  }
};
