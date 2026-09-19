import { audioManager } from '../audio/AudioManager';

export interface DialogueLine {
  text: string;
  tags: {
    actor?: string;
    emotion?: string;
    portrait?: string; // Image path for character expression
    event?: string;
    composureDelta?: number; // Psychological damage to suspect
    sfx?: 'click' | 'evidence' | 'dialogue' | 'puzzle_solve' | 'page_turn' | 'stamp';
  };
}

export interface DialogueChoice {
  id: string;
  text: string;
  targetKnot: string;
}

export interface DialogueState {
  characterId: string;
  characterName: string;
  currentKnot: string;
  history: DialogueLine[];
  currentLine: DialogueLine | null;
  choices: DialogueChoice[];
  variables: Record<string, boolean>;
  composure: number; // 0 to 100
  currentPortrait: string;
}

const CHARACTER_META: Record<string, { name: string; portrait: string }> = {
  'char-son': { name: 'Vũ Thanh Sơn', portrait: '/assets/images/characters/son_neutral.jpg' },
  'char-huy': { name: 'Đỗ Quang Huy', portrait: '/assets/images/characters/huy_neutral.jpg' },
  'char-bang': { name: 'Vũ Trọng Bằng', portrait: '/assets/images/characters/bang_neutral.jpg' },
  'char-mai': { name: 'Bùi Thị Mai', portrait: '/assets/images/characters/mai_neutral.jpg' },
  'char-lam': { name: 'Lâm "Chột"', portrait: '/assets/images/characters/lam_neutral.jpg' },
  'char-nam': { name: 'Jean-Pierre Nam', portrait: '/assets/images/characters/nam_neutral.jpg' },
  'char-truc': { name: 'Trần Thanh Trúc', portrait: '/assets/images/characters/truc_neutral.jpg' },
  'char-khang': { name: 'Lý Gia Khang', portrait: '/assets/images/characters/khang_neutral.jpg' },
  'char-khai': { name: 'Trịnh Khải', portrait: '/assets/images/characters/khai_neutral.jpg' },
  'char-chin': { name: 'Thợ Chín "Kính Lão"', portrait: '/assets/images/characters/chin_neutral.jpg' },
  'char-tuan': { name: 'Lương Gia Tuấn', portrait: '/assets/images/characters/tuan_neutral.jpg' },
  'char-lan': { name: 'Trịnh Mỹ Lan', portrait: '/assets/images/characters/lan_neutral.jpg' },
  'char-dai': { name: 'Trần Quốc Đại', portrait: '/assets/images/characters/dai_neutral.jpg' },
};

export class InkStoryEngine {
  private characterId: string;
  private currentKnot: string = 'root';
  private variables: Record<string, boolean> = {};
  private history: DialogueLine[] = [];
  private composure: number = 100;
  private currentPortrait: string;

  constructor(characterId: string, initialVariables: Record<string, boolean> = {}) {
    this.characterId = characterId;
    this.variables = { ...initialVariables };
    this.currentKnot = `${characterId}_intro`;
    this.currentPortrait = CHARACTER_META[characterId]?.portrait || '/assets/images/characters/son_neutral.jpg';
  }

  public setVariable(name: string, value: boolean): void {
    this.variables[name] = value;
  }

  public getDialogueState(): DialogueState {
    const content = this.resolveKnot(this.currentKnot);

    if (content.line) {
      if (content.line.tags.portrait) {
        this.currentPortrait = content.line.tags.portrait;
      }
      if (content.line.tags.composureDelta) {
        this.composure = Math.max(0, this.composure + content.line.tags.composureDelta);
      }
      if (content.line.tags.sfx) {
        audioManager.playSfx(content.line.tags.sfx);
      }
    }

    return {
      characterId: this.characterId,
      characterName: CHARACTER_META[this.characterId]?.name || 'Nhân Chứng',
      currentKnot: this.currentKnot,
      history: this.history,
      currentLine: content.line,
      choices: content.choices,
      variables: this.variables,
      composure: this.composure,
      currentPortrait: this.currentPortrait
    };
  }

  public choose(targetKnot: string): DialogueState {
    this.currentKnot = targetKnot;
    return this.getDialogueState();
  }

  // Confront suspect with physical evidence (Ace Attorney style) across all cases
  public presentEvidence(evidenceId: string): DialogueState {
    // Case Ham Tu
    if (this.characterId === 'char-chin') {
      if (evidenceId === 'EVD-HT-08') {
        this.currentKnot = 'chin_confront_saw';
      } else if (evidenceId === 'EVD-HT-02' || evidenceId === 'EVD-HT-09') {
        this.currentKnot = 'chin_confront_cord';
      } else if (evidenceId === 'EVD-HT-13') {
        this.currentKnot = 'chin_confront_revenge';
      } else {
        this.currentKnot = 'chin_confront_fail';
      }
    } else if (this.characterId === 'char-tuan') {
      if (evidenceId === 'EVD-HT-10') {
        this.currentKnot = 'tuan_confront_will';
      } else if (evidenceId === 'EVD-HT-11') {
        this.currentKnot = 'tuan_confront_debt';
      } else {
        this.currentKnot = 'tuan_confront_fail';
      }
    } else if (this.characterId === 'char-lan') {
      if (evidenceId === 'EVD-HT-07') {
        this.currentKnot = 'lan_confront_passport';
      } else if (evidenceId === 'EVD-HT-06') {
        this.currentKnot = 'lan_confront_guitar';
      } else {
        this.currentKnot = 'lan_confront_fail';
      }
    } else if (this.characterId === 'char-dai') {
      if (evidenceId === 'EVD-HT-12') {
        this.currentKnot = 'dai_confront_peugeot';
      } else if (evidenceId === 'EVD-HT-14' || evidenceId === 'EVD-HT-03') {
        this.currentKnot = 'dai_confront_microfilm';
      } else {
        this.currentKnot = 'dai_confront_fail';
      }
    }
    // Case 001
    else if (this.characterId === 'char-huy') {
      if (evidenceId === 'EVD-05') {
        this.currentKnot = 'huy_confront_cctv';
      } else if (evidenceId === 'EVD-03') {
        this.currentKnot = 'huy_confront_crowbar';
      } else {
        this.currentKnot = 'huy_confront_fail';
      }
    } else if (this.characterId === 'char-son') {
      if (evidenceId === 'EVD-07') {
        this.currentKnot = 'son_confront_rope';
      } else {
        this.currentKnot = 'son_confront_fail';
      }
    }
    // Case 002
    else if (this.characterId === 'char-bang') {
      if (evidenceId === 'EVD-203') {
        this.currentKnot = 'bang_confront_cigarettes';
      } else if (evidenceId === 'EVD-204' || evidenceId === 'EVD-201') {
        this.currentKnot = 'bang_confront_dagger';
      } else {
        this.currentKnot = 'bang_confront_fail';
      }
    } else if (this.characterId === 'char-mai') {
      if (evidenceId === 'EVD-203') {
        this.currentKnot = 'mai_confront_cigarettes';
      } else {
        this.currentKnot = 'mai_confront_fail';
      }
    } else if (this.characterId === 'char-lam') {
      if (evidenceId === 'EVD-206') {
        this.currentKnot = 'lam_confront_blood';
      } else {
        this.currentKnot = 'lam_confront_fail';
      }
    }
    // Case 003
    else if (this.characterId === 'char-nam') {
      if (evidenceId === 'EVD-302') {
        this.currentKnot = 'nam_confront_scratch';
      } else if (evidenceId === 'EVD-304') {
        this.currentKnot = 'nam_confront_key';
      } else {
        this.currentKnot = 'nam_confront_fail';
      }
    } else if (this.characterId === 'char-truc') {
      if (evidenceId === 'EVD-303') {
        this.currentKnot = 'truc_confront_lipstick';
      } else {
        this.currentKnot = 'truc_confront_fail';
      }
    }
    // Case 004
    else if (this.characterId === 'char-khang') {
      if (evidenceId === 'EVD-401') {
        this.currentKnot = 'khang_confront_ring';
      } else if (evidenceId === 'EVD-402' || evidenceId === 'EVD-404') {
        this.currentKnot = 'khang_confront_ledger';
      } else {
        this.currentKnot = 'khang_confront_fail';
      }
    }

    return this.getDialogueState();
  }

