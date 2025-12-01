// ====== Dados dos scripts (protótipo) ======
const DATA = [
  {
    category: 'Saudação inicial',
    items: [
      {
        title: 'Boas-vindas com emojis',
        text: 'Olá! Bem-vindo(a) à Copa Energia, sou {{nome_atendente}}, e irei te auxiliar hoje.\nComo posso ajudar? 🙏😁👍',
      },
    ],
  },
  {
    category: 'Pedido (D2C) / Revenda',
    items: [
      {
        title: 'Verificar atendimento por CEP/endereço',
        text: 'Para verificar se atendemos sua região e o valor do gás, peço que me informe o seu CEP (ex.: {{cep}}) ou endereço completo, por gentileza.',
      },
      {
        title: 'Canal indisponível na região',
        text: 'Desculpe, no momento, este canal de atendimento não está disponível para pedidos na sua região.\nSe possível, peço que verifique uma revenda próxima a você em nosso site: https://www.copaenergia.com.br/encontre-uma-revenda',
      },
      {
        title: 'Pedido encaminhado para revenda',
        text: 'Seu pedido foi enviado para a revenda que atende sua região!\nNúmero do pedido: {{numero_pedido}}\nPrevisão de entrega: {{previsao_entrega}}',
      },
      {
        title: 'Sistema abre às 8h',
        text: 'Desculpa, nosso sistema só abre para entrega às 8h. Peço que retorne após esse horário ou entre em contato diretamente com uma de nossas revendas.',
      },
      {
        title: 'Pedido em andamento, revenda anterior indisponível',
        text: 'Verifiquei no sistema que há um pedido em andamento; infelizmente, a revenda designada não pôde realizá-lo. Estamos tentando contato com outra revenda para atender. Deseja continuar aguardando?',
      },
    ],
  },
  {
    category: 'Sem interação / Reengajar',
    items: [
      { title: 'Checagem rápida', text: 'Ainda está aí? 😅' },
      { title: 'Oferecer ajuda adicional', text: 'Ajudo com mais alguma informação? 😊' },
      { title: 'Perguntar se deseja prosseguir', text: 'Podemos continuar com o atendimento?' },
    ],
  },
  {
    category: 'Encerramento por falta de interação',
    items: [
      {
        title: 'Encerrar com protocolo',
        text: 'Por falta de interação, irei encerrar o atendimento no momento. Caso tenha alguma dúvida ou necessite de mais alguma coisa, pode retornar o contato.\nA Copa Energia agradece seu contato. Se puder, responda à pesquisa de satisfação ao final. Ela nos ajuda a buscar melhorias.\nTenha um ótimo dia! 😄\nSeu protocolo de atendimento é {{protocolo}}.',
      },
      {
        title: 'Encerrar com mensagem cordial',
        text: 'Finalizarei o atendimento neste momento, mas não hesite em nos procurar novamente quando desejar.\nA Copa Energia agradece seu contato. Se puder, responda à pesquisa de satisfação ao final.\nTenha um ótimo dia! 😄\nSeu protocolo de atendimento é {{protocolo}}.',
      },
    ],
  },
  {
    category: 'Outras áreas / Medição individual',
    items: [
      {
        title: 'Direcionamento para medição individualizada',
        text: 'Desculpe, por aqui nosso atendimento é somente para pedidos de botijões de gás e não temos acesso às informações solicitadas. Verifiquei o CPF informado: trata-se de medição individualizada.\nPara atendimento sobre medição individual, por gentileza, entrar em contato: WhatsApp (11) 3004-3002 | Ligação 3004-3002 | Site https://mi.copaenergia.com.br/',
      },
      {
        title: 'Dados para abastecimento (empresarial)',
        text: 'Pode me informar, por favor:\n• Quantidade de tanque: {{quantidade_tanque}}\n• Porcentagens: {{porcentagens}}\n• Data para agendamento do abastecimento: {{data_agendamento}}',
      },
    ],
  },
  {
    category: 'Ser revendedor',
    items: [
      {
        title: 'Cadastro de revenda',
        text: 'Para se cadastrar como revendedor, a solicitação é feita diretamente pelo nosso site.\nPreencha seus dados em: https://www2.liquigas.com.br/sejarevendedor\nApós o envio, nossa equipe entrará em contato assim que possível.',
      },
    ],
  },
  {
    category: 'Trabalhe conosco',
    items: [
      {
        title: 'Enviar currículo / vagas',
        text: 'Para se candidatar e ficar por dentro das oportunidades disponíveis, acesse: https://www.copaenergia.com.br/copaenergia/trabalhe-conosco',
      },
    ],
  },
  {
    category: 'Vazamento (segurança)',
    items: [
      {
        title: 'Orientações de segurança',
        text: '⚠️ Em caso de vazamento de gás, a segurança é primordial.\n- Feche o registro do gás;\n- Não acione interruptores nem utilize aparelhos elétricos;\n- Não acenda fósforos ou isqueiros;\n- Ventile o ambiente abrindo portas e janelas e saia do local;\n- Coloque o botijão em local arejado;\n- Em casos mais graves, ligue Corpo de Bombeiros (193).',
      },
    ],
  },
  {
    category: 'Contato B2B',
    items: [
      {
        title: 'Telefone empresarial',
        text: 'Atendimento Empresarial (B2B): 0800 729 7777',
      },
    ],
  },
];

