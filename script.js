/**
 * WORKTRACK — Core Logic
 * Progression workout tracker with NovaSaaS dashboard
 */

// ==============================================
// DATA: Workout definitions
// ==============================================
const WORKOUTS = {
  push: {
    name: 'Push',
    exercises: [
      { name: 'Bench Press',         key: 'push-incline',  reps: '3x10', kg: 12,  type: 'Compound',  target: 'Chest'    },
      { name: 'Shoulder Press',      key: 'push-press',    reps: '3x10', kg: 8,   type: 'Compound',  target: 'Shoulder' },
      { name: 'Incline Fly',         key: 'push-fly',      reps: '3x10', kg: 10,  type: 'Isolation', target: 'Chest'    },
      { name: 'Lateral Raises',      key: 'push-lateral',  reps: '3x10', kg: 6,   type: 'Isolation', target: 'Shoulder' },
      { name: 'Skull Crusher',       key: 'push-skull',    reps: '3x10', kg: 8,   type: 'Isolation', target: 'Tricep'   },
    ]
  },
  pull: {
    name: 'Pull',
    exercises: [
      { name: 'Pull-Up / Pullover',  key: 'pull-pullup',   reps: '3x10', kg: null, type: 'Compound',  target: 'Lats'     },
      { name: 'Dumbbell Row',        key: 'pull-row',      reps: '3x10', kg: 14,  type: 'Compound',  target: 'Lats'     },
      { name: 'Rear Delt Fly',       key: 'pull-rear',     reps: '3x10', kg: 6,   type: 'Isolation', target: 'Shoulder' },
      { name: 'Bicep Curl',          key: 'pull-bicep',    reps: '3x10', kg: 8,   type: 'Isolation', target: 'Bicep'    },
      { name: 'Hammer Curl',         key: 'pull-hammer',   reps: '3x10', kg: 8,   type: 'Isolation', target: 'Bicep'    },
    ]
  },
  legs: {
    name: 'Legs',
    exercises: [
      { name: 'Goblet Squat',          key: 'legs-goblet',   reps: '3x10', kg: 20,  type: 'Compound',  target: 'Quads'     },
      { name: 'Bulgarian Split Squat', key: 'legs-bulgarian',reps: '3x10', kg: 14,  type: 'Isolation', target: 'Quads'     },
      { name: 'Romanian Deadlift',     key: 'legs-rdl',      reps: '3x10', kg: 20,  type: 'Compound',  target: 'Hamstrings'},
      { name: 'Hamstring Curl',        key: 'legs-curl',     reps: '3x10', kg: 10,  type: 'Isolation', target: 'Hamstrings'},
      { name: 'Calf Raises',           key: 'legs-calf',     reps: '3x10', kg: 16,  type: 'Isolation', target: 'Calves'    },
    ]
  },
};

const EXERCISE_LINKS = {
  'Shoulder Press':       'https://strengthlevel.com/strength-standards/dumbbell-shoulder-press/kg',
  'Incline Fly':          'https://strengthlevel.com/strength-standards/incline-dumbbell-fly/kg',
  'Lateral Raises':       'https://strengthlevel.com/strength-standards/lateral-raise/kg',
  'Skull Crusher':        'https://strengthlevel.com/strength-standards/lying-dumbbell-tricep-extension/kg',
  'Pull-Up / Pullover':   'https://strengthlevel.com/strength-standards/pull-ups/kg',
  'Dumbbell Row':         'https://strengthlevel.com/strength-standards/dumbbell-row/kg',
  'Rear Delt Fly':        'https://strengthlevel.com/strength-standards/rear-delt-fly/kg',
  'Bicep Curl':           'https://strengthlevel.com/strength-standards/dumbbell-bicep-curl/kg',
  'Hammer Curl':          'https://strengthlevel.com/strength-standards/hammer-curl/kg',
  'Goblet Squat':         'https://strengthlevel.com/strength-standards/goblet-squat/kg',
  'Bulgarian Split Squat':'https://strengthlevel.com/strength-standards/dumbbell-bulgarian-split-squat/kg',
  'Romanian Deadlift':    'https://strengthlevel.com/strength-standards/dumbbell-romanian-deadlift/kg',
  'Hamstring Curl':       'https://strengthlevel.com/strength-standards/hamstring-curl/kg',
  'Calf Raises':          'https://strengthlevel.com/strength-standards/dumbbell-calf-raise/kg',
  // kept for custom workouts / history
  'Bench Press':          'https://strengthlevel.com/strength-standards/dumbbell-bench-press/kg',
  'Pull-Ups':             'https://strengthlevel.com/strength-standards/pull-ups/kg',
  'Dumbbell Pullover':    'https://strengthlevel.com/strength-standards/dumbbell-pullover/kg',
  'Overhead Extension':   'https://strengthlevel.com/strength-standards/dumbbell-tricep-extension/kg',
  'Incline Bicep Curl':   'https://strengthlevel.com/strength-standards/incline-dumbbell-curl/kg',
  'Chin-Ups':             'https://strengthlevel.com/strength-standards/chin-ups/kg',
  'Incline Hammer Curl':  'https://strengthlevel.com/strength-standards/hammer-curl/kg',
};

const EXERCISE_LIBRARY = [
  // Chest
  { name: 'Bench Press',             group: 'Chest',      sl: 'dumbbell-bench-press' },
  { name: 'Incline Bench Press',     group: 'Chest',      sl: 'incline-dumbbell-press' },
  { name: 'Incline Fly',             group: 'Chest',      sl: 'incline-dumbbell-fly' },
  { name: 'Cable Fly',               group: 'Chest',      sl: 'cable-fly' },
  { name: 'Push-Up',                 group: 'Chest',      sl: 'push-ups' },
  { name: 'Chest Dip',               group: 'Chest',      sl: 'chest-dip' },
  // Back
  { name: 'Pull-Ups',                group: 'Back',       sl: 'pull-ups' },
  { name: 'Chin-Ups',                group: 'Back',       sl: 'chin-ups' },
  { name: 'Dumbbell Row',            group: 'Back',       sl: 'dumbbell-row' },
  { name: 'Barbell Row',             group: 'Back',       sl: 'barbell-row' },
  { name: 'Cable Row',               group: 'Back',       sl: 'seated-cable-row' },
  { name: 'Lat Pulldown',            group: 'Back',       sl: 'lat-pulldown' },
  { name: 'Dumbbell Pullover',       group: 'Back',       sl: 'dumbbell-pullover' },
  { name: 'Face Pull',               group: 'Rear Delt',  sl: 'face-pull' },
  { name: 'Rear Delt Fly',           group: 'Rear Delt',  sl: 'rear-delt-fly' },
  // Shoulders
  { name: 'Overhead Press',          group: 'Shoulders',  sl: 'overhead-press' },
  { name: 'Dumbbell Shoulder Press', group: 'Shoulders',  sl: 'dumbbell-shoulder-press' },
  { name: 'Lateral Raises',          group: 'Shoulders',  sl: 'lateral-raise' },
  { name: 'Arnold Press',            group: 'Shoulders',  sl: 'arnold-press' },
  { name: 'Front Raise',             group: 'Shoulders',  sl: 'front-raise' },
  // Triceps
  { name: 'Close Grip Press',        group: 'Triceps',    sl: 'close-grip-dumbbell-bench-press' },
  { name: 'Skull Crusher',           group: 'Triceps',    sl: 'lying-dumbbell-tricep-extension' },
  { name: 'Overhead Extension',      group: 'Triceps',    sl: 'dumbbell-tricep-extension' },
  { name: 'Tricep Pushdown',         group: 'Triceps',    sl: 'tricep-pushdown' },
  // Biceps
  { name: 'Bicep Curl',              group: 'Biceps',     sl: 'bicep-curl' },
  { name: 'Incline Bicep Curl',      group: 'Biceps',     sl: 'incline-dumbbell-curl' },
  { name: 'Hammer Curl',             group: 'Biceps',     sl: 'hammer-curl' },
  { name: 'Incline Hammer Curl',     group: 'Biceps',     sl: 'hammer-curl' },
  { name: 'Preacher Curl',           group: 'Biceps',     sl: 'preacher-curl' },
  // Legs
  { name: 'Squat',                   group: 'Quads',      sl: 'squat' },
  { name: 'Goblet Squat',            group: 'Quads',      sl: 'goblet-squat' },
  { name: 'Leg Press',               group: 'Quads',      sl: 'leg-press' },
  { name: 'Leg Extension',           group: 'Quads',      sl: 'leg-extension' },
  { name: 'Bulgarian Split Squat',   group: 'Quads',      sl: 'dumbbell-bulgarian-split-squat' },
  { name: 'Lunges',                  group: 'Quads',      sl: 'dumbbell-lunge' },
  { name: 'Romanian Deadlift',       group: 'Hamstrings', sl: 'dumbbell-romanian-deadlift' },
  { name: 'Deadlift',                group: 'Hamstrings', sl: 'deadlift' },
  { name: 'Hamstring Curl',          group: 'Hamstrings', sl: 'hamstring-curl' },
  { name: 'Hip Thrust',              group: 'Glutes',     sl: 'hip-thrust' },
  { name: 'Glute Bridge',            group: 'Glutes',     sl: null },
  { name: 'Calf Raises',             group: 'Calves',     sl: 'dumbbell-calf-raise' },
  // Core
  { name: 'Plank',                   group: 'Core',       sl: null },
  { name: 'Decline Sit-Up',          group: 'Core',       sl: 'decline-sit-up' },
  { name: 'Cable Crunch',            group: 'Core',       sl: null },
  { name: 'Ab Wheel Rollout',        group: 'Core',       sl: null },
  { name: 'Russian Twist',           group: 'Core',       sl: null },
  { name: 'Hanging Leg Raise',       group: 'Core',       sl: null },
  // Full Body
  { name: 'Kettlebell Swing',        group: 'Full Body',  sl: null },
  { name: 'Clean and Press',         group: 'Full Body',  sl: null },
  { name: 'Thruster',                group: 'Full Body',  sl: null },
  { name: "Farmer's Walk",           group: 'Full Body',  sl: null },
  { name: 'Box Jump',                group: 'Full Body',  sl: null },
  { name: 'Battle Ropes',            group: 'Cardio',     sl: null },
];

