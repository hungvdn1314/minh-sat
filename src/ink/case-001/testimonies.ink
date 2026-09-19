// ========================================================================
// CASE 001 TESTIMONIES INK SCRIPT: VỤ ÁN CĂN HỘ 507
// Bối cảnh: Saigon Neo-Noir | Chung cư Riviera Residence
// Tuân thủ: mystery-narrative-architect & ink-narrative-engineer standards
// ========================================================================

VAR has_evd01 = false
VAR has_evd03 = false
VAR has_evd05 = false
VAR has_evd07 = false
VAR has_evd12 = false

=== start ===
# actor:Trần Phong # emotion:Neutral
Đêm mưa rả rích ngoài cửa kính sảnh chung cư Riviera. Bạn muốn tiếp cận ai để lật mở bức màn bí mật căn hộ 507?
+ [Bước lại bàn trà gặp ông Vũ Thanh Sơn (Hàng xóm 508)] 
    -> son_interview
+ [Tiến vào phòng an ninh gặp Đỗ Quang Huy (Bảo vệ ca đêm)] 
    -> huy_interview

// ========================================================================
// INTERROGATION: VŨ THANH SƠN (CỰU QUÂN NHÂN - CĂN 508)
// ========================================================================
=== son_interview ===
# actor:Vũ Thanh Sơn # emotion:Serious # portrait:/assets/images/characters/son_neutral.jpg # sfx:dialogue
(Người cựu binh già đặt tách trà mạn xuống đĩa sứ, ánh mắt trầm tĩnh nhưng sắc lạnh quét qua chiếc thẻ thám tử tư của bạn.)
Chào anh thám tử. Tôi ở ngay sát vách căn 507 của chú Đức mười năm nay. Tôi biết mấy người công an đã vội vã kết luận chú ấy tự vẫn vì nợ nần, nhưng người lính già này sống đủ lâu để ngửi thấy mùi khuất tất. Anh muốn biết điều gì?

+ [Hỏi về tiếng cãi vã lúc 20h30 tối đêm xảy ra án mạng] 
    -> son_level_1
+ {has_evd05} [Đối chiếu nhật ký CCTV: Tiếng động lạ lúc 22h15 dội qua vách tường] 
    -> son_level_2
+ {has_evd07} [Chìa ra bức ảnh chụp sợi dây dù: Xin nhận định chuyên môn quân ngũ] 
    -> son_level_3
+ [Hỏi về tính cách và biểu hiện gần đây của nạn nhân Trần Minh Đức] 
    -> son_flavor
+ [Tạm dừng thẩm vấn để rà soát hồ sơ] 
    -> END

= son_flavor
# actor:Vũ Thanh Sơn # emotion:Thoughtful # portrait:/assets/images/characters/son_neutral.jpg # sfx:dialogue
Chú Đức là kỹ sư viễn thông giỏi, ăn nói nhỏ nhẹ và sống chừng mực. Chiều hôm đó chú ấy còn sang mượn tôi chiếc mỏ hàn thiếc, hẹn sáng hôm sau qua sửa giùm tôi cái radio bóng đèn cũ. 
Một người đàn ông sắp thắt cổ tự vẫn trong đêm thì mượn đồ nghề hẹn sáng mai làm gì? Người ta đang cố che đậy điều gì đó phía sau cánh cửa căn 507.
-> son_interview

= son_level_1
# actor:Vũ Thanh Sơn # emotion:Thoughtful # portrait:/assets/images/characters/son_neutral.jpg # event:NOTE:son_heard_quarrel # sfx:dialogue
Khoảng 20h30, vách tường phòng khách dội sang tiếng tranh cãi rất gay gắt. Một giọng đàn ông lạ mặt nói giọng Bắc và tiếng chú Đức quát tháo về chuyện "rút ruột hợp đồng" với "sổ sách giả". 
Đến đúng 21h00 thì căn hộ im bặt như tờ. Tôi cứ ngỡ khách đã về, ai ngờ...
-> son_interview

= son_level_2
# actor:Vũ Thanh Sơn # emotion:Alert # portrait:/assets/images/characters/son_neutral.jpg # event:NOTE:son_heard_thud_2215 # sfx:dialogue
(Ông Sơn nheo mắt nhìn dòng thời gian trên bản photocopy nhật ký camera của bạn, gõ ngón tay gầy guộc xuống bàn.)
Đúng! Mấy anh công an bảo chú ấy tự sát từ lúc 20h30, nhưng họ nhầm to!
Khoảng 22h15, khi tôi đang ngồi châm thêm nước sôi vào ấm trà thì nghe một tiếng "BỊCH" rất nặng dội qua vách tường phòng khách 507. Âm thanh như một bao cát nặng cả bảy chục ký bị buông rơi thẳng từ trên cao xuống sàn gỗ. Sau tiếng động đó, tuyệt nhiên không có tiếng thở dốc, rên rỉ hay tiếng chân giãy giụa nào cả.
-> son_interview

= son_level_3
# actor:Vũ Thanh Sơn # emotion:Shocked # portrait:/assets/images/characters/son_shocked.jpg # event:NOTE:rescue_slip_knot_confirmed # sfx:evidence
(Ông Sơn đeo chiếc kính lão gọng đồi mồi, cầm bức ảnh chụp sợi dây dù rọi sát bóng đèn bàn. Đôi đồng tử ông co lại dữ dội.)
Trời đất quỷ thần ơi! Đây là nút thắt kéo trượt (slip-knot) của đội cứu nạn đường sông quân đội chúng tôi thời chiến!
Nhìn kỹ đi thám tử: Mối dây bện đôi này được luồn vòng qua xà gồ thép rồi khóa lẫy trượt bên ngoài. Muốn siết chết người bằng nút thắt này, bắt buộc phải có một người đứng ở ngoài dây dùng trọng lực kéo giật ngược lên!
Một người tự vẫn đang hoảng loạn, hay một người bị đánh thuốc mê man, tuyệt đối không thể tự tay bện cái nút thắt kỹ thuật này rồi tự treo mình lên được! Đây chắc chắn là án mạng dàn cảnh!
-> son_interview

