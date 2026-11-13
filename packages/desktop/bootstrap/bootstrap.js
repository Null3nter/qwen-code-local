const tauri = window.__TAURI__;
const invoke = tauri?.core?.invoke;
const listen = tauri?.event?.listen;

const title = document.querySelector('#title');
const detail = document.querySelector('#detail');
const pulse = document.querySelector('#pulse');
const workspace = document.querySelector('#workspace');
const error = document.querySelector('#error');
const choose = document.querySelector('#choose');
const retry = document.querySelector('#retry');
const logs = document.querySelector('#logs');
const update = document.querySelector('#update');
const version = document.querySelector('#version');
const macosTitlebar = document.querySelector('#macos-titlebar-drag-region');
const termCode = document.querySelector('#term-code');
const network = document.querySelector('#network');
const lock = document.querySelector('#lock');
const particlesRoot = document.querySelector('#particles');

macosTitlebar.hidden = window.__QWEN_CODE_MACOS_TITLEBAR__ !== true;

let currentWorkspace = '';
let snapshotOverrideStatus;
let updateVersion;
let splashStarted = false;

const CODE_LINES = [
  { html: '<span class="muted">$</span> <span class="accent">qwen-code-local</span> --local' },
  { html: '<span class="ok">✓</span> initializing local runtime…' },
  { html: '<span class="ok">✓</span> sandbox: secure' },
  { html: '<span class="ok">✓</span> network: local-only' },
  { html: '<span class="ok">✓</span> dependencies: resolved offline' },
  { html: '<span class="muted">$</span> establishing node network…' },
  { html: '<span class="ok">✓</span> binding nodes · no npx' },
  { html: '<span class="ok">✓</span> direct MCP bridges ready' },
  { html: '<span class="ok">✓</span> fully offline · process isolated' },
];

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function spawnParticles() {
  if (!particlesRoot || prefersReducedMotion()) return;
  particlesRoot.innerHTML = '';
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('span');
    p.className = 'particle' + (i % 3 === 0 ? ' emerald' : '');
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 3}s`;
    p.style.animationDuration = `${3.5 + Math.random() * 2.5}s`;
    particlesRoot.appendChild(p);
  }
}

function runSplashSequence() {
  if (splashStarted || !termCode) return;
  splashStarted = true;
  spawnParticles();

  if (prefersReducedMotion()) {
    termCode.innerHTML = CODE_LINES.map((l) => `<div class="line visible">${l.html}</div>`).join('');
    network?.classList.add('show');
    lock?.classList.add('show');
    return;
  }

  let i = 0;
  const step = () => {
    if (i >= CODE_LINES.length) {
      network?.classList.add('show');
      lock?.classList.add('show');
      return;
    }
    const row = document.createElement('div');
    row.className = 'line';
    row.innerHTML = CODE_LINES[i].html;
    if (i === CODE_LINES.length - 1) {
      row.innerHTML += '<span class="cursor"></span>';
    }
    termCode.appendChild(row);
    void row.offsetWidth;
    row.classList.add('visible');
    i += 1;
    if (i === 5) network?.classList.add('show');
    if (i === 7) lock?.classList.add('show');
    setTimeout(step, 320 + Math.random() * 120);
  };
  setTimeout(step, 500);
}

function setWorkspace(path) {
  workspace.hidden = !path;
  workspace.textContent = path || '';
}

function setStatus(kind, heading, message, failure = '') {
  document.body.dataset.state = kind;
  title.textContent = heading;
  detail.textContent = message;
  pulse.className = `pulse ${kind === 'starting' ? '' : kind}`;
  error.style.display = failure ? 'block' : 'none';
  error.textContent = failure;
  retry.hidden = kind !== 'error';
  choose.hidden = kind === 'starting';
  choose.disabled = kind === 'starting';
  setWorkspace(kind === 'starting' ? '' : currentWorkspace);
  if (kind === 'starting') runSplashSequence();
}

async function chooseWorkspace() {
  if (!invoke) return;
  snapshotOverrideStatus = 'starting';
  setStatus(
    'starting',
    'Opening workspace',
    'Starting the bundled Qwen Code runtime…',
  );
  try {
    const path = await invoke('choose_workspace');
    if (path) currentWorkspace = path;
    else setStatus('idle', 'Choose another workspace', 'No folder was selected.');
  } catch (failure) {
    setStatus(
      'error',
      'Workspace could not start',
      'Review the details or open the desktop log.',
      String(failure),
    );
  }
}

async function retryRuntime() {
  if (!invoke) return;
  snapshotOverrideStatus = 'starting';
  splashStarted = false;
  if (termCode) termCode.innerHTML = '';
  network?.classList.remove('show');
  lock?.classList.remove('show');
  setStatus(
    'starting',
    'Restarting Qwen Code',
    'Checking the bundled runtime and workspace…',
  );
  try {
    await invoke('restart_runtime');
  } catch (failure) {
    setStatus(
      'error',
      'Qwen Code could not restart',
      'Review the details or choose another workspace.',
      String(failure),
    );
  }
}

async function installUpdate() {
  if (!invoke) return;
  update.disabled = true;
  update.textContent = `Installing ${updateVersion || 'update'}…`;
  try {
    await invoke('install_update');
  } catch (failure) {
    setStatus(
      'error',
      'Update failed',
      'Qwen Code remains usable. Try again or update manually.',
      String(failure),
    );
  } finally {
    update.disabled = false;
    update.textContent = 'Install update';
  }
}

async function openLogs() {
  if (!invoke) return;
  try {
    await invoke('open_logs');
  } catch (failure) {
    setStatus(
      'error',
      'Logs could not open',
      'Review the details or try again.',
      String(failure),
    );
  }
}

choose.addEventListener('click', chooseWorkspace);
retry.addEventListener('click', retryRuntime);
logs.addEventListener('click', openLogs);
update.addEventListener('click', installUpdate);

async function initialize() {
  runSplashSequence();

  if (!invoke || !listen) {
    setStatus(
      'error',
      'Desktop bridge unavailable',
      'The packaged desktop bridge did not initialize.',
      'Restart Qwen Code.',
    );
    return;
  }

  await Promise.all([
    listen('runtime-starting', ({ payload }) => {
      snapshotOverrideStatus = 'starting';
      currentWorkspace = String(payload || '');
      setStatus(
        'starting',
        'Starting Qwen Code',
        'Launching the bundled runtime and checking its health…',
      );
    }),
    listen('runtime-failed', ({ payload }) => {
      snapshotOverrideStatus = 'failed';
      setStatus(
        'error',
        'Qwen Code could not start',
        'Review the details, open the log, or choose another workspace.',
        String(payload),
      );
    }),
    listen('update-available', ({ payload }) => {
      updateVersion = String(payload);
      update.hidden = false;
      update.textContent = `Install ${updateVersion}`;
    }),
  ]);

  const state = await invoke('bootstrap_state');
  version.textContent = `Desktop ${state.desktopVersion}`;
  currentWorkspace ||= String(state.workspace || '');
  if (snapshotOverrideStatus) {
    if (snapshotOverrideStatus === 'failed') setWorkspace(currentWorkspace);
    return;
  }
  if (state.status === 'starting') {
    setStatus(
      'starting',
      'Starting Qwen Code',
      'Launching the bundled runtime and checking its health…',
    );
  } else if (state.status === 'ready') {
    setStatus(
      'starting',
      'Loading Qwen Code',
      'Connecting to the local Web Shell…',
    );
  } else if (state.error) {
    setStatus(
      'error',
      'Qwen Code could not start',
      'Review the details, open the log, or choose another workspace.',
      state.error,
    );
  } else {
    setStatus(
      'idle',
      'Choose another workspace',
      'The automatic workspace did not start.',
    );
  }
}

initialize().catch((failure) => {
  setStatus(
    'error',
    'Desktop initialization failed',
    'Restart Qwen Code or inspect the desktop log.',
    String(failure),
  );
});
