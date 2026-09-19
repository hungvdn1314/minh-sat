// ============================================================================
// ÁC MỘNG BẾN HÀM TỬ (THE HAM TU PIER LOCKED-ROOM MYSTERY)
// Inkle Ink Interrogation & Cross-Examination System
// ============================================================================

VAR has_evdht01 = false // Vết hằn khí quản kép
VAR has_evdht02 = false // Mẩu chỉ sáp ở khe cửa
VAR_has_evdht03 = false // Quân Hắc Tướng cưa đôi
VAR has_evdht04 = false // Ấm trà vôi sống
VAR has_evdht05 = false // Máy cassette Sony TCM
VAR has_evdht06 = false // Dây đàn Tỳ bà số 2
VAR has_evdht07 = false // Vali hộ chiếu giả
VAR has_evdht08 = false // Khung cưa lọng của thợ Chín
VAR has_evdht09 = false // Hũ vôi sống & chỉ sáp
VAR has_evdht10 = false // Dự thảo di chúc xé góc
VAR has_evdht11 = false // Giấy nợ máu trường gà
VAR has_evdht12 = false // Xe Peugeot pô nóng
VAR has_evdht13 = false // Bức thư 1984 của con gái
VAR has_evdht14 = false // Cuộn vi phim Microfilm

// ----------------------------------------------------------------------------
// 1. THỢ CHÍN "KÍNH LÃO" (TRẦN VĂN CHÍN)
// ----------------------------------------------------------------------------
=== chin_intro ===
# actor:Thợ Chín # emotion:Calm # portrait:/assets/images/characters/chin_neutral.jpg # sfx:dialogue
Thưa thám tử, tôi già rồi, tai lãng mắt mờ. Đêm bão tôi chỉ ngồi giũa bạc dưới gầm cầu thang tầng trệt. Cầu thang lim bậc số 5 bị mọt, ai giẫm lên cũng kêu cót két. Từ 21h00 đến 22h30 cúp điện tối đen như mực, tôi thề không có ai bước chân lên lầu hai cả!
+ [Hỏi về bậc cầu thang số 5 kêu cót két]
    -> chin_stair_question
+ {has_evdht08} [Tung ra chiếc cưa lọng số 0 dính mạt ngà voi]
    -> chin_confront_saw
+ {has_evdht02} [Đập mẩu chỉ sáp màu vàng kẹt ở khe cửa lên bàn]
    -> chin_confront_cord
+ {has_evdht13} [Nhắc đến bức thư năm 1984 của người con gái chết oan]
    -> chin_confront_revenge

=== chin_stair_question ===
# actor:Thợ Chín # emotion:Calm # portrait:/assets/images/characters/chin_neutral.jpg # sfx:dialogue
Dạ đúng vậy. Nhà này xây từ thời Pháp, gỗ lim già nhưng bậc số 5 bị mọt khoét ruột. Ban đêm yên tĩnh chỉ cần đặt nửa bàn chân lên là cả nhà nghe rõ mồn một. Ông chủ Phát khó tính, đêm nào nghe tiếng cót két là sáng ra trừ lương người đó liền.
+ [Hỏi về việc ai có thể lên lầu trước 21h00]
    Thám tử: "Nếu sau 21h00 không ai lên, vậy trước 21h00 thì sao?"
    # actor:Thợ Chín # emotion:Nervous # composureDelta:-10
    Thợ Chín: "Trước... trước 21h00 thì có ông Thanh tra Đại ghé qua lúc 20h30, rồi tôi thấy cô Lan mang trà sen lên lúc 21h15... Ủa không, lúc đó cúp điện rồi..."
    -> chin_intro