// ====== Estado ======
const state = {
  category: 'Todas',
  query: '',
  favorites: new Set(JSON.parse(localStorage.getItem('favorites') || '[]')),
  theme: localStorage.getItem('theme') || 'light',
  vars: {
    nome_atendente: '',
    nome_cliente: '',
    protocolo: '',
    numero_pedido: '',
    previsao_entrega: '',
    cep: '',
    cidade: '',
    data_agendamento: '',
    quantidade_tanque: '',
    porcentagens: '',
  },
};

// ====== Utilidades ======
function replaceVars(text) {
  return text.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_, key) => {
    const val = state.vars[key];
    return val ? String(val) : `{{${key}}}`; // mantém placeholder se vazio
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    toast('Copiado para a área de transferência');
  }).catch(() => {
    alert('Não foi possível copiar.');
  });
}

function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.classList.add('show'));
  setTimeout(() => { el.classList.remove('show'); el.remove(); }, 1800);
}

// ====== Renderização ======
function renderCategories() {
  const nav = document.getElementById('categoryNav');
  nav.innerHTML = '';

  const categories = ['Todas', ...DATA.map(d => d.category)];
  categories.forEach(cat => {
    const count = cat === 'Todas' ? DATA.reduce((acc, d) => acc + d.items.length, 0)
                                  : DATA.find(d => d.category === cat).items.length;
    const btn = document.createElement('button');
    btn.className = 'category-item' + (state.category === cat ? ' active' : '');
    btn.innerHTML = `<span class="name">${cat}</span><span class="count">${count}</span>`;
    btn.onclick = () => { state.category = cat; renderCards(); highlightActiveCategory(); };
    nav.appendChild(btn);
  });
}

function highlightActiveCategory() {
  [...document.querySelectorAll('.category-item')].forEach(el => {
    el.classList.toggle('active', el.querySelector('.name').textContent === state.category);
  });
}

function renderCards() {
  const container = document.getElementById('cards');
  container.innerHTML = '';

  const needle = state.query.trim().toLowerCase();
  const list = (state.category === 'Todas' ? DATA.flatMap(d => d.items.map(i => ({...i, category: d.category})))
                                          : DATA.find(d => d.category === state.category).items.map(i => ({...i, category: state.category})));

  const filtered = list.filter(item => {
    if (!needle) return true;
    return (item.title + ' ' + item.text).toLowerCase().includes(needle);
  });

  filtered.forEach(({title, text, category}) => {
    const card = document.createElement('article');
    card.className = 'card';

    const processed = replaceVars(text);

    const h3 = document.createElement('h3');
    const favBtn = document.createElement('button');
    favBtn.className = 'favorite' + (state.favorites.has(title) ? ' active' : '');
    favBtn.title = 'Favoritar';
    favBtn.textContent = state.favorites.has(title) ? '★' : '☆';
    favBtn.onclick = () => {
      if (state.favorites.has(title)) state.favorites.delete(title); else state.favorites.add(title);
      localStorage.setItem('favorites', JSON.stringify([...state.favorites]));
      renderCards();
    };

    h3.innerHTML = `${title}`;
    h3.appendChild(favBtn);

    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = category;

    const pre = document.createElement('pre');
    pre.textContent = processed;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy';
    copyBtn.textContent = 'Copiar';
    copyBtn.onclick = () => copyToClipboard(processed);

    const composeBtn = document.createElement('button');
    composeBtn.className = 'ghost';
    composeBtn.textContent = 'Editar aqui';
    composeBtn.onclick = () => {
      const composer = document.getElementById('composerText');
      composer.value = processed;
      composer.focus();
      toast('Mensagem enviada para o editor');
    };

    actions.append(copyBtn, composeBtn);
    card.append(h3, badge, pre, actions);
    container.appendChild(card);
  });
}

function renderTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('themeSwitch').checked = state.theme === 'dark';
}

// ====== Eventos ======
window.addEventListener('DOMContentLoaded', () => {
  // Inicializa tema
  renderTheme();

  // Renderiza categorias e cards
  renderCategories();
  renderCards();

  // Busca
  const search = document.getElementById('searchInput');
  search.addEventListener('input', (e) => { state.query = e.target.value; renderCards(); });

  // Theme toggle
  document.getElementById('themeSwitch').addEventListener('change', (e) => {
    state.theme = e.target.checked ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    renderTheme();
  });

  // Variáveis
  for (const key of Object.keys(state.vars)) {
    const el = document.getElementById('var_' + key);
    el.addEventListener('input', (e) => { state.vars[key] = e.target.value; renderCards(); });
  }

  // Reset vars
  document.getElementById('resetVars').addEventListener('click', () => {
    for (const key of Object.keys(state.vars)) {
      state.vars[key] = '';
      document.getElementById('var_' + key).value = '';
    }
    renderCards();
    toast('Variáveis redefinidas');
  });

  // Emoji inserção no editor
  document.querySelectorAll('.emoji-bar .emoji').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = document.getElementById('composerText');
      t.value = (t.value || '') + ' ' + btn.dataset.emoji;
      t.focus();
    });
  });

  // Copiar do editor
  document.getElementById('copyComposer').addEventListener('click', () => {
    const t = document.getElementById('composerText').value;
    if (!t.trim()) return toast('Nada para copiar');
    copyToClipboard(t);
  });

  // Limpar editor
  document.getElementById('clearComposer').addEventListener('click', () => {
    document.getElementById('composerText').value = '';
  });
});

// ====== Toast CSS (injetado) ======
const style = document.createElement('style');
style.textContent = `
.toast { position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%); background: var(--text); color: var(--bg); padding: 8px 12px; border-radius: 8px; opacity: 0; transition: opacity .2s ease, transform .2s ease; }
.toast.show { opacity: .92; transform: translateX(-50%) translateY(-6px); }
`;
document.head.appendChild(style);