const BADGE_COLORS = [
  { id: 'purple', label: 'Purple', accent: '#a78bfa', accentLight: '#5b21b6', bg: 'rgba(124,90,246,0.2)',  bgLight: 'rgba(124,90,246,0.1)'  },
  { id: 'blue',   label: 'Blue',   accent: '#60a5fa', accentLight: '#1e40af', bg: 'rgba(59,130,246,0.15)', bgLight: 'rgba(59,130,246,0.1)'  },
  { id: 'green',  label: 'Green',  accent: '#4ade80', accentLight: '#166534', bg: 'rgba(34,197,94,0.15)',  bgLight: 'rgba(34,197,94,0.1)'   },
  { id: 'orange', label: 'Orange', accent: '#fb923c', accentLight: '#9a3412', bg: 'rgba(251,146,60,0.15)', bgLight: 'rgba(251,146,60,0.1)'  },
  { id: 'pink',   label: 'Pink',   accent: '#f472b6', accentLight: '#9d174d', bg: 'rgba(244,114,182,0.15)',bgLight: 'rgba(244,114,182,0.1)' },
];

// ==============================================
// STATE
// ==============================================
let currentWorkout = 'push';

let logToDelete = null;

// Builder state
let builderExercises = [];
let builderColor = 'purple';

// Timer
const workoutTimer = { start: null, interval: null, running: false };

// Set progress: { [exerciseKey]: boolean[] }
let setProgress = {};

// Optional exercise skips: { [exerciseKey]: true } = skipped
let optionalSkipped = {};

// In-session added exercises: { name, key, reps, kg, type, target }
let sessionAddedExercises = [];

// History workout-type filter
let currentTypeFilter = 'all';

// ==============================================
// INIT
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
  loadInputValues();
  // Migrate stored history: Incline Bench Press → Bench Press
  (function() {
    const hist = getHistory();
    let dirty = false;
    hist.forEach(s => s.exercises.forEach(ex => {
      if (ex.exercise === 'Incline Bench Press') { ex.exercise = 'Bench Press'; dirty = true; }
    }));
    if (dirty) saveHistory(hist);
  })();
  setupInputListeners();
  renderWorkoutTabs(); // build tab row (standard + custom + New)
  renderWorkout();   // also calls renderTimerBar() internally
  renderHistory();
  renderChart();
  renderPRSummaryCard();
  populateChartExerciseDropdown();
  populateHistoryExerciseDropdown();
  window.addEventListener('resize', () => renderChart(false));
});

// ==============================================
// NAVIGATION
// ==============================================
function switchView(btn) {
  const view = btn.dataset.view;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + view).classList.add('active');
  closeSidebar();

  if (view === 'progression') { renderHistory(); renderChart(); renderPRSummaryCard(); }
  if (view === 'workouts') renderTimerBar();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