=== chin_confront_saw ===
# actor:Thợ Chín # emotion:Shocked # portrait:/assets/images/characters/chin_neutral.jpg # sfx:stamp # composureDelta:-30
Thám tử: "Cưa lọng của thợ bạc dùng để cưa vàng, cưa bạc. Tại sao trên răng cưa thép Thụy Sĩ này lại dính mạt bụi ngà voi hữu cơ, trùng khớp với vết cưa trên quân Hắc Tướng trong thư phòng?"
Thợ Chín: "Tôi... tuần trước ông chủ nhờ tôi gọt lại quân cờ bị mẻ góc thôi mà! Tôi không có lên lầu hai đêm nay!"
+ {has_evdht03} [Chỉ ra mặt cắt còn mới tinh chưa bám bụi]
    Thám tử: "Quân Hắc Tướng bị cưa đứt đôi lúc nãy vết cắt còn trắng tinh, mạt ngà chưa hề ngả ố! Ông cưa nó ngay sau khi siết cổ Lương Vĩnh Phát để lấy vật gì bên trong?"
    # actor:Thợ Chín # emotion:Breakdown # composureDelta:-30
    Thợ Chín: "Các người... các người làm sao biết được..."
    -> chin_intro
+ [Quay lại các câu hỏi khác]
    -> chin_intro

=== chin_confront_cord ===
# actor:Thợ Chín # emotion:Shocked # portrait:/assets/images/characters/chin_neutral.jpg # sfx:stamp # composureDelta:-35
Thám tử: "Ông Chín, ông không cần phải giẫm lên bậc cầu thang lúc 21h45! Vì Lương Vĩnh Phát đã chết từ lúc 20h45! Và cánh cửa lim khóa then đồng được khóa từ bên ngoài bằng chính mẩu chỉ tơ tằm tẩm sáp này!"
Thợ Chín: (Run rẩy đánh rơi kìm) "Mẩu... mẩu chỉ sáp? Thợ kim hoàn nào ở Chợ Lớn chẳng có chỉ sáp xâu ngọc!"
+ {has_evdht09} [Đối chiếu cuộn chỉ trong hộc bàn thợ Chín]
    Thám tử: "Nhưng chỉ có cuộn chỉ trong ngăn kéo của ông mới có tỷ lệ sáp ong rừng và tơ vàng trùng khớp quang phổ! Ông luồn dây qua then cài, khép cửa rồi giật rơi chốt từ khe sàn. Nhưng then đồng quá sắc đã chém đứt lại 4cm chỉ tố cáo ông!"
    # actor:Thợ Chín # emotion:Breakdown # composureDelta:-40
    Thợ Chín: "Trời ơi... cái then đồng chết tiệt..."
    -> chin_intro
+ [Quay lại]
    -> chin_intro

=== chin_confront_revenge ===
# actor:Thợ Chín # emotion:Breakdown # portrait:/assets/images/characters/chin_neutral.jpg # sfx:puzzle_solve # composureDelta:-60
Thám tử: "Năm 1984, chuyến ghe mục nát ở cửa biển Cần Giờ... Con gái mang thai của ông đã gửi lại lá thư này trước khi chết đuối. Lương Vĩnh Phát ăn tiền máu của con gái ông, tối nay hắn lại bắt ông nấu chảy 100 lượng vàng lậu rồi tống cổ ông ra đường!"
Thợ Chín: (Hai dòng nước mắt lăn dài qua cặp kính lão dày cộm, vai run bần bật)
"Phải! Là tôi giết nó! Tôi siết cổ nó bằng chính sợi dây đàn của con tiện nhân Mỹ Lan! Năm năm qua mỗi đêm nhắm mắt tôi đều nghe tiếng con gái tôi kêu cứu dưới đáy biển lạnh buốt! Nó chết là đáng kiếp! Quân cờ Hắc Tướng đó chứa cuộn vi phim tội ác của cả đường dây Người Giữ Sổ... Tôi lấy nó để đưa ra ánh sáng!"
-> chin_confession

=== chin_confession ===
# actor:Thợ Chín # emotion:Breakdown # portrait:/assets/images/characters/chin_neutral.jpg # sfx:evidence
(Thợ Chín buông thõng hai tay, đầu gục xuống chiếc bàn thợ kim hoàn...)
"Tôi không cần vàng của nó... 100 lượng vàng tôi ném xuống bùn dưới chân cầu chữ Y rồi... Tôi chỉ muốn đòi lại mạng cho con gái tôi..."
-> END

