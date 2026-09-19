// ========================================================================
// CASE 004 TESTIMONIES INK SCRIPT: ĐÊM PHÁN QUYẾT TẠI BIỆT THỰ CHỢ LỚN
// Bối cảnh: Saigon Neo-Noir | Biệt Thự Bạch Hoa Châu Văn Liêm Quận 5
// Tuân thủ: mystery-narrative-architect & ink-narrative-engineer standards
// ========================================================================

VAR has_evd401 = false
VAR has_evd402 = false
VAR has_evd403 = false
VAR has_evd404 = false
VAR has_evd405 = false
VAR has_evd406 = false

=== start ===
# actor:Trần Phong # emotion:Neutral
Dạ tiệc Biệt Thự Bạch Hoa đông đúc nhưng ngột ngạt mùi âm mưu. Bạn muốn đối chất với ai?
+ [Bước lên bục trung tâm đối đầu trực diện với Lý Gia Khang (Người Giữ Sổ)] 
    -> khang_interview
+ [Khám xét di ngôn và tử thi luật sư Trịnh Khải trên bàn cờ ngọc bích] 
    -> khai_corpse

// ========================================================================
// INTERROGATION: LÝ GIA KHANG (CHỦ TỊCH HỘI ĐỒNG / NGƯỜI GIỮ SỔ)
// ========================================================================
=== khang_interview ===
# actor:Lý Gia Khang # emotion:Serious # portrait:/assets/images/characters/khang_neutral.jpg # sfx:dialogue
(Người đàn ông quyền lực 58 tuổi nhấp một ngụm rượu vang, nheo mắt nhìn bạn với vẻ khinh bỉ tột cùng.)
Thám tử Phong... một kẻ bị tước quân tịch, mở tiệm sửa đồng hồ rách nát trên đường Pasteur mà cũng dám dẫn đầu lực lượng thanh tra xông vào dinh thự của tôi sao? Cậu nghĩ cậu có đủ tư cách đứng đây nói chuyện với tôi à?

+ [Hỏi về cái chết đột ngột của luật sư Trịnh Khải trong phòng đọc sách] 
    -> khang_level_1
+ {has_evd401} [Vạch trần chiếc nhẫn ngọc bích có hộc xoay chứa cặn Kali Xyanua] 
    -> khang_level_2
+ {has_evd402} [Đập Quyển Sổ Cái Đen và chiếc bật lửa Zippo của Hùng xuống bàn tiệc] 
    -> khang_level_3
+ [Dừng đối chất] 
    -> END

= khang_level_1
# actor:Lý Gia Khang # emotion:Serious # portrait:/assets/images/characters/khang_neutral.jpg # sfx:dialogue
Khải là cố vấn thân cận của tôi, hắn đột tử vì bệnh tim tái phát giữa lúc bàn chuyện chuyển giao cổ phần! Chính cậu là kẻ đột nhập tư gia bất hợp pháp, có khi chính cậu là kẻ bỏ thuốc độc vào ly rượu của hắn để giá họa cho tôi đấy!
-> khang_interview

= khang_level_2
# actor:Lý Gia Khang # emotion:Nervous # portrait:/assets/images/characters/khang_neutral.jpg # composureDelta:-40 # sfx:dialogue
(Khang vô thức giấu bàn tay đeo nhẫn ra sau lưng, đồng tử co giật nhẹ)
Một chiếc nhẫn ngọc bích gia bảo truyền ba đời của dòng họ Lý thì chứng minh được cái gì? Cậu dám bảo tôi rắc thuốc độc sao? Đừng có ăn nói hàm hồ trước mặt các phái đoàn ngoại giao!
-> khang_interview

= khang_level_3
# actor:Lý Gia Khang # emotion:Panicked # portrait:/assets/images/characters/khang_panicked.jpg # composureDelta:-60 # event:NOTE:khang_breakdown # sfx:evidence
(Bạn đập cuốn sổ bìa da cừu đen tuyền chứa toàn bộ chữ ký duyệt chi rửa tiền và chiếc bật lửa Zippo khắc hình con mắt sáng loáng xuống mặt bàn tiệc trước sự bàng hoàng của toàn thể hội đồng. Khang lảo đảo lùi lại, va vào cột đá cẩm thạch.)
Cậu... làm sao cậu tìm được lối vào hầm rượu... làm sao cậu mở được két sắt...
(Khang run rẩy bấu chặt vào ngực áo, giọng khàn đặc trong tuyệt vọng)
Thằng Hùng... ba năm trước thằng Hùng cũng nhìn tôi bằng ánh mắt căm thù như thế trên chiếc sà lan đó...
Tại sao các người cứng đầu thế hả? Sài Gòn này được xây bằng tiền bạc và quyền lực! Tôi là kẻ giữ huyết mạch kinh tế của cái thành phố này! Các người không thể bắt tôi! Không thể!
-> khang_interview

// ========================================================================
// CORPSE INSPECTION: LUẬT SƯ TRỊNH KHẢI
// ========================================================================
=== khai_corpse ===
# actor:Trịnh Khải # emotion:Serious # portrait:/assets/images/characters/khai_neutral.jpg # sfx:evidence
(Tử thi luật sư Khải nằm gục trên bàn cờ tướng bằng ngọc bích. Trên tờ giấy ăn bằng vải lụa, những nét chữ nguệch ngoạc viết bằng máu trước khi chết vẫn còn đỏ thẫm.)
"Thuốc độc trong nhẫn ngọc bích của Khang... Hãy cứu Trinh dưới hầm rượu... Sổ cái giấu sau bức tranh sơn mài..."
-> start
