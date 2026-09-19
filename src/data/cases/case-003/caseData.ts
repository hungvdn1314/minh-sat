import { CaseData } from '../../../types/case';

export const CASE_003_DATA: CaseData = {
  id: 'case-003',
  docketNumber: '#703/CSHS-ĐT',
  title: 'Bản Báo Cáo Cháy Dở Tại Majestic',
  subtitle: 'Vụ bắt cóc nữ kế toán trưởng ngân hàng',
  difficulty: 4,
  estimatedTime: 25,
  victim: {
    name: 'Hoàng Thục Trinh',
    age: 32,
    role: 'Kế toán trưởng Ngân hàng Ngoại thương kiêm kế toán Minh Phát Holdings'
  },
  briefing: `Đêm ngày 5 tháng 10, chuông báo động réo vang tại Khách sạn Majestic — công trình kiến trúc Pháp cổ kính bên bờ sông Sài Gòn. Căn phòng hạng sang số 302 bị lục tung tan hoang, cửa phòng mở toang, vali du lịch bị rạch khóa. Trong bồn tắm, một tập tài liệu dày đã bị thiêu rụi thành tro tàn.

Nạn nhân Hoàng Thục Trinh (32 tuổi), nữ kế toán trưởng Ngân hàng Ngoại thương, đã biến mất không dấu vết. Tại hiện trường, có những vệt máu nhỏ giọt kéo dài dọc hành lang kỹ thuật dẫn xuống cửa thoát hiểm nhân viên phía sau khách sạn. Bạn nhận lệnh bước vào khách sạn Majestic để truy tìm tung tích của người phụ nữ nắm giữ huyết mạch tài chính của "Người Giữ Sổ".`,
  locations: [
    {
      id: 'loc-suite302',
      name: 'Phòng Suite 302',
      subtitle: 'Hiện Trường Bắt Cóc Phòng Pháp Cổ',
      description: 'Căn phòng suite sàn gỗ dầu bóng loáng nhìn ra bến sông. Cửa sổ mở toang đón gió mưa, mùi khói giấy cháy khét lẹt xộc vào mũi.',
      type: 'crime_scene',
      mapPosition: { x: 340, y: 220 },
      has3DScene: false,
      isUnlocked: true,
      interactions: [
        {
          id: 'act-bathtub',
          title: 'Khám xét đống tro tàn trong bồn tắm',
          description: 'Những mảnh giấy cháy xém màu đen còn bốc khói mỏng trong bồn tắm sứ trắng.',
          evidenceId: 'EVD-301',
          hasPuzzle: true
        },
        {
          id: 'act-luggage',
          title: 'Kiểm tra vali du lịch bị rạch nát',
          description: 'Chiếc vali da cá sấu đắt tiền bị xé toạc lớp vải lót bên trong.',
          evidenceId: 'EVD-306'
        },
        {
          id: 'act-door',
          title: 'Xem xét ổ khóa cửa phòng 302',
          description: 'Lẫy khóa đồng thau có dấu hiệu bị vặn mở bằng chìa khóa vạn năng từ bên ngoài.',
          evidenceId: 'EVD-304'
        },
        {
          id: 'act-blood-handle',
          title: 'Thu thập vết máu trên cửa thoát hiểm',
          description: 'Những giọt máu khô vương vãi trên tay nắm cửa dẫn ra thang máy vận chuyển đồ giặt ủi.',
          evidenceId: 'EVD-305'
        }
      ]
    },
    {
      id: 'loc-lobby-majestic',
      name: 'Quầy Bar & Sảnh Khách Sạn',
      subtitle: 'Khu Vực Tiếp Tân Cổ Điển',
      description: 'Tiếng nhạc jazz máy đĩa than lạo xạo phát ra từ góc quầy bar ốp gỗ gụ. Nhân viên khách sạn xì xào hoang mang sau vụ việc đêm qua.',
      type: 'public',
      mapPosition: { x: 580, y: 410 },
      has3DScene: false,
      isUnlocked: true,
      interactions: [
        {
          id: 'act-talk-nam',
          title: 'Thẩm vấn Jean-Pierre Nam (Quản lý ca đêm)',
          description: 'Người đàn ông lai Pháp lịch lãm trong bộ âu phục chỉnh tề, nhưng gò má dặm một lớp phấn dày bất thường.',
          characterId: 'char-nam'
        },
        {
          id: 'act-talk-truc',
          title: 'Thẩm vấn Trần Thanh Trúc (Phục vụ phòng)',
          description: 'Cô gái trẻ mặc đồng phục tạp vụ khách sạn, đôi mắt ngơ ngác sợ sệt.',
          characterId: 'char-truc'
        },
        {
          id: 'act-scratch',
          title: 'Quan sát vết xước trên mặt quản lý Nam',
          description: 'Vết cào xước móng tay sâu hoắm trên gò má phải được che đậy vụng về bằng phấn trang điểm.',
          evidenceId: 'EVD-302'
        },
        {
          id: 'act-lipstick',
          title: 'Kiểm tra thùng xe giặt là nhân viên',
          description: 'Một thỏi son ngoại nhập đắt tiền rơi kẹt trong hộc vải xe giặt là.',
          evidenceId: 'EVD-303'
        }
      ]
    }
  ],
  characters: [
    {
      id: 'char-nam',
      name: 'Jean-Pierre Nam',
      role: 'Quản Lý Trưởng Ca Đêm',
      age: 48,
      avatar: '/assets/images/characters/nam_neutral.jpg',
      description: 'Quản lý lâu năm tại Majestic, nói tiếng Pháp lưu loát, bề ngoài lịch thiệp nhưng ngập trong nợ nần cờ bạc tại các sòng bạc Campuchia.',
      secret: 'Đặc tình ngầm của Người Giữ Sổ. Đã dùng chìa khóa Master Key mở cửa phòng 302, khống chế ép Trinh đốt tài liệu rồi bàn giao cho chiếc xe Lada đen.',
      alibi: 'Khai luôn ngồi ở quầy lễ tân điều hành kiểm toán sổ sách khách sạn từ 22h00 đến sáng.',
      isUnlocked: true,
      testimonies: [
        {
          level: 1,
          title: 'Báo cáo tiếp nhận phòng của khách',
          content: 'Cô Trinh thuê phòng 302 từ chiều hôm qua, trông cô ấy rất mệt mỏi và yêu cầu tuyệt đối không ai được làm phiền. Tôi ở quầy sảnh suốt đêm không thấy có tiếng động bất thường nào.',
          isUnlocked: true
        },
        {
          level: 2,
          title: 'Thanh minh về vết cào trên gò má',
          content: 'Vết xước này... à... chiều qua tôi chơi đùa với con mèo Ba Tư của khách gửi ở quầy nên bị nó quào trúng thôi! Thám tử đừng suy diễn lung tung!',
          unlockCondition: 'EVD-302',
          isUnlocked: false
        },
        {
          level: 3,
          title: 'Thú nhận âm mưu bắt cóc áp giải',
          content: 'Đừng... đừng đưa tôi ra tòa! (Nam sụp xuống mép quầy bar, mồ hôi làm nhòe lớp phấn trên mặt)... Tôi nợ sòng bài Phnom Penh hơn ba mươi ngàn đô la... Người Giữ Sổ hứa sẽ xóa sạch nợ nếu tôi giúp họ lấy lại Quyển Sổ Cái từ tay Trinh trước khi cô ta lên tàu sang Pháp! Tôi mở cửa, ép cô ta đốt tài liệu trong bồn tắm rồi trói cô ta đẩy xuống cửa sau đưa lên xe Lada đen chở về Chợ Lớn! Tôi thề cô ta vẫn còn sống!',
          unlockCondition: 'EVD-304',
          isUnlocked: false
        }
      ]
    },
    {
      id: 'char-truc',
      name: 'Trần Thanh Trúc',
      role: 'Nhân Viên Phục Vụ Phòng',
      age: 22,
      avatar: '/assets/images/characters/truc_neutral.jpg',
      description: 'Phục vụ dọn phòng ca tối, nhút nhát, có thói quen tò mò về đồ dùng sang trọng của khách thuê phòng.',
      secret: 'Đã lén nhặt thỏi son Chanel rơi trong phòng của Trinh. Thấy chiếc xe Lada đen biển số ngoại giao đón người ở cửa sau lúc 23h05.',
      alibi: 'Đang đẩy xe giặt ủi gom khăn tắm ở các tầng.',
      isUnlocked: true,
      testimonies: [
        {
          level: 1,
          title: 'Lời khai về ca trực dọn phòng',
          content: 'Dạ... tối qua em chỉ đi gom ga giường với khăn tắm thôi anh. Em không dám lên tầng 3 vì quản lý Nam dặn phòng 302 là khách VIP không được gõ cửa.',
          isUnlocked: true
        },
        {
          level: 2,
          title: 'Nhân chứng chiếc xe Lada đen bí ẩn',
          content: 'Em xin lỗi! Thỏi son đó là em thấy rơi dưới thảm nên lượm cất giùm thôi chứ em không ăn cắp! Tối qua lúc 23h05 em đang gom đồ dưới cửa sau thì thấy ông Nam đẩy một cái thùng giặt rất nặng ra ngoài. Có một chiếc ô tô Lada màu đen biển số ngoại giao đậu sẵn ở đó. Hai người đàn ông mặc đồ đen bước xuống khiêng người trong thùng bỏ vô băng ghế sau rồi rồ ga phóng đi!',
          unlockCondition: 'EVD-303',
          isUnlocked: false
        }
      ]
    }
  ],
  evidence: [
    {
      id: 'EVD-301',
      name: 'Tờ Giấy Than Kẹp Trong Từ Điển Pháp-Việt',
      type: 'document',
      description: 'Tờ giấy than (carbon paper) màu xanh mực kẹp trong cuốn từ điển trên kệ sách phòng 302.',
      detail: 'Hoàng Thục Trinh đã nhanh trí giấu tờ giấy than lót dưới bản đánh máy tài liệu trước khi bị ép đốt sổ sách. Khi chiếu nghiêng dưới đèn bàn, nổi lên dãy số tài khoản ngân hàng Thụy Sĩ và dòng chữ: "Biệt Thự Bạch Hoa, 88 Châu Văn Liêm, Chợ Lớn".',
      foundAt: 'loc-suite302',
      relatedTo: ['char-nam'],
      isKey: true
    },
    {
      id: 'EVD-302',
      name: 'Vết Cào Móng Tay Trên Gò Má Nam',
      type: 'forensic',
      description: 'Ba vệt cào xước song song trên gò má phải của Jean-Pierre Nam.',
      detail: 'Kết quả soi mẫu da dưới móng tay bị gãy của Hoàng Thục Trinh tìm thấy tại hiện trường có chứa tế bào biểu bì trùng khớp 100% với ADN của Jean-Pierre Nam.',
      foundAt: 'loc-lobby-majestic',
      relatedTo: ['char-nam'],
      isKey: true
    },
    {
      id: 'EVD-303',
      name: 'Thỏi Son Chanel Rơi Ở Hộc Xe Giặt',
      type: 'object',
      description: 'Thỏi son môi Pháp của Hoàng Thục Trinh tìm thấy trong giỏ đồ dọn phòng.',
      detail: 'Màu son môi đỏ thẫm đắt tiền có khắc tên viết tắt "H.T.T" trên thân vỏ kim loại. Giúp bẻ gãy lời khai quanh co của nhân viên phục vụ phòng Thanh Trúc.',
      foundAt: 'loc-lobby-majestic',
      relatedTo: ['char-truc'],
      isKey: true
    },
    {
      id: 'EVD-304',
      name: 'Chìa Khóa Master Key Dính Sợi Chỉ Lụa Xanh',
      type: 'object',
      description: 'Chùm chìa khóa vạn năng của quản lý Nam.',
      detail: 'Lẫy chìa khóa mở phòng 302 bị dính một sợi chỉ tơ lụa màu xanh cổ vịt — chất liệu của chiếc áo ngủ mà Hoàng Thục Trinh đang mặc đêm xảy ra vụ việc.',
      foundAt: 'loc-suite302',
      relatedTo: ['char-nam'],
      isKey: true
    },
    {
      id: 'EVD-305',
      name: 'Vết Máu Nhóm AB Trên Cửa Thoát Hiểm',
      type: 'forensic',
      description: 'Dấu vết máu khô dính trên thanh gạt cửa thoát hiểm nhân viên tầng trệt.',
      detail: 'Trùng khớp với nhóm máu hiếm AB của Hoàng Thục Trinh. Chứng minh nạn nhân bị thương và bị lôi kéo ra lối cửa sau của khách sạn chứ không phải tự ý rời đi.',
      foundAt: 'loc-suite302',
      relatedTo: ['char-nam'],
      isKey: false
    },
    {
      id: 'EVD-306',
      name: 'Hộ Chiếu & Vé Tàu Đi Marseille',
      type: 'document',
      description: 'Hộ chiếu mang tên Hoàng Thục Trinh và vé tàu biển viễn dương giấu trong đáy vali.',
      detail: 'Vé tàu xuất bến lúc 06h00 sáng ngày 06/10 đi Pháp. Chứng minh nạn nhân đang chuẩn bị một cuộc đào tẩu đào thoát khỏi sự săn lùng của tổ chức ngầm.',
      foundAt: 'loc-suite302',
      relatedTo: [],
      isKey: false
    }
  ],
  timeline: [
    {
      id: 't3-1',
      time: '18:00',
      event: 'Hoàng Thục Trinh nhận phòng 302 mang theo vali tài liệu bí mật',
      source: 'Sổ lễ tân khách sạn',
      verified: true
    },
    {
      id: 't3-2',
      time: '22:30',
      event: 'Jean-Pierre Nam dùng Master Key đột nhập phòng 302',
      source: 'Vết chìa khóa EVD-304',
      verified: true
    },
    {
      id: 't3-3',
      time: '22:45',
      event: 'Trinh chống cự quyết liệt, cào rách mặt Nam và lén giấu tờ giấy than',
      source: 'Vết cào EVD-302',
      verified: true
    },
    {
      id: 't3-4',
      time: '23:00',
      event: 'Tập tài liệu bị ép đốt cháy trong bồn tắm phòng 302',
      source: 'Hiện trường bồn tắm EVD-301',
      verified: true
    },
    {
      id: 't3-5',
      time: '23:05',
      event: 'Chiếc xe Lada đen biển số ngoại giao áp giải Trinh rời cửa sau',
      source: 'Lời khai nhân viên Trúc',
      verified: true
    }
  ],
  solution: {
    culpritId: 'char-nam',
    motive: 'Bắt cóc Hoàng Thục Trinh và thu hồi Quyển Sổ Cái theo lệnh của Người Giữ Sổ để đổi lấy việc xóa sạch món nợ cờ bạc 30.000 USD',
    method: 'Dùng chìa khóa tổng Master Key đột nhập phòng 302, khống chế nạn nhân, ép đốt hồ sơ trong bồn tắm và áp giải xuống thùng xe giặt đưa lên ô tô tẩu thoát',
    keyEvidenceIds: ['EVD-301', 'EVD-302', 'EVD-304', 'EVD-305'],
    questions: [
      {
        id: 'q3-1',
        question: 'Ai là kẻ đã đột nhập và khống chế kế toán trưởng Hoàng Thục Trinh tại phòng 302?',
        points: 35,
        options: [
          { id: 'q3-1-a', text: 'Quản lý ca đêm Jean-Pierre Nam dùng chìa khóa vạn năng Master Key', isCorrect: true },
          { id: 'q3-1-b', text: 'Nhân viên phục vụ phòng Trần Thanh Trúc vì lòng tham thỏi son', isCorrect: false },
          { id: 'q3-1-c', text: 'Nạn nhân tự dàn cảnh bắt cóc để trốn vé tàu sang Marseille', isCorrect: false }
        ]
      },
      {
        id: 'q3-2',
        question: 'Bằng chứng vật lý nào vạch trần trực tiếp sự dối trá của Jean-Pierre Nam về vết thương trên mặt?',
        points: 35,
        options: [
          { id: 'q3-2-a', text: 'Mẫu biểu bì dưới móng tay gãy của nạn nhân khớp vết cào trên gò má và sợi chỉ lụa dính trên Master Key', isCorrect: true },
          { id: 'q3-2-b', text: 'Hóa đơn mua thuốc lá ba số 555 tại quầy bar', isCorrect: false },
          { id: 'q3-2-c', text: 'Đôi giày da rãnh kim cương để lại dấu chân bùn trên thảm', isCorrect: false }
        ]
      },
      {
        id: 'q3-3',
        question: 'Nạn nhân Hoàng Thục Trinh đã giấu bí mật về tọa độ của Người Giữ Sổ bằng cách nào?',
        points: 30,
        options: [
          { id: 'q3-3-a', text: 'Khắc số tài khoản lên mặt sau tấm gương trong bồn tắm', isCorrect: false },
          { id: 'q3-3-b', text: 'Lén kẹp tờ giấy than ghi lại dòng in máy chữ vào cuốn từ điển Pháp-Việt trên kệ sách', isCorrect: true },
          { id: 'q3-3-c', text: 'Nuốt mảnh giấy ghi mã số két sắt vào trong bụng', isCorrect: false }
        ]
      }
    ]
  },
  hiddenObjective: {
    id: 'hidden-bach-hoa-mansion',
    title: 'Giải Mã Tọa Độ Biệt Thự Bạch Hoa',
    description: 'Soi tờ giấy than dưới ánh đèn nghiêng để tìm ra hang ổ tối thượng của Người Giữ Sổ',
    requiredClues: ['EVD-301'],
    unlockedStory: `Chiếu nghiêng tờ giấy than EVD-301 dưới ánh đèn bàn:
Dòng chữ in hằn vết ruy-băng máy đánh máy hiện rõ mồn một:
"Tài khoản ủy thác UBS Zurich: ACC-7709-CH // Chủ tài khoản: Lý Gia Khang.
Địa điểm dạ tiệc: Biệt Thự Bạch Hoa, Số 88 Đường Châu Văn Liêm, Chợ Lớn (Quận 5)".

Người Giữ Sổ đã lộ diện: Lý Gia Khang — Chủ tịch Hội đồng Liên hiệp Ngoại thương! 
Đêm nay, toàn bộ giới thượng lưu và mạng lưới kinh tế ngầm đang tề tựu tại Biệt thự Bạch Hoa...`
  }
};
