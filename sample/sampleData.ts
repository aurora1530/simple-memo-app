export type User = {
  username: string;
  password: string;
};

export type Memo = {
  title: string;
  body: string;
};

export const users: User[] = [
  { username: 'john_doe123', password: 'PaSsWoRd123' },
  { username: 'alice_smith45', password: 'SeCuRePaSs456' },
  { username: 'bob_johnson789', password: 'MyPaSsWoRd789' },
  { username: 'emily_davis10', password: 'StRoNgPaSsWoRd0' },
  { username: 'michael_brown22', password: 'PaSsWoRd1234' },
  { username: 'jessica_wilson34', password: 'SeCuRePaSs123' },
  { username: 'david_miller56', password: 'MySeCuRePaSs01' },
  { username: 'sarah_jones78', password: 'PaSsWoRdStRoNg12' },
  { username: 'kevin_taylor90', password: 'KeViNPaSsWoRd234' },
  { username: 'ashley_thomas12', password: 'AsHlEyPaSs123' },
  { username: 'brian_anderson34', password: 'BrIaNPaSsWoRd232' },
  { username: 'amanda_moore56', password: 'AmAnDaPaSs123' },
  { username: 'christopher_jackson78', password: 'ChRiSpAsSwOrD324' },
  { username: 'nicole_white90', password: 'NiCoLePaSsWoRd324' },
  { username: 'matthew_harris12', password: 'MaTtPaSsWoRd234' },
  { username: 'angela_martin34', password: 'AnGeLaPaSs123' },
  { username: 'ryan_thompson56', password: 'RyAnPaSsWoRd532' },
  { username: 'heather_garcia78', password: 'HeAtHeRpAsS5324' },
  { username: 'daniel_rodriguez90', password: 'DaNiElPaSs123' },
  { username: 'melissa_williams12', password: 'MeLiSsApAsS4324' },
  { username: 'steven_hernandez34', password: 'StEvEnPaSsWoRd4234' },
  { username: 'rebecca_lopez56', password: 'ReBeCcApAsS123' },
  { username: 'joshua_gonzalez78', password: 'JoShUaPaSsWoRd4234' },
  { username: 'lauren_nelson90', password: 'LaUrEnPaSs1234234' },
  { username: 'andrew_perez12', password: 'AnDrEwPaSsWoRd6325' },
  { username: 'tiffany_russell34', password: 'TiFfAnYpAsS123' },
  { username: 'brandon_griffin56', password: 'BrAnDoNpAsS4324' },
  { username: 'katherine_diaz78', password: 'KaThErInEpAsS6532' },
  { username: 'patrick_hayes90', password: 'PaTrIcKpAsS123' },
  { username: 'alexis_myers12', password: 'AlExIsPaSsWoRd432432' },
];