// ========================================================================
// INTERROGATION: ĐỖ QUANG HUY (BẢO VỆ CA ĐÊM)
// ========================================================================
=== huy_interview ===
# actor:Đỗ Quang Huy # emotion:Nervous # portrait:/assets/images/characters/huy_neutral.jpg # sfx:dialogue
(Người bảo vệ trạc ngoài bốn mươi tuổi, ngón tay ám khói thuốc lào run rẩy bấu chặt vào mép bàn kiểm soát, đảo mắt lấm lét nhìn bạn.)
Dạ... chào thám tử tư. Đêm hôm khuya khoắt anh xuống phòng trực tìm tôi có chuyện gì vậy? Tôi đã khai hết với mấy anh công an phường rồi mà...

+ [Hỏi về nhật ký khách ra vào cổng và thang máy ca trực đêm 18/09] 
    -> huy_level_1
+ {has_evd05} [Chất vấn về 15 phút camera hành lang tầng 5 bị ngắt tín hiệu lúc 22h05] 
    -> huy_level_2
+ {has_evd03} [Đưa ra ảnh chụp vết cạy xà beng tại cửa kính ban công tầng 5] 
    -> huy_level_3
+ [Hỏi về gã đàn ông lạ mặt cãi nhau với nạn nhân lúc 20h30] 
    -> huy_flavor
+ [Rời phòng kiểm soát an ninh] 
    -> END

= huy_flavor
# actor:Đỗ Quang Huy # emotion:Avoidant # portrait:/assets/images/characters/huy_neutral.jpg # sfx:dialogue
Khách... khách khứa đêm đó vắng lắm anh ơi. Chung cư này toàn cán bộ với kỹ sư ở, tầm chín giờ tối là đóng cửa kín mít rồi. Tôi ngồi trực dưới sảnh nhìn màn hình suốt, không có ai lạ mặt đi qua cổng bảo vệ hết!
-> huy_interview

= huy_level_1
# actor:Đỗ Quang Huy # emotion:Avoidant # portrait:/assets/images/characters/huy_neutral.jpg # sfx:dialogue
Tôi trực ca từ 18h00 tối tới 6h00 sáng hôm sau. Ca trực bình thường lắm anh. Ai lên thang máy đều phải quét thẻ từ tại quầy. Mọi người đều là dân cư sinh sống ở đây, làm sao có kẻ giết người đột nhập từ cửa trước được!
-> huy_interview

= huy_level_2
# actor:Đỗ Quang Huy # emotion:Sweating # portrait:/assets/images/characters/huy_nervous.jpg # composureDelta:-40 # event:NOTE:huy_excuse_overheat # sfx:dialogue
(Huy giật nảy mình làm đổ tách nước trà nguội, vội vã lấy vạt áo sờn lau mồ hôi đang túa ra như tắm trên trán.)
Cái... cái đoạn băng 15 phút từ 22h05 đến 22h20 đó hả anh? Tôi thề có bóng đèn là do cái đầu ghi camera cáp quang cũ quá bị quá nhiệt nên sập nguồn thôi! Tôi có ghi chú trong sổ giao ban sáng hôm sau đàng hoàng mà! Chung cư cũ kỹ này đồ điện tử dở chứng là bình thường...
-> huy_interview

= huy_level_3
# actor:Đỗ Quang Huy # emotion:Panicked # portrait:/assets/images/characters/huy_panicked.jpg # composureDelta:-60 # event:NOTE:huy_confession_bribe # sfx:evidence
(Bạn đập bức ảnh chụp vết kim loại bị nạy xước tại cửa ban công thông ra cầu thang thoát hiểm kỹ thuật xuống bàn. Huy nhìn chằm chằm vào bức ảnh, đôi môi tím tái giật giật, hai đầu gối khuỵu hẳn xuống sàn gạch bông.)
Tôi van thám tử... Tôi van anh tha mạng cho tôi! Tôi không giết người! Tôi thề trên vong hồn mẹ tôi là tôi không giết chú Đức!
Tôi nợ độ banh bóng hơn hai trăm triệu ngoài Chợ Lớn, bọn giang hồ dọa nếu cuối tháng không trả đủ tiền lãi chúng nó sẽ chặt ngón tay tôi...
Tuần trước, có một người đàn ông mặc áo măng-tô sẫm màu, đi đôi giày da đen bóng lộn tìm tôi ở quán cà phê đầu hẻm. Hắn đưa tôi một xấp tiền năm mươi triệu đồng bọc trong giấy báo.
Hắn bảo đêm 18/09, đúng 22h00 thì rút jack nguồn camera tầng 5 trong vòng 15 phút, đồng thời mở sẵn chốt khóa cánh cửa sắt dẫn ra hành lang kỹ thuật để hắn "lên lấy tập hồ sơ mật". 
Hắn dặn nếu tôi hé răng nửa lời thì cả nhà tôi sẽ biến mất dưới đáy sông Sài Gòn. Tôi tưởng hắn chỉ trộm tài liệu công ty thôi, tôi thề tôi không ngờ hắn lên giết chú Đức!
-> huy_interview
