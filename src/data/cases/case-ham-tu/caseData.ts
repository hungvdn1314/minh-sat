import { CaseData } from '../../../types/case';

export const CASE_HAM_TU_DATA: CaseData = {
  id: 'case-ham-tu',
  docketNumber: '#905/CSHS-ĐT',
  title: 'Ác Mộng Bến Hàm Tử',
  subtitle: 'Kỳ Án Phòng Kín Tiệm Kim Hoàn Vạn Lợi (Saigon 1989)',
  difficulty: 5,
  estimatedTime: 50,
  victim: {
    name: 'Lương Vĩnh Phát',
    age: 62,
    role: 'Chủ tiệm kim hoàn Vạn Lợi & Trùm ký gửi vàng lá ngầm Chợ Lớn'
  },
  briefing: `Đêm ngày 24 tháng 10 năm 1989, cơn bão nhiệt đới số 7 quét qua Sài Gòn, mưa như thác đổ trút xuống dòng kênh Tàu Hủ. Toàn bộ khu vực Bến Hàm Tử (Quận 5 - Chợ Lớn) bị mất điện diện rộng từ 21h00 đến 22h30.

Lúc 22h35, tiếng thét kinh hoàng vang lên từ Tiệm Kim Hoàn Vạn Lợi. Cảnh sát hình sự phá cửa lim dày 5cm bị khóa chặt chốt ngang bằng then đồng từ bên trong để bước vào thư phòng tầng 2. Gia chủ Lương Vĩnh Phát (62 tuổi) đã chết gục trên ghế bành gỗ trắc.

Cửa ra vào then cài trong, cửa sổ chốt trong dán băng keo nguyên vẹn, chìa khóa duy nhất nằm trong túi áo nạn nhân. Một hiện trường phòng kín bất khả xâm phạm. 100 lượng vàng lá Kim Thành trong két sắt biến mất, ấm trà sen vẫn còn bốc khói ấm, và trên bàn cờ Tướng chỉ còn trơ trọi một quân Hắc Tướng bị cưa đôi...`,

  locations: [
    {
      id: 'loc-hamtu-floor2',
      name: 'Thư Phòng Án Mạng (Tầng 2)',
      subtitle: 'Hiện Trường Phòng Kín Bất Khả Xâm Phạm',
      description: 'Căn phòng bài trí đồ gỗ trắc cổ điển, gian thờ gia tộc nghi ngút khói nhang. Cửa gỗ lim then cài đồng khóa chốt trong, cửa sổ kính dán băng keo chống bão nguyên vẹn nhìn ra dòng kênh Tàu Hủ cuộn sóng.',
      type: 'crime_scene',
      mapPosition: { x: 380, y: 220 },
      has3DScene: true,
      isUnlocked: true,
      interactions: [
        {
          id: 'act-ht-victim',
          title: 'Khám nghiệm tử thi Lương Vĩnh Phát',
          description: 'Nạn nhân ngồi gục trên ghế bành, cổ có vết siết bầm tím hình vòng cung kép kỳ lạ.',
          evidenceId: 'EVD-HT-01',
          hasPuzzle: true
        },
        {
          id: 'act-ht-door',
          title: 'Giám định cánh cửa lim & Then cài đồng',
          description: 'Then cài bằng đồng nguyên khối nằm gọn trong ngàm khóa. Dưới khe cửa sàn gỗ có vật lạ.',
          evidenceId: 'EVD-HT-02',
          hasPuzzle: true
        },
        {
          id: 'act-ht-chess',
          title: 'Kiểm tra bàn cờ Tướng & Quân Hắc Tướng',
          description: 'Quân cờ Tướng bằng ngà voi bị cưa đôi chính xác, bên trong rỗng ruột.',
          evidenceId: 'EVD-HT-03'
        },
        {
          id: 'act-ht-teapot',
          title: 'Giám định ấm trà sen bốc hơi ấm',
          description: 'Ấm trà bằng đồng tráng men vẫn còn nóng ấm sau hơn 2 tiếng mất điện trong đêm mưa bão.',
          evidenceId: 'EVD-HT-04'
        },
        {
          id: 'act-ht-cassette',
          title: 'Soi đèn gầm bàn thờ tìm máy cassette',
          description: 'Chiếc máy cassette Sony TCM nhỏ giấu sau chân bàn thờ có sợi cước trong suốt nối vào tay nắm cửa.',
          evidenceId: 'EVD-HT-05'
        },
        {
          id: 'act-ht-talk-lan',
          title: 'Thẩm vấn Trịnh Mỹ Lan (Vợ kế gia chủ)',
          description: 'Người phụ nữ trẻ 28 tuổi trong bộ sườn xám lụa đen, đôi mắt ngấn lệ nhưng thỉnh thoảng nhìn lén chiếc vali.',
          characterId: 'char-lan'
        }
      ]
    },
    {
      id: 'loc-hamtu-floor1',
      name: 'Xưởng Kim Hoàn & Lò Phân Kim (Tầng Lửng)',
      subtitle: 'Nơi Chế Tác Vàng Lá & Khắc Cơ Khí',
      description: 'Không gian nồng nặc mùi axit nitric và than đá. Bàn thợ cơ khí đầy kìm dũa, cưa lọng Thụy Sĩ và các khuôn đúc vàng thỏi Kim Thành.',
      type: 'crime_scene',
      mapPosition: { x: 380, y: 360 },
      has3DScene: true,
      isUnlocked: true,
      interactions: [
        {
          id: 'act-ht-saw',
          title: 'Kiểm tra bàn thợ & Cưa lọng của Thợ Chín',
          description: 'Chiếc cưa lọng kim hoàn số 0 siêu mảnh có dính mạt bụi màu trắng ngà hữu cơ.',
          evidenceId: 'EVD-HT-08'
        },
        {
          id: 'act-ht-chemicals',
          title: 'Lục soát kệ hóa chất & Hũ vôi sống',
          description: 'Kệ gỗ chứa axit phân kim, cuộn chỉ tơ tằm chuỗi ngọc và hũ vôi sống sấy khô giấu đáy ngăn kéo.',
          evidenceId: 'EVD-HT-09'
        },
        {
          id: 'act-ht-trash',
          title: 'Bới tìm trong sọt rác xưởng bạc',
          description: 'Mẩu giấy than cháy dở và bản dự thảo di chúc của nạn nhân bị xé góc dính mực tím.',
          evidenceId: 'EVD-HT-10'
        },
        {
          id: 'act-ht-talk-chin',
          title: 'Thẩm vấn Thợ Chín "Kính Lão" (Thợ bạc già)',
          description: 'Ông lão 58 tuổi mắt đeo kính lão dày cộm, ngồi dũa khuôn sáp bên bàn thợ xưởng phân kim.',
          characterId: 'char-chin'
        },
        {
          id: 'act-ht-talk-tuan',
          title: 'Thẩm vấn Lương Gia Tuấn (Con trai trưởng)',
          description: 'Gã đàn ông 34 tuổi mặc áo sơ mi cộc tay dính mực tím, khuôn mặt bồn chồn lo lắng nhìn đồng hồ.',
          characterId: 'char-tuan'
        }
      ]
    },
    {
      id: 'loc-hamtu-ground',
      name: 'Cửa Hàng Vàng & Bến Hàm Tử (Tầng Trệt)',
      subtitle: 'Quầy Giao Dịch & Sân Sau Ven Kênh',
      description: 'Tầng trệt có quầy thu ngân lồng sắt chống cướp, bàn cân cơ học thau, và cửa hậu dẫn ra bờ kè Bến Hàm Tử nơi mưa giông đang gầm rú.',
      type: 'public',
      mapPosition: { x: 380, y: 500 },
      has3DScene: true,
      isUnlocked: true,
      interactions: [
        {
          id: 'act-ht-shoes',
          title: 'Khám xét tủ giày & Đôi giày da của Tuấn',
          description: 'Đôi giày da sĩ quan dính đất sét đỏ đặc trưng của sới gà Mễ Cốc, bên trong lót giày có tờ giấy nợ máu.',
          evidenceId: 'EVD-HT-11'
        },
        {
          id: 'act-ht-peugeot',
          title: 'Kiểm tra xe máy Peugeot 50cc ở sân sau',
          description: 'Chiếc moped màu xanh rêu của Thanh tra Trần Quốc Đại có ống pô vẫn còn ấm nóng lúc 22h40.',
          evidenceId: 'EVD-HT-12'
        },
        {
          id: 'act-ht-talk-dai',
          title: 'Thẩm vấn Thiếu tá Trần Quốc Đại (Thanh tra thuế)',
          description: 'Viên chức thanh tra sắc sảo khoác áo măng tô ướt sũng, miệng ngậm tẩu thuốc lá Dunhill đắt tiền bên bờ kè Bến Hàm Tử.',
          characterId: 'char-dai'
        }
      ]
    }
  ],

  characters: [
    {
      id: 'char-tuan',
      name: 'Lương Gia Tuấn',
      role: 'Con trai trưởng & Quản lý tiệm vàng',
      age: 34,
      avatar: '/assets/images/characters/char_tuan.jpg',
      description: 'Con trai duy nhất của Lương Vĩnh Phát. Bề ngoài hào nhoáng nhưng lún sâu vào cờ bạc cá độ trường gà Bến Mễ Cốc.',
      secret: 'Đang nợ xã hội đen 200 lượng vàng. Chiều 24/10 bị cha phát hiện và dọa gạch tên khỏi di chúc thừa kế.',
      alibi: 'Khẳng định ở xưởng tầng lửng phân loại bạc vụn suốt từ 21h00. Nghe tiếng cha quát từ lầu hai lúc 21h45.',
      isUnlocked: true,
      testimonies: [
        {
          level: 1,
          title: 'Lời khai về ca làm việc đêm bão',
          content: 'Tôi ở dưới tầng lửng kiểm kê bạc vụn suốt đêm. Cúp điện nên tôi phải thắp đèn dầu. Ba tôi tính tình khó chịu, hễ cúp điện là giam mình trên lầu hai không cho ai quấy rầy.',
          isUnlocked: true
        },
        {
          level: 2,
          title: 'Về tiếng quát lúc 21h45 trên lầu hai',
          content: 'Lúc khoảng 21h45, tôi định mang sổ đối chiếu lên thì nghe tiếng ba tôi quát lớn: "Để đó rồi cút ra ngoài!". Nghĩ là mẹ kế đang bị mắng nên tôi sợ quá quay xuống xưởng ngay.',
          unlockCondition: 'EVD-HT-05',
          isUnlocked: false
        },
        {
          level: 3,
          title: 'Thú nhận về món nợ 200 lượng vàng & Bản di chúc bị xé',
          content: 'Tôi... tôi thừa nhận chiều nay có lên van xin ba cho tiền chuộc mạng! Ba tát tôi và viết di chúc tống cổ tôi ra đường. Lúc cúp điện tôi có lén lên lấy cắp bản di chúc rồi xé góc vứt vào sọt rác, nhưng thề có trời đất lúc đó ba tôi đã... đã không nhúc nhích rồi!',
          unlockCondition: 'EVD-HT-10',
          isUnlocked: false
        }
      ]
    },
    {
      id: 'char-lan',
      name: 'Trịnh Mỹ Lan',
      role: 'Vợ kế gia chủ (Cựu ca sĩ phòng trà)',
      age: 28,
      avatar: '/assets/images/characters/char_lan.jpg',
      description: 'Người vợ trẻ cưới được 3 năm, nổi tiếng sắc sảo ở các vũ trường Chợ Lớn nhưng bị giam lỏng trong tiệm vàng.',
      secret: 'Ngoại tình với viên phi công và chuẩn bị nửa đêm nay ôm vali chứa 100 cây vàng trốn lên tàu vượt biên sang Manila.',
      alibi: 'Mang trà sen lên lúc 21h15, bị chồng gắt gỏng đuổi ra rồi về phòng ngủ đóng cửa nghe nhạc đến tận lúc phát hiện án.',
      isUnlocked: true,
      testimonies: [
        {
          level: 1,
          title: 'Về bình trà sen đêm mưa',
          content: 'Tôi nấu nước sôi pha bình trà sen đưa lên cho ông Phát lúc 21h15. Ông ấy đang ngồi soi bàn cờ tướng, thấy tôi vào liền xua tay đuổi đi, bảo tối nay bận bàn chuyện làm ăn lớn.',
          isUnlocked: true
        },
        {
          level: 2,
          title: 'Về chiếc vali và vé tàu vượt biên',
          content: 'Phải, tôi định bỏ trốn! Sống với ông ta như ngục tù! Nhưng khi tôi lên lúc 21h15 thì két sắt âm tường đã mở toang từ bao giờ, 100 lượng vàng đã không cánh mà bay! Tôi hoảng quá chỉ dám giật lại mấy tấm ảnh rồi chạy về phòng!',
          unlockCondition: 'EVD-HT-07',
          isUnlocked: false
        },
        {
          level: 3,
          title: 'Về cây đàn Tỳ bà bị thay dây thép số 2',
          content: 'Cây đàn đó tôi để ở phòng khách tầng hai... Tuần trước ông Chín có mượn bảo để thay dây cho tôi, nhưng đến nay tôi đâu có đụng vào! Dây đàn số 2 biến đâu mất làm sao tôi biết được!',
          unlockCondition: 'EVD-HT-06',
          isUnlocked: false
        }
      ]
    },
    {
      id: 'char-chin',
      name: 'Trần Văn Chín (Thợ Chín "Kính Lão")',
      role: 'Thợ kim hoàn kỳ cựu (30 năm thâm niên)',
      age: 58,
      avatar: '/assets/images/characters/char_chin.jpg',
      description: 'Thợ bạc già bị lãng tai, tay run, cựu thợ tiện quân giới thời chiến. Cực kỳ trung thành với họ Lương bề ngoài.',
      secret: 'Con gái mang thai chết chìm trong chuyến tàu vượt biên bằng ghe mục của Lương Vĩnh Phát năm 1984. Mang mối thù diệt tộc 5 năm.',
      alibi: 'Ngồi giũa bạc dưới gầm cầu thang tầng trệt. Khẳng định cầu thang mọt gỗ hễ ai bước lên là kêu cọt kẹt, cả đêm không thấy ai lên lầu.',
      isUnlocked: true,
      testimonies: [
        {
          level: 1,
          title: 'Về vị trí ngồi làm việc dưới chân cầu thang',
          content: 'Tôi già rồi, tai lãng mắt mờ. Tối nay tôi ngồi dưới gầm cầu thang dũa bạc. Cầu thang này bậc số 5 bị mọt, ai giẫm lên cũng kêu cót két. Từ 21h đến 22h30 cúp điện tối om, tôi thề không có ma nào bước chân lên lầu hai cả!',
          isUnlocked: true
        },
        {
          level: 2,
          title: 'Giải thích về bụi ngà trên khung cưa lọng',
          content: 'Cưa lọng của thợ bạc thì dính bụi bạc bụi đồng, làm sao có bụi ngà voi? ...À, có thể tuần trước ông chủ bảo tôi gọt lại mấy quân cờ Tướng bị sứt mẻ...',
          unlockCondition: 'EVD-HT-08',
          isUnlocked: false
        },
        {
          level: 3,
          title: 'Bị bẻ gãy bởi mẩu chỉ sáp kẹt cửa & Vết siết dây đàn',
          content: '(Run rẩy làm rơi kính lão) Lương Vĩnh Phát... nó là con quỷ hút máu! Năm 1984 con gái tôi quỳ lạy đưa nó 5 cây vàng để mua chỗ lên tàu, nó lại nhét con tôi vào chiếc ghe mục nát chìm nghỉm ở Cần Giờ! Tối nay nó bắt tôi nấu chảy 100 lượng vàng máu rồi đuổi tôi ra đường... Nó phải đền mạng cho con tôi!',
          unlockCondition: 'EVD-HT-02',
          isUnlocked: false
        }
      ]
    },
    {
      id: 'char-dai',
      name: 'Trần Quốc Đại',
      role: 'Thanh tra kinh tế & Khách VIP đêm bão',
      age: 46,
      avatar: '/assets/images/characters/char_dai.jpg',
      description: 'Sĩ quan thanh tra sắc bén, mối quan hệ chính trị phức tạp, người bảo kê cho đường dây vàng lậu Chợ Lớn.',
      secret: 'Là tay trong của Người Giữ Sổ, đến đòi lại cuốn sổ ghi chép các khoản hối lộ bằng vàng trước khi đoàn thanh tra trung ương ập vào.',
      alibi: 'Đến uống nước lúc 20h30, 21h00 cúp điện thì lấy áo mưa chào ra về ngay bằng cửa sau.',
      isUnlocked: true,
      testimonies: [
        {
          level: 1,
          title: 'Về mục đích chuyến viếng thăm đêm bão',
          content: 'Tôi ghé qua để bàn về thủ tục cấp phép chuyển đổi ngoại tệ của quận. 21h00 cúp điện nên chúng tôi hoãn buổi làm việc. Tôi khoác áo mưa dắt xe ra về lúc 21h05, có ông Chín nhìn thấy.',
          isUnlocked: true
        },
        {
          level: 2,
          title: 'Giải thích về chiếc xe máy Peugeot pô còn ấm lúc 22h40',
          content: 'Đêm bão đường ngập bu-gi ướt nên tôi phải dắt xe trú tạm ở quán nước đầu hẻm Hàm Tử! Tôi là cán bộ nhà nước, các anh không có quyền vu khống!',
          unlockCondition: 'EVD-HT-12',
          isUnlocked: false
        },
        {
          level: 3,
          title: 'Về cuốn sổ hối lộ & Mạng lưới "Người Giữ Sổ"',
          content: 'Các người... đừng nghĩ bắt được Thợ Chín là xong! Cả cái đất Chợ Lớn này nằm dưới chân "Người Giữ Sổ". 100 cây vàng hay mạng của lão Phát cũng chỉ là hạt cát trong dòng tiền mà thôi...',
          unlockCondition: 'EVD-HT-14',
          isUnlocked: false
        }
      ]
    }
  ],

  evidence: [
    {
      id: 'EVD-HT-01',
      name: 'Vết Hằn Khí Quản Kép & Nhiệt Độ Tử Thi',
      type: 'forensic',
      description: 'Tử thi Lương Vĩnh Phát ngồi gục trên ghế bành gỗ trắc.',
      detail: 'Cổ có rãnh bầm tím kép rộng chính xác 0.8mm, không xơ vải. Nhiệt độ gan và độ co cứng xác thực nạn nhân đã tử vong từ khoảng 20h45 (trước thời điểm mất điện 15 phút), mâu thuẫn hoàn toàn với tiếng quát lúc 21h45!',
      foundAt: 'loc-hamtu-floor2',
      relatedTo: ['char-chin', 'char-tuan'],
      isKey: true
    },
    {
      id: 'EVD-HT-02',
      name: 'Mẩu Chỉ Tơ Tằm Tẩm Sáp Ở Khe Cửa',
      type: 'object',
      description: 'Mẩu chỉ dài 4cm màu vàng mật ong kẹt dưới nẹp sàn gỗ sát then cài cửa lim.',
      detail: 'Sợi chỉ tơ tằm chuỗi ngọc kim hoàn tẩm sáp ong chịu lực 40kg. Vết đứt có cạnh nham nhở do ma sát mạnh vào mép sắc của then đồng khi bị giật rút từ bên ngoài hành lang.',
      foundAt: 'loc-hamtu-floor2',
      relatedTo: ['char-chin'],
      isKey: true
    },
    {
      id: 'EVD-HT-03',
      name: 'Quân Cờ Hắc Tướng Cưa Đôi',
      type: 'object',
      description: 'Quân cờ Tướng bằng ngà voi nguyên khối bị cưa đứt đôi đặt giữa bàn cờ.',
      detail: 'Mặt cắt siêu mịn dưới 0.3mm do cưa lọng chuyên dụng cắt. Bên trong khoang rỗng chứa một cuộn vi phim Microfilm siêu nhỏ được bọc sáp chống ẩm.',
      foundAt: 'loc-hamtu-floor2',
      relatedTo: ['char-chin', 'char-dai'],
      isKey: true
    },
    {
      id: 'EVD-HT-04',
      name: 'Ấm Trà Sen Tỏa Nhiệt Bằng Vôi Sống (CaO)',
      type: 'forensic',
      description: 'Ấm trà bằng đồng 2 đáy vẫn nóng 48°C sau hơn 2 tiếng mất điện.',
      detail: 'Đáy ấm có khoang ngầm chứa túi bột vôi sống (CaO) bọc màng sáp mỏng. Khi nước nóng làm tan sáp, phản ứng tỏa nhiệt giữ ấm kéo dài nhằm ngụy tạo thời điểm nạn nhân còn sống!',
      foundAt: 'loc-hamtu-floor2',
      relatedTo: ['char-chin', 'char-lan'],
      isKey: true
    },
    {
      id: 'EVD-HT-05',
      name: 'Máy Cassette Sony TCM Nối Dây Cước Cửa',
      type: 'digital',
      description: 'Chiếc máy thâu âm mini giấu kín sau bàn thờ tầng 2.',
      detail: 'Băng Maxell tua đúng giây 14:20 ghi âm tiếng ông Phát quát tháo. Nút PLAY được móc sợi cước trong suốt dẫn sang then cửa phòng bà Lan; khi bà Lan mở cửa lúc 21h45, máy tự động phát tiếng hét giả!',
      foundAt: 'loc-hamtu-floor2',
      relatedTo: ['char-chin', 'char-lan', 'char-tuan'],
      isKey: true
    },
    {
      id: 'EVD-HT-06',
      name: 'Dây Đàn Tỳ Bà Số 2 & Bột Nhựa Thông',
      type: 'object',
      description: 'Cây đàn Tỳ bà cổ treo trên vách phòng ngủ tầng 2.',
      detail: 'Dây đàn số 2 bằng cước thép kép 0.8mm mới được thay thế. Hộp đàn chứa bột nhựa thông (rosin) có thành phần hóa học trùng khớp 100% tinh thể thu được trên vết siết cổ nạn nhân.',
      foundAt: 'loc-hamtu-floor2',
      relatedTo: ['char-chin', 'char-lan'],
      isKey: true
    },
    {
      id: 'EVD-HT-07',
      name: 'Vali Hộ Chiếu Giả & Vé Tàu Vượt Biên',
      type: 'document',
      description: 'Vali da giấu dưới gầm giường phòng ngủ của Trịnh Mỹ Lan.',
      detail: 'Chứa 2 cuốn hộ chiếu giả mang tên Nguyễn Văn Hùng và Trần Thị Mai cùng vé tàu biển vượt biên đêm 25/10. Chứng minh Mỹ Lan chuẩn bị ôm vàng bỏ trốn nhưng không phải kẻ sát nhân.',
      foundAt: 'loc-hamtu-floor2',
      relatedTo: ['char-lan'],
      isKey: false
    },
    {
      id: 'EVD-HT-08',
      name: 'Khung Cưa Lọng Kim Hoàn Số 0 Của Thợ Chín',
      type: 'object',
      description: 'Chiếc cưa lọng thép Thụy Sĩ đặt trên bàn thợ tầng lửng.',
      detail: 'Lưỡi cưa siêu mảnh 0.25mm. Kẽ răng cưa còn dính mạt ngà voi hữu cơ và dấu vân tay của Trần Văn Chín, trùng khớp mặt cắt của quân Hắc Tướng trên bàn cờ án mạng.',
      foundAt: 'loc-hamtu-floor1',
      relatedTo: ['char-chin'],
      isKey: true
    },
    {
      id: 'EVD-HT-09',
      name: 'Hũ Vôi Sống & Cuộn Chỉ Tơ Tằm Xâu Ngọc',
      type: 'object',
      description: 'Vật liệu chế tác giấu đáy ngăn kéo bàn thợ bạc.',
      detail: 'Hũ vôi sống CaO sấy khô cùng cuộn chỉ tơ tằm vàng tẩm sáp. Kết quả quang phổ cho thấy sợi chỉ đứt kẹt ở then cửa án mạng được cắt ra từ chính cuộn chỉ này.',
      foundAt: 'loc-hamtu-floor1',
      relatedTo: ['char-chin'],
      isKey: true
    },
    {
      id: 'EVD-HT-10',
      name: 'Bản Dự Thảo Di Chúc Bị Xé Góc Dính Mực Tím',
      type: 'document',
      description: 'Mẩu giấy thu gom từ sọt rác xưởng bạc tầng lửng.',
      detail: 'Nạn nhân tuyên bố truất quyền thừa kế của Lương Gia Tuấn và chuyển giao tiệm vàng cho trại cô nhi. Mép xé dính vết mực tím từ bút máy Parker của Tuấn, cung cấp động cơ tranh chấp tài sản.',
      foundAt: 'loc-hamtu-floor1',
      relatedTo: ['char-tuan'],
      isKey: false
    },
    {
      id: 'EVD-HT-11',
      name: 'Giấy Nợ Máu 200 Lượng Vàng Trường Gà',
      type: 'document',
      description: 'Tờ giấy nợ giấu trong lót ủng da dính bùn đỏ của Tuấn.',
      detail: 'Giấy cam kết thanh toán 200 cây vàng trước ngày 25/10 cho giới giang hồ Bến Mễ Cốc, chứng minh Tuấn có động cơ cướp vàng nhưng không am tường cơ học phòng kín.',
      foundAt: 'loc-hamtu-ground',
      relatedTo: ['char-tuan'],
      isKey: false
    },
    {
      id: 'EVD-HT-12',
      name: 'Ống Pô Nóng Ấm Của Xe Máy Peugeot 50cc',
      type: 'forensic',
      description: 'Chiếc moped dựng ở góc sân sau Bến Hàm Tử.',
      detail: 'Pô xe vẫn nóng 52°C lúc cảnh sát khám nghiệm 22h40, bác bỏ hoàn toàn lời khai của Trần Quốc Đại rằng hắn đã rời khỏi tiệm vàng từ lúc 21h00.',
      foundAt: 'loc-hamtu-ground',
      relatedTo: ['char-dai'],
      isKey: true
    },
    {
      id: 'EVD-HT-13',
      name: 'Bức Thư Tuyệt Mệnh Năm 1984 Của Con Gái Thợ Chín',
      type: 'document',
      description: 'Mẩu thư hoen ố vì nước biển cất trong hộp cơm của ông Chín.',
      detail: '"Ba ơi con đi chuyến ghe của ông chủ Phát... nếu con không về, ba nhớ giữ gìn sức khỏe...". Chiếc ghe mục nát bị chìm ngoài cửa biển Cần Giờ khiến con gái mang thai của ông Chín chết đuối.',
      foundAt: 'loc-hamtu-ground',
      relatedTo: ['char-chin'],
      isKey: true
    },
    {
      id: 'EVD-HT-14',
      name: 'Cuộn Vi Phim Microfilm Của "Người Giữ Sổ"',
      type: 'document',
      description: 'Mảnh phim 35mm tí hon gắp ra từ ruột quân cờ Hắc Tướng.',
      detail: 'Chụp lại danh sách chuyển 500 lượng vàng hối lộ cho đường dây cán bộ tha hóa và số tài khoản ngân hàng Thụy Sĩ mang mật danh "NGƯỜI GIỮ SỔ - CHỢ LỚN".',
      foundAt: 'loc-hamtu-floor2',
      relatedTo: ['char-dai', 'char-chin'],
      isKey: true
    }
  ],

  timeline: [
    { id: 'tl-1', time: '20:30', event: 'Trần Quốc Đại đến tiệm vàng, đòi lại sổ hối lộ nhưng bị Phát từ chối', source: 'Lời khai nhân chứng', verified: true },
    { id: 'tl-2', time: '20:45', event: 'Thợ Chín lên lầu hai siết cổ Lương Vĩnh Phát bằng dây đàn Tỳ bà số 2', source: 'Kết quả giải phẫu tử thi', verified: true },
    { id: 'tl-3', time: '20:55', event: 'Thợ Chín khóa then lim từ bên ngoài bằng sợi chỉ sáp qua khe cửa', source: 'Vết chỉ đứt khe sàn', verified: true },
    { id: 'tl-4', time: '21:00', event: 'Toàn khu vực Bến Hàm Tử mất điện vì mưa bão số 7', source: 'Sở Điện lực TP.HCM', verified: true },
    { id: 'tl-5', time: '21:15', event: 'Mỹ Lan mang trà sen lên lầu 2, thấy két sắt mở toang hoảng sợ chạy xuống', source: 'Biên bản khám nghiệm ấm trà', verified: true },
    { id: 'tl-6', time: '21:30', event: 'Gia Tuấn lên lầu lén trộm bản dự thảo di chúc xé góc vứt vào sọt rác', source: 'Mực tím Parker trên di chúc', verified: true },
    { id: 'tl-7', time: '21:45', event: 'Máy cassette kích hoạt phát tiếng hét giả khi cửa phòng ngủ mở ra', source: 'Đoạn băng Sony TCM', verified: true },
    { id: 'tl-8', time: '22:30', event: 'Có điện trở lại, Mỹ Lan hô hoán phát hiện thi thể ông Phát', source: 'Biên bản 113', verified: true }
  ],

  solution: {
    culpritId: 'char-chin',
    motive: 'Trả thù cho con gái mang thai bị Lương Vĩnh Phát dìm chết trên chuyến tàu vượt biên bằng ghe mục năm 1984, đồng thời trừng phạt kẻ ép mình nung chảy vàng lậu rồi đuổi việc.',
    method: 'Dùng dây đàn cước thép số 2 siết cổ nạn nhân lúc 20h45; dùng sợi chỉ sáp luồn qua then đồng giật chốt từ bên ngoài tạo phòng kín; dùng ấm trà 2 đáy vôi sống CaO tỏa nhiệt và máy cassette hẹn giờ tạo chứng cứ ngoại phạm.',
    keyEvidenceIds: ['EVD-HT-01', 'EVD-HT-02', 'EVD-HT-04', 'EVD-HT-06', 'EVD-HT-08', 'EVD-HT-09', 'EVD-HT-13'],
    questions: [
      {
        id: 'q-ht-1',
        question: 'Ai là hung thủ trực tiếp ra tay sát hại Lương Vĩnh Phát?',
        points: 25,
        options: [
          { id: 'opt-tuan', text: 'Lương Gia Tuấn vì bị truất quyền thừa kế và khoản nợ máu 200 lượng vàng', isCorrect: false },
          { id: 'opt-lan', text: 'Trịnh Mỹ Lan vì muốn cướp 100 cây vàng để vượt biên cùng nhân tình', isCorrect: false },
          { id: 'opt-chin', text: 'Thợ bạc Chín "Kính Lão" để trả thù cho con gái chết oan trong chuyến ghe mục 1984', isCorrect: true },
          { id: 'opt-dai', text: 'Thanh tra Trần Quốc Đại nhằm tẩu tán cuốn sổ cái ghi tên mình', isCorrect: false }
        ]
      },
      {
        id: 'q-ht-2',
        question: 'Thời điểm tử vong thực tế của nạn nhân xảy ra lúc nào?',
        points: 25,
        options: [
          { id: 'opt-time-1', text: 'Khoảng 21h45 lúc con trai nghe thấy tiếng quát mắng từ trên lầu hai', isCorrect: false },
          { id: 'opt-time-2', text: 'Khoảng 20h45 trước khi cúp điện, được chứng minh qua độ cứng tử thi và rãnh siết', isCorrect: true },
          { id: 'opt-time-3', text: 'Khoảng 22h15 ngay trước khi có điện trở lại và bà Lan phát hiện án', isCorrect: false }
        ]
      },
      {
        id: 'q-ht-3',
        question: 'Thủ phạm đã dùng cơ chế vật lý nào để tạo ra căn phòng kín then cài đồng?',
        points: 25,
        options: [
          { id: 'opt-lock-1', text: 'Trèo qua lỗ thông gió cao 3.2m rồi dùng nam châm hút then cài', isCorrect: false },
          { id: 'opt-lock-2', text: 'Luồn sợi chỉ tơ tằm tẩm sáp qua then đồng, khép cửa rồi giật rơi chốt từ ngoài khe sàn', isCorrect: true },
          { id: 'opt-lock-3', text: 'Đánh chìa khóa giả rồi đút chìa qua khe cửa trả lại vào túi áo ngực nạn nhân', isCorrect: false }
        ]
      },
      {
        id: 'q-ht-4',
        question: 'Bằng chứng then chốt nào kết nối thảm án với tổ chức ngầm "Người Giữ Sổ"?',
        points: 25,
        options: [
          { id: 'opt-link-1', text: 'Mảnh vi phim Microfilm giấu trong ruột quân Hắc Tướng chứa danh sách tài khoản Chợ Lớn', isCorrect: true },
          { id: 'opt-link-2', text: 'Bao thuốc lá Dunhill trên bàn làm việc của nạn nhân', isCorrect: false },
          { id: 'opt-link-3', text: 'Vé tàu vượt biên mang tên giả của Trịnh Mỹ Lan', isCorrect: false }
        ]
      }
    ]
  },

  hiddenObjective: {
    id: 'hidden-hamtu-ledger',
    title: 'Mật Mã Cuộn Vi Phim Hắc Tướng',
    description: 'Khám phá quân cờ Hắc Tướng bị cưa đôi và giải mã mảnh vi phim để lật tẩy mạng lưới rửa tiền của Người Giữ Sổ tại Chợ Lớn',
    requiredClues: ['EVD-HT-03', 'EVD-HT-14'],
    unlockedStory: `Mảnh vi phim Microfilm 35mm được phóng đại dưới kính hiển vi quang học:
"CHI NHÁNH BẾN HÀM TỬ - MINH SÁT HỒ SƠ 1989
Chuyển ngân: 500 lượng vàng lá Kim Thành -> Tài khoản Thụy Sĩ #CH-8902-LK.
Người thụ hưởng: Người Giữ Sổ (The Ledger Keeper)
Bảo kê vận chuyển: Thanh tra Trần Quốc Đại."

Bản danh sách rửa tiền này là bằng chứng thép vạch trần đường dây hối lộ ngầm chi phối toàn bộ các vụ buôn lậu kim hoàn và viễn thông tại Sài Gòn!`
  }
};
