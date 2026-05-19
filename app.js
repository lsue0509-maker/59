const translations = {
  en: {
    nav_home: 'Home', nav_community: 'Community', nav_info: 'School Info', nav_match: 'Match', nav_guide: 'Guide',
    login_id_label: 'School Email or ID', login_nickname_label: 'Nickname', login_type_label: 'Student Type',
    type_korean: 'Korean Student', type_intl: 'International Student', login_lang_label: 'Primary Language (Changes App Language)',
    login_btn: 'Join Community', home_welcome: 'Welcome,', home_subtitle: 'What would you like to do today?',
    card_community_title: 'Community', card_community_desc: 'Q&A and Chat', card_info_title: 'School Info', card_info_desc: 'Registration & Admin',
    card_match_title: '1:1 Match', card_match_desc: 'Language Exchange', card_guide_title: 'English Guide', card_guide_desc: 'Useful Phrases',
    community_title: 'Community Q&A', btn_write: 'Write Post', info_title: 'School Info Board',
    tab_all: 'All', tab_reg: 'Registration', tab_admin: 'Admin',
    match_title: '1:1 Language Exchange', match_desc: 'Find a partner to practice languages and share campus tips.',
    match_btn_start: 'Find a Partner', match_searching: 'Looking for a match...', match_found: 'Match Found! 🎉',
    match_btn_chat: 'Start Chat', match_btn_rematch: 'Find Someone Else', guide_title: 'Guides & Rules',
    guide_tab_phrase: 'English Phrases', guide_tab_rule: 'Privacy Rules',
    modal_title: 'Write a Post', modal_category: 'Category', modal_post_title: 'Title', modal_content: 'Content',
    modal_btn_post: 'Post', modal_btn_cancel: 'Cancel', no_posts: 'No posts yet.',
    speaks: 'Speaks', interests: 'Interests'
  },
  ko: {
    nav_home: '홈', nav_community: '커뮤니티', nav_info: '학교정보', nav_match: '매칭', nav_guide: '가이드',
    login_id_label: '학교 이메일 또는 학번', login_nickname_label: '닉네임', login_type_label: '학생 유형',
    type_korean: '한국인 학생', type_intl: '유학생', login_lang_label: '주 사용 언어 (앱 언어가 변경됩니다)',
    login_btn: '커뮤니티 입장하기', home_welcome: '환영합니다,', home_subtitle: '오늘은 어떤 정보를 찾아볼까요?',
    card_community_title: '커뮤니티', card_community_desc: '질문과 답변', card_info_title: '학교 정보', card_info_desc: '수강신청 및 행정',
    card_match_title: '1:1 매칭', card_match_desc: '언어 교환 및 소통', card_guide_title: '영어 가이드', card_guide_desc: '필수 영어 표현',
    community_title: '커뮤니티 (Q&A)', btn_write: '글쓰기', info_title: '학교 정보 게시판',
    tab_all: '전체', tab_reg: '수강신청', tab_admin: '행정정보',
    match_title: '1:1 언어 교환 매칭', match_desc: '언어 연습과 캠퍼스 팁을 공유할 파트너를 찾아보세요.',
    match_btn_start: '파트너 찾기', match_searching: '매칭 파트너를 찾는 중...', match_found: '매칭 성공! 🎉',
    match_btn_chat: '채팅 시작하기', match_btn_rematch: '다른 파트너 찾기', guide_title: '가이드 및 안전 수칙',
    guide_tab_phrase: '영어 필수 표현', guide_tab_rule: '개인정보 보호 수칙',
    modal_title: '새 글 쓰기', modal_category: '카테고리', modal_post_title: '제목', modal_content: '내용',
    modal_btn_post: '등록', modal_btn_cancel: '취소', no_posts: '아직 등록된 글이 없습니다.',
    speaks: '사용언어', interests: '관심사'
  }
};

let currentLang = 'en';