// ----------------------------------------------------------------------------
// 2. LƯƠNG GIA TUẤN (CON TRAI TRƯỞNG)
// ----------------------------------------------------------------------------
=== tuan_intro ===
# actor:Lương Gia Tuấn # emotion:Nervous # portrait:/assets/images/characters/tuan_neutral.jpg # sfx:dialogue
Thám tử! Tôi thề tôi không có giết ba tôi! Đêm nay tôi ở xưởng tầng lửng phân loại bạc vụn. Tôi còn nghe tiếng ba tôi quát lớn lúc 21h45 mà!
+ [Chất vấn về vết mực tím trên đầu ngón tay]
    -> tuan_ink_question
+ {has_evdht10} [Tung ra bản di chúc bị xé góc dính mực tím]
    -> tuan_confront_will
+ {has_evdht11} [Tung ra giấy nợ máu 200 cây vàng trường gà Mễ Cốc]
    -> tuan_confront_debt

=== tuan_ink_question ===
# actor:Lương Gia Tuấn # emotion:Nervous # portrait:/assets/images/characters/tuan_neutral.jpg # sfx:dialogue
Mực tím này là... là tôi ngồi ghi sổ kế toán! Cúp điện nên tôi sơ ý làm rớt lọ mực thôi, có gì lạ đâu?
-> tuan_intro

=== tuan_confront_will ===
# actor:Lương Gia Tuấn # emotion:Shocked # portrait:/assets/images/characters/tuan_neutral.jpg # sfx:stamp # composureDelta:-40
Thám tử: "Ghi sổ kế toán mà vết mực tím từ cây bút Parker của anh lại dính trọn vào mép xé của tờ di chúc truất quyền thừa kế này à? Chiều nay ba anh dọa tống anh ra đường ăn mày!"
Lương Gia Tuấn: "Tôi... tôi thừa nhận! Tôi có lẻn lên lầu lúc 21h30 để lấy cắp tờ di chúc xé đi! Nhưng lúc tôi đẩy cửa bước vào thì... ba tôi đã ngồi bất động trên ghế bành rồi! Tôi sợ quá tưởng ba trúng gió nên cuỗm tờ di chúc rồi chạy thục mạng xuống xưởng!"
-> tuan_intro

=== tuan_confront_debt ===
# actor:Lương Gia Tuấn # emotion:Breakdown # portrait:/assets/images/characters/tuan_neutral.jpg # sfx:stamp # composureDelta:-50
Thám tử: "Tờ giấy nợ 200 lượng vàng có điểm chỉ máu giấu trong lót giày dính bùn đỏ Mễ Cốc của anh nói lên tất cả. Anh cần tiền trả nợ máu trước rạng sáng 25/10!"
Lương Gia Tuấn: "Đúng! Nhưng két sắt lúc tôi vào đã mở toang từ trước rồi, vàng mất sạch trơn! Tôi không hề giết ba tôi! Làm sao tôi khóa được then cài đồng từ bên trong phòng kín chứ?!"
-> tuan_intro

// ----------------------------------------------------------------------------
// 3. TRỊNH MỸ LAN (VỢ KẾ)
// ----------------------------------------------------------------------------
=== lan_intro ===
# actor:Trịnh Mỹ Lan # emotion:Calm # portrait:/assets/images/characters/lan_neutral.jpg # sfx:dialogue
Thám tử hỏi gì thì hỏi nhanh giùm tôi. Chồng tôi chết thảm, tôi đau đớn muốn xỉu đây này. Tôi mang bình trà sen lên lúc 21h15 rồi về phòng ngủ nghe nhạc suốt đêm, có biết gì đâu!
+ [Hỏi về bình trà sen vẫn còn nóng lúc 22h35]
    -> lan_tea_question
+ {has_evdht07} [Tung ra chiếc vali hộ chiếu giả và vé tàu vượt biên]
    -> lan_confront_passport
+ {has_evdht06} [Chất vấn về cây đàn Tỳ bà bị thay dây cước thép số 2]
    -> lan_confront_guitar

=== lan_tea_question ===
# actor:Trịnh Mỹ Lan # emotion:Nervous # portrait:/assets/images/characters/lan_neutral.jpg # sfx:dialogue
Tôi đun nước sôi sùng sục bằng bếp dầu rồi đổ vào bình giữ nhiệt đưa lên. Trà nóng thì có gì lạ? Chẳng lẽ thám tử nghi ngờ tôi bỏ độc vào trà sao?
-> lan_intro

