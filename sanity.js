const onCreateTab = async tab => {
  const tabs = await browser.tabs.query({currentWindow: true, pinned: false})
  const res = await browser.storage.local.get(['softlimit', 'hardlimit', 'enforce'])
  const softlimit = res['softlimit'] || defaultSoftlimit
  const hardlimit = res['hardlimit'] || defaultHardlimit
  const enforce = (res['enforce'] !== undefined) ? res['enforce'] : defaultEnforce
  if (tabs.length > softlimit) {
    browser.notifications.create({
      'type': 'basic',
      'iconUrl': browser.extension.getURL('icons/tabsanity-48.png'),
      'title': 'Too many tabs',
      'message': `you have ${tabs.length} tabs opened`
    });
  }
  if (tabs.length > hardlimit && enforce) {
    await browser.tabs.remove(tab.id)
  }
}

browser.tabs.onCreated.addListener(onCreateTab)
