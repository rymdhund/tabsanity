async function init() {
  const res = await browser.storage.local.get(['softlimit', 'hardlimit', 'enforce'])
  document.querySelector('#softlimit').value = res['softlimit'] || defaultSoftlimit
  document.querySelector('#hardlimit').value = res['hardlimit'] || defaultHardlimit
  document.querySelector('#enforce').checked = (res['enforce'] !== undefined) ? res['enforce'] : defaultEnforce
}

async function saveSoftlimit() {
  if (document.querySelector('#softlimit').value < 1) {
    document.querySelector('#softlimit').value = 1;
  }
  await browser.storage.local.set({ softlimit: document.querySelector('#softlimit').value });
}

async function saveHardlimit() {
  if (document.querySelector('#hardlimit').value < 1) {
    document.querySelector('#hardlimit').value = 1;
  }
  await browser.storage.local.set({ hardlimit: document.querySelector('#hardlimit').value });
}

async function saveEnforce() {
  await browser.storage.local.set({ enforce: document.querySelector('#enforce').checked });
}

document.addEventListener('DOMContentLoaded', init)
document.getElementById('softlimit').addEventListener('change', saveSoftlimit);
document.getElementById('hardlimit').addEventListener('change', saveHardlimit);
document.getElementById('enforce').addEventListener('change', saveEnforce);
