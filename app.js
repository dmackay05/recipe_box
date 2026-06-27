// ===== Notebook — Recipe Box =====
// Storage namespace: 'notebook.*' (unique, no collision with other apps)

const STORAGE_KEY = 'notebook.recipes.v1';
const SCRIPT_URL_KEY = 'notebook.scriptUrl.v1';
const LAST_SYNC_KEY = 'notebook.lastSync.v1';
const SEED_FLAG_KEY = 'notebook.seeded.v1';
const USDA_KEY_KEY = 'notebook.usdaKey.v1';

const CATEGORIES = ['All','Breakfast','Mains','Sides','Soups & Stews','Baking','Sauces & Condiments'];

const NOW = Date.now();
const SEED_RECIPES = [
  {
    title: 'Thick and Chewy Chocolate Chip Cookies',
    category: 'Baking',
    servings: 16,
    prepTime: '15 min',
    cookTime: '12 min',
    equipment: 'Stand mixer, baking sheets, parchment paper',
    notes: 'Melted butter (not creamed) plus an extra egg yolk is the move for a dense, chewy center — this is the ATK fix for cookies that spread too thin and crisp.',
    ingredients: [
      {amount:'2 1/8', unit:'cups', name:'all-purpose flour', usda:null, gramsEquivalent:''},
      {amount:'1/2', unit:'tsp', name:'baking soda', usda:null, gramsEquivalent:''},
      {amount:'14', unit:'tbsp', name:'unsalted butter', usda:null, gramsEquivalent:''},
      {amount:'3/4', unit:'cup', name:'packed brown sugar', usda:null, gramsEquivalent:''},
      {amount:'1/2', unit:'cup', name:'granulated sugar', usda:null, gramsEquivalent:''},
      {amount:'1', unit:'tsp', name:'salt', usda:null, gramsEquivalent:''},
      {amount:'2', unit:'tsp', name:'vanilla extract', usda:null, gramsEquivalent:''},
      {amount:'1', unit:'large', name:'egg', usda:null, gramsEquivalent:''},
      {amount:'1', unit:'large', name:'egg yolk', usda:null, gramsEquivalent:''},
      {amount:'1 1/4', unit:'cups', name:'semisweet chocolate chips', usda:null, gramsEquivalent:''},
    ],
    steps: [
      {text:'Whisk flour and baking soda together in a bowl; set aside.', why:''},
      {text:'Melt 10 tablespoons of the butter in a saucepan over medium heat. Once melted, remove from heat and stir in the remaining 4 tablespoons butter until fully melted.', why:'Melting most of the butter and stirring in the rest off-heat keeps the fat from getting too hot, which would otherwise cook the egg when it\'s added later.'},
      {text:'Whisk in brown sugar, granulated sugar, salt, and vanilla until combined. Whisk in egg and egg yolk until smooth, then let sit 3 minutes. Repeat whisking and resting two more times.', why:'This repeated whisk-and-rest sequence dissolves the sugar into the fat, which is what gives the finished cookie its dense, fudgy texture instead of a cakey one.'},
      {text:'Stir in flour mixture until just combined, then fold in chocolate chips.', why:'Overmixing develops gluten, which makes cookies tough rather than chewy — stop as soon as no dry flour is visible.'},
      {text:'Divide dough into 16 portions (about 3 tablespoons each) and arrange on parchment-lined baking sheets, 2 inches apart.', why:null},
      {text:'Bake at 325°F, one sheet at a time, for 12 minutes, until edges are set but centers are still soft and slightly underbaked.', why:'Pulling them while the centers look underdone is intentional — they firm up as they cool, and this is what keeps the middle chewy instead of dry.', },
      {text:'Let cookies cool on the baking sheet for 2 minutes, then transfer to a wire rack to cool completely.', why:''},
    ],
    updatedAt: NOW, createdAt: NOW,
  },
  {
    title: 'Weeknight Pan-Seared Chicken Breasts',
    category: 'Mains',
    servings: 4,
    prepTime: '10 min',
    cookTime: '20 min',
    equipment: '12-inch heavy-bottomed skillet, instant-read thermometer',
    notes: 'Butterflying and brining briefly solves the classic boneless-breast problem: thin parts overcooking while the thick end is still raw.',
    ingredients: [
      {amount:'4', unit:'', name:'boneless, skinless chicken breasts (6-8 oz each)', usda:{description:'Chicken breast, boneless, skinless, raw',fdcId:0,per100g:{calories:120,protein:22.5,carbs:0,fat:2.6}}, gramsEquivalent:'900'},
      {amount:'1/4', unit:'cup', name:'salt, for brining', usda:null, gramsEquivalent:''},
      {amount:'2', unit:'tbsp', name:'vegetable oil', usda:null, gramsEquivalent:''},
      {amount:'1', unit:'tsp', name:'black pepper', usda:null, gramsEquivalent:''},
      {amount:'2', unit:'tbsp', name:'unsalted butter', usda:null, gramsEquivalent:''},
      {amount:'3', unit:'sprigs', name:'fresh thyme', usda:null, gramsEquivalent:''},
      {amount:'2', unit:'cloves', name:'garlic, lightly crushed', usda:null, gramsEquivalent:''},
    ],
    steps: [
      {text:'Dissolve salt in 4 cups cold water in a large bowl or container. Submerge chicken breasts and refrigerate 15-30 minutes.', why:'A quick brine seasons the meat all the way through and helps it hold onto moisture during the high heat needed to get a good sear.'},
      {text:'Remove chicken from brine and pat completely dry with paper towels. Season both sides with pepper.', why:'Surface moisture is the enemy of browning — any water left on the meat has to evaporate before the surface can actually sear, which wastes pan heat and time.'},
      {text:'Heat oil in skillet over medium-high heat until just smoking. Add chicken and cook without moving for 5-6 minutes, until deeply browned.', why:''},
      {text:'Flip chicken, add butter, thyme, and garlic to the pan. Reduce heat to medium and continue cooking, basting occasionally, until breasts reach 160°F (about 8-10 minutes).', why:'Pulling at 160°F rather than 165°F accounts for carryover cooking — the internal temperature will keep climbing a few degrees as the chicken rests.'},
      {text:'Transfer chicken to a plate, tent loosely with foil, and rest 5 minutes before serving.', why:'Resting lets the juices redistribute through the meat instead of running out onto the cutting board the moment you slice into it.'},
    ],
    updatedAt: NOW, createdAt: NOW,
  },
  {
    title: 'Classic Vinaigrette',
    category: 'Sauces & Condiments',
    servings: 8,
    prepTime: '5 min',
    cookTime: '',
    equipment: 'Mason jar or small bowl and whisk',
    notes: 'Base ratio is 3:1 oil to acid — adjust up to 4:1 if your vinegar or citrus is especially sharp. Keeps in the fridge about a week; shake or whisk before each use since it will separate.',
    ingredients: [
      {amount:'1', unit:'tbsp', name:'Dijon mustard', usda:null, gramsEquivalent:''},
      {amount:'1', unit:'small', name:'shallot, minced', usda:null, gramsEquivalent:''},
      {amount:'3', unit:'tbsp', name:'red wine vinegar', usda:null, gramsEquivalent:''},
      {amount:'1/2', unit:'tsp', name:'salt', usda:null, gramsEquivalent:''},
      {amount:'1/4', unit:'tsp', name:'black pepper', usda:null, gramsEquivalent:''},
      {amount:'9', unit:'tbsp', name:'extra-virgin olive oil', usda:null, gramsEquivalent:''},
    ],
    steps: [
      {text:'Whisk mustard, shallot, vinegar, salt, and pepper together in a small bowl.', why:'Letting the shallot sit in the acid for a few minutes mellows its raw bite before the oil goes in.'},
      {text:'Whisking constantly, slowly drizzle in the olive oil in a thin, steady stream until fully combined and slightly thickened.', why:'Adding the oil gradually while whisking forces it into tiny droplets suspended in the vinegar, which is what creates a temporary emulsion instead of two separate layers.'},
      {text:'Taste and adjust salt, pepper, or acid as needed before serving.', why:''},
    ],
    updatedAt: NOW, createdAt: NOW,
  },
  {
    title: 'Creamy Tomato Soup',
    category: 'Soups & Stews',
    servings: 6,
    prepTime: '10 min',
    cookTime: '35 min',
    equipment: 'Dutch oven, blender or immersion blender',
    notes: 'Baking soda is the trick here — it neutralizes some of the tomatoes\' acidity so you need less sugar to balance the soup, and it keeps the dairy from curdling when it\'s added to the hot pot.',
    ingredients: [
      {amount:'3', unit:'tbsp', name:'unsalted butter', usda:null, gramsEquivalent:''},
      {amount:'1', unit:'medium', name:'onion, chopped', usda:null, gramsEquivalent:''},
      {amount:'3', unit:'cloves', name:'garlic, minced', usda:null, gramsEquivalent:''},
      {amount:'2', unit:'(28 oz cans)', name:'whole peeled tomatoes', usda:null, gramsEquivalent:''},
      {amount:'2', unit:'cups', name:'chicken or vegetable broth', usda:null, gramsEquivalent:''},
      {amount:'1', unit:'tsp', name:'sugar', usda:null, gramsEquivalent:''},
      {amount:'1/4', unit:'tsp', name:'baking soda', usda:null, gramsEquivalent:''},
      {amount:'1/2', unit:'cup', name:'heavy cream', usda:null, gramsEquivalent:''},
      {amount:'', unit:'', name:'salt and pepper, to taste', usda:null, gramsEquivalent:''},
    ],
    steps: [
      {text:'Melt butter in a Dutch oven over medium heat. Add onion and cook until softened, about 5 minutes. Add garlic and cook 30 seconds more.', why:''},
      {text:'Add tomatoes (with juice), broth, sugar, and baking soda. Bring to a simmer, scraping up any browned bits, and cook 20 minutes, breaking up tomatoes with a spoon.', why:'The baking soda raises the pH of the tomatoes just enough to soften their sharpness, which is why this soup needs only a teaspoon of sugar instead of several tablespoons.'},
      {text:'Blend soup until smooth, using an immersion blender directly in the pot or transferring in batches to a stand blender.', why:'If using a stand blender, vent the lid and cover with a towel instead of sealing it completely — hot liquid expands rapidly and can blow the lid off.'},
      {text:'Return soup to low heat and stir in cream. Season with salt and pepper to taste.', why:'Adding the cream after the acidity has been tempered by the baking soda is what keeps it from splitting into curds in the hot soup.'},
    ],
    updatedAt: NOW, createdAt: NOW,
  },
];