// ==============================================
// WORKOUT TAB
// ==============================================
function switchWorkout(id, btn) {
  currentWorkout = id;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderWorkout();
  updateWorkoutDeleteRow();
  // Update save button label
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn && !saveBtn.classList.contains('saved')) {
    if (id === '__new__') {
      saveBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg> Create Workout`;
    } else {
      saveBtn.innerHTML = `Save Session`;
    }
  }
}

function renderWorkout() {
  if (currentWorkout === '__new__') { renderBuilder(); return; }
  if (!WORKOUTS[currentWorkout])   { renderCustomWorkout(); return; }
  const workout  = WORKOUTS[currentWorkout];
  const container = document.getElementById('workout-content');

  const required = workout.exercises.filter(ex => !ex.optional);
  const optional = workout.exercises.filter(ex =>  ex.optional);

  const buildRow = ex => {
    const skipped     = ex.optional && optionalSkipped[ex.key];
    const defaultSets = parseSets(ex.reps);
    const defaultReps = parseReps(ex.reps);
    const defaultKg   = ex.kg ?? 0;
    const setCount    = getStepperVal(ex.key + '-sets', defaultSets);
    const dots        = Array.from({ length: setCount }, (_, i) =>
      `<button class="set-dot" onclick="tapSet('${ex.key}',${i})" title="Set ${i + 1}" ${skipped ? 'disabled' : ''}></button>`
    ).join('');

    return `
      <tr class="${ex.optional ? 'optional-row' : ''}${skipped ? ' opt-skipped' : ''}">
        <td>
          <div class="ex-name-wrap">
            <span class="ex-name"
              ${EXERCISE_LINKS[ex.name] ? `onclick="window.open('${EXERCISE_LINKS[ex.name]}','_blank')" title="View strength standards"` : ''}
            >${ex.name}</span>
            ${ex.optional ? `
              <button class="opt-toggle-btn" onclick="toggleOptional('${ex.key}')">
                ${skipped ? '＋ Include' : '✕ Skip'}
              </button>` : ''}
          </div>
        </td>
        <td>
          <div class="set-dots" data-sets="${ex.key}">${dots}</div>
        </td>
        <td class="col-reps">
          ${stepperHtml(ex.key + '-reps', defaultReps, 1, skipped)}
        </td>
        <td>
          ${stepperHtml(ex.key + '-kg', defaultKg, 0, false)}
        </td>
        <td class="desktop-only"><span class="type-badge">${ex.type}</span></td>
        <td class="desktop-only"><span class="target-tag">${ex.target}</span></td>
      </tr>`;
  };

  const separator = optional.length ? `
    <tr class="opt-separator">
      <td colspan="6"><span class="opt-sep-label">✦ Optional</span></td>
    </tr>` : '';

  container.innerHTML = `
    <div class="workout-table-wrap">
      <table class="exercise-table">
        <thead>
          <tr>
            <th>Exercise</th>
            <th class="sets-th">Sets</th>
            <th class="col-reps">Reps</th>
            <th>Weight</th>
            <th class="desktop-only">Type</th>
            <th class="desktop-only">Target</th>
          </tr>
        </thead>
        <tbody>
          ${required.map(buildRow).join('')}
          ${separator}
          ${optional.map(buildRow).join('')}
          ${sessionAddedExercises.map(buildAddedRow).join('')}
          ${addExerciseTableRow()}
        </tbody>
      </table>
    </div>
  `;

  // Restore dots + timer
  requestAnimationFrame(() => {
    workout.exercises.forEach(ex => updateSetDisplay(ex.key));
    sessionAddedExercises.forEach(ex => updateSetDisplay(ex.key));
    renderTimerBar();
  });
}

// Render a session-added exercise row (with remove button)
function buildAddedRow(ex) {
  const defaultSets = parseSets(ex.reps);
  const defaultReps = parseReps(ex.reps);
  const defaultKg   = ex.kg ?? 0;
  const setCount    = getStepperVal(ex.key + '-sets', defaultSets);
  const dots        = Array.from({ length: setCount }, (_, i) =>
    `<button class="set-dot" onclick="tapSet('${ex.key}',${i})" title="Set ${i + 1}"></button>`
  ).join('');

  const link = EXERCISE_LINKS[ex.name] ||
    (() => { const lib = EXERCISE_LIBRARY.find(e => e.name === ex.name); return lib?.sl ? `https://strengthlevel.com/strength-standards/${lib.sl}/kg` : null; })();

  return `
    <tr class="session-added-row">
      <td>
        <div class="ex-name-wrap">
          <span class="ex-name${link ? '' : ''}"
            ${link ? `onclick="window.open('${link}','_blank')" title="View strength standards"` : ''}
          >${ex.name}</span>
          <button class="opt-toggle-btn session-remove-btn" onclick="removeSessionExercise('${ex.key}')">✕ Remove</button>
        </div>
      </td>
      <td>
        <div class="set-dots" data-sets="${ex.key}">${dots}</div>
      </td>
      <td class="col-reps">
        ${stepperHtml(ex.key + '-reps', defaultReps, 1, false)}
      </td>
      <td>
        ${stepperHtml(ex.key + '-kg', defaultKg, 0, false)}
      </td>
      <td class="desktop-only"><span class="type-badge">Added</span></td>
      <td class="desktop-only"><span class="target-tag">${ex.target || ''}</span></td>
    </tr>`;
}

// Render the add-exercise search row at the bottom of the workout table
function addExerciseTableRow() {
  return `
    <tr class="add-exercise-row">
      <td colspan="6">
        <div class="add-ex-wrap">
          <div class="add-ex-search-inner">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style="flex-shrink:0;opacity:0.5">
              <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
              <path d="M16.5 16.5l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <input id="session-ex-search" class="add-ex-input"
              placeholder="Add exercise to this session…"
              oninput="searchSessionExercises(this.value)"
              onkeydown="handleSessionSearchKey(event)"
              autocomplete="off">
          </div>
          <div id="session-ex-suggestions" class="builder-suggestions" style="display:none"></div>
        </div>
      </td>
    </tr>`;
}

// ==============================================
// LOCALSTORAGE HELPERS
// ==============================================
function getSaved(key) {
  return localStorage.getItem(key);
}

function loadInputValues() {
  // Pre-load for workout rendering (handled in renderWorkout)
}

function setupInputListeners() {
  // Delegated — set up in renderWorkout
}

// ==============================================
// STEPPER HELPERS
// ==============================================
function parseSets(repsStr) {
  const m = (repsStr || '').match(/^(\d+)[x×]/i);
  return m ? parseInt(m[1]) : 3;
}

function parseReps(repsStr) {
  const m = (repsStr || '').match(/[x×](\d+)/i);
  return m ? parseInt(m[1]) : 10;
}

function getStepperVal(lsKey, defaultVal) {
  const v = localStorage.getItem(lsKey);
  return v !== null ? parseInt(v) : defaultVal;
}

function adjVal(lsKey, delta, min) {
  // Fall back to the input's displayed value if localStorage isn't initialised yet
  const span = document.getElementById('sv-' + lsKey);
  const displayed = span ? (span.value === 'BW' ? 0 : parseInt(span.value) || 0) : 0;
  const cur = getStepperVal(lsKey, displayed);
  const next = Math.max(min, cur + delta);
  localStorage.setItem(lsKey, next);
  if (span) span.value = (lsKey.endsWith('-kg') && next === 0) ? 'BW' : next;
  if (lsKey.endsWith('-sets')) {
    rebuildDots(lsKey.slice(0, -5), next);
  }
}

function rebuildDots(exKey, count) {
  const container = document.querySelector(`[data-sets="${exKey}"]`);
  if (!container) return;
  const prog = setProgress[exKey] || [];
  container.innerHTML = Array.from({ length: count }, (_, i) => {
    const done = prog[i] === true;
    return `<button class="set-dot${done ? ' done' : ''}" onclick="tapSet('${exKey}',${i})" title="Set ${i + 1}">
      ${done
        ? `<svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        : `<span class="dot-num">${i + 1}</span>`}
    </button>`;
  }).join('');
}

function commitVal(lsKey, min) {
  const span = document.getElementById('sv-' + lsKey);
  if (!span) return;
  const text = span.value.trim();
  let val;
  if (lsKey.endsWith('-kg') && (text.toUpperCase() === 'BW' || text === '' || text === '0')) {
    val = 0;
  } else {
    val = parseInt(text);
    if (isNaN(val) || val < min) val = min;
  }
  localStorage.setItem(lsKey, val);
  span.value = (lsKey.endsWith('-kg') && val === 0) ? 'BW' : val;
  if (lsKey.endsWith('-sets')) rebuildDots(lsKey.slice(0, -5), val);
}

function stepperHtml(lsKey, defaultVal, min, disabled) {
  const val = getStepperVal(lsKey, defaultVal);
  const display = (lsKey.endsWith('-kg') && val === 0) ? 'BW' : val;
  const dis = disabled ? 'disabled' : '';
  return `<div class="stepper${disabled ? ' stepper-disabled' : ''}">
    <button class="stp-btn" ${dis} onclick="adjVal('${lsKey}',${-1},${min})">−</button>
    <input class="stp-val" id="sv-${lsKey}" type="text" inputmode="numeric"
      value="${display}" ${dis}
      onfocus="this.select()"
      oninput="this.value=this.value.replace(/[^0-9]/g,'')"
      onblur="commitVal('${lsKey}',${min})"
      onkeydown="if(event.key==='Enter'){event.preventDefault();this.blur()}"
    >
    <button class="stp-btn" ${dis} onclick="adjVal('${lsKey}',1,${min})">+</button>
  </div>`;
}

// ==============================================
// LOG WORKOUT
// ==============================================
function logWorkout() {
  if (currentWorkout === '__new__') { saveNewWorkout(); return; }

  const isCustom = !WORKOUTS[currentWorkout];
  const workout = isCustom
    ? getCustomWorkouts().find(w => w.id === currentWorkout)
    : WORKOUTS[currentWorkout];
  if (!workout) return;

  let entries = [];

  if (isCustom) {
    workout.exercises.forEach((ex, idx) => {
      const key = currentWorkout + '-' + idx;
      if (ex.optional && optionalSkipped[key]) return;
      const defSets = parseSets(ex.reps || '3x10');
      const defReps = parseReps(ex.reps || '3x10');
      const sets = getStepperVal(key + '-sets', defSets);
      const reps = getStepperVal(key + '-reps', defReps);
      const kg   = getStepperVal(key + '-kg', 0);
      if (kg > 0) {
        entries.push({ exercise: ex.name, reps: `${sets}x${reps}`, weight: kg });
      }
    });
    // Also log any exercises added during this session
    sessionAddedExercises.forEach(ex => {
      const defSets = parseSets(ex.reps);
      const defReps = parseReps(ex.reps);
      const sets = getStepperVal(ex.key + '-sets', defSets);
      const reps = getStepperVal(ex.key + '-reps', defReps);
      const kg   = getStepperVal(ex.key + '-kg', 0);
      if (kg > 0) {
        entries.push({ exercise: ex.name, reps: `${sets}x${reps}`, weight: kg });
      }
    });
  } else {
    workout.exercises.forEach(ex => {
      if (ex.optional && optionalSkipped[ex.key]) return;
      const defSets = parseSets(ex.reps);
      const defReps = parseReps(ex.reps);
      const sets = getStepperVal(ex.key + '-sets', defSets);
      const reps = getStepperVal(ex.key + '-reps', defReps);
      const kg   = getStepperVal(ex.key + '-kg', ex.kg ?? 0);
      if (kg > 0) {
        entries.push({ exercise: ex.name, reps: `${sets}x${reps}`, weight: kg });
      }
    });
    // Also log any exercises added during this session
    sessionAddedExercises.forEach(ex => {
      const defSets = parseSets(ex.reps);
      const defReps = parseReps(ex.reps);
      const sets = getStepperVal(ex.key + '-sets', defSets);
      const reps = getStepperVal(ex.key + '-reps', defReps);
      const kg   = getStepperVal(ex.key + '-kg', 0);
      if (kg > 0) {
        entries.push({ exercise: ex.name, reps: `${sets}x${reps}`, weight: kg });
      }
    });
  }

  if (entries.length === 0) return;

  const elapsed = getElapsedSecs();
  const history = getHistory();
  history.push({
    timestamp: Date.now(),
    workoutName: workout.name,
    workoutId: currentWorkout,
    exercises: entries,
    duration: elapsed > 0 ? elapsed : null
  });
  saveHistory(history);

  // Stop and reset timer + sets after saving
  stopWorkoutTimer();

  // Visual feedback
  const btn = document.getElementById('save-btn');
  const orig = btn.innerHTML;
  const durationLabel = elapsed > 0 ? ` (${formatTime(elapsed)})` : '';
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    Saved${durationLabel}
  `;
  btn.classList.add('saved');
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.classList.remove('saved');
  }, 2200);

}

// ==============================================
// DASHBOARD
// ==============================================
function setDashboardDate() {
  const el = document.getElementById('dashboard-date');
  if (el) {
    el.textContent = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  }
}

function renderDashboard() {
  const history = getHistory();
  renderStatCards(history);
  renderRecentSessions(history);
  renderWeeklyActivity(history);
}

