// ========================================================================
// CASE 003 TESTIMONIES INK SCRIPT: BẢN BÁO CÁO CHÁY DỞ TẠI MAJESTIC
// Bối cảnh: Saigon Neo-Noir | Khách Sạn Cổ Majestic Quận 1
// Tuân thủ: mystery-narrative-architect & ink-narrative-engineer standards
// ========================================================================

VAR has_evd301 = false
VAR has_evd302 = false
VAR has_evd303 = false
VAR has_evd304 = false
VAR has_evd305 = false
VAR has_evd306 = false

=== start ===
# actor:Trần Phong # emotion:Neutral
Hành lang khách sạn Majestic phảng phất mùi khói giấy khét lẹt hòa trong tiếng nhạc jazz lạo xạo. Bạn muốn thẩm vấn ai?
+ [Bước lại quầy bar đối chất Quản lý ca đêm Jean-Pierre Nam] 
    -> nam_interview
+ [Tìm gặp cô phục vụ phòng Trần Thanh Trúc bên xe giặt là] 
    -> truc_interview

// ========================================================================
// INTERROGATION: JEAN-PIERRE NAM
// ========================================================================
=== nam_interview ===
# actor:Jean-Pierre Nam # emotion:Serious # portrait:/assets/images/characters/nam_neutral.jpg # sfx:dialogue
(Người quản lý lai Pháp chỉnh lại chiếc nơ cổ bằng lụa, mỉm cười lịch thiệp nhưng ánh mắt láo liên đề phòng.)
Bonsoir, thám tử tư. Vụ việc ở phòng 302 của cô Trinh thật là đáng tiếc. Khách sạn chúng tôi đã thông báo với cảnh sát quận, anh có điều gì cần hỏi một người bận rộn như tôi sao?

+ [Hỏi về giờ giấc ra vào phòng 302 của khách tối qua] 
    -> nam_level_1
+ {has_evd302} [Chất vấn về 3 vết cào móng tay trên gò má được dặm phấn] 
    -> nam_level_2
+ {has_evd304} [Chìa ra chìa khóa Master Key dính sợi chỉ lụa xanh của nạn nhân] 
    -> nam_level_3
+ [Dừng thẩm vấn] 
    -> END

= nam_level_1
# actor:Jean-Pierre Nam # emotion:Serious # portrait:/assets/images/characters/nam_neutral.jpg # sfx:dialogue
Cô Trinh nhận phòng từ chiều tối, căn dặn tiếp tân không được làm phiền. Tôi ngồi ở quầy sảnh suốt đêm kiểm tra hóa đơn rượu, tuyệt đối không thấy có kẻ lạ mặt nào bước qua cổng chính lên tầng 3 cả.
-> nam_interview

= nam_level_2
# actor:Jean-Pierre Nam # emotion:Nervous # portrait:/assets/images/characters/nam_neutral.jpg # composureDelta:-35 # sfx:dialogue
(Nam hơi giật lùi, vội lấy ngón tay chạm nhẹ lên gò má dày cộp lớp phấn)
Vết xước này hả thám tử? Tôi đã bảo là do con mèo Ba Tư của khách gửi ở sảnh quào trúng lúc chiều mà! Anh đừng có suy diễn biến chuyện vặt thành bằng chứng hình sự!
-> nam_interview

= nam_level_3
# actor:Jean-Pierre Nam # emotion:Panicked # portrait:/assets/images/characters/nam_panicked.jpg # composureDelta:-65 # event:NOTE:nam_confession # sfx:evidence
(Bạn đặt chiếc chìa khóa vạn năng có dính sợi chỉ tơ tằm xanh từ áo ngủ của Trinh cùng kết quả giám định mẫu da dưới móng tay nạn nhân lên mặt quầy bar. Ly rượu vang trên tay Nam rơi xuống sàn vỡ tan tành.)
Mon Dieu... (Nam run bần bật, hai tay ôm lấy đầu, lớp phấn trang điểm nhòe nhoẹt vì mồ hôi lạnh)
Tôi nợ sòng bài bên Campuchia hơn ba mươi ngàn đô... giang hồ dọa chặt tay tôi nếu không trả nợ trước tuần này...
Người Giữ Sổ biết chuyện, hứa sẽ xóa sạch nợ và cho tôi thêm tiền nếu tôi giúp họ lấy lại Quyển Sổ Cái từ tay Trinh trước khi cô ta lên tàu sang Marseille!
Tôi dùng Master Key mở cửa phòng 302... Cô ta chống cự cào rách mặt tôi... Tôi siết cổ cô ta ngất xỉu, ép cô ta đốt tài liệu trong bồn tắm rồi bỏ cô ta vô thùng xe giặt đẩy ra cửa sau cho chiếc xe Lada đen chở về Chợ Lớn! Tôi thề tôi không giết cô ta, cô ta vẫn còn sống!
-> nam_interview

// ========================================================================
// INTERROGATION: TRẦN THANH TRÚC (PHỤC VỤ PHÒNG)
// ========================================================================
=== truc_interview ===
# actor:Trần Thanh Trúc # emotion:Nervous # portrait:/assets/images/characters/truc_neutral.jpg # sfx:dialogue
(Cô gái trẻ bối rối đứng nép sau chiếc xe đẩy giặt là đầy ắp khăn trắng, hai bàn tay vặn vẹo vào nhau.)
Dạ... em chào anh thám tử. Em chỉ là phục vụ dọn phòng thôi, em không biết gì về vụ cháy phòng 302 hết á...

+ [Hỏi về những người ra vào hành lang tầng 3 lúc đêm muộn] 
    -> truc_level_1
+ {has_evd303} [Tung ra thỏi son Chanel tìm thấy trong giỏ đồ giặt của Trúc] 
    -> truc_level_2
+ [Dừng thẩm vấn] 
    -> END

= truc_level_1
# actor:Trần Thanh Trúc # emotion:Nervous # portrait:/assets/images/characters/truc_neutral.jpg # sfx:dialogue
Tối qua em dọn phòng từ tầng 1 lên tầng 2. Quản lý Nam dặn là phòng 302 là khách thương gia quan trọng, cấm nhân viên lảng vảng quanh đó nên em đâu có dám bước lên tầng 3 đâu anh!
-> truc_interview

= truc_level_2
# actor:Trần Thanh Trúc # emotion:Panicked # portrait:/assets/images/characters/truc_neutral.jpg # event:NOTE:truc_witnessed_lada # sfx:evidence
(Trúc tái mặt khi nhìn thấy thỏi son môi Chanel màu đỏ thẫm khắc chữ H.T.T đặt trước mặt, cô bật khóc nức nở.)
Em lạy anh thám tử đừng bắt em vô tù! Em thấy thỏi son rớt dưới thảm cầu thang thoát hiểm đẹp quá nên em lượm cất thôi, em không có ăn cắp trong phòng!
Em khai hết! Tối qua lúc hơn 23h, em đang gom đồ dưới cửa sau kho giặt ủi thì thấy quản lý Nam thở hổn hển đẩy cái thùng vải giặt rất nặng ra cửa. 
Có chiếc ô tô Lada màu đen biển số ngoại giao đậu sẵn ở hẻm sau. Hai người đàn ông mặc đồ đen bước xuống, dỡ nắp thùng ra bế một người phụ nữ bị trói tay chân bỏ lên băng ghế sau xe rồi rồ ga phóng vút đi về hướng Chợ Lớn!
-> truc_interview