let state = {
  recipes: [],
};

let editingId = null;       // recipe currently being edited (null = new)
let activeCategory = 'All';
let searchTerm = '';
let usdaTargetIngId = null; // which ingredient row is awaiting a USDA link
let ingDraft = [];          // working ingredient list while editing
let stepDraft = [];         // working step list while editing
let idSeq = 1;

// ---------- Utilities ----------
function uid(prefix){ return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

function showToast(msg){
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=> t.classList.remove('show'), 2200);
}

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){ state = JSON.parse(raw); }
  }catch(e){ console.error('load failed', e); }
  if(!state.recipes) state.recipes = [];

  // Seed starter recipes only on a genuinely fresh install —
  // never touches state if the user has ever saved anything.
  const seeded = localStorage.getItem(SEED_FLAG_KEY);
  if(!seeded && state.recipes.length === 0){
    state.recipes = SEED_RECIPES.map(r => ({...r, id: uid('r')}));
    saveState();
  }
  localStorage.setItem(SEED_FLAG_KEY, '1');
}

function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ---------- Category chips ----------
function renderCategoryChips(){
  const wrap = $('#catScroll');
  wrap.innerHTML = '';
  CATEGORIES.forEach(cat=>{
    const chip = document.createElement('div');
    chip.className = 'cat-chip' + (cat === activeCategory ? ' active' : '');
    chip.textContent = cat;
    chip.onclick = ()=>{ activeCategory = cat; renderCategoryChips(); renderGrid(); };
    wrap.appendChild(chip);
  });
}