export const japaneseMemos: Memo[] = [
  {
    title: '今日の買い物リスト🍎🥦🍞',
    body: '牛乳、卵、パン、りんご、ブロッコリーを買う。オーガニックのものがいいな。帰りにクリーニングも取りに行くの忘れないようにしないと！',
  },
  {
    title: '週末の旅行計画✈️',
    body: '京都に行く予定。金閣寺、清水寺、嵐山は絶対に行きたい！美味しい京料理も食べたいな。着物レンタルも予約しておこう👘',
  },
  {
    title: '読みたい本リスト📚',
    body: '「ハリー・ポッターと賢者の石」、「思考の整理学」、「サピエンス全史」、「夜は短し歩けよ乙女」。図書館で借りてこよう。',
  },
  {
    title: '誕生日プレゼント🎁',
    body: 'お母さんの誕生日プレゼント何にしよう？🤔 好みがわからないから、一緒に買いに行くのがいいかな。サプライズも考えたけど、失敗したら怖いし…😅',
  },
  {
    title: '来週のTODO📝',
    body: '月曜日：企画書提出、火曜日：クライアントと打ち合わせ、水曜日：資料作成、木曜日：会議、金曜日：報告書作成。週末はゆっくり休みたい…😪',
  },
  {
    title: '映画の感想🎬',
    body: '「君の名は。」を観た。映像がとにかく綺麗で、音楽も最高！ストーリーも感動的で、もう一度観たいと思った。新海誠監督の作品はやっぱりすごい✨',
  },
  {
    title: '今日の献立🍽️',
    body: '鶏肉の照り焼き、ほうれん草のおひたし、味噌汁、ご飯。デザートはフルーツヨーグルトにしようかな。バランスの良い食事を心がけたい！',
  },
  {
    title: '引っ越しの準備📦',
    body: '不用品を処分する、荷造りをする、住所変更の手続きをする、引っ越し業者に見積もりを依頼する。やることがたくさんある…😱',
  },
  {
    title: '今日の目標🔥',
    body: '午前中に仕事を終わらせて、午後はジムに行く！夜は友達とご飯に行く予定だから、それまでにタスクを全部終わらせたい。頑張るぞ💪',
  },
  {
    title: 'ペットの世話🐶🐱',
    body: '犬の散歩に連れて行く、猫のトイレを掃除する、ご飯をあげる、遊んであげる。ペットは癒し…🥰',
  },
  {
    title: '明日の予定🗓️',
    body: '朝一で会議、その後は資料作成に集中。夕方からは友達と飲みに行く🍻 楽しみだな〜！',
  },
  {
    title: '欲しいものリスト🤑',
    body: '新しいパソコン、ワイヤレスイヤホン、旅行用のバックパック。お金貯めないと…💸',
  },
  {
    title: '今日の出来事🍀',
    body: '通勤途中に虹を見た🌈 いいことあるかな？仕事は忙しかったけど、同僚とランチに行って気分転換できた。夜はゆっくりお風呂に入ってリラックスしよう🛁',
  },
  {
    title: '週末何しようかな？🤔',
    body: '映画を観に行く、友達とカフェに行く、家でゆっくり読書をする、公園でピクニックをする、美術館に行く。どれにしようかな…迷う…',
  },
  {
    title: '今日の感謝🙏',
    body: '美味しいご飯が食べられたこと、健康でいられること、家族や友達がいること。当たり前のことに感謝して、毎日を大切に過ごしたい。',
  },
  {
    title: '将来の夢🌟',
    body: '世界一周旅行をする、自分の家を持つ、起業する、本を出版する。夢を叶えるために、今できることを頑張ろう！',
  },
  {
    title: '今日嬉しかったこと😊',
    body: '仕事で褒められた、美味しいコーヒーを飲んだ、好きなアーティストの新曲がリリースされた。小さな幸せを大切にしたい。',
  },
  {
    title: '最近気になるニュース🤔',
    body: 'AI技術の進化、環境問題、新しい働き方。もっと詳しく調べてみよう。',
  },
  {
    title: '今日の反省点😓',
    body: 'つい夜更かししてしまった、時間を無駄にしてしまった、人に優しくできなかった。明日はもっと良い1日にしよう！',
  },
  {
    title: '会いたい人リスト🤝',
    body: '昔の友達、恩師、尊敬する人。連絡を取ってみようかな。',
  },
  {
    title: '最近ハマってること🎮',
    body: 'ゲーム、アニメ、漫画、ドラマ。時間を忘れて没頭してしまう…😅',
  },
  {
    title: '行きたい場所リスト✈️',
    body: 'ハワイ、イタリア、フランス、イギリス、日本。いつか全部制覇したい！',
  },
  {
    title: '今日美味しかったもの😋',
    body: '近所のカフェのケーキ、手作りのパスタ、お母さんの作ったカレー。美味しいものを食べると幸せな気分になる🥰',
  },
  {
    title: 'やってみたいことリスト📝',
    body: 'スカイダイビング、バンジージャンプ、海外留学、ボランティア活動。人生一度きりだから、色々なことに挑戦したい！',
  },
  {
    title: '今日笑ったこと🤣',
    body: '友達の面白い話、テレビ番組、SNSの投稿。笑うって大切！',
  },
  {
    title: '好きな言葉🗣️',
    body: '「ありがとう」、「大丈夫」、「なんとかなる」。前向きな言葉が好き。',
  },
  {
    title: '今日あったこと',
    body: '今日は、久しぶりに大学の時の友人と会った。\n場所は、友人が予約してくれた渋谷のおしゃれなカフェ。\n\nカフェラテを飲みながら、お互いの近況報告。仕事のことや、趣味のことなど話は尽きなかった。\n大学時代からの友人なので、お互いのことをよく理解しあえて、とても楽しい時間を過ごせた。\n\n来月は、一緒に旅行に行く計画も立てたので、今から楽しみだ。',
  },
  {
    title: '感動したこと',
    body: '今日、道端で小さな男の子が転んで泣いているのを見かけた。\n周りの大人は見て見ぬふり。\n\nでも、中学生ぐらいの女の子が、男の子に駆け寄り、優しく声をかけて、持っていたハンカチで涙を拭いてあげていた。\n\n女の子の優しさに感動して、私も、困っている人がいたら、迷わず手を差し伸べられる人になりたいと思った。',
  },
  {
    title: '腹が立ったこと',
    body: '楽しみにしていたドラマの最終回。しかし、ネタバレをSNSで見てしまった。\n\n犯人がわかってしまい、最後の展開も大体予想がついてしまった。\n犯人がわかってしまったドラマほど、つまらないものはない。\n\nネタバレを投稿した人を、少し恨んでしまった。',
  },
  {
    title: '最近買ったもの',
    body: '最近、ずっと欲しかったワイヤレスイヤホンを買った。\n\n今まで使っていた有線イヤホンは、コードが絡まってストレスだった。\nしかし、ワイヤレスイヤホンは、コードがないので、とても快適。\n\n音質も良く、もっと早く買っておけばよかったと少し後悔している。\n値段は、約1万円と少し高かったが、値段相応の価値があると思う。',
  },
  {
    title: '旅行の記録',
    body: '今年の夏休みは、沖縄旅行に行った。\n\n那覇市内のホテルに宿泊。\nレンタカーを借りて、沖縄本島を一周。\n',
  },
];