function renderStatCards(history) {
  const grid = document.getElementById('stat-grid');
  if (!grid) return;

  const now = new Date();
  const thisMonthSessions = history.filter(s => {
    const d = new Date(s.timestamp);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const lastMonthSessions = history.filter(s => {
    const d = new Date(s.timestamp);
    const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear();
  });

  // Week sessions
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
  weekStart.setHours(0, 0, 0, 0);
  const weekSessions = history.filter(s => new Date(s.timestamp) >= weekStart);

  // Count PRs
  const totalPRs = countTotalPRs(history);

  // Best streak (weeks with at least 1 session)
  const streak = calcStreak(history);

  const trend = (curr, prev) => {
    if (prev === 0) return '';
    const pct = Math.round(((curr - prev) / prev) * 100);
    const up = pct >= 0;
    return `<span class="stat-trend ${up ? 'up' : 'down'}">
      ${up ? '↑' : '↓'} ${Math.abs(pct)}% vs last month
    </span>`;
  };

  const cards = [
    {
      label: 'Total Sessions',
      value: history.length,
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="13" width="4" height="8" rx="1" fill="currentColor"/><rect x="10" y="8" width="4" height="13" rx="1" fill="currentColor"/><rect x="17" y="3" width="4" height="18" rx="1" fill="currentColor"/></svg>`,
      iconColor: '#D97757',
      iconBg: 'rgba(217,119,87,0.15)',
      trend: trend(thisMonthSessions.length, lastMonthSessions.length)
    },
    {
      label: 'This Week',
      value: weekSessions.length,
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 10h18" stroke="currentColor" stroke-width="2"/><path d="M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
      iconColor: '#3b82f6',
      iconBg: 'rgba(59,130,246,0.15)',
      trend: `<span class="stat-trend">${weekSessions.length} of 3 target</span>`
    },
    {
      label: 'Personal Records',
      value: totalPRs,
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 5 5.6.8-4 4 .9 5.5L12 15l-4.9 2.3.9-5.5-4-4 5.6-.8L12 2z" fill="currentColor"/></svg>`,
      iconColor: '#f59e0b',
      iconBg: 'rgba(245,158,11,0.15)',
      trend: `<span class="stat-trend up">All time</span>`
    },
    {
      label: 'Week Streak',
      value: streak,
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 13h6.5l-1 9 9.5-11.5H13V2z" fill="currentColor"/></svg>`,
      iconColor: '#ef4444',
      iconBg: 'rgba(239,68,68,0.15)',
      trend: `<span class="stat-trend">${streak === 1 ? 'week' : 'weeks'} active</span>`
    }
  ];

  grid.innerHTML = cards.map(c => `
    <div class="stat-card">
      <div class="stat-card-top">
        <span class="stat-label">${c.label}</span>
        <div class="stat-icon" style="background:${c.iconBg};color:${c.iconColor}">${c.icon}</div>
      </div>
      <div class="stat-value">${c.value}</div>
      <div>${c.trend}</div>
    </div>
  `).join('');
}

function renderRecentSessions(history) {
  const el = document.getElementById('recent-sessions');
  if (!el) return;

  const recent = [...history].sort((a, b) => b.timestamp - a.timestamp).slice(0, 6);

  if (recent.length === 0) {
    el.innerHTML = '<p class="empty-state">No sessions yet. Log your first workout!</p>';
    return;
  }

  el.innerHTML = `
    <table class="sessions-table">
      <thead>
        <tr>
          <th>Workout</th>
          <th>Exercises</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        ${recent.map(s => {
          const d = new Date(s.timestamp);
          const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
          const prs = s.exercises.filter(ex =>
            isPersonalRecord(ex.exercise, ex.weight, history, s.timestamp)
          ).length;
          const b = getSessionBadge(s);
          return `
            <tr>
              <td><span class="session-badge ${b.cls}"${b.style ? ` style="${b.style}"` : ''}>${b.label}</span></td>
              <td class="muted">${s.exercises.length} exercises${prs > 0 ? ` · <span style="color:var(--gold)">🏆 ${prs} PR${prs > 1 ? 's' : ''}</span>` : ''}</td>
              <td class="muted">${date}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

function renderWeeklyActivity(history) {
  const el = document.getElementById('weekly-activity');
  if (!el) return;

  const now = new Date();
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const maxBars = 7;

  // Build last 7 days
  const results = [];
  for (let i = 6; i >= 0; i--) {
    const day = new Date(now);
    day.setDate(now.getDate() - i);
    day.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);

    const sessions = history.filter(s => {
      const ts = new Date(s.timestamp);
      return ts >= day && ts <= dayEnd;
    });

    results.push({
      label: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][day.getDay() === 0 ? 6 : day.getDay() - 1].slice(0, 1),
      count: sessions.length,
      isToday: i === 0
    });
  }

  const maxCount = Math.max(...results.map(r => r.count), 1);

  el.innerHTML = `
    <div class="week-grid">
      ${results.map(r => {
        const pct = Math.max((r.count / maxCount) * 100, 4);
        const cls = r.isToday ? 'today' : r.count > 0 ? 'active' : 'rest';
        return `
          <div class="week-day">
            <div class="week-bar ${cls}" style="height:${pct}%"></div>
            <span class="week-day-label">${r.label}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ==============================================
// PR HELPERS
// ==============================================
function isPersonalRecord(exercise, weight, history, currentTS) {
  const prevBest = history
    .filter(s => s.timestamp < currentTS)
    .flatMap(s => s.exercises)
    .filter(ex => ex.exercise === exercise)
    .reduce((max, ex) => Math.max(max, parseFloat(ex.weight) || 0), 0);

  const current = parseFloat(weight) || 0;
  return current > prevBest && prevBest > 0;
}

function countTotalPRs(history) {
  let count = 0;
  history.forEach(session => {
    session.exercises.forEach(ex => {
      if (isPersonalRecord(ex.exercise, ex.weight, history, session.timestamp)) {
        count++;
      }
    });
  });
  return count;
}

function renderPRSummaryCard() {
  const card = document.getElementById('pr-summary-card');
  if (!card) return;
  const history = getHistory();

  if (history.length === 0) {
    card.style.display = 'none';
    return;
  }
  card.style.display = '';

  const totalSessions = history.length;
  const totalPRs = countTotalPRs(history);

  // Most-logged exercise
  const freq = {};
  history.forEach(s => s.exercises.forEach(ex => {
    freq[ex.exercise] = (freq[ex.exercise] || 0) + 1;
  }));
  const topExercise = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];
  const topName = topExercise ? topExercise[0] : '—';

  card.innerHTML = `
    <div class="pr-stat">
      <div class="pr-stat-value">${totalSessions}</div>
      <div class="pr-stat-label">Sessions</div>
    </div>
    <div class="pr-stat">
      <div class="pr-stat-value">${totalPRs}</div>
      <div class="pr-stat-label">PRs Set</div>
    </div>
    <div class="pr-stat">
      <div class="pr-stat-value" style="font-size:1.4rem;line-height:1.2">${topName}</div>
      <div class="pr-stat-label">Top Exercise</div>
    </div>
  `;
}

function calcStreak(history) {
  if (history.length === 0) return 0;
  const now = new Date();
  let streak = 0;
  for (let w = 0; w < 52; w++) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1) - w * 7);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    const hasSession = history.some(s => {
      const ts = new Date(s.timestamp);
      return ts >= weekStart && ts <= weekEnd;
    });
    if (hasSession) streak++;
    else if (w > 0) break;
  }
  return streak;
}

// ==============================================
// HISTORY
// ==============================================

function renderProgStatPills() {
  const el = document.getElementById('prog-stat-pills');
  if (!el) return;
  const history = getHistory();
  const now = new Date();
  const totalSessions = history.length;
  const totalPRs = countTotalPRs(history);
  const thisMonth = history.filter(s => {
    const d = new Date(s.timestamp);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const streak = calcStreak(history);

  const pill = (icon, iconBg, label, value) => `
    <div class="prog-pill">
      <div class="prog-pill-icon" style="background:${iconBg}">${icon}</div>
      <div>
        <div class="prog-pill-label">${label}</div>
        <div class="prog-pill-value">${value}</div>
      </div>
    </div>`;

  el.innerHTML = [
    pill(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
      'rgba(232,113,74,0.15)', 'Total Sessions', totalSessions),
    pill(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 5 5.6.8-4 4 .9 5.5L12 15l-4.9 2.3.9-5.5-4-4 5.6-.8L12 2z" fill="currentColor"/></svg>`,
      'rgba(245,158,11,0.15)', 'Personal Records', totalPRs),
    pill(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
      'rgba(66,133,244,0.15)', 'This Month', thisMonth),
    pill(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M13 2L4.5 13h6.5l-1 9 9.5-11.5H13V2z" fill="currentColor"/></svg>`,
      'rgba(239,68,68,0.15)', 'Week Streak', streak + (streak === 1 ? ' wk' : ' wks')),
  ].join('');
}

function filterByWorkoutType(type) {
  currentTypeFilter = type;
  document.querySelectorAll('.type-chip').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === type);
  });
  renderHistory();
}