function translateUI(lang) {
  currentLang = lang === 'Korean' ? 'ko' : 'en';
  const dict = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

function t(key) {
  return translations[currentLang][key] || key;
}

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const views = document.querySelectorAll('.view');
  const mainHeader = document.getElementById('main-header');

  function showView(viewId) {
    views.forEach(v => v.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
    
    navLinks.forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`[data-target="${viewId}"]`);
    if(activeLink) activeLink.classList.add('active');

    if(viewId === 'community-view') renderPosts();
    if(viewId === 'school-info-view') renderSchoolInfo(currentInfoCategory);
    if(viewId === 'guides-view') renderGuides();
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showView(e.target.dataset.target);
    });
  });

  // Auth / Login
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = document.getElementById('login-nickname').value;
    const type = document.getElementById('login-type').value;
    const lang = document.getElementById('login-lang').value;
    
    currentUser = { nickname, type, language: lang, id: Date.now() };
    document.getElementById('welcome-name').textContent = nickname;
    
    // Apply translation
    translateUI(lang);

    mainHeader.classList.remove('hidden');
    showView('home-view');
  });

  // Post Rendering (Community & Info)
  const postList = document.getElementById('post-list');
  const infoList = document.getElementById('info-list');

  function createPostCard(post, isInfoBoard) {
    const card = document.createElement('div');
    card.className = 'post-card';
    
    let commentsHTML = '';
    post.comments.forEach(c => {
      commentsHTML += `<div class="comment"><strong>${c.author}</strong>: ${c.content}</div>`;
    });

    const categoryBadge = post.category ? `<span style="background:var(--bg-color); padding: 2px 8px; border-radius: 4px; font-weight:bold; color:var(--primary-color)">${post.category}</span>` : '';

    card.innerHTML = `
      <div class="post-header">
        ${categoryBadge}
        <span>${post.author} • ${post.timestamp}</span>
      </div>
      <div class="post-title">${post.title}</div>
      <div class="post-content">${post.content}</div>
      <div class="comment-section">
        ${commentsHTML}
        <div class="comment-input-wrap">
          <input type="text" placeholder="..." id="comment-input-${isInfoBoard ? 'info' : 'com'}-${post.id}" style="flex: 1">
          <button class="btn btn-small" onclick="addComment(${post.id}, ${isInfoBoard})">Send</button>
        </div>
      </div>
    `;
    return card;
  }

  function renderPosts() {
    postList.innerHTML = '';
    if(mockPosts.length === 0) {
      postList.innerHTML = `<p style="text-align:center; color: var(--text-light); margin-top:20px;">${t('no_posts')}</p>`;
      return;
    }
    mockPosts.forEach(post => {
      postList.appendChild(createPostCard(post, false));
    });
  }

  // Info Board Tabs
  let currentInfoCategory = 'All';
  document.querySelectorAll('.info-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.info-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      currentInfoCategory = e.target.dataset.category;
      renderSchoolInfo(currentInfoCategory);
    });
  });

  function renderSchoolInfo(category) {
    infoList.innerHTML = '';
    const filtered = category === 'All' ? mockSchoolInfo : mockSchoolInfo.filter(p => p.category === category);
    
    if(filtered.length === 0) {
      infoList.innerHTML = `<p style="text-align:center; color: var(--text-light); margin-top:20px;">${t('no_posts')}</p>`;
      return;
    }
    filtered.forEach(post => {
      infoList.appendChild(createPostCard(post, true));
    });
  }

  window.addComment = (postId, isInfoBoard) => {
    const inputId = `comment-input-${isInfoBoard ? 'info' : 'com'}-${postId}`;
    const input = document.getElementById(inputId);
    const val = input.value.trim();
    if(!val) return;
    
    const targetArray = isInfoBoard ? mockSchoolInfo : mockPosts;
    const post = targetArray.find(p => p.id === postId);
    
    post.comments.push({
      author: currentUser.nickname,
      content: val,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
    
    if(isInfoBoard) renderSchoolInfo(currentInfoCategory);
    else renderPosts();
  };

  // Write Post Modal
  const modal = document.getElementById('modal-write-post');
  let writingBoard = ''; // 'community' or 'school-info'

  document.querySelectorAll('.btn-write-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      writingBoard = e.target.dataset.board;
      if (writingBoard === 'community') {
        document.getElementById('modal-category-group').classList.add('hidden');
      } else {
        document.getElementById('modal-category-group').classList.remove('hidden');
      }
      modal.classList.remove('hidden');
    });
  });

  document.getElementById('btn-cancel-post').addEventListener('click', () => modal.classList.add('hidden'));
  
  document.getElementById('btn-submit-post').addEventListener('click', () => {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    
    if(!title || !content) return;

    const newPost = {
      id: Date.now(),
      author: currentUser.nickname,
      title,
      content,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      comments: []
    };

    if (writingBoard === 'community') {
      newPost.category = 'Q&A';
      mockPosts.unshift(newPost);
      renderPosts();
    } else {
      newPost.category = document.getElementById('post-category').value;
      mockSchoolInfo.unshift(newPost);
      renderSchoolInfo(currentInfoCategory);
    }

    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    modal.classList.add('hidden');
  });

  // Matching Logic
  const uiDefault = document.getElementById('match-ui-default');
  const uiSearching = document.getElementById('match-ui-searching');
  const uiResult = document.getElementById('match-ui-result');
  const matchInfo = document.getElementById('matched-user-info');

  function startMatching() {
    uiDefault.classList.add('hidden');
    uiResult.classList.add('hidden');
    uiSearching.classList.remove('hidden');

    setTimeout(() => {
      uiSearching.classList.add('hidden');
      uiResult.classList.remove('hidden');
      
      const partner = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      matchInfo.innerHTML = `
        <strong>${partner.nickname}</strong><br>
        <span style="font-size:0.9rem; color:var(--text-light)">
          ${t('speaks')}: ${partner.language} • ${t('interests')}: ${partner.interests.join(', ')}
        </span>
      `;
    }, 2000);
  }

  document.getElementById('btn-start-match').addEventListener('click', startMatching);
  document.getElementById('btn-rematch').addEventListener('click', startMatching);

  // Guides
  const guideContent = document.getElementById('guide-content');
  const tabPhrases = document.getElementById('tab-phrases');
  const tabRules = document.getElementById('tab-rules');

  function renderGuides() {
    tabPhrases.classList.add('active');
    tabRules.classList.remove('active');
    
    let html = '';
    englishGuides.forEach(g => {
      html += `<div class="guide-card"><h3>${g.category}</h3>`;
      g.phrases.forEach(p => {
        html += `
          <div class="phrase">
            <div class="en">${p.en}</div>
            <div class="ko">${p.ko}</div>
          </div>
        `;
      });
      html += `</div>`;
    });
    guideContent.innerHTML = html;
  }

  function renderRules() {
    tabRules.classList.add('active');
    tabPhrases.classList.remove('active');
    
    let html = `<div class="guide-card"><h3>Community Safety Rules</h3><ul style="padding-left: 20px; color: var(--text-light);">`;
    privacyRules.forEach(r => {
      html += `<li style="margin-bottom: 8px;">${r}</li>`;
    });
    html += `</ul></div>`;
    guideContent.innerHTML = html;
  }

  tabPhrases.addEventListener('click', renderGuides);
  tabRules.addEventListener('click', renderRules);

});