export const englishMemos: Memo[] = [
  {
    title: 'Meeting with John',
    body: "Discuss project timeline and budget. Prepare presentation slides. Address concerns raised in previous meeting. Don't forget to bring the contract documents.",
  },
  {
    title: 'New workout routine 💪',
    body: 'Monday: Chest and triceps. Tuesday: Back and biceps. Wednesday: Rest. Thursday: Legs and shoulders. Friday: Cardio. Saturday: Yoga. Sunday: Rest. Remember to stretch before and after each workout.',
  },
  {
    title: 'Ideas for blog posts 💡',
    body: 'Write about productivity tips, time management hacks, healthy recipes, travel guides, and book reviews. Research trending topics and keywords. Use engaging visuals.',
  },
  {
    title: 'Grocery shopping list 🛒',
    body: 'Milk, eggs, bread, cheese, fruits (apples, bananas, oranges), vegetables (lettuce, tomatoes, cucumbers), chicken, fish, rice, pasta. Check pantry for existing items.',
  },
  {
    title: "Doctor's appointment reminder 🩺",
    body: 'Schedule appointment with Dr. Smith for annual checkup. Ask about recent blood test results. Discuss any concerns or questions. Bring insurance card and ID.',
  },
  {
    title: 'Car maintenance checklist 🚗',
    body: 'Check tire pressure, oil level, coolant level, brake fluid, windshield wipers, headlights, and taillights. Schedule oil change and tire rotation. Wash and wax the car.',
  },
  {
    title: 'Learn new programming language 💻',
    body: 'Start learning Python. Follow online tutorials and documentation. Practice coding daily. Build small projects to apply knowledge. Join online communities and forums.',
  },
  {
    title: 'Home improvement projects 🔨',
    body: 'Paint living room walls. Install new light fixtures. Organize closet and drawers. Fix leaky faucet. Replace broken tiles. Consider hiring a contractor for larger projects.',
  },
  {
    title: 'Gardening tasks 🌱',
    body: 'Water plants, prune roses, fertilize flowers, weed garden beds, plant new seeds, harvest vegetables. Check for pests and diseases. Enjoy the fresh air and sunshine.',
  },
  {
    title: 'Financial goals 💰',
    body: 'Create a budget, track expenses, save for retirement, pay off debt, invest in stocks and bonds, diversify portfolio. Consult with a financial advisor.',
  },
  {
    title: 'Music practice schedule 🎸',
    body: 'Warm up with scales and arpeggios. Practice new songs and techniques. Record progress and listen back. Learn music theory. Join a band or jam session.',
  },
  {
    title: 'Recipe ideas 🍳',
    body: 'Try new recipes from cookbooks and online sources. Experiment with different cuisines and flavors. Cook healthy and delicious meals. Share recipes with friends and family.',
  },
  {
    title: 'Vacation planning 🌴',
    body: 'Research destinations, compare flight and hotel prices, book accommodations and activities, create itinerary, pack bags, exchange currency, purchase travel insurance.',
  },
  {
    title: 'Language learning goals 🗣️',
    body: 'Practice speaking, listening, reading, and writing. Use language learning apps and websites. Watch movies and TV shows in target language. Find a language partner.',
  },
  {
    title: 'Art project inspiration 🎨',
    body: 'Explore different art styles and techniques. Visit museums and galleries. Collect images and ideas. Experiment with various mediums and materials. Create a mood board.',
  },
  {
    title: 'Fitness goals 🏋️‍♀️',
    body: 'Set realistic goals, create a workout plan, track progress, find a workout buddy, stay motivated, celebrate successes. Focus on overall health and well-being.',
  },
  {
    title: 'Volunteer opportunities ❤️',
    body: 'Research local charities and organizations. Find causes that align with personal values. Donate time, skills, or resources. Make a positive impact on the community.',
  },
  {
    title: 'DIY project ideas 🛠️',
    body: 'Build a bookshelf, create wall art, upcycle old furniture, make candles or soap, sew clothes or accessories. Learn new skills and unleash creativity.',
  },
  {
    title: 'Mindfulness practices 🧘',
    body: 'Practice meditation, deep breathing, yoga, journaling, gratitude exercises. Focus on the present moment. Reduce stress and improve mental well-being.',
  },
  {
    title: 'Self-care activities 🛀',
    body: 'Take a relaxing bath, read a book, listen to music, go for a walk, get a massage, spend time in nature. Prioritize mental and physical health.',
  },
  {
    title: 'Personal development goals 🌱',
    body: 'Learn new skills, read books, attend workshops, take online courses, network with others, seek feedback, step outside comfort zone. Grow personally and professionally.',
  },

  {
    title: 'Stress management techniques 😮‍💨',
    body: 'Practice deep breathing, exercise, listen to calming music, spend time with loved ones, engage in hobbies, get enough sleep. Avoid overworking and negative self-talk.',
  },
  {
    title: 'Healthy habits 🍎',
    body: 'Eat nutritious foods, drink plenty of water, exercise regularly, get enough sleep, practice good hygiene, limit processed foods and sugary drinks. Maintain a balanced lifestyle.',
  },
  {
    title: 'Time management tips ⏰',
    body: 'Prioritize tasks, set deadlines, create a schedule, avoid multitasking, minimize distractions, take breaks, delegate tasks when possible. Use time wisely and efficiently.',
  },
  {
    title: 'Motivational quotes ✨',
    body: 'Collect inspiring quotes from books, movies, speeches, and online sources. Use them as reminders to stay positive, focused, and motivated. Share with others.',
  },
  {
    title: 'Random thoughts and ideas 💭',
    body: 'Write down any thoughts or ideas that come to mind, no matter how silly or insignificant they may seem. Use them as inspiration for creative projects or problem-solving.',
  },
];