function renderHistory() {
  const container = document.getElementById('history-content');
  if (!container) return;

  renderProgStatPills();
  const history = getHistory();
  populateHistoryExerciseDropdown(history);

  if (history.length === 0) {
    container.innerHTML = '<p class="empty-state">No sessions yet. Log your first workout!</p>';
    return;
  }

  const exFilter    = document.getElementById('filter-exercise')?.value || 'all';
  const monthFilter = document.getElementById('filter-month')?.value || 'all';
  const yearFilter  = document.getElementById('filter-year')?.value || 'all';

  let filtered = history.filter(session => {
    const d = new Date(session.timestamp);
    const mOk = monthFilter === 'all' || d.getMonth().toString() === monthFilter;
    const yOk = yearFilter === 'all' || d.getFullYear().toString() === yearFilter;
    return mOk && yOk;
  });

  filtered.sort((a, b) => b.timestamp - a.timestamp);

  // Workout-type filter (Push / Pull / Legs chips)
  if (currentTypeFilter !== 'all') {
    filtered = filtered.filter(s => s.workoutId === currentTypeFilter);
  }

  // ── Option B: compact table when a specific exercise is filtered ──
  if (exFilter !== 'all') {
    const rows = [];
    filtered.forEach(session => {
      const match = session.exercises.find(ex => ex.exercise === exFilter);
      if (!match) return;
      const isPR = isPersonalRecord(match.exercise, match.weight, history, session.timestamp);
      const d = new Date(session.timestamp);
      const dateStr = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
      rows.push({ dateStr, reps: match.reps, weight: match.weight, isPR, timestamp: session.timestamp });
    });

    if (rows.length === 0) {
      container.innerHTML = '<p class="empty-state">No sessions match the current filter.</p>';
      return;
    }

    const tableRows = rows.map(r => `
      <tr class="${r.isPR ? 'ex-table-pr' : ''}">
        <td class="ex-table-date">${r.dateStr}</td>
        <td class="ex-table-reps">${r.reps}</td>
        <td class="ex-table-weight"><strong>${r.weight}</strong><span class="unit"> kg</span></td>
        <td class="ex-table-badge">${r.isPR ? '<span class="pr-star">PR</span>' : ''}</td>
      </tr>
    `).join('');

    container.innerHTML = `
      <table class="ex-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Set × Rep</th>
            <th>Weight</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
    `;
    return;
  }
  // ── end Option B ──

  const MONTH_NAMES = ['January','February','March','April','May','June',
                       'July','August','September','October','November','December'];

  // Group filtered sessions by year-month, preserving newest-first order
  const groupMap = new Map();
  filtered.forEach(session => {
    const d = new Date(session.timestamp);
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2,'0')}`;
    if (!groupMap.has(key)) {
      groupMap.set(key, {
        label: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`,
        sessions: []
      });
    }
    groupMap.get(key).sessions.push(session);
  });

  let html = '';

  for (const [, group] of groupMap) {
    let monthPRs = 0;
    const sessionHTMLs = [];

    group.sessions.forEach(session => {
      const relevantExercises = session.exercises.filter(ex => {
        return exFilter === 'all' || ex.exercise === exFilter;
      });

      if (relevantExercises.length === 0) return;

      const sessionPRs = relevantExercises.filter(ex =>
        isPersonalRecord(ex.exercise, ex.weight, history, session.timestamp)
      ).length;
      monthPRs += sessionPRs;

      const d = new Date(session.timestamp);
      const dateStr = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
      const badge = getSessionBadge(session);
      const badgeClass = badge.cls;
      const badgeLabel = badge.label;

      const prText = sessionPRs > 0
        ? ` · <span class="hist-session-pr">${sessionPRs} PR${sessionPRs > 1 ? 's' : ''}</span>`
        : '';

      const exerciseRows = relevantExercises.map(ex => {
        const isPR = isPersonalRecord(ex.exercise, ex.weight, history, session.timestamp);
        return `
          <tr class="${isPR ? 'ex-table-pr' : ''}">
            <td class="ex-table-date">${ex.exercise}</td>
            <td class="ex-table-reps">${ex.reps}</td>
            <td class="ex-table-weight"><strong>${ex.weight}</strong><span class="unit"> kg</span></td>
            <td class="ex-table-badge">${isPR ? '<span class="pr-star">PR</span>' : ''}</td>
          </tr>
        `;
      }).join('');

      const openClass = ' open';

      sessionHTMLs.push(`
        <div class="hist-entry${openClass}" onclick="toggleSession(this)">
          <div class="hist-head">
            <div class="hist-head-left">
              <span class="session-badge ${badgeClass}"${badge.style ? ` style="${badge.style}"` : ''}>${badgeLabel}</span>
              <span class="hist-session-meta">${dateStr} · ${relevantExercises.length} exercises${prText}</span>
            </div>
            <div class="hist-head-right">
              <button class="del-log-btn" onclick="event.stopPropagation();deleteSingleLog(${session.timestamp})" title="Delete">✕</button>
              <svg class="hist-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="hist-exercises">
            <table class="ex-table"><tbody>${exerciseRows}</tbody></table>
          </div>
        </div>
      `);
    });

    if (sessionHTMLs.length === 0) continue;

    const prNote = monthPRs > 0 ? ` · ${monthPRs} PR${monthPRs > 1 ? 's' : ''}` : '';
    const sessionWord = sessionHTMLs.length === 1 ? 'session' : 'sessions';

    html += `
      <div class="month-group">
        <div class="month-header">
          <span class="month-label">${group.label}</span>
          <span class="month-stats">${sessionHTMLs.length} ${sessionWord}${prNote}</span>
        </div>
        ${sessionHTMLs.join('')}
      </div>
    `;
  }

  container.innerHTML = html || '<p class="empty-state">No sessions match the current filter.</p>';
}

function toggleSession(el) {
  el.classList.toggle('open');
}

function populateHistoryExerciseDropdown(history) {
  const dropdown = document.getElementById('filter-exercise');
  if (!dropdown) return;
  if (!history) history = getHistory();

  // Only show exercises from the current workout definitions
  const exercises = Object.values(WORKOUTS).flatMap(w => w.exercises.map(ex => ex.name)).sort();

  const current = dropdown.value;
  dropdown.innerHTML = '<option value="all">All Exercises</option>';
  exercises.forEach(ex => {
    const opt = document.createElement('option');
    opt.value = ex;
    opt.textContent = ex;
    if (ex === current) opt.selected = true;
    dropdown.appendChild(opt);
  });
}

// ==============================================
// PROGRESSION CHART
// ==============================================
function populateChartExerciseDropdown() {
  const history = getHistory();
  const dropdown = document.getElementById('chart-exercise');
  if (!dropdown) return;

  // Only show exercises from the current workout definitions
  const exercises = Object.values(WORKOUTS).flatMap(w => w.exercises.map(ex => ex.name)).sort();
  const current = dropdown.value;

  dropdown.innerHTML = '';
  if (exercises.length === 0) {
    dropdown.innerHTML = '<option>No data yet</option>';
    return;
  }

  exercises.forEach(ex => {
    const opt = document.createElement('option');
    opt.value = ex;
    opt.textContent = ex;
    if (ex === current) opt.selected = true;
    dropdown.appendChild(opt);
  });
}

function renderChart(repopulate = true) {
  if (repopulate) populateChartExerciseDropdown();

  const history = getHistory();
  const svgEl = document.getElementById('prog-chart');
  const emptyEl = document.getElementById('chart-empty');
  const dropdown = document.getElementById('chart-exercise');
  const chartWrap = document.getElementById('chart-wrap');

  if (!svgEl || !chartWrap) return;

  const exercise = dropdown?.value;
  if (!exercise || history.length === 0) {
    svgEl.style.display = 'none';
    if (emptyEl) emptyEl.style.display = 'flex';
    return;
  }

  // Collect data points for this exercise
  const points = history
    .flatMap(s => s.exercises
      .filter(ex => ex.exercise === exercise && ex.weight)
      .map(ex => ({
        ts: s.timestamp,
        weight: parseFloat(ex.weight),
        isPR: isPersonalRecord(exercise, ex.weight, history, s.timestamp)
      }))
    )
    .filter(p => !isNaN(p.weight))
    .sort((a, b) => a.ts - b.ts);

  if (points.length === 0) {
    svgEl.style.display = 'none';
    if (emptyEl) emptyEl.style.display = 'flex';
    return;
  }

  svgEl.style.display = 'block';
  if (emptyEl) emptyEl.style.display = 'none';

  const W = chartWrap.offsetWidth || 600;
  const H = chartWrap.offsetHeight || 380;
  const PAD = { top: 36, right: 28, bottom: 52, left: 34 };
  const iW = W - PAD.left - PAD.right;
  const iH = H - PAD.top - PAD.bottom;

  const weights = points.map(p => p.weight);
  const minW = Math.min(...weights);
  const maxW = Math.max(...weights);
  const wRange = maxW - minW || 1;

  // X is index-based so every session gets equal horizontal space,
  // even multiple sessions logged on the same day.
  const n = points.length;
  const xPos = i => n > 1
    ? PAD.left + (i / (n - 1)) * iW
    : PAD.left + iW / 2;
  const yPos = val => PAD.top + iH - ((val - minW) / wRange) * iH;

  // Build path
  const pathD = points.map((p, i) => {
    const x = xPos(i).toFixed(1);
    const y = yPos(p.weight).toFixed(1);
    return `${i === 0 ? 'M' : 'L'}${x} ${y}`;
  }).join(' ');

  // Area path
  const fx = xPos(0).toFixed(1);
  const lx = xPos(n - 1).toFixed(1);
  const bottomY = (PAD.top + iH).toFixed(1);
  const areaD = `${pathD} L${lx} ${bottomY} L${fx} ${bottomY} Z`;

  // Y axis labels
  const yLabels = [];
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const val = minW + (wRange / steps) * i;
    const y = yPos(val);
    yLabels.push({ y, val: val.toFixed(1) });
  }

  // X axis labels: spread up to 5 evenly, always show first + last
  const xLabels = [];
  const xStep = Math.max(1, Math.floor(n / 5));
  points.forEach((p, i) => {
    if (i % xStep === 0 || i === n - 1) {
      const d = new Date(p.ts);
      const label = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      xLabels.push({ x: xPos(i), label });
    }
  });

  // Dots
  const dots = points.map((p, i) => ({
    x: xPos(i),
    y: yPos(p.weight),
    weight: p.weight,
    ts: p.ts,
    isPR: p.isPR
  }));

  svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svgEl.setAttribute('width', '100%');
  svgEl.setAttribute('height', H);
  svgEl.setAttribute('preserveAspectRatio', 'none');

  svgEl.innerHTML = `
    <defs>
      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#D97757" stop-opacity="0.30"/>
        <stop offset="100%" stop-color="#D97757" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <!-- Grid lines -->
    ${yLabels.map(l => `
      <line x1="${PAD.left}" y1="${l.y.toFixed(1)}" x2="${PAD.left + iW}" y2="${l.y.toFixed(1)}"
        stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      <text x="${(PAD.left - 6).toFixed(1)}" y="${(l.y + 4).toFixed(1)}"
        font-size="11" fill="#6E6960" text-anchor="end" font-family="Inter,system-ui">${l.val}</text>
    `).join('')}

    <!-- Area fill -->
    <path d="${areaD}" fill="url(#areaGrad)"/>

    <!-- Line -->
    <path d="${pathD}" fill="none" stroke="#D97757" stroke-width="2.5"
      stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Data points -->
    ${dots.map((d, i) => `
      <circle
        cx="${d.x.toFixed(1)}"
        cy="${d.y.toFixed(1)}"
        r="${d.isPR ? 5 : 4}"
        fill="${d.isPR ? '#E8D4A8' : '#D97757'}"
        stroke="${d.isPR ? '#E8D4A8' : '#D97757'}"
        stroke-width="2"
        style="cursor:pointer"
        class="chart-dot"
        data-weight="${d.weight}"
        data-ts="${d.ts}"
        data-pr="${d.isPR}"
      />
    `).join('')}

    <!-- X axis labels -->
    ${xLabels.map(l => `
      <text x="${l.x.toFixed(1)}" y="${(H - 4).toFixed(1)}"
        font-size="10" fill="#5a5a6e" text-anchor="middle" font-family="Inter,system-ui">${l.label}</text>
    `).join('')}
  `;

  // Tooltip on hover
  attachChartTooltips(svgEl);
}

