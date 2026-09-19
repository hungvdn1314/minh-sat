// ========================================================================
// CASE 002 TESTIMONIES INK SCRIPT: BÓNG ĐÊM BẾN BẠCH ĐẰNG
// Bối cảnh: Saigon Neo-Noir | Bến Cảng Đường Thủy Sài Gòn
// Tuân thủ: mystery-narrative-architect & ink-narrative-engineer standards
// ========================================================================

VAR has_evd201 = false
VAR has_evd202 = false
VAR has_evd203 = false
VAR has_evd204 = false
VAR has_evd205 = false
VAR has_evd206 = false

=== start ===
# actor:Trần Phong # emotion:Neutral
Mưa đêm bến Bạch Đằng dội xối xả xuống mái tôn kho hàng. Bạn muốn thẩm vấn ai về cái chết của tài công Lê Văn Tài?
+ [Bước lại kho hàng thẩm vấn Vũ Trọng Bằng (Thanh tra Minh Phát)] 
    -> bang_interview
+ [Tiến vào quán cà phê cóc gặp chị Bùi Thị Mai] 
    -> mai_interview
+ [Lôi Lâm "Chột" từ đống thùng gỗ phế liệu ra tra hỏi] 
    -> lam_interview

// ========================================================================
// INTERROGATION: VŨ TRỌNG BẰNG
// ========================================================================
=== bang_interview ===
# actor:Vũ Trọng Bằng # emotion:Serious # portrait:/assets/images/characters/bang_neutral.jpg # sfx:dialogue
(Người đàn ông trung niên mặc áo gió sẫm màu, đôi mắt một mí sắc như dao cau nhìn thẳng vào bạn, hai bàn tay đút hờ trong túi áo.)
Chào thám tử tư. Tôi là Bằng, phụ trách thanh tra an toàn vận tải của Minh Phát Holdings. Sáng nay tôi xuống kiểm tra niêm phong kiện hàng theo lịch của công ty thì nghe tin tài công Tài gặp nạn. Có chuyện gì cần hỏi sao?

+ [Hỏi về lịch trình làm việc đêm qua của sà lan SG-0419] 
    -> bang_level_1
+ {has_evd203} [Tung ra bao thuốc lá 555 dính máu tìm thấy dưới gầm bàn] 
    -> bang_level_2
+ {has_evd204} [Chìa ra con dao găm mẻ mũi và đối chiếu vết giày da sĩ quan] 
    -> bang_level_3
+ [Dừng thẩm vấn] 
    -> END

= bang_level_1
# actor:Vũ Trọng Bằng # emotion:Serious # portrait:/assets/images/characters/bang_neutral.jpg # sfx:dialogue
Tôi ở nhà nghỉ công ty cách đây hơn hai cây số từ chập tối. Sà lan do anh Tài tự lái từ Vũng Tàu về, công ty chỉ thuê vận chuyển thiết bị viễn thông hợp pháp. Chuyện anh ta va quẹt rơi xuống sông chết đuối lúc đêm hôm thì liên quan gì tới tôi?
-> bang_interview

= bang_level_2
# actor:Vũ Trọng Bằng # emotion:Nervous # portrait:/assets/images/characters/bang_neutral.jpg # composureDelta:-35 # sfx:dialogue
(Khóe mắt Bằng giật giật, hắn nhìn chằm chằm vào vết máu khô in trên vỏ bao thuốc lá ba số ngoại.)
Thuốc lá ba số ở cái đất Sài Gòn này thiếu gì dân chơi hút! Nửa đêm mưa gió tôi có ghé quán nước trú mưa uống ly cà phê đen rồi đi, làm sao tôi biết ai vứt cái bao thuốc đó dưới chân bàn? Anh đừng có suy diễn vô căn cứ!
-> bang_interview

= bang_level_3
# actor:Vũ Trọng Bằng # emotion:Panicked # portrait:/assets/images/characters/bang_panicked.jpg # composureDelta:-65 # event:NOTE:bang_confession # sfx:evidence
(Bạn đặt con dao găm quân sự mẻ mũi lên bàn, cùng bản đối chiếu vân đế giày rãnh kim cương trùng khớp từ Căn hộ 507 đến boong sà lan. Bằng lùi lại một bước, sống lưng va mạnh vào cột kho hàng, sắc mặt xám ngoét.)
Trời đất... con dao găm...
(Hắn thở dốc từng cơn, đôi bàn tay gân guốc buông thõng xuống)
Tôi không còn đường lui nữa rồi... Thằng Tài tham lam tống tiền Người Giữ Sổ một trăm cây vàng! Hắn dọa nếu đêm nay không giao vàng tại bến thì hắn sẽ nộp cuốn sổ hải trình chở hàng lậu cho công an cảng!
Tôi được lệnh phải thanh trừng hắn ngay khi tàu cập bến... Tôi đâm hắn một nhát sau gáy rồi đẩy xác xuống sông... Cả vụ thằng Đức ở căn 507 cũng là lệnh của cấp trên... Tôi chỉ là con tốt thí mạng thôi!
-> bang_interview