  private resolveKnot(knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    // Case Ham Tu Routing
    if (this.characterId === 'char-chin') return this.resolveChinKnot(knot);
    if (this.characterId === 'char-tuan') return this.resolveTuanKnot(knot);
    if (this.characterId === 'char-lan') return this.resolveLanKnot(knot);
    if (this.characterId === 'char-dai') return this.resolveDaiKnot(knot);

    // Case 001 Routing
    if (this.characterId === 'char-son') return this.resolveSonKnot(knot);
    if (this.characterId === 'char-huy') return this.resolveHuyKnot(knot);

    // Case 002 Routing
    if (this.characterId === 'char-bang') return this.resolveBangKnot(knot);
    if (this.characterId === 'char-mai') return this.resolveMaiKnot(knot);
    if (this.characterId === 'char-lam') return this.resolveLamKnot(knot);

    // Case 003 Routing
    if (this.characterId === 'char-nam') return this.resolveNamKnot(knot);
    if (this.characterId === 'char-truc') return this.resolveTrucKnot(knot);

    // Case 004 Routing
    if (this.characterId === 'char-khang') return this.resolveKhangKnot(knot);
    if (this.characterId === 'char-khai') return this.resolveKhaiKnot(knot);

    return { line: null, choices: [] };
  }

  // ==========================================
  // CASE 001 RESOLVERS
  // ==========================================
  private resolveSonKnot(knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    const choices: DialogueChoice[] = [
      { id: 'son-opt-1', text: 'Hỏi về tiếng cãi vã lúc 20h30 tối đêm xảy ra án mạng', targetKnot: 'son_1' }
    ];

    if (this.variables['has_evd05']) {
      choices.push({ id: 'son-opt-2', text: 'Đối chiếu nhật ký CCTV: Tiếng động lạ lúc 22h15?', targetKnot: 'son_2' });
    }
    if (this.variables['has_evd07']) {
      choices.push({ id: 'son-opt-3', text: 'Chìa ra bức ảnh sợi dây dù: Xin nhận định chuyên môn quân ngũ', targetKnot: 'son_3' });
    }
    choices.push({ id: 'son-opt-flavor', text: 'Hỏi về tính cách và biểu hiện gần đây của chú Đức', targetKnot: 'son_flavor' });

    let line: DialogueLine | null = null;

    if (knot === 'char-son_intro' || knot === 'son_root') {
      line = {
        text: 'Chào anh thám tử. Tôi ở ngay sát vách căn 507 của chú Đức mười năm nay. Tôi biết mấy người công an đã vội vã kết luận chú ấy tự vẫn vì nợ nần, nhưng người lính già này sống đủ lâu để ngửi thấy mùi khuất tất. Anh muốn biết điều gì?',
        tags: { actor: 'Vũ Thanh Sơn', emotion: 'Nghiêm nghị', portrait: '/assets/images/characters/son_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'son_flavor') {
      line = {
        text: 'Chú Đức là kỹ sư viễn thông giỏi, ăn nói nhỏ nhẹ và sống chừng mực. Chiều hôm đó chú ấy còn sang mượn tôi chiếc mỏ hàn thiếc, hẹn sáng hôm sau qua sửa giùm tôi cái radio bóng đèn cũ. Một người đàn ông sắp thắt cổ tự vẫn trong đêm thì mượn đồ nghề hẹn sáng mai làm gì? Người ta đang cố che đậy điều gì đó...',
        tags: { actor: 'Vũ Thanh Sơn', emotion: 'Trầm ngâm', portrait: '/assets/images/characters/son_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'son_1') {
      line = {
        text: 'Khoảng 20h30, vách tường phòng khách dội sang tiếng tranh cãi rất gay gắt. Một giọng đàn ông lạ mặt nói giọng Bắc và tiếng chú Đức quát tháo về chuyện "rút ruột hợp đồng" với "sổ sách giả". Đến đúng 21h00 thì căn hộ im bặt như tờ.',
        tags: { actor: 'Vũ Thanh Sơn', emotion: 'Trầm ngâm', portrait: '/assets/images/characters/son_neutral.jpg', event: 'NOTE:son_heard_quarrel', sfx: 'dialogue' }
      };
    } else if (knot === 'son_2') {
      line = {
        text: 'Đúng! Mấy anh công an bảo chú ấy tự sát từ lúc 20h30, nhưng họ nhầm to! Tầm 22h15, khi tôi đang ngồi châm thêm nước sôi vào ấm trà thì nghe một tiếng "BỊCH" rất nặng dội qua vách tường phòng khách 507, như một bao cát nặng rơi thẳng xuống sàn gỗ. Sau đó tuyệt nhiên không còn tiếng động hay kêu cứu nào cả.',
        tags: { actor: 'Vũ Thanh Sơn', emotion: 'Cảnh giác sắc sảo', portrait: '/assets/images/characters/son_neutral.jpg', event: 'NOTE:son_heard_thud_2215', sfx: 'dialogue' }
      };
    } else if (knot === 'son_3' || knot === 'son_confront_rope') {
      line = {
        text: 'Trời đất quỷ thần ơi! (Ông Sơn đeo kính lão soi dưới đèn bàn, đôi mắt bàng hoàng)... Đây là nút thắt kéo trượt (slip-knot) của đội cứu nạn đường sông quân đội chúng tôi! Nút bện đôi này chỉ có thể siết chặt khi có người ngoài dùng trọng lực kéo giật ngược lên! Người sắp chết hay bị mê man không thể tự thắt nút này rồi tự treo mình lên được! Đây chắc chắn là án mạng!',
        tags: { actor: 'Vũ Thanh Sơn', emotion: 'Bàng hoàng phát hiện', portrait: '/assets/images/characters/son_shocked.jpg', event: 'NOTE:rescue_slip_knot_confirmed', sfx: 'evidence' }
      };
    } else if (knot === 'son_confront_fail') {
      line = {
        text: 'Vật chứng này có liên quan gì đến những gì tôi nghe thấy tối hôm đó sao thám tử? Tôi chưa thấy mối liên hệ rõ ràng.',
        tags: { actor: 'Vũ Thanh Sơn', emotion: 'Khó hiểu', portrait: '/assets/images/characters/son_neutral.jpg', sfx: 'dialogue' }
      };
    }

    if (line) this.history.push(line);
    return { line, choices };
  }

  private resolveHuyKnot(knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    const choices: DialogueChoice[] = [
      { id: 'huy-opt-1', text: 'Hỏi về sổ trực ca đêm và thang máy đêm 18/09', targetKnot: 'huy_1' }
    ];

    if (this.variables['has_evd05']) {
      choices.push({ id: 'huy-opt-2', text: 'Chất vấn về 15 phút camera hành lang tầng 5 bị ngắt lúc 22h05', targetKnot: 'huy_2' });
    }
    if (this.variables['has_evd03']) {
      choices.push({ id: 'huy-opt-3', text: 'Đưa ra vết cạy xà beng tại cửa kính ban công và cầu thang kỹ thuật', targetKnot: 'huy_3' });
    }
    choices.push({ id: 'huy-opt-flavor', text: 'Hỏi về người lạ cãi nhau với nạn nhân lúc 20h30', targetKnot: 'huy_flavor' });

    let line: DialogueLine | null = null;

    if (knot === 'char-huy_intro' || knot === 'huy_root') {
      line = {
        text: 'Dạ... chào thám tử tư. Đêm hôm khuya khoắt anh xuống phòng trực tìm tôi có chuyện gì vậy? Tôi đã khai hết với mấy anh công an phường rồi mà...',
        tags: { actor: 'Đỗ Quang Huy', emotion: 'Bình thản giả tạo', portrait: '/assets/images/characters/huy_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'huy_flavor') {
      line = {
        text: 'Khách... khách khứa đêm đó vắng lắm anh ơi. Chung cư này toàn cán bộ với kỹ sư ở, tầm chín giờ tối là đóng cửa kín mít rồi. Tôi ngồi trực dưới sảnh nhìn màn hình suốt, không có ai lạ mặt đi qua cổng bảo vệ hết!',
        tags: { actor: 'Đỗ Quang Huy', emotion: 'Đánh trống lảng', portrait: '/assets/images/characters/huy_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'huy_1') {
      line = {
        text: 'Tôi trực ca từ 18h00 tối tới 6h00 sáng hôm sau. Ca trực bình thường lắm anh. Ai lên thang máy đều phải quét thẻ từ tại quầy. Toàn dân cư sinh sống ở đây, làm sao có kẻ giết người đột nhập từ cửa trước được!',
        tags: { actor: 'Đỗ Quang Huy', emotion: 'Né tránh ánh mắt', portrait: '/assets/images/characters/huy_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'huy_2' || knot === 'huy_confront_cctv') {
      line = {
        text: '(Huy giật nảy mình làm đổ tách nước trà nguội, vội vã lấy vạt áo sờn lau mồ hôi đang túa ra trên trán)... Cái... cái đoạn băng 15 phút từ 22h05 đến 22h20 đó hả anh? Tôi thề có bóng đèn là do cái đầu ghi camera cáp quang cũ quá bị quá nhiệt sập nguồn thôi! Tôi có ghi chú trong sổ giao ban sáng hôm sau đàng hoàng mà!',
        tags: { actor: 'Đỗ Quang Huy', emotion: 'Toát mồ hôi căng thẳng', portrait: '/assets/images/characters/huy_nervous.jpg', event: 'NOTE:huy_excuse_overheat', composureDelta: -40, sfx: 'dialogue' }
      };
    } else if (knot === 'huy_3' || knot === 'huy_confront_crowbar') {
      line = {
        text: '(Bạn đập bức ảnh chụp vết nạy xà beng tại cửa kính ban công xuống bàn. Huy run bần bật, khuỵu hẳn hai đầu gối xuống sàn gạch bông)... Tôi van thám tử tha mạng! Tôi nợ độ banh bóng hai trăm triệu ngoài Chợ Lớn sắp bị giang hồ thanh toán... Tuần trước có gã đàn ông đi giày da đen gặp tôi ở quán nước, đưa 50 triệu bảo đúng 22h00 rút jack cam tầng 5 trong 15 phút và mở chốt cửa hành lang kỹ thuật để hắn "lấy hồ sơ". Tôi thề tôi không biết hắn lên giết người!',
        tags: { actor: 'Đỗ Quang Huy', emotion: 'Suy sụp thú tội', portrait: '/assets/images/characters/huy_panicked.jpg', event: 'NOTE:huy_confession_bribe', composureDelta: -60, sfx: 'evidence' }
      };
    } else if (knot === 'huy_confront_fail') {
      line = {
        text: 'Cái này... cái này thì liên quan gì đến tôi đâu anh? Tôi chỉ là bảo vệ trực cửa thôi mà...',
        tags: { actor: 'Đỗ Quang Huy', emotion: 'Cố tỏ ra vô tội', portrait: '/assets/images/characters/huy_neutral.jpg', sfx: 'dialogue' }
      };
    }

    if (line) this.history.push(line);
    return { line, choices };
  }

  // ==========================================
  // CASE 002 RESOLVERS
  // ==========================================
  private resolveBangKnot(knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    const choices: DialogueChoice[] = [
      { id: 'bang-opt-1', text: 'Hỏi về lịch trình làm việc đêm qua của sà lan SG-0419', targetKnot: 'bang_1' }
    ];

    if (this.variables['has_evd203']) {
      choices.push({ id: 'bang-opt-2', text: 'Tung ra bao thuốc lá 555 dính máu tìm thấy dưới gầm bàn', targetKnot: 'bang_2' });
    }
    if (this.variables['has_evd204'] || this.variables['has_evd201']) {
      choices.push({ id: 'bang-opt-3', text: 'Chìa ra con dao găm mẻ mũi và đối chiếu vết giày da sĩ quan', targetKnot: 'bang_3' });
    }

    let line: DialogueLine | null = null;

    if (knot === 'char-bang_intro' || knot === 'bang_root') {
      line = {
        text: 'Chào thám tử tư. Tôi là Bằng, phụ trách thanh tra an toàn vận tải của Minh Phát Holdings. Sáng nay tôi xuống kiểm tra niêm phong kiện hàng theo lịch của công ty thì nghe tin tài công Tài gặp nạn. Có chuyện gì cần hỏi sao?',
        tags: { actor: 'Vũ Trọng Bằng', emotion: 'Lạnh lùng', portrait: '/assets/images/characters/bang_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'bang_1') {
      line = {
        text: 'Tôi ở nhà nghỉ công ty cách đây hơn hai cây số từ chập tối. Sà lan do anh Tài tự lái từ Vũng Tàu về, công ty chỉ thuê vận chuyển thiết bị viễn thông hợp pháp. Chuyện anh ta va quẹt rơi xuống sông chết đuối lúc đêm hôm thì liên quan gì tới tôi?',
        tags: { actor: 'Vũ Trọng Bằng', emotion: 'Thờ ơ', portrait: '/assets/images/characters/bang_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'bang_2' || knot === 'bang_confront_cigarettes') {
      line = {
        text: '(Khóe mắt Bằng giật giật, hắn nhìn chằm chằm vào vết máu khô in trên vỏ bao thuốc lá ba số ngoại)... Thuốc lá ba số ở cái đất Sài Gòn này thiếu gì dân chơi hút! Nửa đêm mưa gió tôi có ghé quán nước trú mưa uống ly cà phê đen rồi đi, làm sao tôi biết ai vứt cái bao thuốc đó dưới chân bàn? Anh đừng có suy diễn vô căn cứ!',
        tags: { actor: 'Vũ Trọng Bằng', emotion: 'Né tránh', portrait: '/assets/images/characters/bang_neutral.jpg', composureDelta: -35, sfx: 'dialogue' }
      };
    } else if (knot === 'bang_3' || knot === 'bang_confront_dagger') {
      line = {
        text: 'Trời đất... con dao găm... (Bằng giật lùi lại, va vào cột kho hàng, sắc mặt xám ngoét)... Thằng Tài tham lam tống tiền Người Giữ Sổ một trăm cây vàng! Hắn dọa nếu đêm nay không giao vàng tại bến thì hắn sẽ nộp cuốn sổ hải trình chở hàng lậu cho công an cảng! Tôi được lệnh phải thanh trừng hắn ngay khi tàu cập bến... Cả vụ thằng Đức ở căn 507 cũng là lệnh của cấp trên... Tôi chỉ là con tốt thí mạng thôi!',
        tags: { actor: 'Vũ Trọng Bằng', emotion: 'Suy sụp thú tội', portrait: '/assets/images/characters/bang_panicked.jpg', composureDelta: -65, event: 'NOTE:bang_confession', sfx: 'evidence' }
      };
    } else if (knot === 'bang_confront_fail') {
      line = {
        text: 'Vật này chẳng chứng minh được gì cả thám tử. Anh đang làm mất thời gian của tôi đấy.',
        tags: { actor: 'Vũ Trọng Bằng', emotion: 'Khinh khỉnh', portrait: '/assets/images/characters/bang_neutral.jpg', sfx: 'dialogue' }
      };
    }

    if (line) this.history.push(line);
    return { line, choices };
  }

  private resolveMaiKnot(knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    const choices: DialogueChoice[] = [
      { id: 'mai-opt-1', text: 'Hỏi về diễn biến tại bến tàu lúc 1h đến 2h sáng', targetKnot: 'mai_1' }
    ];

    if (this.variables['has_evd203']) {
      choices.push({ id: 'mai-opt-2', text: 'Đưa bao thuốc lá 555 ra chất vấn người đã mua nó', targetKnot: 'mai_2' });
    }

    let line: DialogueLine | null = null;

    if (knot === 'char-mai_intro' || knot === 'mai_root') {
      line = {
        text: 'Thám tử hỏi gì hỏi lẹ giùm tôi, sáng giờ công an ra vô làm quán tôi mất hết mối làm ăn rồi đó!',
        tags: { actor: 'Bùi Thị Mai', emotion: 'Gắt gỏng', portrait: '/assets/images/characters/mai_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'mai_1') {
      line = {
        text: 'Mưa to gió lớn dữ dội lắm anh ơi. Tầm hơn 1h sáng chiếc sà lan đó mới rà mũi vào cập cầu cảng. Máy nổ xình xịch được một lúc chừng 1h30 thì tắt ngúm, sau đó chẳng nghe thấy tiếng người kêu la gì nữa hết.',
        tags: { actor: 'Bùi Thị Mai', emotion: 'Trầm ngâm', portrait: '/assets/images/characters/mai_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'mai_2' || knot === 'mai_confront_cigarettes') {
      line = {
        text: '(Chị Mai cầm bao thuốc ngắm nghía, mắt sáng rực lên)... Đúng rồi! Đúng gói thuốc này! Tầm 1h40, có một gã đàn ông mặc áo mưa trùm đầu từ cầu sà lan đi xăm xăm vào quán tôi mua gói ba số 555 ngoại. Hắn đưa tiền chẵn không lấy thối, tay áo dính vết dầu đen và đi đôi giày da sĩ quan láng bóng phát ra tiếng cồm cộp! Cái gã thanh tra Bằng đằng kia... dáng người và đôi giày của hắn y hệt gã mua thuốc đêm qua!',
        tags: { actor: 'Bùi Thị Mai', emotion: 'Nhận dạng hung thủ', portrait: '/assets/images/characters/mai_neutral.jpg', event: 'NOTE:mai_identified_shoeprint', sfx: 'evidence' }
      };
    } else if (knot === 'mai_confront_fail') {
      line = {
        text: 'Món này ở quán tôi không có đâu anh ơi, đừng hỏi linh tinh nữa.',
        tags: { actor: 'Bùi Thị Mai', emotion: 'Bực dọc', portrait: '/assets/images/characters/mai_neutral.jpg', sfx: 'dialogue' }
      };
    }

    if (line) this.history.push(line);
    return { line, choices };
  }

  private resolveLamKnot(knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    const choices: DialogueChoice[] = [
      { id: 'lam-opt-1', text: 'Chất vấn lý do tại sao trốn trong kho hàng', targetKnot: 'lam_1' }
    ];

    if (this.variables['has_evd206']) {
      choices.push({ id: 'lam-opt-2', text: 'Cho xem vết máu bị lau chùi trên boong sà lan', targetKnot: 'lam_2' });
    }

    let line: DialogueLine | null = null;

    if (knot === 'char-lam_intro' || knot === 'lam_root') {
      line = {
        text: 'Tôi lạy anh thám tử tha mạng! Tôi không có giết anh Tài! Tôi thề trên bàn thờ tổ tiên là tôi không có giết ổng!',
        tags: { actor: 'Lâm Chột', emotion: 'Sợ hãi', portrait: '/assets/images/characters/lam_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'lam_1') {
      line = {
        text: 'Tại... tại tôi sợ! Tối qua lúc sà lan vừa cập bến, tôi lén bốc hai thùng linh kiện điện tử đem giấu ra ngoài định trưa nay đem bán chợ trời kiếm chút đỉnh... Lúc quay lại thấy buồng lái tanh mùi máu, tôi sợ bị đổ vạ nên chui vô đây nấp luôn!',
        tags: { actor: 'Lâm Chột', emotion: 'Phân bua', portrait: '/assets/images/characters/lam_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'lam_2' || knot === 'lam_confront_blood') {
      line = {
        text: '(Lâm quỳ rạp xuống, vừa khóc vừa khai)... Tôi nói! Tôi nói hết! Tối qua trước khi cập bến, anh Tài có gọi điện cãi nhau nảy lửa với ai đó bên Minh Phát. Xong ổng cười khẩy, lấy cuốn sổ bìa da màu xanh nhét tuốt vô ngăn bí mật dưới đáy bình ắc quy buồng lái! Ổng dặn tôi: "Mày canh chừng chiếc sà lan, tao giữ cuốn sổ hải trình này thì bên Minh Phát đừng hòng quỵt tiền tao!". Cuốn sổ vẫn còn nằm trong bình ắc quy đó anh thám tử ơi!',
        tags: { actor: 'Lâm Chột', emotion: 'Chỉ điểm bí mật', portrait: '/assets/images/characters/lam_neutral.jpg', event: 'NOTE:lam_revealed_battery', sfx: 'evidence' }
      };
    } else if (knot === 'lam_confront_fail') {
      line = {
        text: 'Cái này... cái này đâu phải của tôi anh ơi...',
        tags: { actor: 'Lâm Chột', emotion: 'Ngơ ngác', portrait: '/assets/images/characters/lam_neutral.jpg', sfx: 'dialogue' }
      };
    }

    if (line) this.history.push(line);
    return { line, choices };
  }

  // ==========================================
  // CASE 003 RESOLVERS
  // ==========================================
  private resolveNamKnot(knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    const choices: DialogueChoice[] = [
      { id: 'nam-opt-1', text: 'Hỏi về giờ giấc ra vào phòng 302 của khách tối qua', targetKnot: 'nam_1' }
    ];

    if (this.variables['has_evd302']) {
      choices.push({ id: 'nam-opt-2', text: 'Chất vấn về 3 vết cào móng tay trên gò má được dặm phấn', targetKnot: 'nam_2' });
    }
    if (this.variables['has_evd304']) {
      choices.push({ id: 'nam-opt-3', text: 'Chìa ra chìa khóa Master Key dính sợi chỉ lụa xanh của nạn nhân', targetKnot: 'nam_3' });
    }

    let line: DialogueLine | null = null;

    if (knot === 'char-nam_intro' || knot === 'nam_root') {
      line = {
        text: 'Bonsoir, thám tử tư. Vụ việc ở phòng 302 của cô Trinh thật là đáng tiếc. Khách sạn chúng tôi đã thông báo với cảnh sát quận, anh có điều gì cần hỏi một người bận rộn như tôi sao?',
        tags: { actor: 'Jean-Pierre Nam', emotion: 'Lịch lãm giả tạo', portrait: '/assets/images/characters/nam_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'nam_1') {
      line = {
        text: 'Cô Trinh nhận phòng từ chiều tối, căn dặn tiếp tân không được làm phiền. Tôi ngồi ở quầy sảnh suốt đêm kiểm tra hóa đơn rượu, tuyệt đối không thấy có kẻ lạ mặt nào bước qua cổng chính lên tầng 3 cả.',
        tags: { actor: 'Jean-Pierre Nam', emotion: 'Bình thản', portrait: '/assets/images/characters/nam_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'nam_2' || knot === 'nam_confront_scratch') {
      line = {
        text: '(Nam hơi giật lùi, vội lấy ngón tay chạm nhẹ lên gò má dày cộp lớp phấn)... Vết xước này hả thám tử? Tôi đã bảo là do con mèo Ba Tư của khách gửi ở sảnh quào trúng lúc chiều mà! Anh đừng có suy diễn biến chuyện vặt thành bằng chứng hình sự!',
        tags: { actor: 'Jean-Pierre Nam', emotion: 'Bối rối', portrait: '/assets/images/characters/nam_neutral.jpg', composureDelta: -35, sfx: 'dialogue' }
      };
    } else if (knot === 'nam_3' || knot === 'nam_confront_key') {
      line = {
        text: 'Mon Dieu... (Nam run bần bật, hai tay ôm lấy đầu, lớp phấn trang điểm nhòe nhoẹt vì mồ hôi lạnh)... Tôi nợ sòng bài bên Campuchia hơn ba mươi ngàn đô... Người Giữ Sổ hứa sẽ xóa sạch nợ nếu tôi giúp họ lấy lại Quyển Sổ Cái từ tay Trinh trước khi cô ta lên tàu sang Marseille! Tôi mở cửa, siết cổ cô ta ngất xỉu, ép cô ta đốt tài liệu trong bồn tắm rồi bỏ vô thùng xe giặt đẩy ra cửa sau cho chiếc xe Lada đen chở về Chợ Lớn! Tôi thề cô ta vẫn còn sống!',
        tags: { actor: 'Jean-Pierre Nam', emotion: 'Suy sụp', portrait: '/assets/images/characters/nam_panicked.jpg', composureDelta: -65, event: 'NOTE:nam_confession', sfx: 'evidence' }
      };
    } else if (knot === 'nam_confront_fail') {
      line = {
        text: 'Một món đồ bình thường của khách sạn thôi thám tử. Chẳng có gì đáng chú ý.',
        tags: { actor: 'Jean-Pierre Nam', emotion: 'Thờ ơ', portrait: '/assets/images/characters/nam_neutral.jpg', sfx: 'dialogue' }
      };
    }

    if (line) this.history.push(line);
    return { line, choices };
  }

  private resolveTrucKnot(knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    const choices: DialogueChoice[] = [
      { id: 'truc-opt-1', text: 'Hỏi về những người ra vào hành lang tầng 3 lúc đêm muộn', targetKnot: 'truc_1' }
    ];

    if (this.variables['has_evd303']) {
      choices.push({ id: 'truc-opt-2', text: 'Tung ra thỏi son Chanel tìm thấy trong giỏ đồ giặt của Trúc', targetKnot: 'truc_2' });
    }

    let line: DialogueLine | null = null;

    if (knot === 'char-truc_intro' || knot === 'truc_root') {
      line = {
        text: 'Dạ... em chào anh thám tử. Em chỉ là phục vụ dọn phòng thôi, em không biết gì về vụ cháy phòng 302 hết á...',
        tags: { actor: 'Trần Thanh Trúc', emotion: 'Ngại ngùng', portrait: '/assets/images/characters/truc_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'truc_1') {
      line = {
        text: 'Tối qua em dọn phòng từ tầng 1 lên tầng 2. Quản lý Nam dặn là phòng 302 là khách thương gia quan trọng, cấm nhân viên lảng vảng quanh đó nên em đâu có dám bước lên tầng 3 đâu anh!',
        tags: { actor: 'Trần Thanh Trúc', emotion: 'Lo sợ', portrait: '/assets/images/characters/truc_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'truc_2' || knot === 'truc_confront_lipstick') {
      line = {
        text: '(Trúc bật khóc nức nở)... Em lạy anh thám tử đừng bắt em vô tù! Em thấy thỏi son rớt dưới thảm cầu thang đẹp quá nên lượm cất thôi! Tối qua lúc hơn 23h, em thấy quản lý Nam thở hổn hển đẩy cái thùng vải giặt rất nặng ra cửa sau. Có chiếc ô tô Lada màu đen biển số ngoại giao đậu sẵn ở đó. Hai người đàn ông bế một người phụ nữ bị trói tay chân bỏ lên băng ghế sau xe rồi phóng đi về hướng Chợ Lớn!',
        tags: { actor: 'Trần Thanh Trúc', emotion: 'Bật khóc chỉ điểm', portrait: '/assets/images/characters/truc_neutral.jpg', event: 'NOTE:truc_witnessed_lada', sfx: 'evidence' }
      };
    } else if (knot === 'truc_confront_fail') {
      line = {
        text: 'Dạ... cái này em không có biết...',
        tags: { actor: 'Trần Thanh Trúc', emotion: 'Ngập ngừng', portrait: '/assets/images/characters/truc_neutral.jpg', sfx: 'dialogue' }
      };
    }

    if (line) this.history.push(line);
    return { line, choices };
  }

  // ==========================================
  // CASE 004 RESOLVERS
  // ==========================================
  private resolveKhangKnot(knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    const choices: DialogueChoice[] = [
      { id: 'khang-opt-1', text: 'Hỏi về cái chết đột ngột của luật sư Trịnh Khải trong phòng đọc sách', targetKnot: 'khang_1' }
    ];

    if (this.variables['has_evd401']) {
      choices.push({ id: 'khang-opt-2', text: 'Vạch trần chiếc nhẫn ngọc bích có hộc xoay chứa cặn Kali Xyanua', targetKnot: 'khang_2' });
    }
    if (this.variables['has_evd402'] || this.variables['has_evd404']) {
      choices.push({ id: 'khang-opt-3', text: 'Đập Quyển Sổ Cái Đen và chiếc bật lửa Zippo của Hùng xuống bàn tiệc', targetKnot: 'khang_3' });
    }

    let line: DialogueLine | null = null;

    if (knot === 'char-khang_intro' || knot === 'khang_root') {
      line = {
        text: 'Thám tử Phong... một kẻ bị tước quân tịch, mở tiệm sửa đồng hồ rách nát trên đường Pasteur mà cũng dám dẫn đầu lực lượng thanh tra xông vào dinh thự của tôi sao? Cậu nghĩ cậu có đủ tư cách đứng đây nói chuyện với tôi à?',
        tags: { actor: 'Lý Gia Khang', emotion: 'Ngạo mạn', portrait: '/assets/images/characters/khang_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'khang_1') {
      line = {
        text: 'Khải là cố vấn thân cận của tôi, hắn đột tử vì bệnh tim tái phát giữa lúc bàn chuyện chuyển giao cổ phần! Chính cậu là kẻ đột nhập tư gia bất hợp pháp, có khi chính cậu là kẻ bỏ thuốc độc vào ly rượu của hắn để giá họa cho tôi đấy!',
        tags: { actor: 'Lý Gia Khang', emotion: 'Vu khống', portrait: '/assets/images/characters/khang_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'khang_2' || knot === 'khang_confront_ring') {
      line = {
        text: '(Khang vô thức giấu bàn tay đeo nhẫn ra sau lưng, đồng tử co giật nhẹ)... Một chiếc nhẫn ngọc bích gia bảo truyền ba đời của dòng họ Lý thì chứng minh được cái gì? Cậu dám bảo tôi rắc thuốc độc sao? Đừng có ăn nói hàm hồ trước mặt các phái đoàn ngoại giao!',
        tags: { actor: 'Lý Gia Khang', emotion: 'Gượng gạo', portrait: '/assets/images/characters/khang_neutral.jpg', composureDelta: -40, sfx: 'dialogue' }
      };
    } else if (knot === 'khang_3' || knot === 'khang_confront_ledger') {
      line = {
        text: 'Cậu... làm sao cậu tìm được lối vào hầm rượu... làm sao cậu mở được két sắt... (Khang run rẩy bấu chặt vào ngực áo, giọng khàn đặc trong tuyệt vọng)... Thằng Hùng... ba năm trước thằng Hùng cũng nhìn tôi bằng ánh mắt căm thù như thế trên chiếc sà lan đó... Tại sao các người cứng đầu thế hả? Sài Gòn này được xây bằng tiền bạc và quyền lực! Các người không thể bắt tôi!',
        tags: { actor: 'Lý Gia Khang', emotion: 'Sụp đổ kinh hoàng', portrait: '/assets/images/characters/khang_panicked.jpg', composureDelta: -60, event: 'NOTE:khang_breakdown', sfx: 'evidence' }
      };
    } else if (knot === 'khang_confront_fail') {
      line = {
        text: 'Trò trẻ con. Bảo vệ đâu, tống cổ kẻ này ra ngoài!',
        tags: { actor: 'Lý Gia Khang', emotion: 'Khinh thị', portrait: '/assets/images/characters/khang_neutral.jpg', sfx: 'dialogue' }
      };
    }

    if (line) this.history.push(line);
    return { line, choices };
  }

  private resolveKhaiKnot(_knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    let line: DialogueLine | null = null;
    line = {
      text: '(Tử thi luật sư Khải nằm gục trên bàn cờ tướng bằng ngọc bích. Trên tờ giấy ăn bằng vải lụa, những nét chữ nguệch ngoạc viết bằng máu trước khi chết vẫn còn đỏ thẫm: "Thuốc độc trong nhẫn ngọc bích của Khang... Hãy cứu Trinh dưới hầm rượu... Sổ cái giấu sau bức tranh sơn mài...")',
      tags: { actor: 'Trịnh Khải (Di ngôn)', emotion: 'Tuyệt mệnh', portrait: '/assets/images/characters/khai_neutral.jpg', sfx: 'evidence' }
    };
    if (line) this.history.push(line);
    return { line, choices: [] };
  }

  // ==========================================
  // CASE HAM TU RESOLVERS
  // ==========================================
  private resolveChinKnot(knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    const choices: DialogueChoice[] = [
      { id: 'chin-opt-1', text: 'Hỏi về bậc cầu thang lim số 5 kêu cót két', targetKnot: 'chin_stair' }
    ];

    if (this.variables['has_evdht08']) {
      choices.push({ id: 'chin-opt-2', text: 'Tung ra chiếc cưa lọng số 0 dính mạt ngà voi hữu cơ', targetKnot: 'chin_confront_saw' });
    }
    if (this.variables['has_evdht02'] || this.variables['has_evdht09']) {
      choices.push({ id: 'chin-opt-3', text: 'Đập mẩu chỉ sáp màu vàng kẹt ở khe cửa lên bàn thợ', targetKnot: 'chin_confront_cord' });
    }
    if (this.variables['has_evdht13']) {
      choices.push({ id: 'chin-opt-4', text: 'Nhắc đến bức thư năm 1984 của người con gái chết oan', targetKnot: 'chin_confront_revenge' });
    }

    let line: DialogueLine | null = null;

    if (knot === 'char-chin_intro' || knot === 'chin_root' || knot === 'chin_intro') {
      line = {
        text: 'Thưa thám tử, tôi già rồi, tai lãng mắt mờ. Đêm bão tôi chỉ ngồi giũa bạc dưới gầm cầu thang tầng trệt. Cầu thang lim bậc số 5 bị mọt, ai giẫm lên cũng kêu cót két. Từ 21h00 đến 22h30 cúp điện tối đen như mực, tôi thề không có ai bước chân lên lầu hai cả!',
        tags: { actor: 'Thợ Chín "Kính Lão"', emotion: 'Điềm tĩnh', portrait: '/assets/images/characters/chin_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'chin_stair') {
      line = {
        text: 'Dạ đúng vậy. Nhà này xây từ thời Pháp, gỗ lim già nhưng bậc số 5 bị mọt khoét ruột. Ban đêm yên tĩnh chỉ cần đặt nửa bàn chân lên là cả nhà nghe rõ mồn một. Trước 21h00 thì có ông Thanh tra Đại ghé qua lúc 20h30, rồi cô Lan mang trà sen lên lúc 21h15... Sau đó thì cúp điện tối om.',
        tags: { actor: 'Thợ Chín "Kính Lão"', emotion: 'Cẩn trọng', portrait: '/assets/images/characters/chin_neutral.jpg', composureDelta: -10, sfx: 'dialogue' }
      };
    } else if (knot === 'chin_confront_saw') {
      line = {
        text: '(Thợ Chín giật thót mình, đưa tay run rẩy sờ vào khung cưa)... Cưa lọng này tôi dùng cưa vàng lá... À, tuần trước ông chủ nhờ tôi gọt lại mấy quân cờ tướng sứt mẻ thôi mà! Tôi... tôi không có bước lên lầu hai đêm nay!',
        tags: { actor: 'Thợ Chín "Kính Lão"', emotion: 'Bối rối chối cãi', portrait: '/assets/images/characters/chin_neutral.jpg', composureDelta: -30, sfx: 'stamp' }
      };
    } else if (knot === 'chin_confront_cord') {
      line = {
        text: '(Thợ Chín run rẩy đánh rơi chiếc kìm bấm, mặt tái nhợt dưới ánh đèn dầu)... Mẩu chỉ sáp? Thợ kim hoàn nào ở Chợ Lớn chẳng có chỉ tơ tẩm sáp xâu ngọc chuỗi! Cánh cửa lim đó khóa chốt then đồng từ bên trong... làm sao một sợi chỉ có thể khóa được cửa phòng kín chứ?!',
        tags: { actor: 'Thợ Chín "Kính Lão"', emotion: 'Hoảng loạn', portrait: '/assets/images/characters/chin_neutral.jpg', composureDelta: -35, sfx: 'stamp' }
      };
    } else if (knot === 'chin_confront_revenge') {
      line = {
        text: '(Hai dòng nước mắt đục ngầu lăn dài qua cặp kính lão dày cộm, vai già run bần bật)... Phải! Là tôi giết nó! Tôi siết cổ nó bằng chính sợi dây đàn của con tiện nhân Mỹ Lan! Năm năm qua mỗi đêm nhắm mắt tôi đều nghe tiếng con gái mang thai của tôi kêu cứu dưới đáy biển Cần Giờ! Lương Vĩnh Phát ăn tiền máu của con tôi, tối nay nó lại bắt tôi nấu chảy 100 lượng vàng máu rồi tống cổ tôi ra đường! Nó chết là đáng kiếp!',
        tags: { actor: 'Thợ Chín "Kính Lão"', emotion: 'Thú tội trong nước mắt', portrait: '/assets/images/characters/chin_neutral.jpg', composureDelta: -60, event: 'NOTE:chin_confession', sfx: 'puzzle_solve' }
      };
    } else if (knot === 'chin_confront_fail') {
      line = {
        text: 'Món đồ này... tôi già rồi mắt mờ, không thấy có liên quan gì đến việc tôi ngồi giũa bạc dưới nhà cả thưa thám tử.',
        tags: { actor: 'Thợ Chín "Kính Lão"', emotion: 'Thờ ơ', portrait: '/assets/images/characters/chin_neutral.jpg', sfx: 'dialogue' }
      };
    }

    if (line) this.history.push(line);
    return { line, choices };
  }

  private resolveTuanKnot(knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    const choices: DialogueChoice[] = [
      { id: 'tuan-opt-1', text: 'Chất vấn về vết mực tím dính trên ngón tay', targetKnot: 'tuan_ink' }
    ];

    if (this.variables['has_evdht10']) {
      choices.push({ id: 'tuan-opt-2', text: 'Tung ra bản dự thảo di chúc bị xé góc dính mực tím', targetKnot: 'tuan_confront_will' });
    }
    if (this.variables['has_evdht11']) {
      choices.push({ id: 'tuan-opt-3', text: 'Tung ra giấy nợ máu 200 cây vàng trường gà Mễ Cốc', targetKnot: 'tuan_confront_debt' });
    }

    let line: DialogueLine | null = null;

    if (knot === 'char-tuan_intro' || knot === 'tuan_root' || knot === 'tuan_intro') {
      line = {
        text: 'Thưa thám tử! Tôi thề tôi không có giết ba tôi! Đêm nay tôi ở xưởng tầng lửng phân loại bạc vụn suốt đêm. Khoảng 21h45 tôi còn nghe tiếng ba tôi quát tháo lớn trên lầu hai: "Để đó rồi cút ra ngoài!". Rõ ràng lúc đó ba tôi vẫn còn sống khỏe mạnh!',
        tags: { actor: 'Lương Gia Tuấn', emotion: 'Thanh minh bồn chồn', portrait: '/assets/images/characters/tuan_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'tuan_ink') {
      line = {
        text: 'Mực tím này là... là do lúc cúp điện tôi ngồi đối chiếu sổ sách kế toán, vô ý quẹt tay trúng ngòi bút Parker thôi! Thám tử đừng có suy diễn lung tung!',
        tags: { actor: 'Lương Gia Tuấn', emotion: 'Chột dạ', portrait: '/assets/images/characters/tuan_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'tuan_confront_will') {
      line = {
        text: '(Tuấn ôm đầu lắp bắp)... Tôi... tôi thừa nhận! Chiều nay ba tát tôi và dọa truất quyền thừa kế, tống cổ tôi ra đường! Lúc 21h30 cúp điện tối om, tôi mò lên thư phòng định trộm bản di chúc xé đi... Nhưng khi tôi bước vào, ba tôi đã ngồi bất động trên ghế bành, người lạnh ngắt! Tôi tưởng ba trúng gió đột tử nên sợ quá giật mảnh di chúc rồi co giò chạy xuống!',
        tags: { actor: 'Lương Gia Tuấn', emotion: 'Hoảng sợ khai nhận', portrait: '/assets/images/characters/tuan_neutral.jpg', composureDelta: -45, event: 'NOTE:tuan_saw_corpse_2130', sfx: 'stamp' }
      };
    } else if (knot === 'tuan_confront_debt') {
      line = {
        text: 'Trời ơi... sao các anh tìm ra tờ giấy đó... Đúng là tôi nợ giang hồ Mễ Cốc 200 lượng vàng, nếu không trả trước sáng mai họ sẽ chặt tay tôi! Nhưng két sắt lúc tôi vào đã mở toang từ trước, vàng mất sạch rồi! Cửa phòng sau đó bị khóa then đồng bên trong, tôi làm sao làm được trò quỷ đó?!',
        tags: { actor: 'Lương Gia Tuấn', emotion: 'Bất lực suy sụp', portrait: '/assets/images/characters/tuan_neutral.jpg', composureDelta: -40, sfx: 'stamp' }
      };
    } else if (knot === 'tuan_confront_fail') {
      line = {
        text: 'Cái này thì liên quan gì đến tôi? Thám tử đừng làm mất thời gian, hung thủ chắc chắn là con mụ Lan vợ kế!',
        tags: { actor: 'Lương Gia Tuấn', emotion: 'Gắt gỏng', portrait: '/assets/images/characters/tuan_neutral.jpg', sfx: 'dialogue' }
      };
    }

    if (line) this.history.push(line);
    return { line, choices };
  }

  private resolveLanKnot(knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    const choices: DialogueChoice[] = [
      { id: 'lan-opt-1', text: 'Hỏi về bình trà sen vẫn còn nóng ấm sau 2 tiếng cúp điện', targetKnot: 'lan_tea' }
    ];

    if (this.variables['has_evdht07']) {
      choices.push({ id: 'lan-opt-2', text: 'Tung ra chiếc vali hộ chiếu giả và vé tàu vượt biên giấu dưới gầm giường', targetKnot: 'lan_confront_passport' });
    }
    if (this.variables['has_evdht06']) {
      choices.push({ id: 'lan-opt-3', text: 'Chất vấn về cây đàn Tỳ bà bị thay dây cước thép kép số 2', targetKnot: 'lan_confront_guitar' });
    }

    let line: DialogueLine | null = null;

    if (knot === 'char-lan_intro' || knot === 'lan_root' || knot === 'lan_intro') {
      line = {
        text: 'Thám tử hỏi gì thì hỏi nhanh giùm tôi. Chồng tôi chết thảm, tôi đau đớn muốn xỉu đây này. Tôi pha bình trà sen mang lên lúc 21h15 rồi về phòng ngủ nghe nhạc suốt đêm, có biết gì đâu!',
        tags: { actor: 'Trịnh Mỹ Lan', emotion: 'Lạnh lùng kiêu kỳ', portrait: '/assets/images/characters/lan_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'lan_tea') {
      line = {
        text: 'Tôi đun nước sôi sùng sục bằng bếp dầu rồi đổ vào bình giữ nhiệt đưa lên cho ông Phát. Trà nóng thì có gì lạ? Chẳng lẽ thám tử nghi ngờ tôi bỏ độc vào trà sao?',
        tags: { actor: 'Trịnh Mỹ Lan', emotion: 'Phòng thủ sắc sảo', portrait: '/assets/images/characters/lan_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'lan_confront_passport') {
      line = {
        text: '(Lan biến sắc, cắn chặt môi dưới)... Phải! Tôi muốn thoát khỏi lão già bạo hành đó! Tôi chuẩn bị sẵn vali định nhân lúc đêm bão bỏ trốn sang Manila! Nhưng thề có trời phật, khi tôi bưng trà lên lúc 21h15, két sắt đã trống trơn, còn ông Phát đã gục đầu bất động! Tôi sợ bị đổ oan cướp của giết người nên mới giật mấy tấm ảnh rồi chạy biến về phòng!',
        tags: { actor: 'Trịnh Mỹ Lan', emotion: 'Kinh hãi thú nhận', portrait: '/assets/images/characters/lan_neutral.jpg', composureDelta: -45, event: 'NOTE:lan_found_empty_safe', sfx: 'stamp' }
      };
    } else if (knot === 'lan_confront_guitar') {
      line = {
        text: 'Cây đàn Tỳ bà của tôi? Tuần trước ông Chín thợ bạc bảo mượn mang xuống xưởng để tra sáp lau dũa dây đàn! Chính ông ta thay dây cước thép mới chứ tôi là đàn bà con gái, biết gì về dây thép siết cổ người?!',
        tags: { actor: 'Trịnh Mỹ Lan', emotion: 'Kích động chỉ điểm', portrait: '/assets/images/characters/lan_neutral.jpg', composureDelta: -30, event: 'NOTE:chin_replaced_guitar_wire', sfx: 'evidence' }
      };
    } else if (knot === 'lan_confront_fail') {
      line = {
        text: 'Tôi không rảnh đứng đây xem mấy thứ đồ linh tinh này. Các anh tìm kẻ giết người đi chứ!',
        tags: { actor: 'Trịnh Mỹ Lan', emotion: 'Bực bội', portrait: '/assets/images/characters/lan_neutral.jpg', sfx: 'dialogue' }
      };
    }

    if (line) this.history.push(line);
    return { line, choices };
  }

  private resolveDaiKnot(knot: string): { line: DialogueLine | null; choices: DialogueChoice[] } {
    const choices: DialogueChoice[] = [
      { id: 'dai-opt-1', text: 'Hỏi về lý do có mặt tại tiệm vàng trong đêm bão', targetKnot: 'dai_reason' }
    ];

    if (this.variables['has_evdht12']) {
      choices.push({ id: 'dai-opt-2', text: 'Chất vấn chiếc xe máy Peugeot 50cc pô vẫn còn nóng lúc 22h40', targetKnot: 'dai_confront_peugeot' });
    }
    if (this.variables['has_evdht14'] || this.variables['has_evdht03']) {
      choices.push({ id: 'dai-opt-3', text: 'Tung ra mảnh vi phim Microfilm chứa danh sách tài khoản Chợ Lớn', targetKnot: 'dai_confront_microfilm' });
    }

    let line: DialogueLine | null = null;

    if (knot === 'char-dai_intro' || knot === 'dai_root' || knot === 'dai_intro') {
      line = {
        text: 'Tôi là cán bộ thanh tra kinh tế đến làm việc định kỳ về hạn ngạch vàng mỹ nghệ. 21h00 cúp điện nên tôi chào gia chủ dắt xe ra về ngay. Các đồng chí hình sự làm việc cẩn thận kẻo vi phạm nguyên tắc với cán bộ nhà nước!',
        tags: { actor: 'Trần Quốc Đại', emotion: 'Uy quyền trịch thượng', portrait: '/assets/images/characters/dai_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'dai_reason') {
      line = {
        text: 'Chúng tôi chỉ trao đổi về hóa đơn chứng từ mua bán ngoại tệ của tiệm Vạn Lợi. Ông Phát rất hợp tác. Tôi rời đi lúc 21h05, ông Chín dưới nhà có thấy tôi ra cửa.',
        tags: { actor: 'Trần Quốc Đại', emotion: 'Trầm tĩnh', portrait: '/assets/images/characters/dai_neutral.jpg', sfx: 'dialogue' }
      };
    } else if (knot === 'dai_confront_peugeot') {
      line = {
        text: '(Đại giật tẩu thuốc khỏi miệng, ánh mắt lóe lên tia giận dữ)... Xe tôi bị chết máy do nước ngập bu-gi nên tôi phải dắt xe trú tạm ở mái hiên sau! Tôi là thanh tra, chẳng lẽ tôi không được quyền trú mưa sao?!',
        tags: { actor: 'Trần Quốc Đại', emotion: 'Gượng gạo chối quanh', portrait: '/assets/images/characters/dai_neutral.jpg', composureDelta: -40, sfx: 'stamp' }
      };
    } else if (knot === 'dai_confront_microfilm') {
      line = {
        text: '(Đại thở hắt ra một hơi dài, quẳng tẩu thuốc Dunhill đắt tiền xuống sàn gạch vỡ vụn)... Các anh khá lắm... Quân cờ Hắc Tướng cưa đôi... Lão Phát quả nhiên là con cáo già giấu vi phim sổ cái vào ruột ngà voi... Nhưng bắt tôi thì các anh nghĩ sẽ cứu được Chợ Lớn sao? Mạng lưới "Người Giữ Sổ" đã cắm rễ khắp các ngân hàng và thương cảng Sài Gòn rồi!',
        tags: { actor: 'Trần Quốc Đại', emotion: 'Đầu hàng nhượng bộ', portrait: '/assets/images/characters/dai_neutral.jpg', composureDelta: -60, event: 'NOTE:dai_confession_ledger_network', sfx: 'puzzle_solve' }
      };
    } else if (knot === 'dai_confront_fail') {
      line = {
        text: 'Trò trẻ con. Tôi không có thời gian đôi co những chứng cứ vô thưởng vô phạt này.',
        tags: { actor: 'Trần Quốc Đại', emotion: 'Khinh khỉnh', portrait: '/assets/images/characters/dai_neutral.jpg', sfx: 'dialogue' }
      };
    }

    if (line) this.history.push(line);
    return { line, choices };
  }
}