function attachChartTooltips(svgEl) {
  const wrap = document.getElementById('chart-wrap');
  let tooltip = wrap.querySelector('.chart-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.style.display = 'none';
    wrap.appendChild(tooltip);
  }

  svgEl.querySelectorAll('.chart-dot').forEach(dot => {
    dot.addEventListener('mouseenter', e => {
      const weight = dot.dataset.weight;
      const ts = parseInt(dot.dataset.ts);
      const isPR = dot.dataset.pr === 'true';
      const date = new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

      tooltip.innerHTML = `<strong>${weight} kg</strong> ${isPR ? '🏆 PR' : ''}<br><span style="color:var(--text-muted);font-size:11px">${date}</span>`;
      tooltip.style.display = 'block';

      const rect = svgEl.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      const cx = parseFloat(dot.getAttribute('cx'));
      const cy = parseFloat(dot.getAttribute('cy'));
      const scaleX = rect.width / (svgEl.viewBox.baseVal.width || rect.width);
      const scaleY = rect.height / (svgEl.viewBox.baseVal.height || rect.height);

      tooltip.style.left = (cx * scaleX + rect.left - wrapRect.left) + 'px';
      tooltip.style.top  = (cy * scaleY + rect.top  - wrapRect.top)  + 'px';
    });

    dot.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  });
}

// ==============================================
// TIMER
// ==============================================
function startWorkout() {
  if (workoutTimer.running) return;
  workoutTimer.start = Date.now();
  workoutTimer.running = true;
  workoutTimer.interval = setInterval(tickTimer, 1000);
  renderTimerBar();
}

function stopWorkoutTimer() {
  clearInterval(workoutTimer.interval);
  workoutTimer.running = false;
  workoutTimer.start = null;
  setProgress = {};
  optionalSkipped = {};
  // Clean up localStorage keys for session-added exercises, then clear array
  sessionAddedExercises.forEach(ex => {
    ['sets', 'reps', 'kg'].forEach(s => localStorage.removeItem(ex.key + '-' + s));
  });
  sessionAddedExercises = [];
  renderWorkout(); // full re-render to reset dots + optional state
}

function toggleOptional(key) {
  optionalSkipped[key] = !optionalSkipped[key];
  renderWorkout(); // re-render so row dims/undims and dots re-enable
}

function getElapsedSecs() {
  return workoutTimer.start ? Math.floor((Date.now() - workoutTimer.start) / 1000) : 0;
}

function formatTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
}

function tickTimer() {
  const el = document.getElementById('timer-elapsed');
  if (el) el.textContent = formatTime(getElapsedSecs());
  refreshTimerProgress();
}

function activeExercises() {
  if (currentWorkout === '__new__') return [];
  const workout = WORKOUTS[currentWorkout];
  if (workout) {
    const base = workout.exercises.filter(ex => !(ex.optional && optionalSkipped[ex.key]));
    return [...base, ...sessionAddedExercises];
  }
  // Custom workout — inject index-based key so set tracking works
  const customs = getCustomWorkouts();
  const custom = customs.find(w => w.id === currentWorkout);
  if (!custom) return [];
  const base = custom.exercises.map((ex, i) => ({ ...ex, key: currentWorkout + '-' + i }));
  return [...base, ...sessionAddedExercises];
}

function refreshTimerProgress() {
  const active = activeExercises();
  const total = active.length;
  const done  = active.filter(ex => isExerciseDone(ex.key)).length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = `${done}/${total} exercises`;
}

function renderTimerBar() {
  const bar = document.getElementById('timer-bar');
  if (!bar) return;

  // No timer bar in builder mode
  if (currentWorkout === '__new__') { bar.innerHTML = ''; return; }

  if (!workoutTimer.running && !workoutTimer.start) {
    bar.innerHTML = `
      <div class="timer-bar-idle">
        <button class="start-workout-btn" onclick="startWorkout()">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
          Start Workout
        </button>
      </div>
    `;
  } else {
    const active = activeExercises();
    const total  = active.length;
    const done   = active.filter(ex => isExerciseDone(ex.key)).length;
    const pct    = total > 0 ? Math.round((done / total) * 100) : 0;

    bar.innerHTML = `
      <div class="timer-bar-active">
        <div class="timer-left">
          <span class="timer-pulse-dot"></span>
          <span class="timer-time" id="timer-elapsed">${formatTime(getElapsedSecs())}</span>
          <span class="timer-live-label">Active</span>
        </div>
        <div class="timer-center">
          <span class="timer-prog-label" id="progress-label">${done}/${total} exercises</span>
          <div class="timer-prog-track">
            <div class="timer-prog-fill" id="progress-fill" style="width:${pct}%"></div>
          </div>
        </div>
        <button class="end-workout-btn" onclick="stopWorkoutTimer()" title="End workout and reset">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
          End
        </button>
      </div>
    `;
  }
}

// ==============================================
// SET DOTS
// ==============================================
function getSetCount(repsValue) {
  const match = (repsValue || '').match(/^(\d+)[x×]/i);
  return match ? Math.min(parseInt(match[1]), 5) : 3;
}

function tapSet(key, index) {
  if (!setProgress[key]) setProgress[key] = [];
  while (setProgress[key].length <= index) setProgress[key].push(false);
  setProgress[key][index] = !setProgress[key][index];
  updateSetDisplay(key);
  refreshTimerProgress();
}

function isExerciseDone(key) {
  const container = document.querySelector(`[data-sets="${key}"]`);
  if (!container) return false;
  const dots = container.querySelectorAll('.set-dot');
  return dots.length > 0 && [...dots].every(d => d.classList.contains('done'));
}