// ========================================================================
// INTERROGATION: BÙI THỊ MAI (CHỦ QUÁN CÀ PHÊ BẾN TÀU)
// ========================================================================
=== mai_interview ===
# actor:Bùi Thị Mai # emotion:Nervous # portrait:/assets/images/characters/mai_neutral.jpg # sfx:dialogue
(Người đàn bà chủ quán vừa lau chiếc ly thủy tinh vừa liếc xéo về phía chiếc sà lan đang bị công an giăng dây.)
Thám tử hỏi gì hỏi lẹ giùm tôi, sáng giờ công an ra vô làm quán tôi mất hết mối làm ăn rồi đó!

+ [Hỏi về diễn biến tại bến tàu lúc 1h đến 2h sáng] 
    -> mai_level_1
+ {has_evd203} [Đưa bao thuốc lá 555 ra chất vấn người đã mua nó] 
    -> mai_level_2
+ [Dừng thẩm vấn] 
    -> END

= mai_level_1
# actor:Bùi Thị Mai # emotion:Thoughtful # portrait:/assets/images/characters/mai_neutral.jpg # sfx:dialogue
Mưa to gió lớn dữ dội lắm anh ơi. Tầm hơn 1h sáng chiếc sà lan đó mới rà mũi vào cập cầu cảng. Máy nổ xình xịch được một lúc chừng 1h30 thì tắt ngúm, sau đó chẳng nghe thấy tiếng người kêu la gì nữa hết.
-> mai_interview

= mai_level_2
# actor:Bùi Thị Mai # emotion:Alert # portrait:/assets/images/characters/mai_neutral.jpg # event:NOTE:mai_identified_shoeprint # sfx:evidence
(Chị Mai cầm bao thuốc ngắm nghía, mắt sáng rực lên)
Đúng rồi! Đúng gói thuốc này! Tầm 1h40, có một gã đàn ông mặc áo mưa trùm đầu từ cầu sà lan đi xăm xăm vào quán tôi. Hắn đòi mua đúng gói ba số 555 ngoại, thảy tờ tiền năm chục ngàn lên quầy không thèm lấy tiền thối!
Tôi nhớ như in gã đó đi đôi giày da sĩ quan láng bóng, đế giày nện xuống sàn gỗ cồm cộp! Cái gã thanh tra Bằng đằng kia... dáng người và đôi giày của hắn y hệt gã mua thuốc đêm qua!
-> mai_interview

// ========================================================================
// INTERROGATION: LÂM "CHỘT" (PHỤ MÁY SÀ LAN)
// ========================================================================
=== lam_interview ===
# actor:Lâm Chột # emotion:Terrified # portrait:/assets/images/characters/lam_neutral.jpg # sfx:dialogue
(Gã thợ máy run như cầy sấy, ôm đầu ngồi thụp xuống đống rơm khô.)
Tôi lạy anh thám tử tha mạng! Tôi không có giết anh Tài! Tôi thề trên bàn thờ tổ tiên là tôi không có giết ổng!

+ [Chất vấn lý do tại sao trốn trong kho hàng] 
    -> lam_level_1
+ {has_evd206} [Cho xem vết máu bị lau chùi trên boong sà lan] 
    -> lam_level_2
+ [Dừng thẩm vấn] 
    -> END

= lam_level_1
# actor:Lâm Chột # emotion:Terrified # portrait:/assets/images/characters/lam_neutral.jpg # sfx:dialogue
Tại... tại tôi sợ! Tối qua lúc sà lan vừa cập bến, tôi lén bốc hai thùng linh kiện điện tử đem giấu ra ngoài định trưa nay đem bán chợ trời kiếm chút đỉnh... Lúc quay lại thấy buồng lái tanh mùi máu, tôi sợ bị đổ vạ nên chui vô đây nấp luôn!
-> lam_interview

= lam_level_2
# actor:Lâm Chột # emotion:Panicked # portrait:/assets/images/characters/lam_neutral.jpg # event:NOTE:lam_revealed_battery # sfx:evidence
(Lâm quỳ rạp xuống, vừa khóc vừa khai)
Tôi nói! Tôi nói hết! Tối qua trước khi cập bến, anh Tài có gọi điện cãi nhau nảy lửa với ai đó bên Minh Phát. 
Xong ổng cười khẩy, lấy cuốn sổ bìa da màu xanh nhét tuốt vô ngăn bí mật dưới đáy bình ắc quy buồng lái! Ổng dặn tôi: "Mày canh chừng chiếc sà lan, tao giữ cuốn sổ hải trình này thì bên Minh Phát đừng hòng quỵt tiền tao!". Cuốn sổ vẫn còn nằm trong bình ắc quy đó anh thám tử ơi!
-> lam_interview
