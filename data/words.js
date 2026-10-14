// 《张佳昊今天背单词了没》题库
// 4 关 × 15 词，共 60 个六级核心词，难度递增。
// level: 1~4 对应第 1~4 关。
const WORDS = [
  // ============ 第 1 关（高频、较易） ============
  {
    word: "abandon",
    phonetic: "/əˈbændən/",
    pos: "v.",
    meaning: "放弃；抛弃",
    forms: "abandons / abandoned / abandoning",
    derivatives: "abandonment n. 放弃；遗弃",
    similar: "abundant adj. 丰富的（拼写易混）",
    antonym: "retain v. 保留",
    phrases: ["abandon oneself to 沉溺于", "with abandon 尽情地；放纵地"],
    examples: [
      { en: "He abandoned the plan halfway.", zh: "他半途放弃了这个计划。" },
      { en: "The crew had to abandon ship.", zh: "船员们不得不弃船逃生。" }
    ],
    level: 1
  },
  {
    word: "absorb",
    phonetic: "/əbˈzɔːrb/",
    pos: "v.",
    meaning: "吸收；使全神贯注",
    forms: "absorbs / absorbed / absorbing",
    derivatives: "absorption n. 吸收；专注",
    similar: "absurd adj. 荒谬的",
    antonym: "emit v. 发出；排出",
    phrases: ["be absorbed in 专心于", "absorb knowledge 吸收知识"],
    examples: [
      { en: "Plants absorb water through their roots.", zh: "植物通过根部吸收水分。" },
      { en: "She was absorbed in the novel.", zh: "她全神贯注地读那本小说。" }
    ],
    level: 1
  },
  {
    word: "abundant",
    phonetic: "/əˈbʌndənt/",
    pos: "adj.",
    meaning: "丰富的；充裕的",
    forms: "more abundant / most abundant",
    derivatives: "abundance n. 丰富；充裕",
    similar: "abandon v. 放弃",
    antonym: "scarce adj. 稀缺的",
    phrases: ["be abundant in 富于……", "an abundant supply 充足的供应"],
    examples: [
      { en: "The region is abundant in natural resources.", zh: "该地区自然资源丰富。" },
      { en: "We have abundant evidence to prove it.", zh: "我们有充足的证据来证明这一点。" }
    ],
    level: 1
  },
  {
    word: "accelerate",
    phonetic: "/əkˈseləreɪt/",
    pos: "v.",
    meaning: "加速；促进",
    forms: "accelerates / accelerated / accelerating",
    derivatives: "acceleration n. 加速；加速度",
    similar: "accumulate v. 积累",
    antonym: "decelerate v. 减速",
    phrases: ["accelerate growth 促进增长", "accelerate the pace of 加快……的步伐"],
    examples: [
      { en: "The car accelerated to overtake.", zh: "汽车加速超车。" },
      { en: "The reform accelerated economic growth.", zh: "改革促进了经济增长。" }
    ],
    level: 1
  },
  {
    word: "accompany",
    phonetic: "/əˈkʌmpəni/",
    pos: "v.",
    meaning: "陪伴；伴随；伴奏",
    forms: "accompanies / accompanied / accompanying",
    derivatives: "companion n. 同伴；accompaniment n. 伴随物；伴奏",
    similar: "accomplish v. 完成",
    antonym: "abandon v. 抛弃；离开",
    phrases: ["be accompanied by 由……陪同；伴随", "accompany sb. to 陪某人去……"],
    examples: [
      { en: "She accompanied her mother to the hospital.", zh: "她陪母亲去了医院。" },
      { en: "Strong winds accompanied the heavy rain.", zh: "大雨伴有大风。" }
    ],
    level: 1
  },
  {
    word: "accumulate",
    phonetic: "/əˈkjuːmjəleɪt/",
    pos: "v.",
    meaning: "积累；积聚",
    forms: "accumulates / accumulated / accumulating",
    derivatives: "accumulation n. 积累",
    similar: "accurate adj. 准确的",
    antonym: "disperse v. 散开；消散",
    phrases: ["accumulate wealth 积累财富", "accumulate experience 积累经验"],
    examples: [
      { en: "Dust had accumulated on the shelves.", zh: "架子上积满了灰尘。" },
      { en: "He accumulated a large fortune.", zh: "他积累了巨额财富。" }
    ],
    level: 1
  },
  {
    word: "accurate",
    phonetic: "/ˈækjərət/",
    pos: "adj.",
    meaning: "准确的；精确的",
    forms: "more accurate / most accurate",
    derivatives: "accuracy n. 准确性；accurately adv. 准确地",
    similar: "adequate adj. 足够的",
    antonym: "inaccurate adj. 不准确的",
    phrases: ["accurate data 准确的数据", "be accurate in 在……方面准确"],
    examples: [
      { en: "The report is accurate and detailed.", zh: "这份报告准确而详尽。" },
      { en: "We need accurate measurements.", zh: "我们需要精确的测量。" }
    ],
    level: 1
  },
  {
    word: "acquire",
    phonetic: "/əˈkwaɪər/",
    pos: "v.",
    meaning: "获得；学到；收购",
    forms: "acquires / acquired / acquiring",
    derivatives: "acquisition n. 获得；收购",
    similar: "inquire v. 询问",
    antonym: "lose v. 失去",
    phrases: ["acquire knowledge 获得知识", "acquire a taste for 对……产生兴趣"],
    examples: [
      { en: "She acquired a good knowledge of English.", zh: "她掌握了很好的英语知识。" },
      { en: "The company acquired a rival firm.", zh: "这家公司收购了一家竞争对手。" }
    ],
    level: 1
  },
  {
    word: "adapt",
    phonetic: "/əˈdæpt/",
    pos: "v.",
    meaning: "适应；改编",
    forms: "adapts / adapted / adapting",
    derivatives: "adaptation n. 适应；改编；adaptable adj. 能适应的",
    similar: "adopt v. 采用；收养",
    antonym: "resist v. 抗拒",
    phrases: ["adapt to 适应", "adapt A for B 为 B 改编 A"],
    examples: [
      { en: "It took time to adapt to the new environment.", zh: "适应新环境需要时间。" },
      { en: "The novel was adapted for the screen.", zh: "这部小说被改编成了影视作品。" }
    ],
    level: 1
  },
  {
    word: "adequate",
    phonetic: "/ˈædɪkwət/",
    pos: "adj.",
    meaning: "足够的；适当的",
    forms: "more adequate / most adequate",
    derivatives: "adequacy n. 足够；adequately adv. 充分地",
    similar: "advocate v./n. 拥护；拥护者",
    antonym: "inadequate adj. 不充分的",
    phrases: ["be adequate for 足够应付……", "adequate supply 充足的供应"],
    examples: [
      { en: "The room has adequate space for ten people.", zh: "这个房间有足够十个人用的空间。" },
      { en: "His salary is adequate to support the family.", zh: "他的薪水足以养家。" }
    ],
    level: 1
  },
  {
    word: "advocate",
    phonetic: "/ˈædvəkeɪt/",
    pos: "v./n.",
    meaning: "提倡；拥护（者）",
    forms: "advocates / advocated / advocating",
    derivatives: "advocacy n. 拥护；提倡",
    similar: "adequate adj. 足够的",
    antonym: "oppose v. 反对",
    phrases: ["advocate for 为……辩护；提倡", "a strong advocate of ……的坚定拥护者"],
    examples: [
      { en: "Many experts advocate a balanced diet.", zh: "许多专家提倡均衡饮食。" },
      { en: "He is a strong advocate of reform.", zh: "他是改革的坚定拥护者。" }
    ],
    level: 1
  },
  {
    word: "ambiguous",
    phonetic: "/æmˈbɪɡjuəs/",
    pos: "adj.",
    meaning: "含糊的；模棱两可的",
    forms: "more ambiguous / most ambiguous",
    derivatives: "ambiguity n. 含糊；歧义；ambiguously adv. 模棱两可地",
    similar: "ambitious adj. 有雄心的",
    antonym: "explicit adj. 明确的",
    phrases: ["an ambiguous answer 模棱两可的回答", "remain ambiguous 仍然含糊不清"],
    examples: [
      { en: "His answer was deliberately ambiguous.", zh: "他的回答故意含糊其辞。" },
      { en: "The contract contains an ambiguous clause.", zh: "合同里有一条模棱两可的条款。" }
    ],
    level: 1
  },
  {
    word: "anticipate",
    phonetic: "/ænˈtɪsɪpeɪt/",
    pos: "v.",
    meaning: "预期；预见；预先准备",
    forms: "anticipates / anticipated / anticipating",
    derivatives: "anticipation n. 预期；期待",
    similar: "participate v. 参加",
    antonym: "overlook v. 忽视",
    phrases: ["anticipate doing sth. 预期做某事", "as anticipated 如预期那样"],
    examples: [
      { en: "We anticipate that demand will grow.", zh: "我们预计需求将会增长。" },
      { en: "He anticipated the question and answered first.", zh: "他预料到这个问题，抢先回答了。" }
    ],
    level: 1
  },
  {
    word: "apparent",
    phonetic: "/əˈpærənt/",
    pos: "adj.",
    meaning: "明显的；表面上的",
    forms: "more apparent / most apparent",
    derivatives: "apparently adv. 显然；表面上",
    similar: "appoint v. 任命",
    antonym: "hidden adj. 隐藏的",
    phrases: ["be apparent to 对……而言很明显", "for no apparent reason 无缘无故地"],
    examples: [
      { en: "It was apparent that she was tired.", zh: "显然她累了。" },
      { en: "His apparent calm hid his real anger.", zh: "他表面的平静掩盖了真实的愤怒。" }
    ],
    level: 1
  },
  {
    word: "appeal",
    phonetic: "/əˈpiːl/",
    pos: "v./n.",
    meaning: "呼吁；吸引；上诉",
    forms: "appeals / appealed / appealing",
    derivatives: "appealing adj. 有吸引力的；恳求的",
    similar: "appear v. 出现",
    antonym: "repel v. 排斥；使厌恶",
    phrases: ["appeal to 吸引；呼吁；上诉", "make an appeal 发出呼吁"],
    examples: [
      { en: "The design appeals to young people.", zh: "这个设计很吸引年轻人。" },
      { en: "They appealed to the public for help.", zh: "他们呼吁公众提供帮助。" }
    ],
    level: 1
  },

  // ============ 第 2 关 ============
  {
    word: "arbitrary",
    phonetic: "/ˈɑːrbɪtreri/",
    pos: "adj.",
    meaning: "任意的；专断的",
    forms: "more arbitrary / most arbitrary",
    derivatives: "arbitrarily adv. 任意地；专断地",
    similar: "auxiliary adj. 辅助的",
    antonym: "rational adj. 合理的",
    phrases: ["an arbitrary decision 武断的决定", "arbitrary rules 任意的规则"],
    examples: [
      { en: "The choice of color was entirely arbitrary.", zh: "颜色的选择完全是随意的。" },
      { en: "He made an arbitrary decision without consulting us.", zh: "他不征求我们的意见就做出了武断的决定。" }
    ],
    level: 2
  },
  {
    word: "assess",
    phonetic: "/əˈses/",
    pos: "v.",
    meaning: "评估；估价",
    forms: "assesses / assessed / assessing",
    derivatives: "assessment n. 评估；估价",
    similar: "access n. 通道；访问",
    antonym: "overlook v. 忽视",
    phrases: ["assess the impact 评估影响", "assess the value 估价"],
    examples: [
      { en: "We need to assess the risks first.", zh: "我们需要先评估风险。" },
      { en: "The damage was assessed at one million dollars.", zh: "损失被评估为一百万美元。" }
    ],
    level: 2
  },
  {
    word: "attribute",
    phonetic: "/əˈtrɪbjuːt/",
    pos: "v./n.",
    meaning: "把……归因于；属性",
    forms: "attributes / attributed / attributing",
    derivatives: "attribution n. 归因；归属",
    similar: "contribute v. 贡献；促成",
    antonym: "deny v. 否认",
    phrases: ["attribute A to B 把 A 归因于 B", "a key attribute 关键特征"],
    examples: [
      { en: "She attributes her success to hard work.", zh: "她把成功归因于勤奋。" },
      { en: "Patience is an important attribute of a teacher.", zh: "耐心是教师的重要品质。" }
    ],
    level: 2
  },
  {
    word: "capacity",
    phonetic: "/kəˈpæsəti/",
    pos: "n.",
    meaning: "容量；能力",
    forms: "capacities（复数）",
    derivatives: "capable adj. 有能力的",
    similar: "capability n. 能力",
    antonym: "inability n. 无能力",
    phrases: ["the capacity to do sth. 做某事的能力", "at full capacity 满负荷"],
    examples: [
      { en: "The hall has a seating capacity of 2,000.", zh: "这个大厅能容纳两千人。" },
      { en: "She has a great capacity for learning languages.", zh: "她有很强的语言学习能力。" }
    ],
    level: 2
  },
  {
    word: "circulate",
    phonetic: "/ˈsɜːrkjəleɪt/",
    pos: "v.",
    meaning: "循环；流通；传播",
    forms: "circulates / circulated / circulating",
    derivatives: "circulation n. 循环；流通；发行量",
    similar: "circular adj. 圆形的",
    antonym: "stagnate v. 停滞",
    phrases: ["circulate among 在……中传播", "circulate blood 促进血液循环"],
    examples: [
      { en: "Blood circulates through the body.", zh: "血液在全身循环。" },
      { en: "Rumors circulated among the staff.", zh: "谣言在员工中流传。" }
    ],
    level: 2
  },
  {
    word: "coherent",
    phonetic: "/koʊˈhɪrənt/",
    pos: "adj.",
    meaning: "连贯的；一致的",
    forms: "more coherent / most coherent",
    derivatives: "coherence n. 连贯性；一致性",
    similar: "inherent adj. 固有的",
    antonym: "incoherent adj. 不连贯的",
    phrases: ["a coherent argument 连贯的论证", "a coherent whole 连贯的整体"],
    examples: [
      { en: "He gave a clear and coherent speech.", zh: "他发表了一篇清晰连贯的演讲。" },
      { en: "The essay lacks a coherent structure.", zh: "这篇文章缺乏连贯的结构。" }
    ],
    level: 2
  },
  {
    word: "coincide",
    phonetic: "/ˌkoʊɪnˈsaɪd/",
    pos: "v.",
    meaning: "同时发生；巧合；一致",
    forms: "coincides / coincided / coinciding",
    derivatives: "coincidence n. 巧合；一致",
    similar: "collide v. 碰撞",
    antonym: "differ v. 不同",
    phrases: ["coincide with 与……同时发生；与……一致"],
    examples: [
      { en: "My holiday coincides with the festival.", zh: "我的假期恰逢这个节日。" },
      { en: "Their interests coincide on this issue.", zh: "他们在这个问题上利益一致。" }
    ],
    level: 2
  },
  {
    word: "collapse",
    phonetic: "/kəˈlæps/",
    pos: "v./n.",
    meaning: "倒塌；崩溃；晕倒",
    forms: "collapses / collapsed / collapsing",
    derivatives: "collapsible adj. 可折叠的",
    similar: "collide v. 碰撞",
    antonym: "stand v. 矗立；屹立",
    phrases: ["collapse into 倒塌成……", "on the verge of collapse 濒临崩溃"],
    examples: [
      { en: "The bridge collapsed in the flood.", zh: "这座桥在洪水中倒塌了。" },
      { en: "He collapsed from exhaustion.", zh: "他因疲惫而晕倒。" }
    ],
    level: 2
  },
  {
    word: "commence",
    phonetic: "/kəˈmens/",
    pos: "v.",
    meaning: "开始；着手",
    forms: "commences / commenced / commencing",
    derivatives: "commencement n. 开始；毕业典礼",
    similar: "commerce n. 商业",
    antonym: "cease v. 停止",
    phrases: ["commence doing sth. 开始做某事", "commence with 以……开始"],
    examples: [
      { en: "The ceremony will commence at nine.", zh: "典礼将于九点开始。" },
      { en: "We commenced work on the project.", zh: "我们开始了这个项目的工作。" }
    ],
    level: 2
  },
  {
    word: "compensate",
    phonetic: "/ˈkɑːmpenseɪt/",
    pos: "v.",
    meaning: "补偿；赔偿",
    forms: "compensates / compensated / compensating",
    derivatives: "compensation n. 补偿；赔偿金",
    similar: "condense v. 浓缩",
    antonym: "deprive v. 剥夺",
    phrases: ["compensate for 弥补；补偿", "compensate sb. for sth. 因……赔偿某人"],
    examples: [
      { en: "Nothing can compensate for the loss of time.", zh: "时间的损失无法弥补。" },
      { en: "The company compensated workers for overtime.", zh: "公司因加班补偿了工人。" }
    ],
    level: 2
  },
  {
    word: "comprehensive",
    phonetic: "/ˌkɑːmprɪˈhensɪv/",
    pos: "adj.",
    meaning: "全面的；综合的",
    forms: "more comprehensive / most comprehensive",
    derivatives: "comprehensively adv. 全面地",
    similar: "comprehensible adj. 可理解的",
    antonym: "partial adj. 部分的",
    phrases: ["a comprehensive review 全面的审查", "comprehensive coverage 全面覆盖"],
    examples: [
      { en: "The book gives a comprehensive overview of history.", zh: "这本书对历史做了全面概述。" },
      { en: "We made a comprehensive plan.", zh: "我们制定了一个全面的计划。" }
    ],
    level: 2
  },
  {
    word: "conceive",
    phonetic: "/kənˈsiːv/",
    pos: "v.",
    meaning: "构想；设想；怀孕",
    forms: "conceives / conceived / conceiving",
    derivatives: "conception n. 构想；怀孕；conceivable adj. 可想象的",
    similar: "deceive v. 欺骗",
    antonym: "dismiss v. 不再考虑",
    phrases: ["conceive of 想象；设想", "conceive a plan 构思一个计划"],
    examples: [
      { en: "It is hard to conceive of life without the Internet.", zh: "很难想象没有互联网的生活。" },
      { en: "She conceived the idea for the novel.", zh: "她构思了这部小说的想法。" }
    ],
    level: 2
  },
  {
    word: "condemn",
    phonetic: "/kənˈdem/",
    pos: "v.",
    meaning: "谴责；判刑",
    forms: "condemns / condemned / condemning",
    derivatives: "condemnation n. 谴责；定罪",
    similar: "condense v. 浓缩",
    antonym: "praise v. 赞扬",
    phrases: ["condemn sb. for 因……谴责某人", "be condemned to death 被判处死刑"],
    examples: [
      { en: "The government condemned the attack.", zh: "政府谴责了这次袭击。" },
      { en: "He was condemned to five years in prison.", zh: "他被判处五年监禁。" }
    ],
    level: 2
  },
  {
    word: "confront",
    phonetic: "/kənˈfrʌnt/",
    pos: "v.",
    meaning: "面对；对抗；对峙",
    forms: "confronts / confronted / confronting",
    derivatives: "confrontation n. 对抗；冲突",
    similar: "confirm v. 确认",
    antonym: "avoid v. 回避",
    phrases: ["be confronted with 面对", "confront difficulties 面对困难"],
    examples: [
      { en: "We must confront the problem directly.", zh: "我们必须直接面对这个问题。" },
      { en: "She was confronted with a difficult choice.", zh: "她面临一个艰难的选择。" }
    ],
    level: 2
  },
  {
    word: "constitute",
    phonetic: "/ˈkɑːnstɪtuːt/",
    pos: "v.",
    meaning: "构成；组成",
    forms: "constitutes / constituted / constituting",
    derivatives: "constitution n. 构成；宪法；体质",
    similar: "substitute v. 代替",
    antonym: "dissolve v. 解散",
    phrases: ["constitute a threat 构成威胁", "constitute a majority 占多数"],
    examples: [
      { en: "Women constitute nearly half of the workforce.", zh: "女性占劳动力的近一半。" },
      { en: "This constitutes a serious threat to safety.", zh: "这对安全构成了严重威胁。" }
    ],
    level: 2
  },

  // ============ 第 3 关 ============
  {
    word: "contradict",
    phonetic: "/ˌkɑːntrəˈdɪkt/",
    pos: "v.",
    meaning: "反驳；与……矛盾",
    forms: "contradicts / contradicted / contradicting",
    derivatives: "contradiction n. 矛盾；反驳；contradictory adj. 相互矛盾的",
    similar: "contract n. 合同；v. 收缩",
    antonym: "confirm v. 证实",
    phrases: ["contradict oneself 自相矛盾", "contradict the evidence 与证据矛盾"],
    examples: [
      { en: "His actions contradict his words.", zh: "他的行为与言语相矛盾。" },
      { en: "Don't contradict your teacher in class.", zh: "别在课堂上顶撞老师。" }
    ],
    level: 3
  },
  {
    word: "controversy",
    phonetic: "/ˈkɑːntrəvɜːrsi/",
    pos: "n.",
    meaning: "争议；争论",
    forms: "controversies（复数）",
    derivatives: "controversial adj. 有争议的",
    similar: "conversely adv. 相反地",
    antonym: "consensus n. 共识",
    phrases: ["cause controversy 引发争议", "a heated controversy 激烈的争论"],
    examples: [
      { en: "The decision caused great controversy.", zh: "这个决定引起了很大争议。" },
      { en: "There is controversy over the new policy.", zh: "新政策存在争议。" }
    ],
    level: 3
  },
  {
    word: "criterion",
    phonetic: "/kraɪˈtɪriən/",
    pos: "n.",
    meaning: "标准；准则",
    forms: "criteria（复数）",
    derivatives: "critical adj. 关键的；批判的",
    similar: "criticism n. 批评",
    antonym: "—",
    phrases: ["meet the criterion 符合标准", "a criterion for ……的标准"],
    examples: [
      { en: "The main criterion for success is quality.", zh: "成功的主要标准是质量。" },
      { en: "What criteria do you use to judge?", zh: "你用什么标准来判断？" }
    ],
    level: 3
  },
  {
    word: "dedicate",
    phonetic: "/ˈdedɪkeɪt/",
    pos: "v.",
    meaning: "奉献；致力于",
    forms: "dedicates / dedicated / dedicating",
    derivatives: "dedication n. 奉献；dedicated adj. 专注的；献身的",
    similar: "delicate adj. 精致的；脆弱的",
    antonym: "abandon v. 放弃",
    phrases: ["dedicate oneself to 献身于", "dedicate A to B 把 A 献给 B"],
    examples: [
      { en: "She dedicated her life to education.", zh: "她把一生献给了教育事业。" },
      { en: "He dedicated the book to his parents.", zh: "他把这本书献给父母。" }
    ],
    level: 3
  },
  {
    word: "deteriorate",
    phonetic: "/dɪˈtɪriəreɪt/",
    pos: "v.",
    meaning: "恶化；退化",
    forms: "deteriorates / deteriorated / deteriorating",
    derivatives: "deterioration n. 恶化；退化",
    similar: "determine v. 决定",
    antonym: "improve v. 改善",
    phrases: ["deteriorate into 恶化成……", "deteriorate rapidly 迅速恶化"],
    examples: [
      { en: "The patient's condition deteriorated overnight.", zh: "病人的病情一夜之间恶化了。" },
      { en: "Relations between the two countries deteriorated.", zh: "两国关系恶化了。" }
    ],
    level: 3
  },
  {
    word: "dilemma",
    phonetic: "/dɪˈlemə/",
    pos: "n.",
    meaning: "困境；进退两难",
    forms: "dilemmas（复数）",
    derivatives: "—",
    similar: "diploma n. 文凭",
    antonym: "—",
    phrases: ["be in a dilemma 陷入两难", "face a dilemma 面临两难"],
    examples: [
      { en: "She was in a dilemma about whether to go.", zh: "她在去不去的问题上左右为难。" },
      { en: "The manager faced a moral dilemma.", zh: "经理面临道德困境。" }
    ],
    level: 3
  },
  {
    word: "diminish",
    phonetic: "/dɪˈmɪnɪʃ/",
    pos: "v.",
    meaning: "减少；缩小；减弱",
    forms: "diminishes / diminished / diminishing",
    derivatives: "diminution n. 减少；缩小",
    similar: "demolish v. 拆除",
    antonym: "increase v. 增加",
    phrases: ["diminish with 随着……减少", "diminish the importance 削弱重要性"],
    examples: [
      { en: "The pain gradually diminished.", zh: "疼痛逐渐减轻了。" },
      { en: "Nothing diminished her enthusiasm.", zh: "什么也无法减弱她的热情。" }
    ],
    level: 3
  },
  {
    word: "discriminate",
    phonetic: "/dɪˈskrɪmɪneɪt/",
    pos: "v.",
    meaning: "歧视；区分",
    forms: "discriminates / discriminated / discriminating",
    derivatives: "discrimination n. 歧视；区别",
    similar: "disseminate v. 传播",
    antonym: "—",
    phrases: ["discriminate against 歧视", "discriminate between 区分"],
    examples: [
      { en: "It is illegal to discriminate against anyone.", zh: "歧视任何人是违法的。" },
      { en: "Babies can discriminate between colors.", zh: "婴儿能区分颜色。" }
    ],
    level: 3
  },
  {
    word: "eliminate",
    phonetic: "/ɪˈlɪmɪneɪt/",
    pos: "v.",
    meaning: "消除；淘汰",
    forms: "eliminates / eliminated / eliminating",
    derivatives: "elimination n. 消除；淘汰",
    similar: "illuminate v. 照亮；阐明",
    antonym: "retain v. 保留",
    phrases: ["eliminate errors 消除错误", "be eliminated from 从……中被淘汰"],
    examples: [
      { en: "The new system eliminates many errors.", zh: "新系统消除了许多错误。" },
      { en: "Our team was eliminated in the first round.", zh: "我们队在第一轮就被淘汰了。" }
    ],
    level: 3
  },
  {
    word: "emphasize",
    phonetic: "/ˈemfəsaɪz/",
    pos: "v.",
    meaning: "强调；重视",
    forms: "emphasizes / emphasized / emphasizing",
    derivatives: "emphasis n. 强调；重点",
    similar: "empathize v. 产生共鸣",
    antonym: "ignore v. 忽视",
    phrases: ["emphasize the importance 强调重要性", "cannot emphasize...too much 再怎么强调也不为过"],
    examples: [
      { en: "The teacher emphasized the importance of practice.", zh: "老师强调了练习的重要性。" },
      { en: "I must emphasize that safety comes first.", zh: "我必须强调安全第一。" }
    ],
    level: 3
  },
  {
    word: "endeavor",
    phonetic: "/ɪnˈdevər/",
    pos: "v./n.",
    meaning: "努力；尽力",
    forms: "endeavors / endeavored / endeavoring",
    derivatives: "—",
    similar: "endure v. 忍受",
    antonym: "abandon v. 放弃",
    phrases: ["endeavor to do sth. 努力做某事", "make every endeavor 尽一切努力"],
    examples: [
      { en: "We endeavor to provide good service.", zh: "我们努力提供优质服务。" },
      { en: "He made every endeavor to finish on time.", zh: "他尽一切努力按时完成。" }
    ],
    level: 3
  },
  {
    word: "enhance",
    phonetic: "/ɪnˈhæns/",
    pos: "v.",
    meaning: "提高；增强",
    forms: "enhances / enhanced / enhancing",
    derivatives: "enhancement n. 增强；提高",
    similar: "enforce v. 执行",
    antonym: "weaken v. 削弱",
    phrases: ["enhance efficiency 提高效率", "enhance the quality 提升质量"],
    examples: [
      { en: "Exercise can enhance your health.", zh: "锻炼能增进健康。" },
      { en: "The new design enhances the product's appeal.", zh: "新设计提升了产品的吸引力。" }
    ],
    level: 3
  },
  {
    word: "equivalent",
    phonetic: "/ɪˈkwɪvələnt/",
    pos: "adj./n.",
    meaning: "相等的；等价物",
    forms: "equivalents（复数）",
    derivatives: "equivalence n. 相等；等价",
    similar: "evident adj. 明显的",
    antonym: "different adj. 不同的",
    phrases: ["be equivalent to 相当于；等同于", "an equivalent of ……的等价物"],
    examples: [
      { en: "One mile is equivalent to 1.6 kilometers.", zh: "一英里相当于 1.6 公里。" },
      { en: "Is there an English equivalent for this word?", zh: "这个词有对应的英语说法吗？" }
    ],
    level: 3
  },
  {
    word: "evaluate",
    phonetic: "/ɪˈvæljueɪt/",
    pos: "v.",
    meaning: "评价；评估",
    forms: "evaluates / evaluated / evaluating",
    derivatives: "evaluation n. 评价；评估",
    similar: "evacuate v. 疏散",
    antonym: "—",
    phrases: ["evaluate the performance 评估表现", "evaluate the results 评估结果"],
    examples: [
      { en: "We need to evaluate the plan carefully.", zh: "我们需要仔细评估这个计划。" },
      { en: "Teachers evaluate students' progress each term.", zh: "老师每学期评估学生的进步。" }
    ],
    level: 3
  },
  {
    word: "exaggerate",
    phonetic: "/ɪɡˈzædʒəreɪt/",
    pos: "v.",
    meaning: "夸大；夸张",
    forms: "exaggerates / exaggerated / exaggerating",
    derivatives: "exaggeration n. 夸张；夸大",
    similar: "exasperate v. 激怒",
    antonym: "understate v. 轻描淡写",
    phrases: ["exaggerate the truth 夸大事实", "without exaggeration 毫不夸张地说"],
    examples: [
      { en: "Don't exaggerate the difficulties.", zh: "别夸大困难。" },
      { en: "He tends to exaggerate his achievements.", zh: "他倾向于夸大自己的成就。" }
    ],
    level: 3
  },

  // ============ 第 4 关（多音节、低频） ============
  {
    word: "fluctuate",
    phonetic: "/ˈflʌktʃueɪt/",
    pos: "v.",
    meaning: "波动；起伏",
    forms: "fluctuates / fluctuated / fluctuating",
    derivatives: "fluctuation n. 波动；起伏",
    similar: "formulate v. 制定",
    antonym: "stabilize v. 稳定",
    phrases: ["fluctuate between 在……之间波动", "fluctuate with 随……波动"],
    examples: [
      { en: "Prices fluctuate with the seasons.", zh: "价格随季节波动。" },
      { en: "His mood fluctuated between hope and despair.", zh: "他的情绪在希望与绝望之间波动。" }
    ],
    level: 4
  },
  {
    word: "formulate",
    phonetic: "/ˈfɔːrmjuleɪt/",
    pos: "v.",
    meaning: "制定；系统地阐述",
    forms: "formulates / formulated / formulating",
    derivatives: "formulation n. 制定；阐述",
    similar: "fluctuate v. 波动",
    antonym: "—",
    phrases: ["formulate a policy 制定政策", "formulate a theory 阐述理论"],
    examples: [
      { en: "The committee formulated a new policy.", zh: "委员会制定了新政策。" },
      { en: "He struggled to formulate his ideas.", zh: "他费劲地组织表达自己的想法。" }
    ],
    level: 4
  },
  {
    word: "hypothesis",
    phonetic: "/haɪˈpɑːθəsɪs/",
    pos: "n.",
    meaning: "假说；假设",
    forms: "hypotheses（复数）",
    derivatives: "hypothetical adj. 假设的",
    similar: "hypocrisy n. 虚伪",
    antonym: "fact n. 事实",
    phrases: ["put forward a hypothesis 提出假设", "test a hypothesis 检验假设"],
    examples: [
      { en: "The experiment supports the hypothesis.", zh: "实验支持这个假设。" },
      { en: "Scientists tested the hypothesis with new data.", zh: "科学家用新数据检验了这一假设。" }
    ],
    level: 4
  },
  {
    word: "inevitable",
    phonetic: "/ɪnˈevɪtəbl/",
    pos: "adj.",
    meaning: "不可避免的；必然的",
    forms: "—",
    derivatives: "inevitably adv. 不可避免地",
    similar: "invincible adj. 无敌的",
    antonym: "avoidable adj. 可避免的",
    phrases: ["an inevitable result 必然的结果", "it is inevitable that 不可避免的是"],
    examples: [
      { en: "Change is inevitable.", zh: "变化是不可避免的。" },
      { en: "It was inevitable that prices would rise.", zh: "物价上涨是不可避免的。" }
    ],
    level: 4
  },
  {
    word: "innovative",
    phonetic: "/ˈɪnəveɪtɪv/",
    pos: "adj.",
    meaning: "创新的；革新的",
    forms: "more innovative / most innovative",
    derivatives: "innovation n. 创新；innovate v. 创新",
    similar: "initiative n. 主动性",
    antonym: "conventional adj. 传统的",
    phrases: ["innovative ideas 创新的想法", "an innovative approach 创新的方法"],
    examples: [
      { en: "The company is known for innovative designs.", zh: "这家公司以创新设计闻名。" },
      { en: "We need an innovative solution to the problem.", zh: "我们需要创新的解决方案。" }
    ],
    level: 4
  },
  {
    word: "integrate",
    phonetic: "/ˈɪntɪɡreɪt/",
    pos: "v.",
    meaning: "整合；融合",
    forms: "integrates / integrated / integrating",
    derivatives: "integration n. 整合；一体化",
    similar: "interrogate v. 审问",
    antonym: "separate v. 分离",
    phrases: ["integrate into 融入", "integrate A with B 将 A 与 B 整合"],
    examples: [
      { en: "Newcomers gradually integrated into the community.", zh: "新来者逐渐融入了社区。" },
      { en: "The system integrates data from different sources.", zh: "该系统整合了不同来源的数据。" }
    ],
    level: 4
  },
  {
    word: "manipulate",
    phonetic: "/məˈnɪpjuleɪt/",
    pos: "v.",
    meaning: "操纵；熟练操作",
    forms: "manipulates / manipulated / manipulating",
    derivatives: "manipulation n. 操纵；操作",
    similar: "manufacture v. 制造",
    antonym: "—",
    phrases: ["manipulate data 处理数据", "manipulate public opinion 操纵舆论"],
    examples: [
      { en: "He manipulated the figures to hide the loss.", zh: "他篡改数字以掩盖亏损。" },
      { en: "Doctors can manipulate tiny instruments.", zh: "医生能熟练操作微型器械。" }
    ],
    level: 4
  },
  {
    word: "negotiate",
    phonetic: "/nɪˈɡoʊʃieɪt/",
    pos: "v.",
    meaning: "谈判；协商",
    forms: "negotiates / negotiated / negotiating",
    derivatives: "negotiation n. 谈判；协商",
    similar: "negative adj. 消极的",
    antonym: "impose v. 强加",
    phrases: ["negotiate with 与……谈判", "negotiate a deal 谈成一笔交易"],
    examples: [
      { en: "The two sides negotiated for three days.", zh: "双方谈判了三天。" },
      { en: "She negotiated a higher salary.", zh: "她通过谈判争取到更高的薪水。" }
    ],
    level: 4
  },
  {
    word: "phenomenon",
    phonetic: "/fəˈnɑːmɪnən/",
    pos: "n.",
    meaning: "现象",
    forms: "phenomena（复数）",
    derivatives: "phenomenal adj. 非凡的",
    similar: "philosophy n. 哲学",
    antonym: "—",
    phrases: ["a natural phenomenon 自然现象", "a social phenomenon 社会现象"],
    examples: [
      { en: "The northern lights are a natural phenomenon.", zh: "北极光是一种自然现象。" },
      { en: "The show became a cultural phenomenon.", zh: "这个节目成了一种文化现象。" }
    ],
    level: 4
  },
  {
    word: "predominantly",
    phonetic: "/prɪˈdɑːmɪnəntli/",
    pos: "adv.",
    meaning: "主要地；占主导地",
    forms: "—",
    derivatives: "predominant adj. 占主导的；predominance n. 主导地位",
    similar: "preliminary adj. 初步的",
    antonym: "secondarily adv. 次要地",
    phrases: ["predominantly female 以女性为主", "predominantly rural 以农村为主"],
    examples: [
      { en: "The audience was predominantly young.", zh: "观众以年轻人为主。" },
      { en: "The region is predominantly agricultural.", zh: "该地区以农业为主。" }
    ],
    level: 4
  },
  {
    word: "sophisticated",
    phonetic: "/səˈfɪstɪkeɪtɪd/",
    pos: "adj.",
    meaning: "复杂的；精密的；老练的",
    forms: "more sophisticated / most sophisticated",
    derivatives: "sophistication n. 复杂；老练",
    similar: "spontaneous adj. 自发的",
    antonym: "simple adj. 简单的",
    phrases: ["sophisticated equipment 精密的设备", "a sophisticated audience 老练的观众"],
    examples: [
      { en: "The lab uses sophisticated equipment.", zh: "实验室使用精密设备。" },
      { en: "She is sophisticated and well traveled.", zh: "她见多识广、老练世故。" }
    ],
    level: 4
  },
  {
    word: "spontaneous",
    phonetic: "/spɑːnˈteɪniəs/",
    pos: "adj.",
    meaning: "自发的；自然的",
    forms: "more spontaneous / most spontaneous",
    derivatives: "spontaneity n. 自发性；spontaneously adv. 自发地",
    similar: "simultaneous adj. 同时的",
    antonym: "planned adj. 计划好的",
    phrases: ["spontaneous applause 自发的掌声", "a spontaneous decision 一时冲动的决定"],
    examples: [
      { en: "The crowd broke into spontaneous applause.", zh: "人群爆发出自发的掌声。" },
      { en: "We made a spontaneous decision to travel.", zh: "我们一时兴起决定去旅行。" }
    ],
    level: 4
  },
  {
    word: "substantial",
    phonetic: "/səbˈstænʃl/",
    pos: "adj.",
    meaning: "大量的；实质的",
    forms: "more substantial / most substantial",
    derivatives: "substantially adv. 大幅地；基本上",
    similar: "substitute v. 代替",
    antonym: "negligible adj. 微不足道的",
    phrases: ["a substantial amount 大量", "substantial progress 实质性进展"],
    examples: [
      { en: "They made substantial progress this year.", zh: "他们今年取得了实质性进展。" },
      { en: "He inherited a substantial fortune.", zh: "他继承了一大笔财产。" }
    ],
    level: 4
  },
  {
    word: "vulnerable",
    phonetic: "/ˈvʌlnərəbl/",
    pos: "adj.",
    meaning: "脆弱的；易受伤害的",
    forms: "more vulnerable / most vulnerable",
    derivatives: "vulnerability n. 脆弱性",
    similar: "voluntary adj. 自愿的",
    antonym: "invulnerable adj. 坚不可摧的",
    phrases: ["be vulnerable to 易受……伤害", "a vulnerable group 弱势群体"],
    examples: [
      { en: "Children are vulnerable to disease.", zh: "儿童容易受疾病侵袭。" },
      { en: "The system is vulnerable to attack.", zh: "这个系统容易受到攻击。" }
    ],
    level: 4
  },
  {
    word: "prestige",
    phonetic: "/preˈstiːʒ/",
    pos: "n.",
    meaning: "威望；声望",
    forms: "—",
    derivatives: "prestigious adj. 有声望的",
    similar: "privilege n. 特权",
    antonym: "disgrace n. 耻辱",
    phrases: ["enjoy high prestige 享有很高声望", "national prestige 国家威望"],
    examples: [
      { en: "The university has great prestige.", zh: "这所大学享有很高的声望。" },
      { en: "He enjoys high prestige among his colleagues.", zh: "他在同事中享有很高的威望。" }
    ],
    level: 4
  }
];