function updateSetDisplay(key) {
  const container = document.querySelector(`[data-sets="${key}"]`);
  if (!container) return;

  const state = setProgress[key] || [];
  const dots = container.querySelectorAll('.set-dot');

  dots.forEach((dot, i) => {
    const isDone = state[i] === true;
    const wasAlreadyDone = dot.classList.contains('done');
    dot.classList.toggle('done', isDone);
    dot.innerHTML = isDone
      ? `<svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
      : `<span class="dot-num">${i + 1}</span>`;
    // Trigger pop animation when newly completed
    if (isDone && !wasAlreadyDone) {
      dot.classList.remove('pop');
      void dot.offsetWidth; // reflow
      dot.classList.add('pop');
    }
  });

  const allDone = dots.length > 0 && [...dots].every(d => d.classList.contains('done'));
  container.closest('tr')?.classList.toggle('sets-complete', allDone);
}

// ==============================================
// DELETE LOGIC
// ==============================================
function deleteSingleLog(timestamp) {
  logToDelete = timestamp;
  document.getElementById('modal-title').textContent = 'Delete session?';
  document.getElementById('modal-text').textContent = 'This training session will be permanently deleted.';
  openDeleteModal();
}

function setupClearAll() {
  logToDelete = 'all';
  document.getElementById('modal-title').textContent = 'Clear all history?';
  document.getElementById('modal-text').textContent = 'All logged sessions will be permanently deleted. This cannot be undone.';
  openDeleteModal();
}

function openDeleteModal() {
  document.getElementById('deleteModal').style.display = 'flex';
}

function closeDeleteModal() {
  document.getElementById('deleteModal').style.display = 'none';
  logToDelete = null;
}

function confirmDeletion() {
  if (logToDelete === 'all') {
    localStorage.removeItem('workout_history');
    closeDeleteModal();
    location.reload();
  } else if (typeof logToDelete === 'string' && logToDelete.startsWith('workout:')) {
    const workoutId = logToDelete.slice(8);
    saveCustomWorkouts(getCustomWorkouts().filter(w => w.id !== workoutId));
    closeDeleteModal();
    currentWorkout = 'upperA';
    renderWorkoutTabs();
    renderWorkout();
    updateWorkoutDeleteRow();
    // Reset save button
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) saveBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Save Session`;
  } else if (logToDelete !== null) {
    const history = getHistory().filter(s => s.timestamp !== logToDelete);
    saveHistory(history);
    closeDeleteModal();
    renderHistory();
    renderChart();
    renderPRSummaryCard();
  }
}

// Click outside modal to close
window.addEventListener('click', e => {
  const modal = document.getElementById('deleteModal');
  if (e.target === modal) closeDeleteModal();
});

// ==============================================
// STORAGE HELPERS
// ==============================================
function getHistory() {
  return JSON.parse(localStorage.getItem('workout_history')) || [];
}

function saveHistory(history) {
  localStorage.setItem('workout_history', JSON.stringify(history));
}

function getCustomWorkouts() {
  return JSON.parse(localStorage.getItem('custom_workouts')) || [];
}

function saveCustomWorkouts(workouts) {
  localStorage.setItem('custom_workouts', JSON.stringify(workouts));
}

// ==============================================
// WORKOUT TABS (dynamic — standard + custom + New)
// ==============================================
function renderWorkoutTabs() {
  const row = document.getElementById('tab-row');
  if (!row) return;
  const customs = getCustomWorkouts();
  const stdTabs = [
    { id: 'push',  label: 'Push' },
    { id: 'pull',  label: 'Pull' },
    { id: 'legs',  label: 'Legs' },
  ];
  row.innerHTML = [
    ...stdTabs.map(t =>
      `<button class="tab-btn${currentWorkout === t.id ? ' active' : ''}" onclick="switchWorkout('${t.id}',this)">${t.label}</button>`
    ),
    ...customs.map(w =>
      `<button class="tab-btn${currentWorkout === w.id ? ' active' : ''}" onclick="switchWorkout('${escapeHtml(w.id)}',this)">${escapeHtml(w.name)}</button>`
    ),
    `<button class="tab-btn tab-new${currentWorkout === '__new__' ? ' active' : ''}" onclick="switchWorkout('__new__',this)">+ New</button>`
  ].join('');
}

function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// ==============================================
// DELETE CUSTOM WORKOUT
// ==============================================
function updateWorkoutDeleteRow() {
  const row = document.getElementById('workout-delete-row');
  if (!row) return;
  const isCustom = !WORKOUTS[currentWorkout] && currentWorkout !== '__new__';
  row.style.display = isCustom ? 'flex' : 'none';
}

function deleteCurrentWorkout() {
  logToDelete = 'workout:' + currentWorkout;
  document.getElementById('modal-title').textContent = 'Delete workout?';
  document.getElementById('modal-text').textContent = 'This custom workout will be deleted. Your logged sessions are not affected.';
  openDeleteModal();
}

// ==============================================
// CUSTOM WORKOUT RENDERER
// ==============================================
function renderCustomWorkout() {
  const customs = getCustomWorkouts();
  const workout = customs.find(w => w.id === currentWorkout);
  const container = document.getElementById('workout-content');
  if (!workout) { container.innerHTML = '<p class="empty-state">Workout not found.</p>'; return; }

  const getExLink = name => {
    if (EXERCISE_LINKS[name]) return EXERCISE_LINKS[name];
    const lib = EXERCISE_LIBRARY.find(e => e.name === name);
    return lib?.sl ? `https://strengthlevel.com/strength-standards/${lib.sl}/kg` : null;
  };

  const buildRow = (ex, idx) => {
    const key         = currentWorkout + '-' + idx;
    const skipped     = ex.optional && optionalSkipped[key];
    const defaultSets = parseSets(ex.reps || '3x10');
    const defaultReps = parseReps(ex.reps || '3x10');
    const setCount    = getStepperVal(key + '-sets', defaultSets);
    const dots        = Array.from({ length: setCount }, (_, i) =>
      `<button class="set-dot" onclick="tapSet('${key}',${i})" title="Set ${i + 1}"></button>`
    ).join('');
    const link = getExLink(ex.name);
    return `
      <tr class="${ex.optional ? 'optional-row' : ''}${skipped ? ' opt-skipped' : ''}">
        <td>
          <div class="ex-name-wrap">
            <span class="ex-name${link ? ' clickable' : ''}"
              ${link ? `onclick="window.open('${link}','_blank')" title="View strength standards"` : ''}
            >${ex.name}</span>
            ${ex.optional ? `
              <button class="opt-toggle-btn" onclick="toggleOptional('${key}')">
                ${skipped ? '＋ Include' : '✕ Skip'}
              </button>` : ''}
          </div>
        </td>
        <td>
          <div class="set-dots" data-sets="${key}">${dots}</div>
        </td>
        <td class="col-reps">
          ${stepperHtml(key + '-reps', defaultReps, 1, skipped)}
        </td>
        <td>
          ${stepperHtml(key + '-kg', 0, 0, false)}
        </td>
        <td class="desktop-only"><span class="type-badge">${ex.group || ''}</span></td>
        <td class="desktop-only"></td>
      </tr>`;
  };

  const indexedExercises = workout.exercises.map((ex, idx) => ({ ex, idx }));
  const required = indexedExercises.filter(({ ex }) => !ex.optional);
  const optional = indexedExercises.filter(({ ex }) =>  ex.optional);
  const separator = optional.length ? `
    <tr class="opt-separator">
      <td colspan="6"><span class="opt-sep-label">✦ Optional</span></td>
    </tr>` : '';

  container.innerHTML = `
    <div class="workout-table-wrap">
      <table class="exercise-table">
        <thead>
          <tr>
            <th>Exercise</th>
            <th class="sets-th">Sets</th>
            <th class="col-reps">Set / Rep</th>
            <th>Weight</th>
            <th class="desktop-only">Muscle</th>
            <th class="desktop-only"></th>
          </tr>
        </thead>
        <tbody>
          ${required.map(({ ex, idx }) => buildRow(ex, idx)).join('')}
          ${separator}
          ${optional.map(({ ex, idx }) => buildRow(ex, idx)).join('')}
          ${sessionAddedExercises.map(buildAddedRow).join('')}
          ${addExerciseTableRow()}
        </tbody>
      </table>
    </div>
  `;

  requestAnimationFrame(() => {
    workout.exercises.forEach((_, i) => updateSetDisplay(currentWorkout + '-' + i));
    sessionAddedExercises.forEach(ex => updateSetDisplay(ex.key));
    renderTimerBar();
  });
}

// ==============================================
// WORKOUT BUILDER
// ==============================================
function renderBuilder() {
  const container = document.getElementById('workout-content');

  const swatches = BADGE_COLORS.map(c =>
    `<button class="color-swatch${builderColor === c.id ? ' active' : ''}"
      style="background:${c.accent}"
      onclick="selectBuilderColor('${c.id}')"
      title="${c.label}"></button>`
  ).join('');

  container.innerHTML = `
    <div class="builder-wrap">
      <div class="builder-name-row">
        <input id="builder-name" class="builder-name-input"
          placeholder="Workout name (e.g. Full Body)..." maxlength="40" autocomplete="off">
        <div class="builder-colors">${swatches}</div>
      </div>

      <div class="builder-search-wrap">
        <div class="builder-search-inner">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style="flex-shrink:0">
            <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
            <path d="M16.5 16.5l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <input id="builder-search" class="builder-search-input"
            placeholder="Search exercises, or type any name..."
            oninput="searchExercises(this.value)"
            onkeydown="handleBuilderSearchKey(event)"
            autocomplete="off">
        </div>
        <div id="builder-suggestions" class="builder-suggestions" style="display:none"></div>
      </div>

      <div id="builder-exercise-list" class="builder-exercise-list">
        <p class="builder-empty">Search for exercises above, or type any name to add it</p>
      </div>
    </div>
  `;

  renderBuilderExerciseList();
  renderTimerBar(); // clears timer bar (has __new__ guard)
}

function selectBuilderColor(colorId) {
  builderColor = colorId;
  document.querySelectorAll('.color-swatch').forEach(s => {
    const isActive = s.title === BADGE_COLORS.find(c => c.id === colorId)?.label;
    s.classList.toggle('active', isActive);
  });
}

function searchExercises(query) {
  const suggestionsEl = document.getElementById('builder-suggestions');
  if (!suggestionsEl) return;

  const q = query.trim();
  if (!q) { suggestionsEl.style.display = 'none'; suggestionsEl.innerHTML = ''; return; }

  const qLower = q.toLowerCase();
  const alreadyAdded = new Set(builderExercises.map(e => e.name.toLowerCase()));

  const matches = EXERCISE_LIBRARY
    .filter(ex => ex.name.toLowerCase().includes(qLower) && !alreadyAdded.has(ex.name.toLowerCase()))
    .slice(0, 8);

  const rows = matches.map(ex => {
    const slUrl = ex.sl ? `https://strengthlevel.com/strength-standards/${ex.sl}/kg` : null;
    const safeName = ex.name.replace(/'/g, '\\x27');
    return `
      <div class="suggestion-row" onclick="addExerciseToBuilder('${safeName}')">
        <div class="suggestion-left">
          <span class="suggestion-name">${ex.name}</span>
          <span class="suggestion-group">${ex.group}</span>
        </div>
        ${slUrl ? `<a class="suggestion-preview" href="${slUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Preview ↗</a>` : ''}
      </div>`;
  });

  // "Add custom" option when no exact match
  const exactMatch = EXERCISE_LIBRARY.some(ex => ex.name.toLowerCase() === qLower);
  if (!exactMatch) {
    const safeQ = q.replace(/'/g, '\\x27');
    rows.push(`
      <div class="suggestion-row suggestion-custom" onclick="addExerciseToBuilder('${safeQ}')">
        <div class="suggestion-left">
          <span class="suggestion-name">Add "${q}"</span>
          <span class="suggestion-group">Custom</span>
        </div>
      </div>`);
  }

  if (rows.length === 0) { suggestionsEl.style.display = 'none'; return; }
  suggestionsEl.innerHTML = rows.join('');
  suggestionsEl.style.display = 'block';
}

function handleBuilderSearchKey(event) {
  if (event.key === 'Enter') {
    const q = event.target.value.trim();
    if (!q) return;
    const exact = EXERCISE_LIBRARY.find(ex => ex.name.toLowerCase() === q.toLowerCase());
    addExerciseToBuilder(exact ? exact.name : q);
    event.preventDefault();
  } else if (event.key === 'Escape') {
    const s = document.getElementById('builder-suggestions');
    if (s) s.style.display = 'none';
  }
}

// ==============================================
// SESSION ADD EXERCISE
// ==============================================
function searchSessionExercises(query) {
  const suggestionsEl = document.getElementById('session-ex-suggestions');
  if (!suggestionsEl) return;

  const q = query.trim();
  if (!q) { suggestionsEl.style.display = 'none'; suggestionsEl.innerHTML = ''; return; }

  const qLower = q.toLowerCase();

  // Exclude exercises already in the template and already added this session
  const templateNames = new Set(
    (WORKOUTS[currentWorkout]?.exercises || []).map(e => e.name.toLowerCase())
  );
  const alreadyAdded = new Set([
    ...sessionAddedExercises.map(e => e.name.toLowerCase()),
    ...templateNames
  ]);

  const matches = EXERCISE_LIBRARY
    .filter(ex => ex.name.toLowerCase().includes(qLower) && !alreadyAdded.has(ex.name.toLowerCase()))
    .slice(0, 8);

  const rows = matches.map(ex => {
    const slUrl = ex.sl ? `https://strengthlevel.com/strength-standards/${ex.sl}/kg` : null;
    const safeName = ex.name.replace(/'/g, '\\x27');
    return `
      <div class="suggestion-row" onclick="addSessionExercise('${safeName}')">
        <div class="suggestion-left">
          <span class="suggestion-name">${ex.name}</span>
          <span class="suggestion-group">${ex.group}</span>
        </div>
        ${slUrl ? `<a class="suggestion-preview" href="${slUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Preview ↗</a>` : ''}
      </div>`;
  });

  const exactMatch = EXERCISE_LIBRARY.some(ex => ex.name.toLowerCase() === qLower);
  if (!exactMatch && q.length > 1) {
    const safeQ = q.replace(/'/g, '\\x27');
    rows.push(`
      <div class="suggestion-row suggestion-custom" onclick="addSessionExercise('${safeQ}')">
        <div class="suggestion-left">
          <span class="suggestion-name">Add "${q}"</span>
          <span class="suggestion-group">Custom</span>
        </div>
      </div>`);
  }

  if (rows.length === 0) { suggestionsEl.style.display = 'none'; return; }
  suggestionsEl.innerHTML = rows.join('');
  suggestionsEl.style.display = 'block';
}

function handleSessionSearchKey(event) {
  if (event.key === 'Enter') {
    const q = event.target.value.trim();
    if (!q) return;
    const exact = EXERCISE_LIBRARY.find(ex => ex.name.toLowerCase() === q.toLowerCase());
    addSessionExercise(exact ? exact.name : q);
    event.preventDefault();
  } else if (event.key === 'Escape') {
    const s = document.getElementById('session-ex-suggestions');
    if (s) s.style.display = 'none';
  }
}

function addSessionExercise(name) {
  if (sessionAddedExercises.some(e => e.name.toLowerCase() === name.toLowerCase())) return;

  const lib = EXERCISE_LIBRARY.find(e => e.name.toLowerCase() === name.toLowerCase());
  const key = 'sessionEx-' + Date.now();
  sessionAddedExercises.push({
    name,
    key,
    reps: '3x10',
    kg: 0,
    type: 'Added',
    target: lib?.group || ''
  });

  const searchInput = document.getElementById('session-ex-search');
  const suggestionsEl = document.getElementById('session-ex-suggestions');
  if (searchInput) searchInput.value = '';
  if (suggestionsEl) { suggestionsEl.style.display = 'none'; suggestionsEl.innerHTML = ''; }

  renderWorkout();
  requestAnimationFrame(() => {
    if (WORKOUTS[currentWorkout]) {
      WORKOUTS[currentWorkout].exercises.forEach(ex => updateSetDisplay(ex.key));
    }
    sessionAddedExercises.forEach(ex => updateSetDisplay(ex.key));
    renderTimerBar();
  });
}

function removeSessionExercise(key) {
  sessionAddedExercises = sessionAddedExercises.filter(e => e.key !== key);
  renderWorkout();
  requestAnimationFrame(() => {
    if (WORKOUTS[currentWorkout]) {
      WORKOUTS[currentWorkout].exercises.forEach(ex => updateSetDisplay(ex.key));
    }
    sessionAddedExercises.forEach(ex => updateSetDisplay(ex.key));
    renderTimerBar();
  });
}

function addExerciseToBuilder(name) {
  if (builderExercises.some(e => e.name.toLowerCase() === name.toLowerCase())) return;
  builderExercises.push({ name, optional: false });

  const searchInput = document.getElementById('builder-search');
  const suggestionsEl = document.getElementById('builder-suggestions');
  if (searchInput) searchInput.value = '';
  if (suggestionsEl) { suggestionsEl.style.display = 'none'; suggestionsEl.innerHTML = ''; }

  renderBuilderExerciseList();
  searchInput?.focus();
}

function removeBuilderExercise(idx) {
  builderExercises.splice(idx, 1);
  renderBuilderExerciseList();
}

function toggleBuilderOptional(idx) {
  builderExercises[idx].optional = !builderExercises[idx].optional;
  renderBuilderExerciseList();
}

function renderBuilderExerciseList() {
  const el = document.getElementById('builder-exercise-list');
  if (!el) return;

  if (builderExercises.length === 0) {
    el.innerHTML = '<p class="builder-empty">Search for exercises above, or type any name to add it</p>';
    return;
  }

  el.innerHTML = builderExercises.map((ex, i) => {
    const libEx = EXERCISE_LIBRARY.find(e => e.name === ex.name);
    const link = EXERCISE_LINKS[ex.name] ||
      (libEx?.sl ? `https://strengthlevel.com/strength-standards/${libEx.sl}/kg` : null);
    return `
      <div class="builder-ex-row${ex.optional ? ' builder-ex-optional' : ''}">
        <span class="builder-ex-name${link ? ' clickable' : ''}"
          ${link ? `onclick="window.open('${link}','_blank')" title="View on Strengthlevel"` : ''}
        >${ex.name}</span>
        <button class="builder-opt-toggle${ex.optional ? ' active' : ''}" onclick="toggleBuilderOptional(${i})" title="Mark as optional">Optional</button>
        <button class="builder-ex-remove" onclick="removeBuilderExercise(${i})" title="Remove">✕</button>
      </div>`;
  }).join('');
}

function saveNewWorkout() {
  const nameInput = document.getElementById('builder-name');
  const name = nameInput?.value.trim();

  if (!name) {
    nameInput?.classList.add('input-error');
    setTimeout(() => nameInput?.classList.remove('input-error'), 600);
    return;
  }
  if (builderExercises.length === 0) {
    const si = document.getElementById('builder-search');
    si?.classList.add('input-error');
    setTimeout(() => si?.classList.remove('input-error'), 600);
    return;
  }

  const newWorkout = {
    id: 'custom_' + Date.now(),
    name,
    color: builderColor,
    exercises: builderExercises.map(ex => {
      const libEx = EXERCISE_LIBRARY.find(e => e.name === ex.name);
      return { name: ex.name, reps: '3x10', kg: '', group: libEx?.group || '', ...(ex.optional && { optional: true }) };
    })
  };
  const customs = getCustomWorkouts();
  customs.push(newWorkout);
  saveCustomWorkouts(customs);

  // Reset builder state
  builderExercises = [];
  builderColor = 'purple';

  // Switch to new workout
  currentWorkout = newWorkout.id;
  renderWorkoutTabs();
  renderWorkout();
  updateWorkoutDeleteRow();

  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) {
    saveBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Save Session`;
    saveBtn.classList.remove('saved');
  }
}

// ==============================================
// SESSION BADGE HELPER (standard + custom workouts)
// ==============================================
function getSessionBadge(session) {
  const STD = {
    push: { cls: 'badge-upper-a', style: '', label: 'Push' },
    pull: { cls: 'badge-upper-b', style: '', label: 'Pull' },
    legs: { cls: 'badge-legs',    style: '', label: 'Legs' },
  };
  if (STD[session.workoutId]) return STD[session.workoutId];

  const customs = getCustomWorkouts();
  const cw = customs.find(w => w.id === session.workoutId);
  if (cw) {
    const colorDef = BADGE_COLORS.find(c => c.id === cw.color) || BADGE_COLORS[0];
    const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const accent = isLight ? colorDef.accentLight : colorDef.accent;
    const bg     = isLight ? colorDef.bgLight     : colorDef.bg;
    return { cls: '', style: `background:${bg};color:${accent}`, label: cw.name };
  }

  // Deleted custom workout — show name from session record
  return {
    cls: '',
    style: 'background:rgba(255,255,255,0.08);color:#8b8b9e',
    label: session.workoutName?.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim() || 'Workout'
  };
}