// ---------- Recipe grid ----------
function filteredRecipes(){
  let list = state.recipes.slice();
  if(activeCategory !== 'All'){
    list = list.filter(r => r.category === activeCategory);
  }
  if(searchTerm.trim()){
    const q = searchTerm.trim().toLowerCase();
    list = list.filter(r=>{
      if(r.title.toLowerCase().includes(q)) return true;
      return (r.ingredients||[]).some(i => (i.name||'').toLowerCase().includes(q));
    });
  }
  return list.sort((a,b)=> (b.updatedAt||0) - (a.updatedAt||0));
}

function renderGrid(){
  const grid = $('#recipeGrid');
  const empty = $('#emptyState');
  const list = filteredRecipes();
  grid.innerHTML = '';
  if(list.length === 0){
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  list.forEach(r=>{
    const card = document.createElement('div');
    card.className = 'recipe-card';
    const totalTime = [r.prepTime, r.cookTime].filter(Boolean).join(' + ');
    card.innerHTML = `
      <div class="cat-tag">${escapeHtml(r.category||'')}</div>
      <h3 class="serif">${escapeHtml(r.title)}</h3>
      <div class="meta">
        ${totalTime ? `<span>⏱ ${escapeHtml(totalTime)}</span>` : ''}
        ${r.servings ? `<span>🍽 ${escapeHtml(String(r.servings))} servings</span>` : ''}
      </div>
    `;
    card.onclick = ()=> openDetail(r.id);
    grid.appendChild(card);
  });
}

function escapeHtml(s){
  return String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ---------- Detail view ----------
function openDetail(id){
  const r = state.recipes.find(x=>x.id===id);
  if(!r) return;
  $('#detailCat').textContent = r.category || '';
  $('#detailTitle').textContent = r.title;

  const metaRow = $('#detailMetaRow');
  metaRow.innerHTML = '';
  const metas = [];
  if(r.prepTime) metas.push(['Prep', r.prepTime]);
  if(r.cookTime) metas.push(['Cook', r.cookTime]);
  if(r.servings) metas.push(['Serves', r.servings]);
  if(r.equipment) metas.push(['Equipment', r.equipment]);
  metas.forEach(([l,v])=>{
    const d = document.createElement('div');
    d.className = 'm';
    d.innerHTML = `<span class="l">${escapeHtml(l)}</span><span class="v">${escapeHtml(String(v))}</span>`;
    metaRow.appendChild(d);
  });

  // Nutrition
  const nutri = computeNutrition(r);
  const nutriCard = $('#nutriCard');
  if(nutri.hasAnyLinked){
    nutriCard.style.display = 'block';
    const grid = $('#nutriGrid');
    grid.innerHTML = '';
    [['Calories', Math.round(nutri.perServing.calories)],
     ['Protein', Math.round(nutri.perServing.protein)+'g'],
     ['Carbs', Math.round(nutri.perServing.carbs)+'g'],
     ['Fat', Math.round(nutri.perServing.fat)+'g']
    ].forEach(([lab,val])=>{
      const n = document.createElement('div');
      n.className = 'n';
      n.innerHTML = `<div class="val">${val}</div><div class="lab">${lab}</div>`;
      grid.appendChild(n);
    });
    $('#partialNote').style.display = nutri.allLinked ? 'none' : 'block';
  } else {
    nutriCard.style.display = 'none';
  }

  // Ingredients
  const ingList = $('#detailIngList');
  ingList.innerHTML = '';
  (r.ingredients||[]).forEach(i=>{
    const li = document.createElement('li');
    const amt = [i.amount, i.unit].filter(Boolean).join(' ');
    li.innerHTML = `<span class="amt mono">${escapeHtml(amt)}</span><span>${escapeHtml(i.name)}${i.usda?' <span style="color:var(--good);font-size:0.7rem;">●</span>':''}</span>`;
    ingList.appendChild(li);
  });

  // Steps
  const stepsList = $('#detailStepsList');
  stepsList.innerHTML = '';
  (r.steps||[]).forEach((s,idx)=>{
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="snum">${idx+1}</div>
      <div class="stext">
        ${escapeHtml(s.text)}
        ${s.why ? `<div class="why-note"><span class="label">Why it works</span>${escapeHtml(s.why)}</div>` : ''}
      </div>`;
    stepsList.appendChild(li);
  });

  // Notes
  if(r.notes){
    $('#detailNotesWrap').style.display = 'block';
    $('#detailNotes').textContent = r.notes;
  } else {
    $('#detailNotesWrap').style.display = 'none';
  }

  $('#detailOverlay').dataset.recipeId = id;
  $('#detailOverlay').classList.add('open');
}

function closeDetail(){
  $('#detailOverlay').classList.remove('open');
}

// ---------- Nutrition calc ----------
function computeNutrition(recipe){
  const servings = Math.max(1, Number(recipe.servings) || 1);
  let totals = {calories:0, protein:0, carbs:0, fat:0};
  let anyLinked = false;
  let allLinked = true;

  (recipe.ingredients||[]).forEach(ing=>{
    if(ing.usda && ing.usda.per100g){
      anyLinked = true;
      const grams = Number(ing.gramsEquivalent) || 0;
      if(grams > 0){
        const factor = grams / 100;
        totals.calories += (ing.usda.per100g.calories||0) * factor;
        totals.protein  += (ing.usda.per100g.protein||0) * factor;
        totals.carbs    += (ing.usda.per100g.carbs||0) * factor;
        totals.fat      += (ing.usda.per100g.fat||0) * factor;
      } else {
        allLinked = false; // linked but no gram equivalent set
      }
    } else {
      allLinked = false;
    }
  });

  return {
    hasAnyLinked: anyLinked,
    allLinked: anyLinked && allLinked,
    perServing: {
      calories: totals.calories / servings,
      protein: totals.protein / servings,
      carbs: totals.carbs / servings,
      fat: totals.fat / servings,
    }
  };
}

// ---------- Edit sheet: ingredient & step rows ----------
function renderIngList(){
  const wrap = $('#ingList');
  wrap.innerHTML = '';
  ingDraft.forEach((ing, idx)=>{
    const row = document.createElement('div');
    row.className = 'ing-row';
    row.innerHTML = `
      <div class="line1">
        <input class="amt" placeholder="amt" value="${escapeHtml(ing.amount||'')}" data-f="amount">
        <input class="unit" placeholder="unit" value="${escapeHtml(ing.unit||'')}" data-f="unit">
        <input class="name" placeholder="ingredient name" value="${escapeHtml(ing.name||'')}" data-f="name">
        <button class="row-x" data-action="del">×</button>
      </div>
      <div class="sub-row">
        <button class="link-btn ${ing.usda?'linked':''}" data-action="link">
          ${ing.usda ? '● ' + escapeHtml(ing.usda.description.slice(0,28)) : 'Link nutrition'}
        </button>
        ${ing.usda ? `<input class="amt" style="width:70px;" placeholder="grams" value="${escapeHtml(ing.gramsEquivalent||'')}" data-f="gramsEquivalent" title="Gram equivalent of this ingredient amount">` : ''}
      </div>
    `;
    row.querySelectorAll('input').forEach(inp=>{
      inp.addEventListener('input', ()=>{
        ingDraft[idx][inp.dataset.f] = inp.value;
      });
    });
    row.querySelector('[data-action="del"]').onclick = ()=>{
      ingDraft.splice(idx,1);
      renderIngList();
    };
    row.querySelector('[data-action="link"]').onclick = ()=>{
      usdaTargetIngId = idx;
      openUsdaSheet();
    };
    wrap.appendChild(row);
  });
}

function renderStepList(){
  const wrap = $('#stepList');
  wrap.innerHTML = '';
  stepDraft.forEach((step, idx)=>{
    const row = document.createElement('div');
    row.className = 'step-row';
    row.innerHTML = `
      <div class="step-num">${idx+1}</div>
      <div class="step-body">
        <textarea placeholder="Describe this step...">${escapeHtml(step.text||'')}</textarea>
        <button class="why-toggle" data-action="toggle-why">${step.why ? 'Edit "why it works" note' : '+ Add "why it works" note'}</button>
        <div class="why-field ${step._whyOpen ? 'open':''}">
          <textarea placeholder="The science / technique reason behind this step...">${escapeHtml(step.why||'')}</textarea>
        </div>
      </div>
      <button class="row-x" data-action="del">×</button>
    `;
    const [mainTa, whyTa] = row.querySelectorAll('textarea');
    mainTa.addEventListener('input', ()=>{ stepDraft[idx].text = mainTa.value; });
    whyTa.addEventListener('input', ()=>{ stepDraft[idx].why = whyTa.value; });
    row.querySelector('[data-action="toggle-why"]').onclick = ()=>{
      stepDraft[idx]._whyOpen = !stepDraft[idx]._whyOpen;
      renderStepList();
    };
    row.querySelector('[data-action="del"]').onclick = ()=>{
      stepDraft.splice(idx,1);
      renderStepList();
    };
    wrap.appendChild(row);
  });
}

// ---------- Edit sheet open/close ----------
function openEditSheet(recipeId){
  editingId = recipeId || null;
  const sel = $('#f_category');
  sel.innerHTML = CATEGORIES.filter(c=>c!=='All').map(c=>`<option value="${c}">${c}</option>`).join('');

  if(editingId){
    const r = state.recipes.find(x=>x.id===editingId);
    $('#editSheetTitle').textContent = 'Edit Recipe';
    $('#f_title').value = r.title || '';
    $('#f_category').value = r.category || 'Mains';
    $('#f_servings').value = r.servings || '';
    $('#f_prep').value = r.prepTime || '';
    $('#f_cook').value = r.cookTime || '';
    $('#f_equipment').value = r.equipment || '';
    $('#f_notes').value = r.notes || '';
    ingDraft = JSON.parse(JSON.stringify(r.ingredients||[]));
    stepDraft = JSON.parse(JSON.stringify(r.steps||[]));
  } else {
    $('#editSheetTitle').textContent = 'New Recipe';
    $('#f_title').value = '';
    $('#f_category').value = 'Mains';
    $('#f_servings').value = '';
    $('#f_prep').value = '';
    $('#f_cook').value = '';
    $('#f_equipment').value = '';
    $('#f_notes').value = '';
    ingDraft = [];
    stepDraft = [];
  }
  renderIngList();
  renderStepList();
  $('#editOverlay').classList.add('open');
}

function closeEditSheet(){
  $('#editOverlay').classList.remove('open');
  editingId = null;
}

function saveRecipe(){
  const title = $('#f_title').value.trim();
  if(!title){ showToast('Recipe needs a title'); return; }

  const cleanIngs = ingDraft.filter(i => (i.name||'').trim());
  const cleanSteps = stepDraft.filter(s => (s.text||'').trim()).map(s=>({text:s.text, why:s.why||''}));

  const recipe = {
    id: editingId || uid('r'),
    title,
    category: $('#f_category').value,
    servings: $('#f_servings').value ? Number($('#f_servings').value) : null,
    prepTime: $('#f_prep').value.trim(),
    cookTime: $('#f_cook').value.trim(),
    equipment: $('#f_equipment').value.trim(),
    notes: $('#f_notes').value.trim(),
    ingredients: cleanIngs,
    steps: cleanSteps,
    updatedAt: Date.now(),
    createdAt: editingId ? (state.recipes.find(x=>x.id===editingId)||{}).createdAt || Date.now() : Date.now(),
  };

  if(editingId){
    const idx = state.recipes.findIndex(x=>x.id===editingId);
    state.recipes[idx] = recipe;
  } else {
    state.recipes.push(recipe);
  }
  saveState();
  closeEditSheet();
  renderGrid();
  showToast('Recipe saved');
}

function deleteRecipe(id){
  if(!confirm('Delete this recipe? This cannot be undone.')) return;
  state.recipes = state.recipes.filter(r=>r.id!==id);
  saveState();
  closeDetail();
  renderGrid();
  showToast('Recipe deleted');
}

// ---------- USDA link sheet ----------
function openUsdaSheet(){
  if(!getUsdaKey()){
    showToast('Add a USDA API key in Settings first');
    openSettingsSheet();
    return;
  }
  $('#usdaSearch').value = '';
  $('#usdaResults').innerHTML = '';
  $('#usdaOverlay').classList.add('open');
  setTimeout(()=> $('#usdaSearch').focus(), 150);
}
function closeUsdaSheet(){
  $('#usdaOverlay').classList.remove('open');
  usdaTargetIngId = null;
}

let usdaDebounce = null;
function onUsdaSearchInput(){
  clearTimeout(usdaDebounce);
  const q = $('#usdaSearch').value.trim();
  if(q.length < 2){ $('#usdaResults').innerHTML=''; return; }
  usdaDebounce = setTimeout(()=> runUsdaSearch(q), 350);
}

async function runUsdaSearch(query){
  const resultsWrap = $('#usdaResults');
  resultsWrap.innerHTML = '<div style="color:var(--text-faint); font-size:0.82rem; padding:8px 0;">Searching…</div>';
  try{
    const results = await usdaSearchFoods(query); // defined in usda.js
    if(!results || results.length===0){
      resultsWrap.innerHTML = '<div style="color:var(--text-faint); font-size:0.82rem; padding:8px 0;">No matches. Try a simpler term.</div>';
      return;
    }
    resultsWrap.innerHTML = '';
    results.slice(0,12).forEach(food=>{
      const item = document.createElement('div');
      item.style.cssText = 'padding:10px 12px; border:1px solid var(--line); border-radius:10px; margin-bottom:6px; cursor:pointer; background:var(--card); font-size:0.85rem;';
      item.innerHTML = `<div>${escapeHtml(food.description)}</div>
        <div style="font-size:0.7rem; color:var(--text-faint); margin-top:2px; font-family:'DM Mono';">
          ${Math.round(food.per100g.calories)} cal · ${Math.round(food.per100g.protein)}p · ${Math.round(food.per100g.carbs)}c · ${Math.round(food.per100g.fat)}f (per 100g)
        </div>`;
      item.onclick = ()=>{
        if(usdaTargetIngId !== null){
          ingDraft[usdaTargetIngId].usda = food;
          if(!ingDraft[usdaTargetIngId].gramsEquivalent) ingDraft[usdaTargetIngId].gramsEquivalent = '';
          renderIngList();
        }
        closeUsdaSheet();
      };
      resultsWrap.appendChild(item);
    });
  }catch(e){
    console.error(e);
    resultsWrap.innerHTML = '<div style="color:var(--bad); font-size:0.82rem; padding:8px 0;">Search failed. Check your USDA API key in Settings (⚙).</div>';
  }
}

// ---------- Sync (Google Sheets) — iframe POST + JSONP GET ----------
function getScriptUrl(){ return localStorage.getItem(SCRIPT_URL_KEY) || ''; }
function setScriptUrl(url){ localStorage.setItem(SCRIPT_URL_KEY, url); }

function openSyncSheet(){
  updateSyncStatusText();
  $('#syncOverlay').classList.add('open');
}
function closeSyncSheet(){ $('#syncOverlay').classList.remove('open'); }

function updateSyncStatusText(){
  const last = localStorage.getItem(LAST_SYNC_KEY);
  const url = getScriptUrl();
  if(!url){
    $('#syncStatusText').textContent = 'Not connected yet. Add your Google Sheet in Settings (⚙) first.';
  } else if(last){
    $('#syncStatusText').innerHTML = `Connected. Last synced: <span class="ts">${new Date(Number(last)).toLocaleString()}</span>`;
  } else {
    $('#syncStatusText').textContent = 'Connected, but not synced yet.';
  }
}

function pushToSheet(){
  const url = getScriptUrl();
  if(!url){ showToast('Add your Sheet URL in Settings first'); openSettingsSheet(); return; }

  const payload = JSON.stringify({ action:'save', recipes: state.recipes });

  // iframe form POST to bypass CORS, same pattern as other apps
  const iframe = document.createElement('iframe');
  iframe.name = 'notebook-sync-frame';
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = url;
  form.target = 'notebook-sync-frame';

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'payload';
  input.value = payload;
  form.appendChild(input);

  document.body.appendChild(form);
  form.submit();

  setTimeout(()=>{
    document.body.removeChild(form);
    document.body.removeChild(iframe);
    localStorage.setItem(LAST_SYNC_KEY, String(Date.now()));
    updateSyncStatusText();
    showToast('Pushed to sheet');
  }, 1200);
}

function pullFromSheet(silent){
  const url = getScriptUrl();
  if(!url){ if(!silent){ showToast('Add your Sheet URL in Settings first'); openSettingsSheet(); } return; }

  const callbackName = 'notebookSyncCb_' + Date.now();
  window[callbackName] = function(data){
    try{
      if(data && Array.isArray(data.recipes)){
        state.recipes = data.recipes;
        saveState();
        renderGrid();
        localStorage.setItem(LAST_SYNC_KEY, String(Date.now()));
        updateSyncStatusText();
        if(!silent) showToast('Pulled from sheet');
      }
    }catch(e){ console.error(e); }
    delete window[callbackName];
    script.remove();
  };

  const script = document.createElement('script');
  const sep = url.includes('?') ? '&' : '?';
  script.src = `${url}${sep}action=load&callback=${callbackName}`;
  script.onerror = ()=>{ if(!silent) showToast('Pull failed — check the URL'); delete window[callbackName]; };
  document.body.appendChild(script);
}

// ---------- Settings (USDA key + Sheets URL) ----------
function getUsdaKey(){ return localStorage.getItem(USDA_KEY_KEY) || ''; }
function setUsdaKey(key){ localStorage.setItem(USDA_KEY_KEY, key); }

function openSettingsSheet(){
  $('#set_scriptUrl').value = getScriptUrl();
  $('#set_usdaKey').value = getUsdaKey();
  $('#importStatus').textContent = '';
  $('#settingsOverlay').classList.add('open');
}
function closeSettingsSheet(){ $('#settingsOverlay').classList.remove('open'); }

function saveSettings(){
  const url = $('#set_scriptUrl').value.trim();
  const key = $('#set_usdaKey').value.trim();
  setScriptUrl(url);
  setUsdaKey(key);
  closeSettingsSheet();
  showToast('Settings saved');
}

// ---------- Import recipe file ----------
// Normalizes a loosely-shaped recipe object (e.g. one transcribed by Claude
// from a photo) into the exact shape the app expects, filling in safe
// defaults for anything missing rather than rejecting the whole file.
function normalizeImportedRecipe(raw){
  if(!raw || typeof raw !== 'object') return null;
  const title = (raw.title || '').toString().trim();
  if(!title) return null; // title is the one truly required field

  const validCats = CATEGORIES.filter(c => c !== 'All');
  let category = (raw.category || '').toString().trim();
  if(!validCats.includes(category)) category = 'Mains';

  const ingredients = Array.isArray(raw.ingredients) ? raw.ingredients
    .map(i => ({
      amount: (i.amount ?? '').toString(),
      unit: (i.unit ?? '').toString(),
      name: (i.name ?? '').toString().trim(),
      usda: (i.usda && i.usda.per100g) ? i.usda : null,
      gramsEquivalent: (i.gramsEquivalent ?? '').toString(),
    }))
    .filter(i => i.name)
    : [];

  const steps = Array.isArray(raw.steps) ? raw.steps
    .map(s => ({
      text: (s.text ?? '').toString().trim(),
      why: (s.why ?? '').toString().trim(),
    }))
    .filter(s => s.text)
    : [];

  const now = Date.now();
  return {
    id: uid('r'),
    title,
    category,
    servings: raw.servings ? Number(raw.servings) || null : null,
    prepTime: (raw.prepTime ?? '').toString().trim(),
    cookTime: (raw.cookTime ?? '').toString().trim(),
    equipment: (raw.equipment ?? '').toString().trim(),
    notes: (raw.notes ?? '').toString().trim(),
    ingredients,
    steps,
    updatedAt: now,
    createdAt: now,
  };
}

function handleImportFile(file){
  const statusEl = $('#importStatus');
  if(!file){ return; }
  if(!file.name.toLowerCase().endsWith('.json')){
    statusEl.textContent = 'That doesn\'t look like a .json file.';
    return;
  }

  const reader = new FileReader();
  reader.onload = ()=>{
    let parsed;
    try{
      parsed = JSON.parse(reader.result);
    }catch(e){
      statusEl.textContent = 'Couldn\'t read that file — it isn\'t valid JSON.';
      return;
    }

    // Accept either a single recipe object or {recipes:[...]} or a raw array
    let candidates = [];
    if(Array.isArray(parsed)) candidates = parsed;
    else if(Array.isArray(parsed.recipes)) candidates = parsed.recipes;
    else candidates = [parsed];

    const imported = candidates.map(normalizeImportedRecipe).filter(Boolean);
    const skipped = candidates.length - imported.length;

    if(imported.length === 0){
      statusEl.textContent = 'No valid recipes found in that file (each needs at least a title).';
      return;
    }

    state.recipes.push(...imported);
    saveState();
    renderGrid();

    const names = imported.map(r=>r.title).join(', ');
    statusEl.textContent = `Imported: ${names}${skipped ? ` (skipped ${skipped} invalid entry)` : ''}`;
    showToast(imported.length === 1 ? 'Recipe imported' : `${imported.length} recipes imported`);
  };
  reader.onerror = ()=>{ statusEl.textContent = 'Couldn\'t read that file.'; };
  reader.readAsText(file);
}

// ---------- Wire up events ----------
document.addEventListener('DOMContentLoaded', ()=>{
  loadState();
  renderCategoryChips();
  renderGrid();

  // Auto-pull only if this device has no local data yet (new device scenario)
  if(state.recipes.length === 0 && getScriptUrl()){
    pullFromSheet(true);
  }

  $('#searchInput').addEventListener('input', e=>{ searchTerm = e.target.value; renderGrid(); });

  $('#fabAdd').onclick = ()=> openEditSheet(null);
  $('#cancelEditBtn').onclick = closeEditSheet;
  $('#saveRecipeBtn').onclick = saveRecipe;
  $('#addIngBtn').onclick = ()=>{ ingDraft.push({amount:'',unit:'',name:'',usda:null,gramsEquivalent:''}); renderIngList(); };
  $('#addStepBtn').onclick = ()=>{ stepDraft.push({text:'',why:'',_whyOpen:false}); renderStepList(); };

  $('#detailBack').onclick = closeDetail;
  $('#detailEdit').onclick = ()=>{ const id = $('#detailOverlay').dataset.recipeId; closeDetail(); openEditSheet(id); };
  $('#detailDelete').onclick = ()=>{ const id = $('#detailOverlay').dataset.recipeId; deleteRecipe(id); };

  $('#usdaSearch').addEventListener('input', onUsdaSearchInput);
  $('#usdaCancelBtn').onclick = closeUsdaSheet;

  $('#syncBtn').onclick = openSyncSheet;
  $('#closeSyncBtn').onclick = closeSyncSheet;
  $('#pushBtn').onclick = pushToSheet;
  $('#pullBtn').onclick = ()=> pullFromSheet(false);
  $('#goToSettingsBtn').onclick = ()=>{ closeSyncSheet(); openSettingsSheet(); };

  $('#settingsBtn').onclick = openSettingsSheet;
  $('#closeSettingsBtn').onclick = closeSettingsSheet;
  $('#saveSettingsBtn').onclick = saveSettings;
  $('#importFileBtn').onclick = ()=> $('#importFileInput').click();
  $('#importFileInput').addEventListener('change', (e)=>{
    const file = e.target.files[0];
    handleImportFile(file);
    e.target.value = ''; // reset so the same file can be re-selected later if needed
  });

  $all('nav.tabbar button').forEach(btn=>{
    btn.onclick = ()=>{
      $all('nav.tabbar button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      if(btn.dataset.tab === 'sync'){ openSyncSheet(); }
    };
  });

  // Register service worker
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(e=>console.warn('SW failed', e));
  }
});
