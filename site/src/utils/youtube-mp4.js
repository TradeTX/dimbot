const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
  try {
    const url = req.query.url;
    const quality = req.query.quality || 'highest';
    if (!url) res.send('Oof, no url supplied');
    const info = await ytdl.getInfo(url).catch(() => res.send('Oof, invalid url'));
    const file = `${info.title.replace(/[<>:"/\\|?*]/g, '_')}.mp4`;
    res.set({
      'Content-Disposition': `attachment; filename=${file}`,
      'Content-Transfer-Encoding': 'binary',
      'Content-Type': 'video/mp4'
    });
    ytdl.downloadFromInfo(info, {quality}).pipe(res);
  } catch (err) {
    res.send(err);
  }
};