const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const loginForm = document.getElementById('loginForm');
const authMessage = document.getElementById('authMessage');

function addMessage(text, type) {
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getReply(question) {
  const q = question.toLowerCase();

  if (q.includes('مرحبا') || q.includes('السلام')) return 'مرحبا! أنا جاهز لمساعدتك. ماذا تريد من الموقع؟';
  if (q.includes('خدمة') || q.includes('خدمات')) return 'يمكنني مساعدتك في عرض الخدمات أو تعديل محتوى الموقع حسب احتياجك.';
  if (q.includes('سعر') || q.includes('ثمن')) return 'يمكننا مناقشة نسخة احترافية أو مخصصة حسب المطلوب.';
  if (q.includes('تواصل') || q.includes('اتصال')) return 'يمكنك التواصل عبر واتساب أو عبر الهاتف المباشر.';
  if (q.includes('ذكاء') || q.includes('ai')) return 'الموقع يدعم ذكاء اصطناعي بسيط ومهني للرد على الأسئلة الأساسية.';
  if (q.includes('حقوق') || q.includes('copyright')) return 'تمت إضافة حقوق الملكية الخاصة بك في أسفل الصفحة.';

  return 'شكرا لك! هذا موقع جاهز ومخصص. أستطيع مساعدتك في التعديل أو الإضافة أو شرح أي جزء منه.';
}

chatForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;

  addMessage(question, 'user');
  chatInput.value = '';

  setTimeout(() => {
    addMessage(getReply(question), 'assistant');
  }, 600);
});

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === 'admin' && password === '123456') {
    localStorage.setItem('mr4t-role', 'admin');
    authMessage.textContent = 'تم تسجيل الدخول بنجاح';
    window.location.href = 'dashboard.html';
  } else if (username === 'editor' && password === '123456') {
    localStorage.setItem('mr4t-role', 'editor');
    authMessage.textContent = 'تم تسجيل الدخول بنجاح';
    window.location.href = 'dashboard.html';
  } else {
    authMessage.textContent = 'بيانات الدخول غير صحيحة';
  }
});

const role = localStorage.getItem('mr4t-role');
const dashboard = document.getElementById('dashboard');
const roleLabel = document.getElementById('roleLabel');

if (dashboard) {
  if (!role) {
    window.location.href = 'admin.html';
  } else {
    roleLabel.textContent = role === 'admin' ? 'مدير' : 'محرر';
  }
}