=== lan_confront_passport ===
# actor:Trịnh Mỹ Lan # emotion:Shocked # portrait:/assets/images/characters/lan_neutral.jpg # sfx:stamp # composureDelta:-40
Thám tử: "Một góa phụ đau đớn mà lại chuẩn bị sẵn vali, vé tàu vượt biên đi Manila và 2 hộ chiếu giả mang tên cô và người tình dưới gầm giường?"
Trịnh Mỹ Lan: (Biến sắc) "Tôi... tôi muốn thoát khỏi lão già tàn bạo đó! Tôi định nhân lúc đêm bão ôm tiền trốn đi! Nhưng lúc tôi mang trà lên lúc 21h15, két sắt đã bị vét sạch, lão Phát ngồi gục đầu im lìm! Tôi sợ vạ lây nên mới cắn răng chạy về phòng!"
-> lan_intro

=== lan_confront_guitar ===
# actor:Trịnh Mỹ Lan # emotion:Nervous # portrait:/assets/images/characters/lan_neutral.jpg # sfx:stamp # composureDelta:-30
Thám tử: "Cây đàn Tỳ bà của cô, dây số 2 bằng cước thép kép 0.8mm đã bị tháo ra làm hung khí siết cổ chồng cô!"
Trịnh Mỹ Lan: "Trời đất chứng giám, tuần trước lão Chín thợ bạc mượn cây đàn của tôi bảo mang xuống lau dũa tra sáp! Chính lão ta thay dây mới chứ tôi có biết gì về kim loại đâu!"
-> lan_intro

// ----------------------------------------------------------------------------
// 4. TRẦN QUỐC ĐẠI (THANH TRA KINH TẾ)
// ----------------------------------------------------------------------------
=== dai_intro ===
# actor:Trần Quốc Đại # emotion:Calm # portrait:/assets/images/characters/dai_neutral.jpg # sfx:dialogue
Tôi là cán bộ nhà nước đến bàn việc quản lý ngoại hối định kỳ. 21h00 cúp điện nên tôi chào gia chủ ra về ngay. Các đồng chí công an không có quyền giữ tôi ở đây quá nửa đêm!
+ {has_evdht12} [Chất vấn chiếc xe máy Peugeot pô vẫn còn nóng lúc 22h40]
    -> dai_confront_peugeot
+ {has_evdht14} [Tung ra mảnh vi phim Microfilm chứa danh sách tài khoản Chợ Lớn]
    -> dai_confront_microfilm

=== dai_confront_peugeot ===
# actor:Trần Quốc Đại # emotion:Shocked # portrait:/assets/images/characters/dai_neutral.jpg # sfx:stamp # composureDelta:-40
Thám tử: "Rời đi lúc 21h00 mà chiếc Peugeot của anh ở sân sau pô xe vẫn nóng 52 độ lúc 22h40? Anh nấp ở sân sau tiệm vàng suốt 2 tiếng để chờ lấy thứ gì?"
Trần Quốc Đại: "Xe... xe tôi chết máy do ngập nước! Tôi đứng trú mưa đợi tạnh chứ làm gì mờ ám!"
-> dai_intro

=== dai_confront_microfilm ===
# actor:Trần Quốc Đại # emotion:Breakdown # portrait:/assets/images/characters/dai_neutral.jpg # sfx:puzzle_solve # composureDelta:-60
Thám tử: "Cuộn vi phim gắp ra từ quân cờ Hắc Tướng ghi rõ tên Thiếu tá Trần Quốc Đại nhận 500 lượng vàng hối lộ từ tài khoản Người Giữ Sổ! Anh đến đây để tiêu hủy cuốn sổ gốc trước khi đoàn thanh tra về kiểm tra!"
Trần Quốc Đại: (Thở hắt ra, quẳng tẩu thuốc lá xuống sàn gạch)
"Các anh giỏi lắm... Nhưng bắt tôi thì có ích gì? 'Người Giữ Sổ' là một mạng lưới bóng ma... Lương Vĩnh Phát chết, tôi bị bắt, thì dòng tiền đó ngày mai lại chảy qua một kẻ khác ở Bến Bạch Đằng hay Thủ Đức mà thôi..."
-> END
